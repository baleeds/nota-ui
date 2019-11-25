import React from 'react';
import { Page } from '../components/Page';
import { BookNavigation } from '../components/BookNavigation';
import { Passage } from '../components/Passage';
import styled from 'styled-components';

export const ReadPage: React.FC = () => {
  return (
    <Page>
      <Center>
        <BookNavigation />
        <Passage />
      </Center>
    </Page>
  );
};

const Center = styled.div`
  @media screen and (min-width: 900px) {
    margin: 0 auto;
  }
`;
