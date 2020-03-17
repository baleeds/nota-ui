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
            refreshTokens(input: {
              refreshToken: "${refreshToken}"
            }) {
              accessToken
              refreshToken
              errors {
                field
                message
              }
            }
          }
        `,
      }),
    });

    const refreshResponse = await fetchResult.json();

    if (!refreshResponse?.data?.refreshTokens?.accessToken) {
      return undefined;
    }

    return refreshResponse.data.refreshTokens.accessToken;
  } catch (e) {
    throw new Error('Failed to fetch fresh access token');
  }
};
