// @ts-check

import { PutCommand } from '@aws-sdk/lib-dynamodb';

import { getCourseMaterialsLinks } from '../courseville/index.js';

// course_id item_id filepath name thumbnail
/**
 *
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 * @param {string} access_token
 * @param {string} cv_cid
 * @returns
 */
export async function addAllAvailableItems(client, access_token, cv_cid) {
  const cvData = await getCourseMaterialsLinks(access_token, cv_cid);
  console.log(cvData);
  for (let i = 0; i < cvData.length; i++) {
    console.log(`addItem ${i}/${cvData.length}`);
    const created_date = Date.now();
    const item = {
      item_id: cvData[i].item_id.toString(),
      cv_cid,
      title: cvData[i].title,
      thumbnail: cvData[i].thumbnail,
      filepath: cvData[i].filepath,
      created_date: created_date,
    };
    const params = {
      TableName: process.env.aws_table_name,
      Item: item,
    };
    await client.send(new PutCommand(params));
  }

  return cvData;
}
