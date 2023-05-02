// @ts-check

/**
 * @param {string} access_token
 */
export function createAuthHeader(access_token) {
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
}
