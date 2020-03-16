import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { ReactComponent as ErrorIcon } from '../icons/error-24px.svg';

interface Props {
  possibleErrors: Array<string | null | undefined>;
}

export const FormErrorDisplay: React.FC<Props> = ({ possibleErrors }) => {
  const errors = possibleErrors.filter(Boolean);
  if (errors.length === 0) return null;
  return (
    <Container>
      <ErrorIcon />
      {errors[0]}
    </Container>
  );
};

const Container = styled.div`
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: bold;
  color: ${theme.errorColor};
  display: flex;
  align-items: center;

  svg {
    height: 20;
    width: 20;
    fill: currentColor;
    margin-right: 0.5em;
  }
`;
