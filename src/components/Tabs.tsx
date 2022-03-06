import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components/macro';
import { LARGE_SCREEN } from '../base/constants/breakpoints';
import { theme } from '../styles/theme';
import { numberToPixels } from './layout/helpers';

export interface TabProps {
  to: string;
  title: string;
}

export const Tab: React.FC<TabProps> = ({ to, title }) => {
  const { location } = useHistory();

  return (
    <TabLink to={to} className={location.pathname === to ? 'active' : ''}>
      {title}
    </TabLink>
  );
};

export const Tabs = styled.div`
  border-bottom: 1px solid ${theme.borderColor};
  display: flex;
  margin: 0 -12px;

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    margin: 0 -16px;
  }
`;

const TabLink = styled(Link)`
  text-decoration: none;
  color: ${theme.secondaryColor};
  font-weight: bold;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
  align-items: center;
  padding: 12px 12px;
  height: ${numberToPixels(theme.tabHeight)};

  &.active {
    color: ${theme.primaryTextColor};
  }

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    padding: 12px 16px;
  }

  &.active:after {
    content: ' ';
    background-color: ${theme.secondaryColor};
    height: 8px;
    width: 52px;
    display: block;
    position: relative;
    bottom: -16px;
    border-radius: 100px;
  }
`;
