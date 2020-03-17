import { CURRENT_USER_KEY } from '../constants/localStorageKeys';
import { MeFragment } from '../../api/__generated__/apollo-graphql';
import * as Yup from 'yup';

const meFragmentSchema = Yup.object().shape({
  id: Yup.string().required(),
  email: Yup.string().required(),
  // isAdmin: Yup.boolean().required(),
});

export const getUserFromLocalStorage = (): MeFragment | undefined => {
  const currentUserString = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUserString) {
    return undefined;
  }

  try {
    const user = JSON.parse(currentUserString);
    if (meFragmentSchema.isValidSync(user)) {
      return user;
    }
    throw new Error('Invalid user from localStorage');
  } catch {
    return undefined;
  }
};
