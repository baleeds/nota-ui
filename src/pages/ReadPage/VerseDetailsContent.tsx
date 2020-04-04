import React from 'react';
import { Separator } from '../../components/Separator';
import { Block } from '../../components/Block';
import { OutlineButton } from '../../components/Buttons';
import { PublicAnnotations } from '../../components/Annotations/PublicAnnotations';
import { usePassage } from '../../hooks/usePassage';

export const VerseDetailsContent: React.FC = () => {
  const { passageId } = usePassage();

  return (
    <>
      <Separator />
      <Block>
        <OutlineButton
          style={{ display: 'block', width: '100%', margin: '24px 0' }}
          type="button"
        >
          Write annotation
        </OutlineButton>
      </Block>
      <Block>{passageId && <PublicAnnotations passageId={passageId} />}</Block>
    </>
  );
};
