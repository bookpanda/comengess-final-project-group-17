// @ts-check

import { getCourseMaterials } from './getCourseMaterials.js';
import { getMaterial } from './getMaterial.js';

/**
 * @param {string} access_token
 * @param {string} cv_cid
 */
export async function getCourseMaterialsLinks(access_token, cv_cid) {
  const data = await getCourseMaterials(access_token, cv_cid);
  const items = data.data.map((i) => {
    return { itemid: i.itemid, title: i.title };
  });
  const links = [];
  for (let i = 0; i < items.length; i++) {
    console.log(`getMatLink ${i}/${items.length}`);
    const res = await getMaterial(access_token, items[i].itemid);
    links.push({
      item_id: items[i].itemid,
      title: items[i].title,
      thumbnail: res.data.thumbnail,
      filepath: res.data.filepath,
    });
  }

  return links;
}
