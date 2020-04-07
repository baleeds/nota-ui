import gql from 'graphql-tag';

export const annotationListFragment = gql`
  fragment AnnotationList on Annotation {
    id
    text
    createdAt
    user {
      id
      username
      displayName
    }
  }
`;
