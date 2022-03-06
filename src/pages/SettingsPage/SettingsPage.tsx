import React from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router';
import { useAuth } from '../../components/AuthProvider';
import { SettingsMenu } from './SettingsMenu';
import { SettingsDisplayName } from './SettingsDisplayName';
import { SettingsPassword } from './SettingsPassword';
import { SettingsLogOut } from './SettingsLogOut';

export const SettingsPage: React.FC = () => {
  const match = useRouteMatch();

  const { user } = useAuth();
  const history = useHistory();
  if (!user) history.push('/login');

  return (
    <Switch>
      <Route path={`${match.path}/display-name`}>
        <SettingsDisplayName />
      </Route>
      <Route path={`${match.path}/password`}>
        <SettingsPassword />
      </Route>
      <Route path={`${match.path}/logout`}>
        <SettingsLogOut />
      </Route>
      <Route path={match.path}>
        <SettingsMenu />
      </Route>
    </Switch>
  );
};
