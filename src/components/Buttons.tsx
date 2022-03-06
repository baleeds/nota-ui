import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
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
  height: 38px;
  color: ${theme.blank};
  padding: 0 20px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px 0px rgba(0, 0, 0, 0.1);

  &:hover,
  &:focus {
    background: ${theme.primaryHoverColor};
  }
`;

export const PrimaryButtonLarge = styled(PrimaryButton)`
  font-size: 1.125rem;
  height: 48px;
`;

export const OutlineButton = styled(BaseButton)`
  border: 1px solid ${theme.borderColor};
  height: 38px;
  color: ${theme.primaryColor};
  border-radius: ${theme.borderRadius};
  padding: 0 20px;
  font-size: 0.9rem;

  &:hover,
  &:focus {
    background: ${theme.primaryColor};
    border-color: ${theme.primaryColor};
    color: ${theme.blank};
  }
`;

export const OutlineButtonLarge = styled(OutlineButton)`
  height: 48px;
  font-size: 1.125rem;
  border-color: ${theme.primaryColor};

  &:hover,
  &:focus {
    background: ${theme.primaryTint};
    color: ${theme.primaryColor};
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
  font-size: 0.9rem;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export const GhostButtonContrast = styled(GhostButton)`
  &:hover,
  &:focus {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const LinkBaseButton = styled(Link)`
  text-decoration: none;
  color: currentColor;

  &:hover,
  &:focus {
    color: currentColor;
  }
`;
