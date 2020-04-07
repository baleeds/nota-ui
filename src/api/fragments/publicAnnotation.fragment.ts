import gql from 'graphql-tag';

export const publicAnnotationFragment = gql`
  fragment PublicAnnotation on Annotation {
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
