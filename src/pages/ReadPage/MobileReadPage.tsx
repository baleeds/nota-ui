import React from 'react';
import { useBookNavigation } from '../../components/BookNavigationProvider';
import { Passage } from './Passage';
import { Block } from '../../components/Block';
import {
  MobileHeader,
  MobileHeaderNavButton,
} from '../../components/MobileHeader';
import { ReactComponent as AngleRight } from '../../icons/chevron_right-24px.svg';

interface Props {
  bookName: string;
  chapterId: string;
}

export const MobileReadPage: React.FC<Props> = ({ bookName, chapterId }) => {
  const { open, title } = useBookNavigation();

  return (
    <>
      <MobileHeader>
        <MobileHeaderNavButton type="button" onClick={open}>
          {title}
          <AngleRight style={{ margin: 6 }} />
        </MobileHeaderNavButton>
      </MobileHeader>
      <Block style={{ paddingTop: 60 }}>
        <Passage />
      </Block>
    </>
  );
};
