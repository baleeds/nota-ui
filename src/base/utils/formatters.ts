import { User } from '../../api/__generated__/apollo-graphql';

export const getUserDisplayName = (
  user?: Pick<User, 'firstName' | 'lastName'>
) => {
  if (!user) return undefined;

  return `${user.firstName} ${user.lastName}`;
};
