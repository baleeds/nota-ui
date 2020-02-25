import React, { useState, useCallback, useContext } from 'react';
import { MeFragment } from '../api/__generated__/apollo-graphql';
import { getUserFromLocalStorage } from '../base/auth/getUserFromLocalStorage';
import { isAccessTokenValid } from '../base/auth/isAccessTokenValid';
import { setLocalStorageAuth } from '../base/auth/setLocalStorageAuth';
import { clearLocalStorageAuth } from '../base/auth/clearLocalStorageAuth';

export interface IAuthContext {
  user?: MeFragment;
  login: (payload: LoginPayload) => void;
  logout: () => void;
}

export interface LoginPayload {
  user: MeFragment;
  accessToken: string;
  refreshToken: string;
}

export const AuthContext = React.createContext<IAuthContext>({
  user: undefined,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  const context = useContext<IAuthContext>(AuthContext);
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  let cachedUser: MeFragment | undefined;
  if (isAccessTokenValid()) {
    cachedUser = getUserFromLocalStorage();
  }
  const [user, setUser] = useState<MeFragment | undefined>(cachedUser);

  const login = useCallback(
    ({ accessToken, refreshToken, user }: LoginPayload) => {
      setLocalStorageAuth(accessToken, refreshToken, user);
      setUser(user);
    },
    [setUser]
  );

  const logout = useCallback(() => {
    clearLocalStorageAuth();
    setUser(undefined);
  }, [setUser]);

  const contextValue = React.useMemo(() => ({ user, login, logout }), [
    user,
    login,
    logout,
  ]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
