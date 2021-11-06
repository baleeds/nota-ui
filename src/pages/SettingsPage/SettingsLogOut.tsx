import React from 'react';
import { PageOnCard } from '../../components/PageOnCard';
import { PrimaryButtonLarge } from '../../components/Buttons';
import { useAuth } from '../../components/AuthProvider';

export const SettingsLogOut: React.FC = () => {
  const { logout } = useAuth();

  return (
    <PageOnCard
      backTo="/settings"
      title="Log out"
      bodyPadding={{
        desktop: { all: 24 },
        mobile: { all: 24 },
      }}
    >
      <h3 style={{ marginBottom: 24 }}>Are you sure you want to log out?</h3>
      <PrimaryButtonLarge
        type="button"
        style={{ width: '100%' }}
        onClick={() => logout()}
      >
        Log out
      </PrimaryButtonLarge>
    </PageOnCard>
  );
};
