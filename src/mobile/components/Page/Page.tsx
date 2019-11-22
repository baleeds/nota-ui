import React from 'react';
import { Navbar } from '../../../common/components/Navbar';
import classes from './page.module.scss';

export const Page: React.FC = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>{children}</div>
      <Navbar />
    </div>
  );
};
