import gql from 'graphql-tag';

export const annotationFragment = gql`
  fragment Annotation on Annotation {
    id
    text
    isFavorite
    numberOfFavorites
    insertedAt
    user {
      id
      firstName
      lastName
    }
  }
`;
