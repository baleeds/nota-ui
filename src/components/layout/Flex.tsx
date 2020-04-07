import styled from 'styled-components';
import { CSSProperties } from 'react';
import { SpaceConfig } from './types';
import { spaceConfigToProperty } from './helpers';

interface Props {
  column?: boolean;
  flex?: number;
  gutter?: number;
  margin?: SpaceConfig;
  padding?: SpaceConfig;
  alignItems?: CSSProperties['alignItems'];
  textAlign?: CSSProperties['textAlign'];
}

export const Flex = styled.div<Props>`
  display: flex;
  flex-direction: ${({ column }) => (column ? 'column' : 'row')};
  flex: ${({ flex }) => flex ?? 'unset'};
  ${({ gutter }) =>
    gutter ? `& > .box + .box { margin-top: ${gutter}px; }` : ''}
  margin: ${({ margin }) => spaceConfigToProperty(margin)};
  padding: ${({ padding }) => spaceConfigToProperty(padding)};
  align-items: ${({ alignItems }) => alignItems ?? 'unset'};
  text-align: ${({ textAlign }) => textAlign ?? 'unset'};
`;
