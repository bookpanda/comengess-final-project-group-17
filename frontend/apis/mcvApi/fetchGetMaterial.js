import { backendIPAddress, getOption } from '../../utils/constants.js';

export const fetchGetMaterial = async (item_id) => {
  const data = await fetch(
    `http://${backendIPAddress}/courseville/get_material/${item_id}`,
    getOption
  )
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return data;
};
