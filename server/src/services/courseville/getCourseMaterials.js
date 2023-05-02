// @ts-check

import { createAuthHeader } from '../../utils/createAuthHeader.js';

/**
 * @param {string} access_token
 * @param {string} cv_cid
 */
export async function getCourseMaterials(access_token, cv_cid) {
  const data = await fetch(
    `https://www.mycourseville.com/api/v1/public/get/course/materials?cv_cid=${cv_cid}`,
    createAuthHeader(access_token)
  ).then((r) => r.json());

  return data;
}
