import React from 'react';
import { Navbar } from '../../../common/components/Navbar';
import classes from './page.module.scss';

export const Page: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
