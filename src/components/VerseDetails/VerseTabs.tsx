import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Sticky from 'react-sticky-el';
import { VerseTabName } from './types';
import { useHistory } from 'react-router';

interface Props {
  currentTab: VerseTabName;
}

export const VerseTabs: React.FC<Props> = ({ currentTab }) => {
  const history = useHistory();

  const setCurrentTab = (newTab: VerseTabName) => {
    history.push(history.location.pathname.replace(currentTab, newTab));
  };

  return (
    <Sticky scrollElement="#VerseDetailsBody" topOffset={10}>
      <Container role="tablist">
        <Tab
          type="button"
          onClick={() => setCurrentTab('annotations')}
          className={currentTab === 'annotations' ? 'active' : undefined}
        >
          Annotations
        </Tab>
        <Tab
          type="button"
          onClick={() => setCurrentTab('articles')}
          className={currentTab === 'articles' ? 'active' : undefined}
        >
          Articles
        </Tab>
      </Container>
    </Sticky>
  );
};

const Container = styled.nav`
  display: flex;
  width: 100%;
  background-color: ${theme.primaryColor};
`;

const Tab = styled.button<{ active?: boolean }>`
  color: white;
  padding: 8px 12px 16px 12px;
  font-weight: 400;
  opacity: 0.7;

  flex: 1;
  text-align: center;
  position: relative;

  &.active {
    opacity: 1;

    :after {
      content: '';
      display: block;
      width: 60px;
      height: 8px;
      margin-top: 11px;
      border-radius: 100px;
      background-color: ${theme.secondaryColor};
      position: absolute;
      left: calc(50% - 30px);
    }
  }
`;
