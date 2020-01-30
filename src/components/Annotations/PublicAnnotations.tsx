import React from 'react';
import { usePublicAnnotationsQuery } from '../../api/__generated__/apollo-graphql';
import { Annotation } from './Annotation';

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

  const annotations =
    data && data.publicAnnotations ? data.publicAnnotations : [];

  if (error || !annotations) {
    return <>Error</>;
  }

  return (
    <>
      {annotations.length === 0
        ? 'No public annotations'
        : annotations.map(annotation => (
            <Annotation key={annotation.id} annotation={annotation} />
          ))}
    </>
  );
};
