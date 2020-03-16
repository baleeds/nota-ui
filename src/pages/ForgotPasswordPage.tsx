import React, { useState, useEffect } from 'react';
import { OutlineButtonLarge } from '../components/Buttons';
import { AuthPage } from '../components/AuthPage';
import { PrimaryButtonLarge } from '../components/Buttons';
import { Link } from '../components/Link';
import { FormGroup } from '../components/FormGroup';
import { useForm } from 'react-hook-form';
import {
  useSendResetPasswordMutation,
  SignInUserMutation,
  SendResetPasswordMutation,
} from '../api/__generated__/apollo-graphql';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router';
import { FormErrorDisplay } from '../components/FormErrorDisplay';

interface Values {
  email: string;
}

export const ForgotPasswordPage: React.FC = () => {
  const history = useHistory();
  const [baseError, setBaseError] = useState('');
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const [sendResetPasswordMutation] = useSendResetPasswordMutation();
  const { register, handleSubmit, errors, formState } = useForm<Values>();

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
  }, []);

  const handleSendLink = async (values: Values) => {
    const [failure, result] = await attempt(
      sendResetPasswordMutation({
        variables: {
          input: { email: values.email },
        },
      })
    );

    const { hasError, base } = normalizeErrors<
      SendResetPasswordMutation,
      Values
    >(failure, result);

    const { success } = result?.data?.sendResetPassword || {};

    if (hasError || !success) {
      setBaseError(base || UNKNOWN_ERROR);
    } else {
      setSuccess(true);
    }
  };

  return (
    <AuthPage>
      <form onSubmit={handleSubmit(handleSendLink)} noValidate>
        <FormErrorDisplay possibleErrors={[baseError, errors.email?.message]} />
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
