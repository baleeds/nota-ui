import gql from 'graphql-tag';

export const signOutMutation = gql`
  mutation SignOut($refreshToken: String!) {
    signOut(refreshToken: $refreshToken) {
      result
      messages {
        field
        message
      }
    }
  }
`;
