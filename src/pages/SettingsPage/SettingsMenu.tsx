import React from 'react';
import { PageOnCard } from '../../components/PageOnCard';
import { ListNav, SettingsLink } from '../../components/ListNav';
import { useRouteMatch } from 'react-router';

interface Props {}

export const SettingsMenu: React.FC<Props> = () => {
  const match = useRouteMatch();

  const settingsLinks: SettingsLink[] = [
    {
      label: 'Display Name',
      to: `${match.url}/display-name`,
    },
    {
      label: 'Change Password',
      to: `${match.url}/password`,
    },
    {
      label: 'Log out',
      to: `${match.url}/logout`,
    },
  ];

  return (
    <PageOnCard backTo="/collection" showBackTo="mobile" title="Settings">
      <ListNav links={settingsLinks} />
    </PageOnCard>
  );
};
