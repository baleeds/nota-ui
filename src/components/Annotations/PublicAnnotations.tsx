import React from 'react';
import {
  usePublicAnnotationsQuery,
  PublicAnnotationFragment,
} from '../../api/__generated__/apollo-graphql';
import { Annotation } from './Annotation';
import { extractNodes } from '../../base/utils/extractNodes';
import { Flex } from '../Flex';
import { Box } from '../Box';

interface Props {
  passageId: string;
}

export const PublicAnnotations: React.FC<Props> = ({ passageId }) => {
  const { data, loading, error } = usePublicAnnotationsQuery({
    variables: {
      verseId: passageId,
    },
  });

  if (loading && !data) {
    return <>Loading</>;
  }

  // const annotations =
  //   data && data.annotations? data.annotations : [];
  const annotations = data?.annotations
    ? extractNodes<PublicAnnotationFragment>(data.annotations.edges)
    : [];

  if (error || !annotations) {
    return <>Error</>;
  }

  return (
    <Flex column gutter={24}>
      {annotations.length === 0
        ? 'No public annotations'
        : annotations.map(annotation => (
            <Box key={annotation.id}>
              <Annotation annotation={annotation} />
            </Box>
          ))}
    </Flex>
  );
};
