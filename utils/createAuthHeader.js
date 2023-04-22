const createAuthHeader = (access_token) => {
  return {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  };
};

exports.createAuthHeader = createAuthHeader;
