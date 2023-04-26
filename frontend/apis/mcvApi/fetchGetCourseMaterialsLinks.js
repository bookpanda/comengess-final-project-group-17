import { backendIPAddress, getOption } from '../../utils/constants.js';

export const fetchGetCourseMaterialsLinks = async (cv_cid) => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_materials_links/${cv_cid}`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
