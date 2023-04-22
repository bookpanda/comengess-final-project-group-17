const { createAuthHeader } = require('../utils/createAuthHeader');
exports.getCourses = async (access_token) => {
  const data = await fetch(
    'https://www.mycourseville.com/api/v1/public/get/user/courses',
    createAuthHeader(access_token)
  ).then((r) => r.json());
  return data;
};
