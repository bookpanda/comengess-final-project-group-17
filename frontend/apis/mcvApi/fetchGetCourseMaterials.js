import { backendIPAddress, getOption } from '../../utils/constants.js';

export const fetchGetCourseMaterials = async (cv_cid) => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_materials/${cv_cid}`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
