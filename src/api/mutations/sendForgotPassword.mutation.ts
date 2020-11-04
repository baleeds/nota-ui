import gql from 'graphql-tag';

export const sendForgotPasswordMutation = gql`
  mutation SendForgotPassword($input: SendForgotPasswordInput!) {
    sendForgotPassword(input: $input) {
      successful
      messages {
        field
        message
      }
    }
  }
`;
