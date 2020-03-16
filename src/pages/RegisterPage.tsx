import React, { useState } from 'react';
import { OutlineButtonLarge } from '../components/Buttons';
import { AuthPage } from '../components/AuthPage';
import { PrimaryButtonLarge } from '../components/Buttons';
import { Link } from '../components/Link';
import { FormGroup } from '../components/FormGroup';
import { useForm } from 'react-hook-form';
import {
  useSignInUserMutation,
  SignInUserMutation,
} from '../api/__generated__/apollo-graphql';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router';

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [status, setStatus] = useState('');
  const [signInUserMutation] = useSignInUserMutation();
  const { login } = useAuth();
  const { register, handleSubmit, errors, formState } = useForm<Values>();

  const handleLogin = async (values: Values) => {
    const [failure, result] = await attempt(
      signInUserMutation({
        variables: {
          input: { email: values.email, password: values.password },
        },
      })
    );

    const { hasError, base } = normalizeErrors<SignInUserMutation, Values>(
      failure,
      result
    );

    const {
      accessToken = undefined,
      refreshToken = undefined,
      user = undefined,
    } = result?.data?.signInUser || {};

    if (hasError || !accessToken || !refreshToken || !user) {
      setStatus(base || UNKNOWN_ERROR);
    } else {
      login({ accessToken, refreshToken, user });
      history.push('/home');
    }
  };

  return (
    <AuthPage
      footerMessage="Just getting started?"
      FooterButton={
        <OutlineButtonLarge
          key="create-account-button"
          type="button"
          onClick={() => history.push('/register')}
        >
          Create an account
        </OutlineButtonLarge>
      }
    >
      <form onSubmit={handleSubmit(handleLogin)} noValidate>
        {status && <div>{status}</div>}
        {errors.email && <div>Invalid email address</div>}
        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            ref={register({
              required: true,
              pattern: /@/,
            })}
            autoFocus
            required
          />
        </FormGroup>
        <FormGroup>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true })}
          />
        </FormGroup>
        <div style={{ marginTop: 40 }}>
          <PrimaryButtonLarge
            disabled={formState.isSubmitting}
            type="submit"
            onClick={console.log}
          >
            Sign in
          </PrimaryButtonLarge>
          <Link
            to="/forgot-password"
            style={{ display: 'block', textAlign: 'center', marginTop: 20 }}
          >
            Forgot password?
          </Link>
        </div>
      </form>
    </AuthPage>
  );
};
