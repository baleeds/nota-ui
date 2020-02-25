import { normalizeErrors } from '../normalizeErrors';

test('normalizeErrors handles network errors', () => {
  const failed: Error = {
    name: 'Network error: Failed to fetch',
    stack: '',
    message: 'Network error: Failed to fetch',
  };

  const result = undefined;

  const normalizedErrors = normalizeErrors(failed, result);

  expect(normalizedErrors).toMatchObject({
    hasError: true,
    base: "We've encountered a network error",
  });
});

test('normalizeErrors handles base form errors', () => {
  const failed = undefined;

  const result = {
    data: {
      signInUser: {
        accessToken: null,
        refreshToken: null,
        errors: [
          {
            field: 'base',
            message: 'Invalid email or password',
          },
        ],
      },
    },
  };

  const normalizedErrors = normalizeErrors(failed, result);

  expect(normalizedErrors).toMatchObject({
    hasError: true,
    base: 'Invalid email or password',
  });
});

test('normalizeErrors handles field form errors', () => {
  const failed = undefined;

  const result = {
    data: {
      signInUser: {
        errors: [
          {
            field: 'email',
            message: 'Invalid email',
          },
        ],
      },
    },
  };

  const normalizedErrors = normalizeErrors(failed, result);

  expect(normalizedErrors).toMatchObject({
    hasError: true,
    fields: {
      email: 'Invalid email',
    },
  });
});

test('normalizeErrors handles valid results', () => {
  const failed = undefined;

  const response = {
    data: {
      signInUser: {
        user: {
          id: 'VXNlci0x',
          email: 'development@level.tech',
        },
        errors: [],
      },
    },
  };

  const normalizedErrors = normalizeErrors(failed, response);

  expect(normalizedErrors).toMatchObject({
    hasError: false,
  });
});
