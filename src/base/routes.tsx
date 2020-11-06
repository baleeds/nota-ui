import React from 'react';
import { Redirect } from 'react-router';
import { ReadPage } from '../pages/ReadPage';
import { HomePage } from '../pages/HomePage';
import { CollectionPage } from '../pages/CollectionPage';
import { LoginPage } from '../pages/LoginPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { ResetPasswordPage } from '../pages/ResetPasswordPage';
import { AnnotatePage } from '../pages/AnnotatePage';
import { RegisterPage } from '../pages/RegisterPage';

export interface RouteParams {
  bookName?: string;
  chapterId?: string;
  verseId?: string;
  annotationId?: string;
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
      '/read/:bookName/:chapterId/:verseId/:annotationId',
    ],
    exact: true,
    component: ReadPage,
  },
  {
    path: '/annotate/:bookName/:chapterId/:verseId',
    exact: true,
    component: AnnotatePage,
  },
  {
    path: '/collection',
    exact: true,
    component: CollectionPage,
  },
  {
    path: '/login',
    exact: true,
    component: LoginPage,
  },
  {
    path: '/register',
    exact: true,
    component: RegisterPage,
  },
  {
    path: '/forgot-password',
    exact: true,
    component: ForgotPasswordPage,
  },
  {
    path: '/reset-password',
    exact: true,
    component: ResetPasswordPage,
  },
  {
    path: '*',
    component: () => <Redirect to="/home" />,
  },
];
