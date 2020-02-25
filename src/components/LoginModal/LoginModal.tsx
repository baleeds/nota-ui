import React, { useState, useReducer } from 'react';
import {
  useSignInUserMutation,
  SignInUserMutation,
} from '../../api/__generated__/apollo-graphql';
import { attempt } from '../../base/utils/attempt';
import { normalize } from 'path';
import { normalizeErrors } from '../../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../../base/constants/messages';
import { useAuth } from '../AuthProvider';

interface State {
  email: string;
  password: string;
  error: string;
}

type Action =
  | { type: 'SET_EMAIL'; value: string }
  | { type: 'SET_PASSWORD'; value: string }
  | { type: 'SET_ERROR'; value: string }
  | { type: 'VALIDATE' };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        error: '',
        email: action.value,
      };
    case 'SET_PASSWORD':
      return {
        ...state,
        error: '',
        password: action.value,
      };
    case 'VALIDATE':
      const { email, password } = state;
      let error = '';
      if (!email.length || !email.indexOf('@')) {
        error = 'Please enter a valid email';
      } else if (!password.length) {
        error = 'Please enter a password';
      }
      return {
        ...state,
        error,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.value,
      };
    default:
      return state;
  }
};

export const LoginModal: React.FC = () => {
  const { login } = useAuth();
  const [signInUser] = useSignInUserMutation();
  const [{ email, password, error }, dispatch] = useReducer(reducer, {
    email: '',
    password: '',
    error: '',
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'SET_EMAIL', value: e.target.value });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    dispatch({ type: 'SET_PASSWORD', value: e.target.value });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch({ type: 'VALIDATE' });

    if (error) return;

    const [failure, result] = await attempt(
      signInUser({
        variables: {
          input: {
            email,
            password,
          },
        },
      })
    );

    const { user, accessToken, refreshToken } = result?.data?.signInUser || {};
    const { hasError, base } = normalizeErrors<SignInUserMutation>(
      failure,
      result
    );

    if (hasError || !user || !accessToken || !refreshToken) {
      dispatch({ type: 'SET_ERROR', value: base || UNKNOWN_ERROR });
      return;
    }

    login({ user, accessToken, refreshToken });
  };

  return (
    <div>
      <h1>Login</h1>
      {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
