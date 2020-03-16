import React from 'react';
import { OutlineButtonLarge } from '../components/Buttons';
import { AuthPage } from '../components/AuthPage';
import { PrimaryButtonLarge } from '../components/Buttons';
import { Link } from '../components/Link';
import { FieldGroup } from '../components/FieldGroup';
import {
  useSignInUserMutation,
  SignInUserMutation,
} from '../api/__generated__/apollo-graphql';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router';
import { FormErrorDisplay } from '../components/FormErrorDisplay';
import { Formik, FormikConfig, Field } from 'formik';
import * as Yup from 'yup';

interface Values {
  email: string;
  password: string;
}

const initialValues: Values = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const [signInUserMutation] = useSignInUserMutation();
  const { login } = useAuth();

  const handleLogin: FormikConfig<Values>['onSubmit'] = async (
    values,
    { setSubmitting, setStatus, setErrors }
  ) => {
    const [failure, result] = await attempt(
      signInUserMutation({
        variables: {
          input: { email: values.email, password: values.password },
        },
      })
    );

    const { hasError, base, fields } = normalizeErrors<
      SignInUserMutation,
      Values
    >(failure, result);

    const {
      accessToken = undefined,
      refreshToken = undefined,
      user = undefined,
    } = result?.data?.signInUser || {};

    if (hasError || !accessToken || !refreshToken || !user) {
      if (fields) {
        setErrors(fields);
      } else if (base) {
        setStatus(base);
      } else {
        setStatus(UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    login({ user, accessToken, refreshToken });
    history.push('/home');
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
      <Formik
        onSubmit={handleLogin}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, status }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormErrorDisplay
              possibleErrors={[status, errors.email, errors.password]}
            />
            <FieldGroup>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" autoFocus required />
            </FieldGroup>
            <FieldGroup>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
            </FieldGroup>
            <div style={{ marginTop: 40 }}>
              <PrimaryButtonLarge disabled={isSubmitting} type="submit">
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
        )}
      </Formik>
    </AuthPage>
  );
};
