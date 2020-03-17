import gql from 'graphql-tag';
import { meFragment } from '../fragments/me.fragment';

export const resetPasswordMutation = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      accessToken
      refreshToken
      user {
        ...Me
      }
      errors {
        field
        message
      }
    }
  }
  ${meFragment}
`;