import React from 'react';
import { HomePage as DesktopHomePage } from '../../desktop/pages/HomePage';
import { HomePage as MobileHomePage } from '../../mobile/pages/HomePage';
import { ReadPage as MobileReadPage } from '../../mobile/pages/ReadPage';
import { ReadPage as DektopReadPage } from '../../desktop/pages/ReadPage';
import { SplitPlatforms } from '../components/SplitPlatforms';
import { Redirect } from 'react-router';

export const routes = [
  {
    path: '/home',
    exact: true,
    component: () => (
      <SplitPlatforms Mobile={MobileHomePage} Desktop={DesktopHomePage} />
    ),
  },
  {
    path: '/read',
    exact: true,
    component: () => (
      <SplitPlatforms Mobile={MobileReadPage} Desktop={DektopReadPage} />
    ),
  },
  {
    path: '*',
    component: () => <Redirect to="/home" />,
  },
];
