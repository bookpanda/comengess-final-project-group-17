import { backendIPAddress, getOption } from '../../utils/constants.js';

export const dbDownloadSelectedMaterials = async (body) => {
  const options = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  const data = await fetch(
    `http://${backendIPAddress}/items/download_selected`,
    options
  )
    .then((res) => res.blob())
    .then((blob) => {
      const file = window.URL.createObjectURL(blob);
      window.location.assign(file);
    })
    .catch((error) => console.error(error));
  return data;
};
