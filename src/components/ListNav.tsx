import React from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { theme } from '../styles/theme';

export interface SettingsLink {
  label: string;
  to: string;
}

interface Props {
  links: SettingsLink[];
}

export const ListNav: React.FC<Props> = ({ links }) => {
  return (
    <Container>
      {links.map((link) => (
        <NavItem to={link.to}>{link.label}</NavItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

const NavItem = styled(RouterLink)`
  display: flex;
  height: 42px;
  align-items: center;
  text-decoration: none;
  color: ${theme.primaryColor};
  font-weight: bold;
  outline: none;
  line-height: 1.3em;
  background-color: white;
  border-bottom: 1px solid ${theme.borderColor};

  &:hover,
  &:focus {
    background-color: ${theme.primaryTint};
  }
`;
