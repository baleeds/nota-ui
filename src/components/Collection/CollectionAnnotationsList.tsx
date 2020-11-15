import React from 'react';
import { ApolloError } from 'apollo-client';
import {
  PageInfo,
  AnnotationListFragment,
} from '../../api/__generated__/apollo-graphql';
import { Box } from '../layout/Box';
import { AnnotationSummary } from '../Annotations/AnnotationSummary';
import { NothingHere } from '../NothingHere';
import { PageError } from '../PageError';
import { OutlineButton } from '../Buttons';
import { Flex } from '../layout/Flex';

interface Props {
  annotations?: AnnotationListFragment[];
  loading: boolean;
  error?: ApolloError;
  onShowMore: () => void;
  pageInfo?: Pick<PageInfo, 'startCursor' | 'hasNextPage'>;
}

export const CollectionAnnotationsList: React.FC<Props> = ({
  annotations,
  loading,
  error,
  onShowMore,
  pageInfo,
}) => {
  const renderAnnotations = () => {
    if (loading && !annotations) {
      return new Array(3).fill(null).map((_item, index) => (
        <Box key={`loading-annotation-${index}`}>
          <AnnotationSummary />
        </Box>
      ));
    }

    if (error || !annotations) {
      return <PageError />;
    }

    if (!annotations.length) {
      return <NothingHere />;
    }

    return annotations.map((annotation) => (
      <Box key={annotation.id}>
        <AnnotationSummary annotation={annotation} />
      </Box>
    ));
  };

  return (
    <Flex column gutter={24} padding={{ t: 24 }}>
      {renderAnnotations()}
      {pageInfo?.hasNextPage && (
        <Box margin={{ t: 24 }}>
          <OutlineButton
            type="button"
            onClick={onShowMore}
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
