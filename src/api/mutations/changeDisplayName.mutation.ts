import gql from 'graphql-tag';
import { meFragment } from '../fragments/me.fragment';

export const changeDisplayNameMutation = gql`
  mutation ChangeDisplayName($input: ChangeDisplayNameInput!) {
    changeDisplayName(input: $input) {
      successful
      result {
        ...Me
      }
    }
  }
  ${meFragment}
`;
