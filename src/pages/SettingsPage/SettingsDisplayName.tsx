import React from 'react';
import { PageOnCard } from '../../components/PageOnCard';
import * as Yup from 'yup';
import { isRequired } from '../../base/utils/errorMessages';
import { Formik, Field, FormikConfig } from 'formik';
import { attempt } from '../../base/utils/attempt';
import {
  ChangeDisplayNameMutation,
  useChangeDisplayNameMutation,
} from '../../api/__generated__/apollo-graphql';
import { normalizeErrors } from '../../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../../base/constants/messages';
import { FormErrorDisplay } from '../../components/FormErrorDisplay';
import { FieldGroup } from '../../components/FieldGroup';
import { PrimaryButtonLarge } from '../../components/Buttons';
import { toast } from '../../components/Toast';
import { useHistory } from 'react-router';

interface Values {
  firstName: string;
  lastName: string;
}

const initialValues: Values = {
  firstName: '',
  lastName: '',
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(isRequired('first name')).max(20),
  lastName: Yup.string().required(isRequired('last name')).max(50),
});

interface Props {}

export const SettingsDisplayName: React.FC<Props> = () => {
  const history = useHistory();
  const [changeDisplayNameMutation] = useChangeDisplayNameMutation();

  const handleSubmit: FormikConfig<Values>['onSubmit'] = async (
    values,
    { setSubmitting, setStatus, setErrors }
  ) => {
    const [failure, result] = await attempt(
      changeDisplayNameMutation({
        variables: {
          input: { firstName: values.firstName, lastName: values.lastName },
        },
      })
    );

    const { hasError, base, fields } = normalizeErrors<
      ChangeDisplayNameMutation,
      Values
    >(failure, result);

    const user = result?.data?.changeDisplayName.result;

    if (hasError || !user) {
      if (fields) {
        setErrors(fields);
      } else {
        setStatus(base || UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    toast({ message: 'Display name updated' });
    history.push('/settings');
  };

  return (
    <PageOnCard
      backTo="/settings"
      title="Display Name"
      bodyPadding={{
        desktop: { all: 24 },
        mobile: { all: 24 },
      }}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, status, submitCount }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormErrorDisplay
              possibleErrors={[errors.firstName, errors.lastName, status]}
              submitCount={submitCount}
            />
            <FieldGroup>
              <label htmlFor="firstName">First Name</label>
              <Field type="text" name="firstName" autoFocus required />
            </FieldGroup>
            <FieldGroup>
              <label htmlFor="lastName">Last Name</label>
              <Field type="text" name="lastName" required />
            </FieldGroup>

            <div style={{ marginTop: 40 }}>
              <PrimaryButtonLarge
                disabled={isSubmitting}
                type="submit"
                style={{ width: '100%' }}
              >
                Change Display Name
              </PrimaryButtonLarge>
            </div>
          </form>
        )}
      </Formik>
    </PageOnCard>
  );
};
