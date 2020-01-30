import gql from 'graphql-tag';
import { publicAnnotationFragment } from '../fragments/publicAnnotation.fragment';

export const publicAnnotationsQuery = gql`
  query PublicAnnotations($verseId: ID!) {
    publicAnnotations(verseId: $verseId) {
      ...PublicAnnotation
    }
  }
  ${publicAnnotationFragment}
`;
