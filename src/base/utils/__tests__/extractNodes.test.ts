import { extractNodes } from '../extractNodes';

test('extractNodes removes nodes', () => {
  const edges = [
    {
      node: { __typename: 'Article', id: 'abc', title: '123' },
    },
    {
      node: { __typename: 'Article', id: 'def', title: '456' },
    },
    {
      node: { __typename: 'Article', id: 'ghi', title: '789' },
    },
  ];

  const newArray = extractNodes(edges);

  expect(newArray).toMatchObject([
    { __typename: 'Article', id: 'abc', title: '123' },
    { __typename: 'Article', id: 'def', title: '456' },
    { __typename: 'Article', id: 'ghi', title: '789' },
  ]);
});

test('extractNodes removes null values', () => {
  const edges = [
    {
      node: { __typename: 'Article', id: 'abc', title: '123' },
    },
    null,
    {
      node: null,
    },
  ];

  const newArray = extractNodes(edges);

  expect(newArray).toMatchObject([
    { __typename: 'Article', id: 'abc', title: '123' },
  ]);
});

test('extractNodes handles undefined argument', () => {
  const newArray = extractNodes(undefined);
  expect(newArray).toMatchObject([]);
});

test('extractNodes handles null argument', () => {
  const newArray = extractNodes(null);
  expect(newArray).toMatchObject([]);
});
