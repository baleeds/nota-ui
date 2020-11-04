import gql from 'graphql-tag';

export const unfavoriteAnnotationMutation = gql`
  mutation UnfavoriteAnnotation($input: UnfavoriteAnnotationInput!) {
    unfavoriteAnnotation(input: $input) {
      successful
      messages {
        field
        message
      }
    }
  }
`;
