import React from 'react';
import styled from 'styled-components';
import { usePassage } from '../../hooks/usePassage';
import { Block } from '../../components/Block';
import { H3 } from '../../components/Typography';
import { Separator } from '../../components/Separator';
import { OutlineButton } from '../../components/Buttons';
import { PublicAnnotations } from '../../components/Annotations/PublicAnnotations';

export const DesktopSidecar: React.FC = () => {
  const { verseNumber, fullName, passageId } = usePassage();

  if (!verseNumber || !fullName) {
    return null;
  }

  return (
    <Container>
      <Block>
        <TopContainer>
          <H3>{fullName}</H3>
        </TopContainer>
      </Block>
      <Separator />
      <Block>
        <OutlineButton
          style={{ display: 'block', width: '100%', margin: '24px 0' }}
          type="button"
        >
          Write annotation
        </OutlineButton>
      </Block>
      <Block>{passageId && <PublicAnnotations passageId={passageId} />}</Block>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
`;
