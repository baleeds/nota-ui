import gql from 'graphql-tag';

export const annotationListFragment = gql`
  fragment AnnotationList on Annotation {
    id
    text
    insertedAt
    isFavorite
    user {
      id
      firstName
      lastName
    }
  }
`;
