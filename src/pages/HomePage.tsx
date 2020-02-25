import React from 'react';
import { Page } from '../components/Page';
import { LoginModal } from '../components/LoginModal';

export const HomePage: React.FC = () => {
  return (
    <Page>
      Home page
      <LoginModal />
    </Page>
  );
};
