import gql from 'graphql-tag';

export const meFragment = gql`
  fragment Me on User {
    id
    email
  }
`;
