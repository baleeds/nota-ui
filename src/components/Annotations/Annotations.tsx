import React from 'react';
// import { Separator } from '../Separator';
import { PublicAnnotations } from './PublicAnnotations';

interface Props {
  passageId: string | undefined;
}

export const Annotations: React.FC<Props> = ({ passageId }) => {
  if (!passageId) {
    return null;
  }
  const handleAnnotationClick = (annotationId: string) => {
    console.log('open', annotationId);
  };

  return (
    <>
      {/* <PrivateAnnotations /> */}
      {/* <Separator /> */}
      <PublicAnnotations passageId={passageId} />
    </>
  );
};
