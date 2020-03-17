import React from 'react';
import { Navbar } from './Navbar';
import styled from 'styled-components';

export const Page: React.FC = ({ children }) => {
  return (
    <Container id="PageContainer">
      <Navbar />
      <BodyContainer>{children}</BodyContainer>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 0 80px 0;

  @media screen and (min-width: 900px) {
    display: flex;
    width: 100%;
    padding: 80px 0 0 0;
  }
`;

const BodyContainer = styled.div`
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
`;
