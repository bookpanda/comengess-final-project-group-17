// @ts-check

import { createAuthHeader } from '../../utils/createAuthHeader.js';

/**
 * @param {string} access_token
 */
export async function getCourses(access_token) {
  const data = await fetch(
    'https://www.mycourseville.com/api/v1/public/get/user/courses',
    createAuthHeader(access_token)
  ).then((r) => r.json());
  return data;
}
