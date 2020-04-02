import React from 'react';
import { useBookNavigation } from '../components/BookNavigationProvider';
import { Passage } from './ReadPage/Passage';
import { Block } from '../components/Block';
import { MobileHeader } from '../components/MobileHeader';
import { ReactComponent as AngleRight } from '../icons/chevron_right-24px.svg';
import styled from 'styled-components';
import { BaseButton } from '../components/Buttons';
import { theme } from '../styles/theme';

interface Props {
  bookName: string;
  chapterId: string;
}

export const MobileReadPage: React.FC<Props> = ({ bookName, chapterId }) => {
  const { open, title } = useBookNavigation();

  return (
    <>
      <MobileHeader>
        <BookNavButton type="button" onClick={open}>
          {title}
          <AngleRight />
        </BookNavButton>
      </MobileHeader>
      <Block style={{ paddingTop: 60 }}>
        <Passage />
      </Block>
    </>
  );
};

const BookNavButton = styled(BaseButton)`
  padding: 18px 16px;
  display: block;
  text-align: left;
  min-width: 80px;
  display: flex;
  align-items: center;
  color: ${theme.primaryColor};
  font-weight: 600;

  svg {
    height: 20px;
    width: 20px;
    margin-left: 6px;
    fill: currentColor;
  }
`;
