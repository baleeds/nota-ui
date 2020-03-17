import React, { useState, useEffect } from 'react';
import { AuthPage } from '../../components/AuthPage';
import { PrimaryButtonLarge } from '../../components/Buttons';
import { Link } from '../../components/Link';
import { FieldGroup } from '../../components/FieldGroup';
import {
  useSendResetPasswordMutation,
  SendResetPasswordMutation,
} from '../../api/__generated__/apollo-graphql';
import { attempt } from '../../base/utils/attempt';
import { normalizeErrors } from '../../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../../base/constants/messages';
import { useAuth } from '../../components/AuthProvider';
import { useHistory } from 'react-router';
import { FormErrorDisplay } from '../../components/FormErrorDisplay';
import { Field, Formik, FormikConfig } from 'formik';
import * as Yup from 'yup';
import { isRequired, mustBeValid } from '../../base/utils/errorMessages';
import { SuccessMessage } from './SuccessMessage';

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
  const [sendResetPasswordMutation] = useSendResetPasswordMutation();

  useEffect(() => {
    if (user) {
      history.push('/home');
    }
  }, []);

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
      SendResetPasswordMutation,
      Values
    >(failure, result);

    const { success } = result?.data?.sendResetPassword || {};

    if (hasError || !success) {
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
