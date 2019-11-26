import React from 'react';
import { Redirect } from 'react-router';
import { ReadPage } from '../pages/ReadPage';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';

export interface RouteParams {
  bookName?: string;
  chapterId?: string;
  verseId?: string;
}

export const routes = [
  {
    path: '/home',
    exact: true,
    component: HomePage,
  },
  {
    path: [
      '/read',
      '/read/:bookName',
      '/read/:bookName/:chapterId',
      '/read/:bookName/:chapterId/:verseId',
    ],
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
