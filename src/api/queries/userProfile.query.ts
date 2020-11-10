import gql from 'graphql-tag';

export const userProfileQuery = gql`
  query UserProfile($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
    }
  }
`;
