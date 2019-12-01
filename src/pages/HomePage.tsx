import React from 'react';
import { Page } from '../components/Page';

export const HomePage: React.FC = () => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error('REACT_APP_API_URL is not set');
  }

  const loginUrl = process.env.REACT_APP_API_URL.replace(
    'graphql',
    'auth/google'
  );

  return (
    <Page>
      Home page
      <div>
        <a href={loginUrl}>Login</a>
      </div>
    </Page>
  );
};
