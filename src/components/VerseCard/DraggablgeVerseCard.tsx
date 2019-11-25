import React, { useState, useCallback, useMemo } from 'react';
import posed from 'react-pose';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Z_INDEX } from '../../base/constants/zIndex';
import { useScreen } from '../../hooks/useScreen';

interface PoseEvent {
  velocity?: number;
  to?: number;
}

export const DraggableVerseCard: React.FC = ({ children }) => {
  const { height } = useScreen();
  const restingPoints = {
    closed: height,
    open: 0,
    collapsed: height - 100,
  };

  const [isLocked, setIsLocked] = useState(false);
  const [restingPoint, setRestingPoint] = useState(restingPoints.collapsed);

  const calculateRestingPoint = useCallback(
    ({ velocity, to }: PoseEvent = {}): number => {
      if (!velocity || !to) return 100;

      const projection = to + velocity * 0.1;
      if (projection > height / 2) {
        return restingPoints.collapsed;
      }
      return restingPoints.open;
    },
    [height, restingPoints]
  );

  const DraggableCard = posed.div({
    draggable: 'y',
    dragEnd: {
      transition: (event: any) => {
        console.log(event);
        return {
          type: 'spring',
          damping: 1000,
          stiffness: 400,
          to: calculateRestingPoint(event),
        };
      },
    },
  });

  return (
    <Container>
      <DraggableCard style={{ pointerEvents: isLocked ? 'none' : 'all' }}>
        <Card>
          <button onClick={() => setIsLocked(prev => !prev)}>Goo</button>
          {restingPoint + ''} - {children}
        </Card>
      </DraggableCard>
    </Container>
  );
};

const Card = styled.div`
  height: 1000px;
  background-color: ${theme.primaryColor};
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: ${Z_INDEX.VERSE_CARD};
`;
