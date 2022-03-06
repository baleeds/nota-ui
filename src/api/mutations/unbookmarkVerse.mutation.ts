import gql from 'graphql-tag';

export const unbookmarkVerseMutation = gql`
  mutation UnbookmarkVerse($input: UnbookmarkVerseInput!) {
    unbookmarkVerse(input: $input) {
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
