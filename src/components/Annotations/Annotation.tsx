import React from 'react';
import { AnnotationListFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';
import { toSimpleDate } from '../../base/utils/dates';
import { theme } from '../../styles/theme';
import { Flex } from '../layout/Flex';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

interface Props {
  annotation?: AnnotationListFragment;
  versePath: string;
}

export const Annotation: React.FC<Props> = ({ annotation, versePath }) => {
  return (
    <div>
      <Flex margin={{ b: 8 }} alignItems="center">
        <AuthorLink href="/">
          {annotation?.user.displayName || <Skeleton width={120} />}
        </AuthorLink>
        {annotation && <Date>{toSimpleDate(annotation?.createdAt)}</Date>}
      </Flex>
      {annotation ? (
        <TextContainer>
          <TextLink to={`${versePath}/${annotation.id}`}>
            <p dangerouslySetInnerHTML={{ __html: annotation.text }} />
          </TextLink>
        </TextContainer>
      ) : (
        <TextContainer>
          <Skeleton count={3} />
        </TextContainer>
      )}
    </div>
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

const TextContainer = styled.div`
  color: ${theme.primaryTextColor};
  line-height: 1.3;
  font-size: 1rem;
`;

const TextLink = styled(Link)`
  color: ${theme.primaryTextColor};
  text-decoration: none;
`;
