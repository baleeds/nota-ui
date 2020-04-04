import React from 'react';
import styled from 'styled-components';

interface Props {
  padding?: string;
  margin?: string;
}

const UBox: React.FC<Props> = ({ children }) => {
  return <div className="box">{children}</div>;
};

export const Box = styled(UBox)`
  padding: ${({ padding }) => padding ?? 'unset'};
  margin: ${({ margin }) => margin ?? 'unset'};
`;
