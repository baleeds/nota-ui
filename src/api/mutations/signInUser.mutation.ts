import gql from 'graphql-tag';
import { meFragment } from '../fragments/me.fragment';

export const signInMutation = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      result {
        accessToken
        refreshToken
        user {
          ...Me
        }
      }
      messages {
        field
        message
      }
    }
  }
  ${meFragment}
`;
