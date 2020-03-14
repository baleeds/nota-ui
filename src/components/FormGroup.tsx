import styled from 'styled-components';
import { theme } from '../styles/theme';

export const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 1.125rem;
    color: ${theme.primaryTextColor};
  }

  input {
    display: block;
    width: 100%;
    height: 48px;
    background-color: ${theme.inputBackgroundColor};
    border: 1px solid ${theme.borderColor};
    font-size: 1.125rem;
    color: ${theme.primaryTextColor};
    outline: none;
    border-radius: ${theme.borderRadius};
    padding: 0 16px;

    &:focus {
      background-color: ${theme.blank};
      border-color: ${theme.primaryColor};
    }
  }
`;
