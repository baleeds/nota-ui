import React from 'react';
import { Redirect } from 'react-router';
import { ReadPage } from '../pages/ReadPage';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';

export const routes = [
  {
    path: '/home',
    exact: true,
    component: HomePage,
  },
  {
    path: '/read',
    exact: true,
    component: ReadPage,
  },
  {
    path: '/collection',
    exact: true,
    component: CollectionPage,
  },
  {
    path: '*',
    component: () => <Redirect to="/home" />,
  },
];
