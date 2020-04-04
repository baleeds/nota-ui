import React from 'react';
import {
  usePublicAnnotationsQuery,
  PublicAnnotationFragment,
} from '../../api/__generated__/apollo-graphql';
import { Annotation } from './Annotation';
import { extractNodes } from '../../base/utils/extractNodes';
import { Flex } from '../Flex';
import { Box } from '../Box';
import { PageError } from '../PageError';
import { NothingHere } from '../NothingHere';

interface Props {
  passageId: string;
}

export const PublicAnnotations: React.FC<Props> = ({ passageId }) => {
  const { data, loading, error } = usePublicAnnotationsQuery({
    variables: {
      verseId: passageId,
    },
  });

  const renderAnnotations = () => {
    if (loading) {
      return new Array(3).fill(null).map((_item, index) => (
        <Box key={`loading-annotation-${index}`}>
          <Annotation />
        </Box>
      ));
    }

    const annotations = data?.annotations
      ? extractNodes<PublicAnnotationFragment>(data.annotations.edges)
      : [];

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
    </Flex>
  );
};
