import React from 'react';
import { User } from '../../api/__generated__/apollo-graphql';
import { getUserDisplayName } from '../../base/utils/formatters';
import { useAuth } from '../AuthProvider';
import { ReactComponent as SettingsIcon } from '../../icons/gear-16px.svg';
import { LinkBaseButton } from '../Buttons';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { ApolloError } from 'apollo-client';
import Skeleton from 'react-loading-skeleton';

interface Props {
  user?: Pick<User, 'id' | 'firstName' | 'lastName'>;
  loading: boolean;
  error?: ApolloError;
}

export const CollectionUserInfo: React.FC<Props> = ({ user }) => {
  var { user: currentUser } = useAuth();
  var isMyProfile = !!currentUser && !!user && currentUser.id === user.id;

  return (
    <Container>
      <div className="username">
        {getUserDisplayName(user) ?? <Skeleton width={160} />}
      </div>
      {isMyProfile && (
        <div className="settings-cog">
          <LinkBaseButton to="/settings">
            <SettingsIcon />
          </LinkBaseButton>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  height: 40px;
  align-items: center;
  margin-bottom: 8px;

  .username {
    font-size: 1.25rem;
    font-weight: bold;
    color: ${theme.primaryTextColor};
  }

  .settings-cog {
    color: ${theme.primaryColor};

    a {
      display: block;
      height: 20px;
      width: 20px;

      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
`;
