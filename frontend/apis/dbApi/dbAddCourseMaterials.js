import { backendIPAddress, getOption } from '../../utils/contants.js';

export const dbAddCourseMaterials = async (cv_cid) => {
  const options = {
    method: 'POST',
    credentials: 'include',
  };
  const data = await fetch(
    `http://${backendIPAddress}/items/add_all/${cv_cid}`,
    options
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
