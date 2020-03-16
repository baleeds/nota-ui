import React from 'react';
import { Redirect } from 'react-router';
import { ReadPage } from '../pages/ReadPage';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';
import { LoginPage } from '../pages/LoginPage';

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
      '/read/:bookName/:chapterId/:verseId/annotations',
      '/read/:bookName/:chapterId/:verseId/articles',
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
    path: ['/login', '/register'],
    exact: true,
    component: LoginPage,
  },
  // {
  //   path: '/register',
  //   exact: true,
  //   component: RegisterPage,
  // },
  // {
  //   path: '/forgot-password',
  //   exact: true,
  //   component: ForgotPasswordPage,
  // },
  {
    path: '*',
    component: () => <Redirect to="/home" />,
  },
];
