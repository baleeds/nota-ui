import React, { useState, useMemo, useEffect } from 'react';
import { Formik, FormikConfig, Field } from 'formik';
import * as Yup from 'yup';
import { attempt } from '../base/utils/attempt';
import queryString from 'query-string';
import {
  useResetPasswordMutation,
  ResetPasswordMutation,
} from '../api/__generated__/apollo-graphql';
import { useHistory } from 'react-router';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { LoginPayload, useAuth } from '../components/AuthProvider';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { AuthPage } from '../components/AuthPage';
import { FormErrorDisplay } from '../components/FormErrorDisplay';
import { FieldGroup } from '../components/FieldGroup';
import { PrimaryButtonLarge } from '../components/Buttons';
import { isRequired } from '../base/utils/errorMessages';
import { P } from '../components/Typography';

interface Values {
  password: string;
  confirmPassword: string;
}

const getToken = (search: string) => {
  const parsed = queryString.parse(search);
  return parsed.token;
};

const isTokenValid = (token: ReturnType<typeof getToken>) =>
  typeof token === 'string' && token !== '';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Passwords must be at least 8 characters')
    .required(isRequired('Password')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords should match')
    .required(isRequired('Password confirmation')),
});

const initialValues = {
  password: '',
  confirmPassword: '',
};

export const ResetPasswordPage: React.FC = () => {
  const [resetPassword] = useResetPasswordMutation();
  const [loginPayload, setLoginPayload] = useState<LoginPayload | undefined>();
  const { login, user } = useAuth();
  const history = useHistory();

  const token = useMemo(() => getToken(history.location.search), [history]);

  useEffect(() => {
    if (!isTokenValid(token) || user) {
      history.push('/forgot-password');
    }
  }, [token, user, history]);

  const handleResetPassword: FormikConfig<Values>['onSubmit'] = async (
    values,
    { setErrors, setStatus, setSubmitting }
  ) => {
    if (!isTokenValid(token)) {
      history.push('/forgot-password');
      return;
    }

    const [failure, result] = await attempt(
      resetPassword({
        variables: {
          input: {
            password: values.password,
            resetPasswordToken: token as string,
          },
        },
      })
    );

    const { hasError, base, fields } = normalizeErrors<
      ResetPasswordMutation,
      Values
    >(failure, result);

    const {
      accessToken = undefined,
      refreshToken = undefined,
      user = undefined,
    } = result?.data?.resetPassword || {};

    if (hasError || !accessToken || !refreshToken || !user) {
      if (fields) {
        setErrors(fields);
      } else {
        setStatus(base || UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    setLoginPayload({
      accessToken,
      refreshToken,
      user,
    });
  };

  const handleLogin = () => {
    if (!loginPayload) {
      history.push('/login');
    } else {
      login(loginPayload);
      history.push('/home');
    }
  };

  const SuccessMessage = () => (
    <div>
      <P style={{ marginBottom: 16 }}>
        Your password has been successfully reset!
      </P>
      <PrimaryButtonLarge onClick={handleLogin} type="button">
        Continue
      </PrimaryButtonLarge>
    </div>
  );

  return (
    <AuthPage>
      {loginPayload ? (
        <SuccessMessage />
      ) : (
        <Formik<Values>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleResetPassword}
        >
          {({ handleSubmit, isSubmitting, status, submitCount, errors }) => (
            <form onSubmit={handleSubmit}>
              <FormErrorDisplay
                possibleErrors={[
                  errors.password,
                  errors.confirmPassword,
                  status,
                ]}
                submitCount={submitCount}
              />
              <FieldGroup>
                <label htmlFor="password">Password</label>
                <Field type="password" name="password" autoFocus />
              </FieldGroup>
              <FieldGroup>
                <label htmlFor="confirmPassword">Confirm password</label>
                <Field type="password" name="confirmPassword" />
              </FieldGroup>
              <PrimaryButtonLarge type="submit" disabled={isSubmitting}>
                Set new password
              </PrimaryButtonLarge>
            </form>
          )}
        </Formik>
      )}
    </AuthPage>
  );
};
