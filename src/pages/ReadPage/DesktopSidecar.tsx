import React, { useMemo } from 'react';
import styled from 'styled-components';
import { usePassage } from '../../hooks/usePassage';
import { Block } from '../../components/Block';
import { H3 } from '../../components/Typography';
import { VerseDetailsContent } from './VerseDetailsContent';

interface Props {
  passageKey: string;
}

export const DesktopSidecar: React.FC<Props> = ({ passageKey }) => {
  const { verseNumber, fullName } = usePassage();
  const top = useMemo(() => window.scrollY, [passageKey]); // eslint-disable-line

  if (!verseNumber || !fullName) {
    return null;
  }

  return (
    <Container style={{ transform: `translateY(${top}px)` }}>
      <Block>
        <TopContainer>
          <H3>{fullName}</H3>
        </TopContainer>
      </Block>
      <VerseDetailsContent />
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  transition: transform 0.1s ease-in-out;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`;
