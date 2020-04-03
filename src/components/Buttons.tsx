import styled from 'styled-components';
import { theme } from '../styles/theme';

export const BaseButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  transition: all 0.2s ease-in-out;

  :disabled {
    opacity: 0.5;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  border-radius: ${theme.borderRadius};
  background: ${theme.primaryColor};
  font-size: 15px;
  height: 38px;
  font-style: italic;
  color: ${theme.blank};
  padding: 0 20px;

  &:hover,
  &:focus {
    background: ${theme.primaryHoverColor};
  }
`;

export const PrimaryButtonLarge = styled(PrimaryButton)`
  font-size: 18px;
  height: 48px;
`;

export const OutlineButton = styled(BaseButton)`
  border: 1px solid ${theme.borderColor};
  height: 38px;
  color: ${theme.primaryColor};
  border-radius: ${theme.borderRadius};
  padding: 0 20px;

  &:hover,
  &:focus {
    background: ${theme.primaryColor};
    border-color: ${theme.primaryColor};
    color: ${theme.blank};
  }
`;

export const OutlineButtonLarge = styled(OutlineButton)`
  height: 48px;
  font-size: 18px;
  border-color: ${theme.primaryColor};

  &:hover,
  &:focus {
    background: ${theme.primaryTint};
  }
`;

export const OutlineButtonContrast = styled(OutlineButton)`
  border-color: ${theme.blank};
  color: ${theme.blank};

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: ${theme.blank};
  }
`;

export const GhostButton = styled(BaseButton)`
  height: 38px;
  padding: 0 20px;
  border-radius: ${theme.borderRadius};

  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;
