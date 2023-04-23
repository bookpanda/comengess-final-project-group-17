const { createAuthHeader } = require('../../utils/createAuthHeader');
const { getCourseMaterials } = require('./getCourseMaterials');
const { getMaterial } = require('./getMaterial');
exports.getCourseMaterialsLinks = async (access_token, cv_cid) => {
  const data = await getCourseMaterials(access_token, cv_cid);
  const items = data.data.map((i) => {
    return { itemid: i.itemid, title: i.title };
  });
  const links = [];
  for (let i = 0; i < items.length; i++) {
    const res = await getMaterial(access_token, items[i].itemid);
    links.push({
      itemid: items[i].itemid,
      title: items[i].title,
      thumbnail: res.data.thumbnail,
      filepath: res.data.filepath,
    });
  }
  return links;
};
