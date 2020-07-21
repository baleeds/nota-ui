import gql from 'graphql-tag';

export const favoriteAnnotationMutation = gql`
  mutation FavoriteAnnotation($input: FavoriteAnnotationInput!) {
    favoriteAnnotation(input: $input) {
      success
      errors {
        field
        message
      }
    }
  }
`;