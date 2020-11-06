import React from 'react';
import styled from 'styled-components';
import { AnnotationFragment } from '../../api/__generated__/apollo-graphql';
import { theme } from '../../styles/theme';

interface Props {
  annotation?: Pick<AnnotationFragment, 'id' | 'numberOfFavorites'>;
}

export const AnnotationActivitySummary: React.FC<Props> = ({ annotation }) => {
  const renderFavoritesText = (numberOfFavorites: number) => {
    if (numberOfFavorites === 0) return 'no favorites';
    if (numberOfFavorites === 1) return '1 favorite';
    return `${numberOfFavorites} favorites`;
  }

  return (
    <Container>
      {annotation && renderFavoritesText(annotation.numberOfFavorites)}
    </Container>
  );
};

const Container = styled.div`
  height: 20px;
  margin-top: 8px;
  font-size: 0.8rem;
  color: ${theme.lightTextColor};
`;