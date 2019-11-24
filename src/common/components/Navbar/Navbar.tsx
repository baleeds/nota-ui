import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './navbar.module.scss';
import { ReactComponent as HomeIcon } from '../../icons/home-24px.svg';
import { ReactComponent as ReadIcon } from '../../icons/menu_book-24px.svg';
import { ReactComponent as CollectionIcon } from '../../icons/collections_bookmark-24px.svg';

export const Navbar: React.FC = () => {
  return (
    <div className={classes.container}>
      <NavLink
        to="/"
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <HomeIcon />
        <span>Home</span>
      </NavLink>
      <NavLink
        to="/read"
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <ReadIcon />
        <span>Read</span>
      </NavLink>
      <NavLink
        to="/collection"
        className={classes.navLink}
        activeClassName={classes.active}
      >
        <CollectionIcon />
        <span>Collection</span>
      </NavLink>
    </div>
  );
};
