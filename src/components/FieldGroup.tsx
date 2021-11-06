import React from 'react';
import { ErrorMessage } from 'formik';
import styled from 'styled-components/macro';
import { theme } from '../styles/theme';

interface Props {
  formikFieldName?: string;
  error?: string;
}

export const FieldGroup: React.FC<Props> = ({
  formikFieldName,
  error: errorOverride,
  children,
}) => (
  <Container>
    {children}
    {errorOverride ? (
      <ErrorContainer>{errorOverride}</ErrorContainer>
    ) : (
      !!formikFieldName && (
        <ErrorMessage
          name={formikFieldName}
          render={(error) => <ErrorContainer>{error}</ErrorContainer>}
        />
      )
    )}
  </Container>
);

const Container = styled.div`
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

const ErrorContainer = styled.div`
  margin-top: 8px;
  color: ${theme.errorColor};
  font-size: 0.9rem;
  font-weight: bold;
`;
