import gql from 'graphql-tag';

export const saveAnnotationMutation = gql`
  mutation SaveAnnotation($input: SaveAnnotationInput!) {
    saveAnnotation(input: $input) {
      result {
        id
      }
      messages {
        field
        message
      }
      successful
    }
  }
`;
