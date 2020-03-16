import gql from 'graphql-tag';

export const sendResetPasswordMutation = gql`
  mutation SendResetPassword($input: SendResetPasswordInput!) {
    sendResetPassword(input: $input) {
      success
    }
  }
`;
