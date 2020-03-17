import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  CURRENT_USER_KEY,
} from '../constants/localStorageKeys';

export const clearLocalStorageAuth = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
};
