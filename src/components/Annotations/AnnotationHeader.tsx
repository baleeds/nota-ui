import React from 'react';
import { Flex } from '../layout/Flex';
import { AnnotationFragment } from '../../api/__generated__/apollo-graphql';
import { toSimpleDate } from '../../base/utils/dates';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { AnnotationFavoriteButton } from './AnnotationFavoriteButton';
import { getUserDisplayName } from '../../base/utils/formatters';

interface Props {
  annotation?: Pick<
    AnnotationFragment,
    'id' | 'user' | 'insertedAt' | 'isFavorite'
  >;
}

export const AnnotationHeader: React.FC<Props> = ({ annotation }) => {
  return (
    <Flex margin={{ b: 8 }} alignItems="center">
      <AnnotationFavoriteButton annotation={annotation} />
      <AuthorLink href="/">
        {getUserDisplayName(annotation?.user) || <Skeleton width={120} />}
      </AuthorLink>
      {annotation && <Date>{toSimpleDate(annotation?.insertedAt)}</Date>}
    </Flex>
  );
};

const AuthorLink = styled.a`
  color: ${theme.secondaryColor};
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
`;

const Date = styled.div`
  margin-left: 12px;
  font-size: 0.8rem;
  color: ${theme.lightTextColor};
`;
