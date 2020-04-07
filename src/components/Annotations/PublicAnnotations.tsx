import React, { useCallback } from 'react';
import {
  usePublicAnnotationsQuery,
  PublicAnnotationFragment,
} from '../../api/__generated__/apollo-graphql';
import { Annotation } from './Annotation';
import { extractNodes } from '../../base/utils/extractNodes';
import { Flex } from '../layout/Flex';
import { Box } from '../layout/Box';
import { PageError } from '../PageError';
import { NothingHere } from '../NothingHere';
import { OutlineButton } from '../Buttons';
import { PAGE_SIZE } from '../../base/constants/api';
import produce from 'immer';

interface Props {
  passageId: string;
}

export const PublicAnnotations: React.FC<Props> = ({ passageId }) => {
  const { data, loading, error, fetchMore } = usePublicAnnotationsQuery({
    variables: {
      verseId: passageId,
      first: PAGE_SIZE,
    },
  });

  const annotations = data?.annotations
    ? extractNodes<PublicAnnotationFragment>(data.annotations.edges)
    : undefined;

  const { pageInfo } = data?.annotations || {};

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
        return produce(previousResult, draftResult => {
          if (
            !draftResult?.annotations?.edges ||
            !nextResult?.fetchMoreResult?.annotations.edges
          ) {
            return previousResult;
          }
          draftResult.annotations.edges.push(
            ...nextResult.fetchMoreResult.annotations.edges
          );
        });
      },
    });
  }, [pageInfo, fetchMore, loading]);

  const renderAnnotations = () => {
    if (loading && !annotations) {
      return new Array(3).fill(null).map((_item, index) => (
        <Box key={`loading-annotation-${index}`}>
          <Annotation />
        </Box>
      ));
    }

    if (error || !annotations) {
      return <PageError />;
    }

    if (!annotations.length) {
      return <NothingHere />;
    }

    return annotations.map(annotation => (
      <Box key={annotation.id}>
        <Annotation annotation={annotation} />
      </Box>
    ));
  };

  return (
    <Flex column gutter={24} padding={{ b: 24 }}>
      {renderAnnotations()}
      {pageInfo?.hasNextPage && (
        <Box margin={{ t: 24 }}>
          <OutlineButton
            type="button"
            onClick={handleShowMore}
            style={{ width: '100%' }}
            disabled={loading}
          >
            Show more
          </OutlineButton>
        </Box>
      )}
    </Flex>
  );
};
