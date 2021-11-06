import { SpaceConfig } from './types';

export const numberToPixels = (n: number | undefined) =>
  n !== undefined ? `${n}px` : '0';

export const spaceConfigToProperty = (config?: SpaceConfig) => {
  if (!config) return 'unset';

  const { tb, lr, t, b, l, r, all } = config;
  const top = t ?? tb ?? all;
  const bottom = b ?? tb ?? all;
  const left = l ?? lr ?? all;
  const right = r ?? lr ?? all;

  return `${numberToPixels(top)} ${numberToPixels(right)} ${numberToPixels(
    bottom
  )} ${numberToPixels(left)}`;
};
