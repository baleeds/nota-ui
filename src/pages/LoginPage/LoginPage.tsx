import React from 'react';
import styled from 'styled-components';
import { LARGE_SCREEN } from '../../base/constants/breakpoints';
import { Link, useHistory } from 'react-router-dom';
import { OutlineButtonLarge } from '../../components/Buttons';
import { theme } from '../../styles/theme';
import { LoginForm } from './LoginForm';
import { ReactComponent as LogoIcon } from '../../icons/menu_book-24px.svg';

export const LoginPage: React.FC = () => {
  const history = useHistory();
  const isRegister = history.location.pathname === '/register';

  return (
    <Container>
      <LogoContainer>
        <Logo to="/home">
          <LogoIcon />
          Bible Nota
        </Logo>
      </LogoContainer>
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <FooterContainer>
        <FooterMessage>
          {isRegister ? 'Already have an account?' : 'Need an account?'}
        </FooterMessage>
        {isRegister ? (
          <OutlineButtonLarge
            key="sign-in-button"
            type="button"
            onClick={() => history.push('/login')}
          >
            Sign in
          </OutlineButtonLarge>
        ) : (
          <OutlineButtonLarge
            key="create-account-button"
            type="button"
            onClick={() => history.push('/register')}
          >
            Create an account
          </OutlineButtonLarge>
        )}
      </FooterContainer>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  width: 100%;
  max-width: 400px;
  padding: 24px 12px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  button {
    width: 100%;
  }

  @media screen and (min-width: ${LARGE_SCREEN}px) {
    padding: 36px 16px;
  }
`;

const LogoContainer = styled.div`
  padding: 60px 0;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  font-size: 28px;
  font-weight: 700;
  color: ${theme.primaryTextColor};
  text-decoration: none;
  outline: none;

  &:hover,
  &:focus {
    color: ${theme.primaryColor};
  }

  svg {
    height: 40px;
    width: 40px;
    fill: currentColor;
    margin-right: 8px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  flex-shrink: 0;
`;

const FooterContainer = styled.div`
  flex-shrink: 0;
  margin-top: 80px;
`;

const FooterMessage = styled.div`
  text-align: center;
  font-size: 15px;
  color: ${theme.lightTextColor};
  margin-bottom: 16px;
`;
