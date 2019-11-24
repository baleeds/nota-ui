import React from 'react';
import { useScreen } from '../hooks/useScreen';
import { LARGE_SCREEN } from '../base/constants/breakpoints';

interface PlatformsMap {
  Mobile: React.FC;
  Desktop: React.FC;
}

export function SplitPlatforms<P extends PlatformsMap>({
  Mobile,
  Desktop,
  ...props
}: P) {
  const { width } = useScreen();
  // const { mobile, desktop } = platforms;

  if (width > LARGE_SCREEN) {
    return <Desktop {...props} />;
  }

  return <Mobile {...props} />;
}
