import React, { useState, useEffect } from 'react';
import { AuthPage } from '../components/AuthPage';
import { PrimaryButtonLarge } from '../components/Buttons';
import { Link } from '../components/Link';
import { FieldGroup } from '../components/FieldGroup';
import {
  useSendForgotPasswordMutation,
  SendForgotPasswordMutation,
} from '../api/__generated__/apollo-graphql';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { useAuth } from '../components/AuthProvider';
import { useHistory } from 'react-router';
import { FormErrorDisplay } from '../components/FormErrorDisplay';
import { Field, Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { isRequired, mustBeValid } from '../base/utils/errorMessages';
import { P } from '../components/Typography';

interface Values {
  email: string;
}

const initialValues: Values = {
  email: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required(isRequired('Email'))
    .matches(/@/, mustBeValid('Email')),
});

export const ForgotPasswordPage: React.FC = () => {
  const history = useHistory();
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();
  const [sendResetPasswordMutation] = useSendForgotPasswordMutation();

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
  }, [history, user]);

  const handleSendLink: FormikConfig<Values>['onSubmit'] = async (
    values: Values,
    { setStatus, setErrors, setSubmitting }
  ) => {
    const [failure, result] = await attempt(
      sendResetPasswordMutation({
        variables: {
          input: { email: values.email },
        },
      })
    );

    const { hasError, base, fields } = normalizeErrors<
      SendForgotPasswordMutation,
      Values
    >(failure, result);

    const { successful } = result?.data?.sendForgotPassword || {};

    if (hasError || !successful) {
      if (fields) {
        setErrors(fields);
      } else {
        setStatus(base || UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    setSuccess(true);
  };

  const SuccessMessage = () => (
    <P>
      Please check your email for a link to reset your password.{' '}
      <Link to="/login">Back to login</Link>
    </P>
  );

  return (
    <AuthPage>
      {success ? (
        <SuccessMessage />
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSendLink}
          validationSchema={validationSchema}
        >
          {({ handleSubmit, isSubmitting, status, errors, submitCount }) => (
            <form onSubmit={handleSubmit} noValidate>
              <FormErrorDisplay
                possibleErrors={[status, errors.email]}
                submitCount={submitCount}
              />
              <FieldGroup>
                <label htmlFor="email">Email</label>
                <Field type="email" name="email" autoFocus required />
              </FieldGroup>
              <div style={{ marginTop: 40 }}>
                <PrimaryButtonLarge disabled={isSubmitting} type="submit">
                  Send reset link
                </PrimaryButtonLarge>
                <Link
                  to="/login"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    marginTop: 20,
                  }}
                >
                  Back to login
                </Link>
              </div>
            </form>
          )}
        </Formik>
      )}
    </AuthPage>
  );
};
