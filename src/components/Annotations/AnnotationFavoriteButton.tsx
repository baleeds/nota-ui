import React from 'react';
import {
  AnnotationFragment,
  FavoriteAnnotationMutation,
  UnfavoriteAnnotationMutation,
  useFavoriteAnnotationMutation,
  useUnfavoriteAnnotationMutation,
} from '../../api/__generated__/apollo-graphql';
import { attempt } from '../../base/utils/attempt';
import { normalizeErrors } from '../../base/utils/normalizeErrors';
import { toast } from '../Toast';
import { UNKNOWN_ERROR } from '../../base/constants/messages';
import { useAuth } from '../AuthProvider';
import { ReactComponent as EmptyHeartIcon } from '../../icons/heart-16px.svg';
import { ReactComponent as FilledHeartIcon } from '../../icons/heart_filled-16px.svg';
import styled from 'styled-components/macro';
import { BaseButton } from '../Buttons';
import { theme } from '../../styles/theme';

interface Props {
  annotation?: Pick<
    AnnotationFragment,
    'id' | 'isFavorite' | 'numberOfFavorites'
  >;
}

export const AnnotationFavoriteButton: React.FC<Props> = ({ annotation }) => {
  const { user } = useAuth();

  const [favoriteAnnotationMutation] = useFavoriteAnnotationMutation();
  const [unfavoriteAnnotationMutation] = useUnfavoriteAnnotationMutation();

  const favoriteAnnotation = async () => {
    if (!annotation?.id) return;

    const [failure, result] = await attempt(
      favoriteAnnotationMutation({
        variables: {
          input: {
            annotationId: annotation.id,
          },
        },
        optimisticResponse: {
          favoriteAnnotation: {
            successful: true,
            messages: [],
            result: {
              id: annotation.id,
              isFavorite: true,
              numberOfFavorites: annotation.numberOfFavorites + 1,
              __typename: 'Annotation',
            },
            __typename: 'FavoriteAnnotationPayload',
          },
          __typename: 'RootMutationType',
        },
      })
    );

    const { hasError, base } = normalizeErrors<FavoriteAnnotationMutation>(
      failure,
      result
    );

    if (hasError) {
      toast({ message: base || UNKNOWN_ERROR, type: 'error' });
    }
  };

  const unfavoriteAnnotation = async () => {
    if (!annotation?.id) return;

    const [failure, result] = await attempt(
      unfavoriteAnnotationMutation({
        variables: {
          input: {
            annotationId: annotation.id,
          },
        },
        optimisticResponse: {
          unfavoriteAnnotation: {
            successful: true,
            messages: [],
            result: {
              id: annotation.id,
              isFavorite: false,
              numberOfFavorites: annotation.numberOfFavorites - 1,
              __typename: 'Annotation',
            },
            __typename: 'UnfavoriteAnnotationPayload',
          },
          __typename: 'RootMutationType',
        },
      })
    );

    const { hasError, base } = normalizeErrors<UnfavoriteAnnotationMutation>(
      failure,
      result
    );

    if (hasError) {
      toast({ message: base || UNKNOWN_ERROR, type: 'error' });
    }
  };

  const handleClick = async () => {
    if (!annotation) return;

    if (!user) {
      toast({ message: 'You must be logged in to do that.', type: 'default' });
      return;
    }

    const { isFavorite } = annotation || {};
    if (isFavorite) await unfavoriteAnnotation();
    else await favoriteAnnotation();
  };

  return (
    <ToggleButton onClick={handleClick} type="button">
      {annotation?.isFavorite ? <FilledHeartIcon /> : <EmptyHeartIcon />}
    </ToggleButton>
  );
};

const ToggleButton = styled(BaseButton)`
  height: 20px;
  width: 20px;
  margin-right: 8px;
  color: ${theme.primaryColor};
  display: flex;
  align-items: center;
`;
