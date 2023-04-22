const { createAuthHeader } = require('../utils/createAuthHeader');
exports.getCourseAssignments = async (access_token, cv_cid) => {
  const data = await fetch(
    `https://www.mycourseville.com/api/v1/public/get/course/assignments?cv_cid=${cv_cid}`,
    createAuthHeader(access_token)
  ).then((r) => r.json());
  return data;
};
