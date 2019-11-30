import { ApolloClient } from 'apollo-client';
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { setContext } from 'apollo-link-context';
// import { getRefreshTokenLink } from 'apollo-link-refresh-token';
// import { fetchNewAccessToken } from '../auth/fetchNewAccessToken';
// import { isAccessTokenValid } from '../auth/isAccessTokenValid';
// import { getWatchedMutationLink } from './watchedMutationLink';
import {
  ACCESS_TOKEN_KEY,
  // REFRESH_TOKEN_KEY,
} from '../constants/localStorageKeys';

const introspectionQueryResultData = require('../../api/__generated__/fragment-types.json');

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY) || '';
  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

// const tokenRefreshLink = getRefreshTokenLink({
//   authorizationHeaderKey: 'Authorization',
//   fetchNewAccessToken,
//   getAccessToken: () => localStorage.getItem(ACCESS_TOKEN_KEY),
//   getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
//   isAccessTokenValid,
//   isUnauthenticatedError: graphQLError => {
//     const { extensions } = graphQLError;
//     if (
//       extensions &&
//       extensions.code &&
//       extensions.code === 'UNAUTHENTICATED'
//     ) {
//       return true;
//     }
//     return false;
//   },
// });

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API_URL,
});

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({
  /**
   * Default behavior for dataIdFromObject is to use `${typename}:${id}`, meaning we
   * have to use a typename string to derive the cache key (data id).
   * Since we are using global ids, an id will never be shared, regardless of typname,
   * so we can drop the typename dependency.
   *
   * By changing the behavior, we get a simpler and less volatile method
   * of generating cache keys
   */
  dataIdFromObject: obj => obj.id,
  fragmentMatcher,
});

// const watchedMutationLink = getWatchedMutationLink(cache);

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    // watchedMutationLink,
    // tokenRefreshLink,
    httpLink,
  ]),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

export { client };
