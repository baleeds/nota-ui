import { getUserFromLocalStorage } from '../getUserFromLocalStorage';
import { CURRENT_USER_KEY } from '../../constants/localStorageKeys';

afterEach(() => {
  localStorage.clear();
});

test('getUserFromLocalStorage returns user from localStorage', () => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: 1,
      email: 'tester@level.tech',
      isAdmin: true,
      otpEnabled: false,
    })
  );

  const user = getUserFromLocalStorage();

  expect(user).toMatchObject({
    id: 1,
    email: 'tester@level.tech',
    isAdmin: true,
    otpEnabled: false,
  });
});

test('getUserFromLocalStorage returns undefined for missing user', () => {
  const user = getUserFromLocalStorage();

  expect(user).toBeUndefined();
});

test('getUserFromLocalStorage returns undefined for invalid user', () => {
  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify({
      id: 2,
      isAdmin: true,
    })
  );

  const user = getUserFromLocalStorage();

  expect(user).toBeUndefined();
});
