import React from 'react';
import { Navbar } from './Navbar';
import styled from 'styled-components';

export const Page: React.FC = () => {
  return (
    <Container>
      <Navbar />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;

  @media screen and (min-width: 900px) {
    display: flex;
    width: 100%;
    height: 100%;
  }
`;
