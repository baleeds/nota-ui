import React from 'react';
import styled from 'styled-components';
import { SpaceConfig } from './types';
import { spaceConfigToProperty } from './helpers';

interface Props {
  padding?: SpaceConfig;
  margin?: SpaceConfig;
  className?: string;
}

const UBox: React.FC<Props> = ({ className, children }) => {
  return <div className={`box ${className || ''}`}>{children}</div>;
};

export const Box = styled(UBox)`
  margin: ${({ margin }) => spaceConfigToProperty(margin)};
  padding: ${({ padding }) => spaceConfigToProperty(padding)};
`;
