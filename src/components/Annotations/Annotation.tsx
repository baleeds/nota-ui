import React from 'react';
import { PublicAnnotationFragment } from '../../api/__generated__/apollo-graphql';
import styled from 'styled-components';
import { toSimpleDate } from '../../base/utils/dates';
import { theme } from '../../styles/theme';

interface Props {
  annotation: PublicAnnotationFragment;
}

export const Annotation: React.FC<Props> = ({ annotation }) => {
  return (
    <Container>
      <HeaderContainer>
        <a href="/">
          {annotation.user.firstName} {annotation.user.lastName}
        </a>
        <Date>{toSimpleDate(annotation.insertedAt)}</Date>
      </HeaderContainer>
      <TextContainer dangerouslySetInnerHTML={{ __html: annotation.text }} />
    </Container>
  );
};

const Container = styled.div`
  padding: 12px 24px;
`;

const HeaderContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  a {
    color: ${theme.secondaryColor};
    font-weight: 600;
    text-decoration: none;
  }
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
`;