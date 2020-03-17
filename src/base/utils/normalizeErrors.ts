import { ExecutionResult } from 'graphql';
import { Error as MutationError } from '../../api/__generated__/apollo-graphql';
import { objectHasProperties } from './objectHasProperties';
import { NETWORK_ERROR, UNKNOWN_ERROR } from '../constants/messages';

interface ObjectBase {
  [key: string]: any;
}

export interface NormalizedErrors<Values> {
  hasError: boolean;
  base?: string;
  fields?: { [key: string]: string };
}

export function normalizeErrors<MutationType extends ObjectBase, Values = {}>(
  failure: Error | undefined,
  result: ExecutionResult<MutationType> | undefined
): NormalizedErrors<Values> {
  if (failure) {
    if (failure.message.match(/network/i)) {
      return { hasError: true, base: NETWORK_ERROR };
    }
    return { hasError: true, base: UNKNOWN_ERROR };
  }

  const { data } = result || {};
  if (!data) {
    return { hasError: true, base: UNKNOWN_ERROR };
  }

  // look through each mutation and find the errors associated with them
  const mutationErrorsMap = Object.keys(data).reduce<{ [key: string]: string }>(
    (errorsMap, dataKey) => {
      const mutationResult = data[dataKey];
      const { errors = [] } = mutationResult || {};

      errors.forEach((error: MutationError) => {
        errorsMap[error.field] = error.message || UNKNOWN_ERROR;
      });

      return errorsMap;
    },
    {}
  );

  const { base, ...fields } = mutationErrorsMap;

  const areFieldsPopulated = objectHasProperties(fields);
  if (!base && !areFieldsPopulated) {
    return { hasError: false };
  }

  return {
    hasError: true,
    base: base as string,
    fields: areFieldsPopulated ? fields : undefined,
  };
}
