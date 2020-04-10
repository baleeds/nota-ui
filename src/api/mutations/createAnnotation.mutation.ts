import gql from 'graphql-tag';

export const createAnnotationMutation = gql`
  mutation CreateAnnotation($input: CreateAnnotationInput!) {
    createAnnotation(input: $input) {
      annotation {
        id
      }
      errors {
        field
        message
      }
    }
  }
`;