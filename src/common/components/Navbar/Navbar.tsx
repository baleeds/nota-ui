import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navbar.module.scss';

export const Navbar: React.FC = () => {
  return (
    <div className={classes.container}>
      <NavLink to="/" className={classes.navLink}>
        Home
      </NavLink>
      <NavLink to="/read" className={classes.navLink}>
        Read
      </NavLink>
      <NavLink to="/collection" className={classes.navLink}>
        Collection
      </NavLink>
    </div>
  );
};
