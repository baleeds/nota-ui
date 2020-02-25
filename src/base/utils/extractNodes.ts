import Maybe from 'graphql/tsutils/Maybe';

export function extractNodes<TFragment>(
  edges: Maybe<Array<Maybe<{ node: Maybe<TFragment> }>>>
) {
  if (!edges) return [];

  return edges.reduce<TFragment[]>((acc, edge) => {
    if (edge?.node) {
      acc.push(edge.node);
    }
    return acc;
  }, []);
}
