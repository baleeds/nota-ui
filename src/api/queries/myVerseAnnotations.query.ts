import gql from 'graphql-tag';
import { annotationListFragment } from '../fragments/annotationList.fragment';

export const myVerseAnnotationsQuery = gql`
  query MyVerseAnnotations($verseId: ID!) {
    myAnnotations(verseId: $verseId, first: 100) {
      edges {
        node {
          ...AnnotationList
        }
      }
    }
  }
  ${annotationListFragment}
`;
