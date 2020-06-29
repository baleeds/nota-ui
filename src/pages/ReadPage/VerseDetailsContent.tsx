import React from 'react';
import { Block } from '../../components/Block';
import { OutlineButton } from '../../components/Buttons';
import { Annotations } from '../../components/Annotations';
import { usePassage } from '../../hooks/usePassage';
import { useHistory } from 'react-router';

export const VerseDetailsContent: React.FC = () => {
  const { passageId, bookName, chapterNumber, verseNumber } = usePassage();
  const history = useHistory();

  return (
    <>
      <Block>
        <OutlineButton
          style={{ display: 'block', width: '100%', margin: '24px 0' }}
          type="button"
          onClick={() =>
            history.push(
              `/annotate/${bookName}/${chapterNumber}/${verseNumber}`
            )
          }
        >
          Write an annotation
        </OutlineButton>
      </Block>
      <Block>
        {passageId && <Annotations key={passageId} passageId={passageId} />}
      </Block>
    </>
  );
};
