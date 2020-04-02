import React from 'react';
import { Link } from '../components/Link';

interface Props {
  bookName: string;
  chapterId: string;
  verseId: string;
}

export const MobileVersePage: React.FC<Props> = ({
  bookName,
  chapterId,
  verseId,
}) => {
  return (
    <div>
      <Link to="/read"></Link>
      {bookName} {chapterId}:{verseId}
    </div>
  );
};
