import gql from 'graphql-tag';

export const changePasswordMutation = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      successful
      messages {
        field
        message
      }
    }
  }
`;
