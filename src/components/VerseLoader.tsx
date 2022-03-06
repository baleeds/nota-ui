import React from 'react';
import {
  useGetVerseQuery,
  VerseFragment,
} from '../api/__generated__/apollo-graphql';

interface Props {
  verseId: string;
  children: ({ verse }: { verse: VerseFragment }) => JSX.Element;
}

export const VerseLoader: React.FC<Props> = ({ verseId, children }) => {
  const { data, loading } = useGetVerseQuery({
    variables: {
      id: verseId,
    },
  });

  if (loading || !data) return null;

  return children({ verse: data.verse });
};
