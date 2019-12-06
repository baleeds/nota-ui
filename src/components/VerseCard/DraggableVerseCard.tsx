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
import { VerseDetails } from '../VerseDetails';

type SnapPointId = 'open' | 'collapsed' | 'closed';

interface SnapPoint {
  id: SnapPointId;
  y: number;
  damping: number;
  stiffness: number;
}

const CLOSED_INDEX = 0;
const OPEN_INDEX = 1;
const COLLAPSED_INDEX = 2;

export const DraggableVerseCard: React.FC = () => {
  const history = useHistory();
  const { pathname } = history.location;
  const { bookName, chapterId, verseId } = useParams<RouteParams>();

  const isOpen =
    pathname.includes('annotations') || pathname.includes('articles');
  const isCollapsed = !!verseId;

  const [snapPoint, setSnapPoint] = useState<SnapPointId>(
    isOpen ? 'open' : isCollapsed ? 'collapsed' : 'closed'
  );

  const [isLocked, setIsLocked] = useState(false);
  const [showAddButton, setShowAddButton] = useState(isOpen ? true : false);

  const { height } = useScreen();
  const interactableRef = useRef<any>(null);

  const ensurePathname = (target: string) => {
    if (pathname !== target) {
      history.push(target);
    }
  };

  const snapPoints: SnapPoint[] = useMemo(
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

  // Snap to positions when the url changes
  useEffect(() => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }
    console.table({ isOpen, isCollapsed });

    if (isOpen) {
      if (snapPoint !== 'open') {
        current.snapTo({ index: OPEN_INDEX });
      }
    } else if (isCollapsed) {
      if (snapPoint !== 'collapsed') {
        current.snapTo({ index: COLLAPSED_INDEX });
      }
    } else if (!isCollapsed) {
      if (snapPoint !== 'closed') {
        current.snapTo({ index: CLOSED_INDEX });
      }
    }
  }, [isCollapsed, interactableRef, isOpen]);

  // Reposition the card when the screen height changes
  useEffect(() => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }
    current.snapTo({ index: getIndexById(snapPoints, snapPoint) || 0 });
    // eslint-disable-next-line
  }, [height]);

  // Called after snapping
  const handleSnap = ({ id }: { id: SnapPointId }) => {
    // bail if the snap point is already correct
    if (id === snapPoint) {
      return;
    }

    if (id === 'open') {
      setTimeout(() => setShowAddButton(true), 400);
    } else {
      setShowAddButton(false);
    }
    setSnapPoint(id);
  };

  const handleStop = () => {
    if (snapPoint === 'closed') {
      ensurePathname(`/read/${bookName}/${chapterId}`);
    } else if (snapPoint === 'collapsed') {
      ensurePathname(`/read/${bookName}/${chapterId}/${verseId}`);
    } else if (snapPoint === 'open') {
      ensurePathname(`/read/${bookName}/${chapterId}/${verseId}/annotations`);
    }
  };

  const handleBodyScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (snapPoint !== 'open' || !event.target) {
      return;
    }

    const { scrollTop } = event.currentTarget;

    if (!isLocked && scrollTop > 0) {
      setIsLocked(true);
    } else if (isLocked && scrollTop === 0) {
      setIsLocked(false);
    }
  };

  const handleToggle = () => {
    const { current } = interactableRef;
    if (!current) {
      return;
    }

    if (snapPoint !== 'open') {
      current.snapTo({ index: getIndexById(snapPoints, 'open') || 0 });
    } else {
      current.snapTo({ index: getIndexById(snapPoints, 'collapsed') || 0 });
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
        onStop={handleStop}
        dragEnabled={!isLocked}
      >
        <Card
          onTouchStart={() => bodyContainer && disableBodyScroll(bodyContainer)}
          // delay to prevent scrolling of the background on drag end
          onTouchEnd={() =>
            setTimeout(
              () => bodyContainer && enableBodyScroll(bodyContainer),
              300
            )
          }
        >
          <VerseDetails
            onBodyScroll={handleBodyScroll}
            onToggle={handleToggle}
            showAddButton={showAddButton}
          />
        </Card>
      </Interactable.View>
    </Container>
  );
};

const Card = styled.div`
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
