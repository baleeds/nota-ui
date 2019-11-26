import React from 'react';
// import { useParams } from 'react-router';
import { useScreen } from '../../hooks/useScreen';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';
import { VerseDetails } from '../VerseDetails';
import { DraggableVerseCard } from './DraggablgeVerseCard';

export const VerseCard: React.FC = () => {
  // const { verseId } = useParams<{ verseId?: string }>();
  const { width } = useScreen();

  if (width > LARGE_SCREEN) {
    return <VerseDetails />;
  }

  return (
    <DraggableVerseCard>
      <VerseDetails />
    </DraggableVerseCard>
  );
};
