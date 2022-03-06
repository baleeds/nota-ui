import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { RouteParams } from '../base/routes';
import { useAuth } from '../components/AuthProvider';
import { UserCollection } from '../components/Collection/UserCollection';
import { LoginBanner } from '../components/LoginBanner';
import { NothingHere } from '../components/NothingHere';
import { Page } from '../components/Page';

export const CollectionPage: React.FC = () => {
  const { user } = useAuth();
  const { userId } = useParams<RouteParams>();
  const history = useHistory();

  useEffect(() => {
    if (user && !userId) history.push(`/collection/${user.id}/annotations`);
  });

  return (
    <Page>
      {!user && !userId && (
        <LoginBanner message="Sign in to join the discussion." />
      )}
      {userId && <UserCollection userId={userId} />}
      {!userId && <NothingHere />}
    </Page>
  );
};
