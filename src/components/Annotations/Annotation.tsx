import React from 'react';
import { PublicAnnotationFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';

interface Props {
  annotation: PublicAnnotationFragment;
}

export const Annotation: React.FC<Props> = ({ annotation }) => {
  return <Container>{annotation.text}</Container>;
};

const Container = styled.div`
  margin-bottom: 8px;
`;
