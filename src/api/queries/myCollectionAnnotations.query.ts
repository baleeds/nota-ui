import gql from 'graphql-tag';
import { annotationListFragment } from '../fragments/annotationList.fragment';

export const myCollectionAnnotationsQuery = gql`
  query MyCollectionAnnotations($first: Int!, $after: String) {
    myAnnotations(first: $first, after: $after) {
      edges {
        node {
          ...AnnotationList
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
  ${annotationListFragment}
`;
