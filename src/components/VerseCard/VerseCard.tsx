import React from 'react';
import { useScreen } from '../../hooks/useScreen';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';
import { VerseDetails } from '../VerseDetails';
import { DraggableVerseCard } from './DraggableVerseCard';

export const VerseCard: React.FC = () => {
  const { width } = useScreen();

  if (width > LARGE_SCREEN) {
    return <VerseDetails />;
  }

  return <DraggableVerseCard />;
};
