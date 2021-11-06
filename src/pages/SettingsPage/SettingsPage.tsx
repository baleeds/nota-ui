import React from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../components/AuthProvider';
import { useScreen } from '../../hooks/useScreen';
import { ListNav, SettingsLink } from '../../components/ListNav';
import { PageOnCard } from '../../components/PageOnCard';

export const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const { isMobile } = useScreen();

  if (!user) history.push('/login');

  const settingsLinks: SettingsLink[] = [
    {
      label: 'Profile',
      to: '/settings/profile',
    },
    {
      label: 'Security',
      to: '/settings/security',
    },
  ];

  return (
    <PageOnCard backTo="/collection" showBackTo="mobile" title="Settings">
      <ListNav links={settingsLinks} />
    </PageOnCard>
  );
};
