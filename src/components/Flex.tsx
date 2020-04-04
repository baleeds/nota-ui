import styled from 'styled-components';
import { CSSProperties } from 'react';

interface SpaceConfig<T = number> {
  tb?: T;
  lr?: T;
  t?: T;
  b?: T;
  l?: T;
  r?: T;
  all?: T;
}

interface Props {
  column?: boolean;
  flex?: number;
  gutter?: number;
  margin?: SpaceConfig;
  padding?: SpaceConfig;
  alignItems?: CSSProperties['alignItems'];
  textAlign?: CSSProperties['textAlign'];
}

const numberToPixels = (n: number | undefined) =>
  n !== undefined ? `${n}px` : '0';

const spaceConfigToProperty = (config?: SpaceConfig) => {
  if (!config) return 'unset';

  const { tb, lr, t, b, l, r, all } = config;
  const top = all ?? tb ?? t;
  const bottom = all ?? tb ?? b;
  const left = all ?? lr ?? l;
  const right = all ?? lr ?? r;

  return `${numberToPixels(top)} ${numberToPixels(right)} ${numberToPixels(
    bottom
  )} ${numberToPixels(left)}`;
};

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
