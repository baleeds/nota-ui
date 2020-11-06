import gql from 'graphql-tag';

export const createAccountMutation = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      result {
        id
      }
      messages {
        field
        message
      }
      successful
    }
  }
`;
