import gql from 'graphql-tag';

export const publicAnnotationFragment = gql`
  fragment PublicAnnotation on Annotation {
    id
    text
    verseId
    insertedAt
    user {
      id
      firstName
      lastName
    }
  }
`;
