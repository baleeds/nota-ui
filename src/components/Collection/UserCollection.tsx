import React from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useUserProfileQuery } from '../../api/__generated__/apollo-graphql';
import { useScreen } from '../../hooks/useScreen';
import { useAuth } from '../AuthProvider';
import { Block } from '../Block';
import { Card } from '../Card';
import { NothingHere } from '../NothingHere';
import { Tab, Tabs } from '../Tabs';
import { CollectionAnnotations } from './CollectionAnnotations';
import { CollectionUserInfo } from './CollectionUserInfo';
import { MyCollectionAnnotations } from './MyCollectionAnnotations';

interface Props {
  userId: string;
}

export const UserCollection: React.FC<Props> = ({ userId }) => {
  const { data, loading, error } = useUserProfileQuery({
    variables: {
      userId,
    },
  });

  const { isMobile } = useScreen();
  const history = useHistory();

  const { user: currentUser } = useAuth();
  const isMe = currentUser?.id === userId;

  const renderTab = () => {
    if (!userId) return <NothingHere />;
    const {
      location: { pathname },
    } = history;

    if (pathname.includes('annotations')) {
      if (isMe) return <MyCollectionAnnotations />;
      return <CollectionAnnotations userId={userId} />;
    }

    // if (pathname.includes("favorites")) return <CollectionFavorites userId={userId} />
    return null;
  };

  const collectionBody = (
    <>
      {<CollectionUserInfo user={data?.user} loading={loading} error={error} />}
      <Tabs>
        <Tab to={`/collection/${userId}/annotations`} title="Annotations" />
        <Tab to={`/collection/${userId}/favorites`} title="Favorites" />
      </Tabs>
      {renderTab()}
    </>
  );

  if (isMobile) {
    return <Block>{collectionBody}</Block>;
  }

  return (
    <Container>
      <Card>{collectionBody}</Card>
    </Container>
  );
};

const Container = styled.div`
  margin: 0 auto;
  max-width: 750px;
`;
