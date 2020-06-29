import gql from 'graphql-tag';

export const annotationFragment = gql`
  fragment Annotation on Annotation {
    id
    text
    favorited
    createdAt
    user {
      id
      displayName
      username
    }
  }
`;
