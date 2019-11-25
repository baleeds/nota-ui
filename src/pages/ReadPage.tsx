import React from 'react';
import { Page } from '../components/Page';
import { BookNavigation } from '../components/BookNavigation';
import { Passage } from '../components/Passage';
import styled from 'styled-components';

export const ReadPage: React.FC = () => {
  return (
    <Page>
      <BookNavigation />
      <Passage />
    </Page>
  );
};
