import React from 'react';
import { Separator } from '../Separator';

interface Props {
  passageId: string;
}

export const Annotations: React.FC<Props> = ({ passageId }) => {
  const handleAnnotationClick = (annotationId: string) => {
    console.log('open', annotationId);
  };

  return (
    <>
      <PrivateAnnotations />
      <Separator />
      <PublicAnnotations />
    </>
  );
};
