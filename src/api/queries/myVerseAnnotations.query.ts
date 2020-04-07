import gql from 'graphql-tag';
import { annotationListFragment } from '../fragments/annotationList.fragment';

export const myVerseAnnotationsQuery = gql`
  query MyVerseAnnotations($verseId: ID!, $userId: ID!) {
    myAnnotations: annotations(userId: $userId, verseId: $verseId) {
      edges {
        node {
          ...AnnotationList
        }
      }
    }
  }
  ${annotationListFragment}
`;
