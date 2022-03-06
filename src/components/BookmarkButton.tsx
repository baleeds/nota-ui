import React from 'react';
import styled from 'styled-components/macro';
import { BaseButton } from './Buttons';
import { theme } from '../styles/theme';
import { ReactComponent as BookmarkEmptyIcon } from '../icons/bookmark_border-24px.svg';
import { ReactComponent as BookmarkFilledIcon } from '../icons/bookmark-24px.svg';
import {
  BookmarkVerseMutation,
  UnbookmarkVerseMutation,
  useBookmarkVerseMutation,
  useUnbookmarkVerseMutation,
  Verse,
} from '../api/__generated__/apollo-graphql';
import { useAuth } from './AuthProvider';
import { toast } from './Toast';
import { attempt } from '../base/utils/attempt';
import { normalizeErrors } from '../base/utils/normalizeErrors';
import { UNKNOWN_ERROR } from '../base/constants/messages';

interface Props {
  verse?: Pick<Verse, 'id' | 'isBookmarked'>;
}

export const BookmarkButton: React.FC<Props> = ({ verse }) => {
  const { user } = useAuth();

  const [bookmarkMutation] = useBookmarkVerseMutation();
  const [unbookmarkMutation] = useUnbookmarkVerseMutation();

  const bookmark = async () => {
    if (!verse?.id) return;

    const [failure, result] = await attempt(
      bookmarkMutation({
        variables: {
          input: {
            verseId: verse.id,
          },
        },
        optimisticResponse: {
          bookmarkVerse: {
            successful: true,
            messages: [],
            result: {
              id: verse.id,
              isBookmarked: true,
              __typename: 'Verse',
            },
            __typename: 'BookmarkVersePayload',
          },
          __typename: 'RootMutationType',
        },
      })
    );

    const { hasError, base } = normalizeErrors<BookmarkVerseMutation>(
      failure,
      result
    );

    if (hasError) {
      toast({ message: base || UNKNOWN_ERROR, type: 'error' });
    }
  };

  const unbookmark = async () => {
    if (!verse?.id) return;

    const [failure, result] = await attempt(
      unbookmarkMutation({
        variables: {
          input: {
            verseId: verse.id,
          },
        },
        optimisticResponse: {
          unbookmarkVerse: {
            successful: true,
            messages: [],
            result: {
              id: verse.id,
              isBookmarked: false,
              __typename: 'Verse',
            },
            __typename: 'UnbookmarkVersePayload',
          },
          __typename: 'RootMutationType',
        },
      })
    );

    const { hasError, base } = normalizeErrors<UnbookmarkVerseMutation>(
      failure,
      result
    );

    if (hasError) {
      toast({ message: base || UNKNOWN_ERROR, type: 'error' });
    }
  };

  const handleClick = async () => {
    if (!verse) return;

    if (!user) {
      toast({ message: 'You must be logged in to do that.', type: 'default' });
      return;
    }

    if (verse.isBookmarked) await unbookmark();
    else await bookmark();
  };

  if (!verse) return null;

  return (
    <ToggleButton onClick={handleClick} type="button">
      {verse.isBookmarked ? <BookmarkFilledIcon /> : <BookmarkEmptyIcon />}
    </ToggleButton>
  );
};

const ToggleButton = styled(BaseButton)`
  height: 40px;
  width: 40px;
  margin-right: 8px;
  color: ${theme.secondaryColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;
