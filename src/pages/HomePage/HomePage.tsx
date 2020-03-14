import React from 'react';
import { Page } from '../../components/Page';
import { useAuth } from '../../components/AuthProvider';
import { LoginBanner } from '../../components/LoginBanner';

export const HomePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Page>
      {!user && <LoginBanner message="Sign in to join the discussion." />}
      {user && (
        <button onClick={() => logout()} type="button">
          Logout
        </button>
      )}
      Home page
    </Page>
  );
};
