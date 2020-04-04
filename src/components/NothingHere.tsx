import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

interface Props {}

export const NothingHere: React.FC<Props> = () => {
  return (
    <Container>
      <img src="/img/nothing-here.png" alt="Empty tomb" />
      There's nothing here.
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 48px;
  text-align: center;
  align-content: center;
  color: ${theme.lightTextColor};

  img {
    width: 80%;
    display: block;
    margin: 0 auto;
    margin-bottom: 24px;
    opacity: 0.8;
  }
`;
