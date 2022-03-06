import React, { useCallback } from 'react';
import produce from 'immer';
import {
  useMyCollectionAnnotationsQuery,
  AnnotationListFragment,
} from '../../api/__generated__/apollo-graphql';
import { PAGE_SIZE } from '../../base/constants/api';
import { extractNodes } from '../../base/utils/extractNodes';
import { CollectionAnnotationsList } from './CollectionAnnotationsList';

interface Props {}

export const MyCollectionAnnotations: React.FC<Props> = () => {
  const { data, loading, error, fetchMore } = useMyCollectionAnnotationsQuery({
    variables: {
      first: PAGE_SIZE,
    },
  });

  const annotations = extractNodes<AnnotationListFragment>(
    data?.myAnnotations?.edges
  );
  const { pageInfo } = data?.myAnnotations || {};

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
            !draftResult?.myAnnotations?.edges ||
            !nextResult?.fetchMoreResult?.myAnnotations?.edges
          ) {
            return previousResult;
          }

          draftResult.myAnnotations.edges.push(
            ...nextResult.fetchMoreResult.myAnnotations.edges
          );
          draftResult.myAnnotations.pageInfo =
            nextResult.fetchMoreResult.myAnnotations.pageInfo;
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
