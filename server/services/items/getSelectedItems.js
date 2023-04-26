// @ts-check

import { getMaterial } from '../courseville/index.js';

/**
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 * @param {string} access_token
 * @param {*} body
 */
export async function getSelectedItems(client, access_token, body) {
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
}
