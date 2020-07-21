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
import { updateCachedAnnotation } from '../../base/apollo/cacheUpdaters';

interface Props {
  annotation?: Pick<AnnotationFragment, 'id' | 'favorited'>;
}

export const AnnotationFavoriteButton: React.FC<Props> = ({ annotation }) => {
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
        update: (proxy, result) => {
          if (!result.data?.favoriteAnnotation?.success) return;
          updateCachedAnnotation(proxy, annotation.id, { favorited: true });
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
        update: (proxy, result) => {
          if (!result.data?.unfavoriteAnnotation?.success) return;
          updateCachedAnnotation(proxy, annotation.id, { favorited: false });
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

    const { favorited } = annotation || {};
    if (favorited) unfavoriteAnnotation();
    else favoriteAnnotation();
  };

  return (
    <button onClick={handleClick} type="button">
      {annotation?.favorited ? 'Favorited' : 'Unfavorited'}
    </button>
  );
};
