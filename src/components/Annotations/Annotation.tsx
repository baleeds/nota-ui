import React from 'react';
import { PublicAnnotationFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';
import { toSimpleDate } from '../../base/utils/dates';
import { theme } from '../../styles/theme';
import { Flex } from '../Flex';
import Skeleton from 'react-loading-skeleton';

interface Props {
  annotation?: PublicAnnotationFragment;
}

export const Annotation: React.FC<Props> = ({ annotation }) => {
  return (
    <div>
      <Flex margin={{ b: 8 }} alignItems="center">
        <AuthorLink href="/">
          {/* {annotation.user.firstName} {annotation.user.lastName} */}
          {annotation?.user.email || <Skeleton width={120} />}
        </AuthorLink>
        {annotation && <Date>{toSimpleDate(annotation?.createdAt)}</Date>}
      </Flex>
      {annotation?.text ? (
        <TextContainer dangerouslySetInnerHTML={{ __html: annotation.text }} />
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
  text-decoration: none;
`;

const Date = styled.div`
  margin-top: 2px;
  margin-left: 12px;
  font-size: 0.8em;
  color: ${theme.lightTextColor};
`;

const TextContainer = styled.div`
  color: ${theme.primaryTextColor};
  font-size: 0.9em;
  line-height: 1.3;
`;
