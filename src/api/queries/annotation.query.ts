import gql from 'graphql-tag';
import { annotationFragment } from '../fragments/annotation.fragment';

export const annotationQuery = gql`
  query Annotation($annotationId: ID!) {
    annotation(id: $annotationId) {
      ...Annotation
    }
  }
  ${annotationFragment}
`;
