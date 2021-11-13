import gql from 'graphql-tag';

export const bookmarkVerseMutation = gql`
  mutation BookmarkVerse($input: BookmarkVerseInput!) {
    bookmarkVerse(input: $input) {
      successful
      result {
        id
        isBookmarked
      }
      messages {
        field
        message
      }
    }
  }
`;
