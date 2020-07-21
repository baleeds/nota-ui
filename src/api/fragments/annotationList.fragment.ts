import gql from 'graphql-tag';

export const annotationListFragment = gql`
  fragment AnnotationList on Annotation {
    id
    text
    createdAt
    favorited
    user {
      id
      username
      displayName
    }
  }
`;
