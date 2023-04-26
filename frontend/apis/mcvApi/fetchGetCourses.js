import { backendIPAddress, getOption } from '../../utils/constants.js';

export const fetchGetCourses = async () => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_courses`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
