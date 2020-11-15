import produce from 'immer';
import React, { useCallback } from 'react';
import {
  AnnotationListFragment,
  useCollectionAnnotationsQuery,
} from '../../api/__generated__/apollo-graphql';
import { PAGE_SIZE } from '../../base/constants/api';
import { extractNodes } from '../../base/utils/extractNodes';
import { CollectionAnnotationsList } from './CollectionAnnotationsList';

interface Props {
  userId: string;
}

export const CollectionAnnotations: React.FC<Props> = ({ userId }) => {
  const { data, fetchMore, loading, error } = useCollectionAnnotationsQuery({
    variables: {
      userId,
      first: PAGE_SIZE,
    },
  });

  const annotations = extractNodes<AnnotationListFragment>(
    data?.publicAnnotations?.edges
  );
  const { pageInfo } = data?.publicAnnotations || {};

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
            !draftResult?.publicAnnotations?.edges ||
            !nextResult?.fetchMoreResult?.publicAnnotations?.edges
          ) {
            return previousResult;
          }

          draftResult.publicAnnotations.edges.push(
            ...nextResult.fetchMoreResult.publicAnnotations.edges
          );
          draftResult.publicAnnotations.pageInfo =
            nextResult.fetchMoreResult.publicAnnotations.pageInfo;
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
    />
  );
};
