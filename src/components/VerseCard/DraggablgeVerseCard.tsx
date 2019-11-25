import React, { useMemo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Z_INDEX } from '../../base/constants/zIndex';
import { useScreen } from '../../hooks/useScreen';
import Interactable from 'react-interactable/noNative';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const getIndexById = (items: any[], id: string) =>
  items.findIndex(item => item.id === id) || 0;

export const DraggableVerseCard: React.FC = ({ children }) => {
  const [snapPoint, setSnapPoint] = useState<string>('open');

  const { height } = useScreen();

  const interactableRef = useRef<any>(null);
  const snapPoints = useMemo(
    () => [
      { id: 'open', y: 0, damping: 0.6, stiffness: 3000 },
      { id: 'collapsed', y: height - 120, damping: 0.6, stiffness: 3000 },
      { id: 'closed', y: height, damping: 0.7, stiffness: 2500 },
    ],
    [height]
  );

  useEffect(() => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }
    current.snapTo({ index: getIndexById(snapPoints, snapPoint) });
    // eslint-disable-next-line
  }, [height]);

  const bodyContainer = document.querySelector('#PageContainer');

  return (
    <Container>
      <Interactable.View
        ref={interactableRef}
        snapPoints={snapPoints}
        verticalOnly
        dragToss={0.2}
        onSnap={({ id }: { id: string }) => setSnapPoint(id)}
      >
        <Card
          onTouchStart={() => bodyContainer && disableBodyScroll(bodyContainer)}
          onTouchEnd={() => bodyContainer && enableBodyScroll(bodyContainer)}
        >
          <button
            onClick={() => {
              console.log('do stuff');
              const { current } = interactableRef;
              if (!current) {
                return;
              }

              current.snapTo({ index: getIndexById(snapPoints, 'open') });
            }}
          >
            Goo
          </button>
          {children}
        </Card>
      </Interactable.View>
    </Container>
  );
};

const Card = styled.div`
  height: 1000px;
  width: 100%;
  background-color: ${theme.primaryColor};
  pointer-events: all;
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
