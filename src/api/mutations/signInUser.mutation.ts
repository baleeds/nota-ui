import gql from 'graphql-tag';
import { meFragment } from '../fragments/me.fragment';

export const signInUserMutation = gql`
  mutation SignInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
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
