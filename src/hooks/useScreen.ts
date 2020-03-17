import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

export type Orientation = 'landscape' | 'portrait';

export interface Screen {
  height: number;
  width: number;
  orientation: Orientation;
  isMobile: boolean;
}

const getScreen = (): Screen => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const orientation = width > window.innerHeight ? 'landscape' : 'portrait';
  return {
    width,
    height,
    orientation,
    isMobile: width < LARGE_SCREEN,
  };
};

export const useScreen = (): Screen => {
  const [screen, setScreen] = useState(getScreen());

  useEffect(() => {
    const onResize = debounce(() => {
      const current = getScreen();

      if (
        current.width !== screen.width ||
        current.height !== screen.height ||
        current.orientation !== screen.orientation
      ) {
        setScreen(current);
      }
    }, 50);

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [screen, setScreen]);

  return screen;
};
