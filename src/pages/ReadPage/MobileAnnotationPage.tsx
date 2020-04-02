import React from 'react';

interface Props {
  annotationId: string;
}

export const MobileAnnotationPage: React.FC<Props> = ({ annotationId }) => {
  return <div>{annotationId}</div>;
};
