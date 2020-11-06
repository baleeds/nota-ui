import { Field, Formik, FormikConfig } from 'formik';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { useCreateAccountMutation, CreateAccountMutation } from '../api/__generated__/apollo-graphql';
import * as Yup from 'yup';
import { isRequired, mustBeValid } from '../base/utils/errorMessages';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';
import { P } from '../components/Typography';
import { OutlineButtonLarge, PrimaryButtonLarge } from '../components/Buttons';
import { AuthPage } from '../components/AuthPage';
import { FormErrorDisplay } from '../components/FormErrorDisplay';
import { FieldGroup } from '../components/FieldGroup';
import * as ErrorMessages from '../base/utils/errorMessages';

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialValues: Values = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(ErrorMessages.isRequired("first name"))
    .min(1, ErrorMessages.minLength("first name", 1))
    .max(30, ErrorMessages.maxLength("first name", 30)),
  lastName: Yup.string()
    .required(ErrorMessages.isRequired("last name"))
    .min(1, ErrorMessages.minLength("last name", 1))
    .max(30, ErrorMessages.maxLength("first name", 30)),
  email: Yup.string()
    .required(isRequired('email'))
    .matches(/@/, mustBeValid('email')),
  password: Yup.string()
    .min(1, ErrorMessages.minLength("password", 1))
    .max(255, ErrorMessages.maxLength("password", 255))
    .required(isRequired('password')),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'passwords should match')
    .required(isRequired('password confirmation')),
})

export const RegisterPage: React.FC = () => {
  const history = useHistory();
  const [createAccountMutation] = useCreateAccountMutation();
  const [success, setSuccess] = useState(false);

  const handleCreate: FormikConfig<Values>['onSubmit'] = async (values, {setSubmitting, setStatus, setErrors }) => {
    const [failure, result] = await attempt(
      createAccountMutation({
        variables: {
          input: {
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
          }
        }
      })
    );

    const { hasError, base, fields } = normalizeErrors<CreateAccountMutation, Values>(failure, result)

    const { id } = result?.data?.createAccount?.result ?? {}

    if (hasError || !id) {
      if (fields) {
        setErrors(fields);
      } else {
        setStatus(base || UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    setSuccess(true);
  }

  const handleContinue = () => {
    history.push('/login');
  }

  if (success) {
    return (
    <AuthPage>
    <div>
      <P style={{ marginBottom: 16 }}>
        You have successfully created an account.
      </P>
      <PrimaryButtonLarge onClick={handleContinue} type="button">
        Continue to login
      </PrimaryButtonLarge>
    </div>
</AuthPage>
  );
    }
  
  return (
    <AuthPage
      footerMessage="Already have an account?"
      FooterButton={
        <OutlineButtonLarge
          key="sign-in-button"
          type="button"
          onClick={() => history.push('/login')}
        >
          Sign in
        </OutlineButtonLarge>
      }
    >
      <Formik onSubmit={handleCreate} initialValues={initialValues} validationSchema={validationSchema}>
        {({ handleSubmit, isSubmitting, errors, status, submitCount }) => (
          <form
            onSubmit={handleSubmit}
            noValidate
          >
            <FormErrorDisplay
              possibleErrors={[status]}
              submitCount={submitCount}
            />
            <FieldGroup formikFieldName="email">
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" autoFocus required />
            </FieldGroup>
            <FieldGroup formikFieldName="firstName">
              <label htmlFor="firstName">First name</label>
              <Field type="text" name="firstName" required />
            </FieldGroup>
            <FieldGroup formikFieldName="lastName">
              <label htmlFor="lastName">Last name</label>
              <Field type="text" name="lastName" required />
            </FieldGroup>
            <FieldGroup formikFieldName="password">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" required />
            </FieldGroup>
            <FieldGroup formikFieldName="confirmPassword">
              <label htmlFor="confirmPassword">Confirm password</label>
              <Field type="password" name="confirmPassword" required />
            </FieldGroup>
            <div style={{ marginTop: 40 }}>
              <PrimaryButtonLarge disabled={isSubmitting} type="submit">
                Create account
              </PrimaryButtonLarge>
            </div>
          </form>
        )}
      </Formik>
    </AuthPage>
  );
};