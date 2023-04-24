const { createAuthHeader } = require('../../utils/createAuthHeader');
exports.getMaterial = async (access_token, item_id) => {
  const data = await fetch(
    `https://www.mycourseville.com/api/v1/public/get/item/material?item_id=${item_id}`,
    createAuthHeader(access_token)
  ).then((r) => r.json());
  return data;
};
