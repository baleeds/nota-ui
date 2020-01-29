import React from 'react';
import { useScreen } from '../../hooks/useScreen';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';
import { VerseDetails } from '../VerseDetails';
import { DraggableVerseCard } from './DraggableVerseCard';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const VerseCard: React.FC = () => {
  const { width } = useScreen();

  if (width > LARGE_SCREEN) {
    return (
      <VerseDetailsContainer>
        <VerseDetails />
      </VerseDetailsContainer>
    );
  }

  return <DraggableVerseCard />;
};

const VerseDetailsContainer = styled.div`
  flex: 1;
  height: 100vh;

  max-width: 600px;
  min-width: 350px;
  box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.15);
  background-color: ${theme.primaryColor};
`;
