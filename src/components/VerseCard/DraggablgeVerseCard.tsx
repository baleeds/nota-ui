import React, { useMemo, useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Z_INDEX } from '../../base/constants/zIndex';
import { useScreen } from '../../hooks/useScreen';
import Interactable from 'react-interactable/noNative';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { getIndexById } from '../../base/utils/getIndexById';
import { getById } from '../../base/utils/getById';
import { useHistory, useParams } from 'react-router';
import { RouteParams } from '../../base/routes';
import { usePrevious } from '../../hooks/usePrevious';

export const DraggableVerseCard: React.FC = ({ children }) => {
  const history = useHistory();
  const { bookName, chapterId, verseId } = useParams<RouteParams>();
  const previousVerseId = usePrevious(verseId);
  const [snapPoint, setSnapPoint] = useState<string>(
    verseId ? 'collapsed' : 'closed'
  );
  const { height } = useScreen();
  const interactableRef = useRef<any>(null);

  const snapPoints = useMemo(
    () => [
      { id: 'closed', y: height, damping: 0.7, stiffness: 2500 },
      { id: 'open', y: -12, damping: 0.6, stiffness: 3000 },
      { id: 'collapsed', y: height - 128, damping: 0.6, stiffness: 3000 },
    ],
    [height]
  );

  const initialPosition = useMemo(
    () => ({
      y: (getById(snapPoints, snapPoint) || snapPoints[0]).y,
    }),
    // eslint-disable-next-line
    []
  );

  useEffect(() => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }
    if (!verseId && previousVerseId) {
      current.snapTo({ index: getIndexById(snapPoints, 'closed') });
    } else if (verseId && !previousVerseId) {
      current.snapTo({ index: getIndexById(snapPoints, 'collapsed') });
    }
  }, [verseId, previousVerseId, interactableRef, snapPoints]);

  useEffect(() => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }
    current.snapTo({ index: getIndexById(snapPoints, snapPoint) || 0 });
    // eslint-disable-next-line
  }, [height]);

  const handleSnap = ({ id }: { id: string }) => {
    setSnapPoint(id);

    if (id === 'closed') {
      history.push(`/read/${bookName}/${chapterId}`);
    }
  };

  const bodyContainer = document.querySelector('#PageContainer');

  return (
    <Container>
      <Interactable.View
        ref={interactableRef}
        initialPosition={initialPosition}
        snapPoints={snapPoints}
        verticalOnly
        dragToss={0.2}
        onSnap={handleSnap}
      >
        <Card
          onTouchStart={() => bodyContainer && disableBodyScroll(bodyContainer)}
          onTouchEnd={() => bodyContainer && enableBodyScroll(bodyContainer)}
        >
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
  border-radius: 12px;
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);

  :before {
    content: ' ';
    display: block;
    width: 24px;
    height: 3px;
    border-radius: 10px;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, 0.3);
    position: relative;
    top: 8px;
  }
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
