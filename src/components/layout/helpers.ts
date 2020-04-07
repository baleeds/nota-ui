import { SpaceConfig } from './types';

export const numberToPixels = (n: number | undefined) =>
  n !== undefined ? `${n}px` : '0';

export const spaceConfigToProperty = (config?: SpaceConfig) => {
  if (!config) return 'unset';

  const { tb, lr, t, b, l, r, all } = config;
  const top = all ?? tb ?? t;
  const bottom = all ?? tb ?? b;
  const left = all ?? lr ?? l;
  const right = all ?? lr ?? r;

  return `${numberToPixels(top)} ${numberToPixels(right)} ${numberToPixels(
    bottom
  )} ${numberToPixels(left)}`;
};
