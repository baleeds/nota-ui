import { ACCESS_TOKEN_KEY } from '../constants/localStorageKeys';

export const fetchNewAccessToken = async (refreshToken: string) => {
  if (!process.env.REACT_APP_API_URL) {
    throw new Error(
      '.env.REACT_APP_API_URL must be set to use refresh token link'
    );
  }

  try {
    const fetchResult = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            refreshToken(refreshToken: "${refreshToken}") {
              result {
                accessToken
                refreshToken
              }
              messages {
                field
                message
              }
            }
          }
        `,
      }),
    });

    const refreshResponse = await fetchResult.json();

    const { accessToken } = refreshResponse?.data?.refreshToken?.result || {};
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      return `Bearer ${accessToken}`;
    }
    return undefined;
  } catch (e) {
    throw new Error('Failed to fetch fresh access token');
  }
};
