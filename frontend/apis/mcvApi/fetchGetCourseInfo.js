import { backendIPAddress, getOption } from '../../utils/contants.js';

export const fetchGetCourseInfo = async (cv_cid) => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_course_info/${cv_cid}`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
