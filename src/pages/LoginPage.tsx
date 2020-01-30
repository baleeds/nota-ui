import React from 'react';
import { useLocation, Redirect } from 'react-router';
import qs from 'query-string';
import {
  ACCESS_TOKEN_KEY,
  USER_ID_KEY,
} from '../base/constants/localStorageKeys';

export const LoginPage: React.FC = () => {
  const location = useLocation();

  const query = qs.parse(location.search);
  console.log(query);
  const { authorization, userId } = query;

  if (authorization && userId) {
    localStorage.setItem(ACCESS_TOKEN_KEY, `Bearer ${authorization}`);
    localStorage.setItem(USER_ID_KEY, `${userId}`);
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <a href="http://localhost:4007/auth/google">Login</a>
    </div>
  );
};
