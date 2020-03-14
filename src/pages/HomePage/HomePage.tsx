import React from 'react';
import { Page } from '../../components/Page';
import { LoginModal } from '../../components/LoginModal';
import { useAuth } from '../../components/AuthProvider';
import { LoginBanner } from '../../components/LoginBanner';

export const HomePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Page>
      {!user && <LoginBanner message="Sign in to join the discussion." />}
      Home page
      <LoginModal />
    </Page>
  );
};
