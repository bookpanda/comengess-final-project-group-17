import { backendIPAddress, getOption } from '../../utils/constants.js';

export const fetchGetProfileInfo = async (cv_cid) => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_profile_info`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
