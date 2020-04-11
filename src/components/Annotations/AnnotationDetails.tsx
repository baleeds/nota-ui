import React from 'react';
import { useAnnotationQuery } from '../../api/__generated__/apollo-graphql';
import { PageError } from '../PageError';
import { Flex } from '../layout/Flex';
import { AnnotationHeader } from './AnnotationHeader';
import { ArticleTypography } from '../Typography';
import Skeleton from 'react-loading-skeleton';

interface Props {
  annotationId: string;
}

export const AnnotationDetails: React.FC<Props> = ({ annotationId }) => {
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
      <AnnotationHeader annotation={annotation} />
      {annotation ? (
        <ArticleTypography
          dangerouslySetInnerHTML={{ __html: annotation.text }}
        />
      ) : (
        <ArticleTypography>
          <p>
            <Skeleton count={5} />
          </p>
        </ArticleTypography>
      )}
    </Flex>
  );
};
