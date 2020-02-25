import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  CURRENT_USER_KEY,
} from '../constants/localStorageKeys';
import { MeFragment } from '../../api/__generated__/apollo-graphql';

export const setLocalStorageAuth = (
  accessToken: string,
  refreshToken: string,
  user: MeFragment
) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  } catch (e) {
    // do nothing, it will fail on next request.
  }
};
