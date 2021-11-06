import React from 'react';
import styled from 'styled-components/macro';
import { theme } from '../styles/theme';
import { GhostButton } from './Buttons';

interface Props {
  message?: string;
  retry?: () => void;
}

const defaultMessage = 'Uh oh!  Something went wrong.';

export const PageError: React.FC<Props> = ({
  message = defaultMessage,
  retry,
}) => {
  return (
    <Container>
      <p>{message}</p>
      {retry && (
        <GhostButton type="button" onClick={retry}>
          Retry
        </GhostButton>
      )}
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  padding: 48px;
  text-align: center;
  align-content: center;
  color: ${theme.lightTextColor};
`;
