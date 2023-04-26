import { backendIPAddress, getOption } from '../../utils/constants.js';

export const dbGetCourseMaterials = async (cv_cid) => {
  const data = await fetch(
    `http://${backendIPAddress}/items/${cv_cid}`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
