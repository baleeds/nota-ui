import React from 'react';
import { Flex } from '../layout/Flex';
import { AnnotationFragment } from '../../api/__generated__/apollo-graphql';
import { toSimpleDate } from '../../base/utils/dates';
import Skeleton from 'react-loading-skeleton';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

interface Props {
  annotation?: Pick<AnnotationFragment, 'user' | 'createdAt'>;
}

export const AnnotationHeader: React.FC<Props> = ({ annotation }) => {
  return (
    <Flex margin={{ b: 8 }} alignItems="center">
      <AuthorLink href="/">
        {annotation?.user.displayName || <Skeleton width={120} />}
      </AuthorLink>
      {annotation && <Date>{toSimpleDate(annotation?.createdAt)}</Date>}
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
