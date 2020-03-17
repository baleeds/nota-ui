import React from 'react';
import { Link } from '../../components/Link';
import { P } from '../../components/Typography';

export const SuccessMessage: React.FC = () => {
  return (
    <P>
      Please check your email for a link to reset your password.{' '}
      <Link to="/login">Back to login</Link>
    </P>
  );
};
