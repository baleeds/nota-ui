import { DataProxy } from 'apollo-cache';
import { AnnotationQuery } from '../../api/__generated__/apollo-graphql';
import { annotationFragment } from '../../api/fragments/annotation.fragment';
import { ApolloFragment, ApolloFragmentArgs } from './apolloFragment';

export function updateCachedItem<TFragment>(
  patch: Partial<TFragment>,
  fragmentArgs: ApolloFragmentArgs
) {
  const fragmentIO = new ApolloFragment<TFragment>(fragmentArgs);

  const item = fragmentIO.read();
  if (!item) return;

  const updatedItem = { ...item, ...patch };
  fragmentIO.write(updatedItem);
}

export function updateCachedAnnotation(
  proxy: DataProxy,
  id: string,
  patch: Partial<AnnotationQuery['annotation']>
) {
  updateCachedItem(patch, {
    id,
    proxy,
    fragment: annotationFragment,
    fragmentName: 'Annotation',
  });
}
