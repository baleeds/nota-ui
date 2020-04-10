import React from 'react';
import toaster from 'toasted-notes';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { LARGE_SCREEN } from '../base/constants/breakpoints';
import { BaseButton } from './Buttons';

interface Options {
  message: string;
  duration?: number | null;
}

type Props = {
  close?: () => void;
  id: string;
} & Options;

export const toast = (options: Options) => {
  const isDesktop = window.innerWidth > LARGE_SCREEN;

  const { duration = 4000 } = options;

  toaster.notify(
    ({ id, onClose }) => <Toast {...options} id={id} close={onClose} />,
    {
      duration: duration,
      position: isDesktop ? 'top' : 'bottom',
    }
  );
};

export const Toast: React.FC<Props> = ({ message, close }) => {
  return (
    <ToastContainer>
      <Message>{message}</Message>
      {close && (
        <DismissButton onClick={close} type="button">
          Dismiss
        </DismissButton>
      )}
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: ${theme.successColor};
  border-radius: 4px;
  color: white;
  padding: 0 16px;
  font-weight: bold;
  box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.15);
`;

const Message = styled.div`
  padding: 16px 0;
`;

const DismissButton = styled(BaseButton)`
  font-size: 0.9rem;
  padding: 6px;
  margin-left: 8px;
  border-radius: 2px;
  opacity: 0.8;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
    opacity: 1;
  }
`;
