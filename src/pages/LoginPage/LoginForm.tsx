import React from 'react';
import { PrimaryButtonLarge } from '../../components/Buttons';
import { Link } from '../../components/Link';
import { FormGroup } from '../../components/FormGroup';

export const LoginForm: React.FC = () => {
  return (
    <form>
      <FormGroup>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" autoFocus />
      </FormGroup>
      <FormGroup>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
      </FormGroup>
      <div style={{ marginTop: 40 }}>
        <PrimaryButtonLarge type="submit" onClick={console.log}>
          Sign in
        </PrimaryButtonLarge>
        <Link
          to="/forgot-password"
          style={{ display: 'block', textAlign: 'center', marginTop: 20 }}
        >
          Forgot password?
        </Link>
      </div>
    </form>
  );
};
