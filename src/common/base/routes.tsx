import React from 'react';
import { HomePage as DesktopHomePage } from '../../desktop/pages/HomePage';
import { HomePage as MobileHomePage } from '../../mobile/pages/HomePage';
import { SplitPlatforms } from '../components/SplitPlatforms';

export const routes = [
  {
    path: '/',
    exact: true,
    component: () => (
      <SplitPlatforms Mobile={MobileHomePage} Desktop={DesktopHomePage} />
    ),
  },
];
