import * as Yup from 'yup';
import * as ErrorMessages from '../../base/utils/errorMessages';
import React from 'react';
import { PageOnCard } from '../../components/PageOnCard';
import {
  ChangePasswordMutation,
  useChangePasswordMutation,
} from '../../api/__generated__/apollo-graphql';
import { Field, Formik, FormikConfig } from 'formik';
import { attempt } from '../../base/utils/attempt';
import { normalizeErrors } from '../../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../../base/constants/messages';
import { toast } from '../../components/Toast';
import { useHistory } from 'react-router';
import { FormErrorDisplay } from '../../components/FormErrorDisplay';
import { FieldGroup } from '../../components/FieldGroup';
import { PrimaryButtonLarge } from '../../components/Buttons';

interface Values {
  oldPassword: string;
  newPassword: string;
}

const initialValues: Values = {
  oldPassword: '',
  newPassword: '',
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(1, ErrorMessages.minLength('current password', 1))
    .max(255, ErrorMessages.maxLength('current password', 255))
    .required(ErrorMessages.isRequired('password')),
  newPassword: Yup.string()
    .min(1, ErrorMessages.minLength('new password', 1))
    .max(255, ErrorMessages.maxLength('new password', 255))
    .required(ErrorMessages.isRequired('new password')),
});

export const SettingsPassword: React.FC = () => {
  const [changePassword] = useChangePasswordMutation();
  const history = useHistory();

  const handleSubmit: FormikConfig<Values>['onSubmit'] = async (
    values,
    { setSubmitting, setStatus, setErrors }
  ) => {
    const [failure, result] = await attempt(
      changePassword({
        variables: {
          input: values,
        },
      })
    );

    const { hasError, base, fields } = normalizeErrors<
      ChangePasswordMutation,
      Values
    >(failure, result);

    if (hasError) {
      if (fields) {
        setErrors(fields);
      } else {
        setStatus(base || UNKNOWN_ERROR);
      }

      setSubmitting(false);
      return;
    }

    toast({ message: 'Password updated' });
    history.push('/settings');
  };

  return (
    <PageOnCard
      backTo="/settings"
      title="Change Password"
      bodyPadding={{
        desktop: { all: 24 },
        mobile: { all: 24 },
      }}
    >
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ handleSubmit, isSubmitting, errors, status, submitCount }) => (
          <form onSubmit={handleSubmit} noValidate>
            <FormErrorDisplay
              possibleErrors={[errors.newPassword, errors.oldPassword, status]}
              submitCount={submitCount}
            />
            <FieldGroup>
              <label htmlFor="oldPassword">Current Password</label>
              <Field type="password" name="oldPassword" autoFocus required />
            </FieldGroup>
            <FieldGroup>
              <label htmlFor="newPassword">New Password</label>
              <Field type="password" name="newPassword" required />
            </FieldGroup>

            <div style={{ marginTop: 40 }}>
              <PrimaryButtonLarge
                disabled={isSubmitting}
                type="submit"
                style={{ width: '100%' }}
              >
                Change Password
              </PrimaryButtonLarge>
            </div>
          </form>
        )}
      </Formik>
    </PageOnCard>
  );
};
