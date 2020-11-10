import React, { useCallback } from 'react';
import { useAuth } from '../AuthProvider';
import {
  useFavoriteAnnotationsQuery,
  AnnotationListFragment,
} from '../../api/__generated__/apollo-graphql';
import { PAGE_SIZE } from '../../base/constants/api';
import { extractNodes } from '../../base/utils/extractNodes';
import produce from 'immer';
import { CollectionAnnotationsList } from './CollectionAnnotationsList';

export const CollectionFavorites: React.FC = () => {
  const { user } = useAuth();

  const { data, loading, error, fetchMore } = useFavoriteAnnotationsQuery({
    variables: {
      first: PAGE_SIZE,
      userId: user?.id ?? '',
    },
    skip: !user?.id,
  });

  const annotations = extractNodes<AnnotationListFragment>(
    data?.favoriteAnnotations?.edges
  );
  const { pageInfo } = data?.favoriteAnnotations || {};

  const handleShowMore = useCallback(() => {
    if (loading || !pageInfo?.hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        first: PAGE_SIZE,
        after: pageInfo?.endCursor,
      },
      updateQuery: (previousResult, nextResult) => {
        return produce(previousResult, (draftResult) => {
          if (
            !draftResult?.favoriteAnnotations?.edges ||
            !nextResult?.fetchMoreResult?.favoriteAnnotations?.edges
          ) {
            return previousResult;
          }

          draftResult.favoriteAnnotations.edges.push(
            ...nextResult.fetchMoreResult.favoriteAnnotations.edges
          );
          draftResult.favoriteAnnotations.pageInfo =
            nextResult.fetchMoreResult.favoriteAnnotations.pageInfo;
        });
      },
    });
  }, [pageInfo, fetchMore, loading]);

  return (
    <CollectionAnnotationsList
      annotations={annotations}
      loading={loading}
      error={error}
      onShowMore={handleShowMore}
      pageInfo={pageInfo}
      versePath={'TODO'}
    />
  );
};
