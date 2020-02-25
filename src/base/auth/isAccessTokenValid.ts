import { isTokenValid } from './isTokenValid';
import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';

export const isAccessTokenValid = () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);

  if (!token) {
    return false;
  }

  return isTokenValid(token);
};
