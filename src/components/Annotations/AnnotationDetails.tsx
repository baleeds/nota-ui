import React from 'react';
import { useAnnotationQuery } from '../../api/__generated__/apollo-graphql';
import { PageError } from '../PageError';
import { Annotation } from './Annotation';
import { usePassage } from '../../hooks/usePassage';
import { Flex } from '../layout/Flex';

interface Props {
  annotationId: string;
}

export const AnnotationDetails: React.FC<Props> = ({ annotationId }) => {
  const { bookName, chapterNumber, verseNumber } = usePassage();
  const { data, loading, error } = useAnnotationQuery({
    variables: {
      annotationId,
    },
  });

  const annotation = data?.annotation;

  if (error || (!loading && !annotation)) {
    return <PageError />;
  }

  return (
    <Flex column>
      <Annotation
        annotation={annotation}
        versePath={`/read/${bookName}/${chapterNumber}/${verseNumber}`}
      />
    </Flex>
  );
};
