import gql from 'graphql-tag';
import { publicAnnotationFragment } from '../fragments/publicAnnotation.fragment';

export const publicAnnotationsQuery = gql`
  query PublicAnnotations($first: Int, $after: String, $verseId: ID!) {
    annotations(first: $first, after: $after, verseId: $verseId) {
      edges {
        node {
          ...PublicAnnotation
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
    }
  }
  ${publicAnnotationFragment}
`;
