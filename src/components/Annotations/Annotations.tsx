import React from 'react';
// import { Separator } from '../Separator';
import { PublicAnnotations } from './PublicAnnotations';
import styled from 'styled-components';

interface Props {
  passageId: string | undefined;
}

export const Annotations: React.FC<Props> = ({ passageId }) => {
  if (!passageId) {
    return null;
  }

  return (
    <Container>
      {/* <PrivateAnnotations /> */}
      {/* <Separator /> */}
      <PublicAnnotations passageId={passageId} />
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;
