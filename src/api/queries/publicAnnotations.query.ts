import gql from 'graphql-tag';
import { publicAnnotationFragment } from '../fragments/publicAnnotation.fragment';

export const publicAnnotationsQuery = gql`
  query PublicAnnotations($first: Int, $verseId: ID!) {
    annotations(first: $first, verseId: $verseId) {
      edges {
        node {
          ...PublicAnnotation
        }
      }
    }
  }
  ${publicAnnotationFragment}
`;
