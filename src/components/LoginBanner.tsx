import React from 'react';
import { OutlineButtonContrast, GhostButton } from './Buttons';
import styled from 'styled-components';
import { Card } from './Card';
import { theme } from '../styles/theme';
import { Block } from './Block';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

interface Props {
  message: String;
}

export const LoginBanner: React.FC<Props> = ({ message }) => {
  return (
    <Block>
      <LoginCard>
        <div>{message}</div>
        <ButtonGroup>
          <GhostButton type="button">Create an account</GhostButton>
          <OutlineButtonContrast type="button" onClick={console.log}>
            Sign in
          </OutlineButtonContrast>
        </ButtonGroup>
      </LoginCard>
    </Block>
  );
};

const LoginCard = styled(Card)`
  background-color: ${theme.secondaryColor};
  color: ${theme.blank};
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    flex-direction: row;
    align-items: center;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  margin-top: 16px;
  justify-content: space-between;
  flex-direction: row-reverse;

  button + button {
    margin-right: 8px;
    margin-left: 0px;
  }

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    margin-top: 0px;
    justify-content: unset;
    flex-direction: row;

    button + button {
      margin-left: 8px;
      margin-right: 0;
    }
  }
`;
