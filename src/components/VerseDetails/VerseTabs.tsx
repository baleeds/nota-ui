import React from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Sticky from 'react-sticky-el';

interface Props {}

export const VerseTabs: React.FC<Props> = ({}) => {
  return (
    <Sticky scrollElement="#VerseDetailsBody" topOffset={10}>
      <Container role="tablist">
        <Tab className="active">Annotations</Tab>
        <Tab>Articles</Tab>
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
  font-weight: 500;
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
