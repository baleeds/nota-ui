import gql from 'graphql-tag';

export const verseFragment = gql`
  fragment Verse on Verse {
    id
    isBookmarked
    isAnnotatedByMe
    isAnnotated
  }
`;
