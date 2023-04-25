const { PutCommand } = require('@aws-sdk/lib-dynamodb');

const { getMaterial } = require('../courseville/index');

exports.getSelectedItems = async (client, access_token, body) => {
  console.log(body);
  const filepaths = [];
  for (let i = 0; i < body.length; i++) {
    const name = body[i].name;
    const item_id = body[i].id;
    const data = await getMaterial(access_token, item_id);
    const url = data.data.filepath;
    filepaths.push(`wget ${url}`);
    console.log(data);
  }

  return filepaths;
};
