import React from 'react';
import { useParams } from 'react-router';
import { RouteParams } from '../base/routes';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { BOOK_DETAILS } from '../base/constants/bookDetails';
import { ReactComponent as AnnotationIcon } from '../icons/comment-24px.svg';
import { ReactComponent as ArticleIcon } from '../icons/description-24px.svg';
import { ReactComponent as BookmarkOutlineIcon } from '../icons/bookmark_border-24px.svg';

export const VerseDetails: React.FC = () => {
  const { bookName, chapterId, verseId } = useParams<RouteParams>();

  const fallback = (
    <Header>
      <h2>Select a verse</h2>
    </Header>
  );

  if (!bookName || !chapterId || !verseId) {
    return fallback;
  }

  const bookDetails = BOOK_DETAILS[bookName];
  if (!bookDetails) {
    return fallback;
  }

  return (
    <Header>
      <h2>
        {bookDetails.displayName} {chapterId}:{verseId}
      </h2>
      <BadgeContainer>
        <Badge>
          <AnnotationIcon />2
        </Badge>
        <Badge>
          <ArticleIcon />4
        </Badge>
        <Badge>
          <BookmarkOutlineIcon />
        </Badge>
      </BadgeContainer>
    </Header>
  );
};

const Header = styled.div`
  color: ${theme.blank};
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  pointer-events: none;

  h2 {
    font-size: 18px;
    padding: 22px 16px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  padding: 0 8px;
`;

const Badge = styled.div`
  padding: 12px;
  padding: 18px 8px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;

  svg {
    fill: currentColor;
    width: 24px;
    height: auto;
    margin-right: 6px;
  }
`;
