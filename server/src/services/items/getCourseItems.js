// @ts-check

import { ScanCommand } from '@aws-sdk/lib-dynamodb';

/**
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 * @param {string} cv_cid
 */
export async function getCourseItems(client, cv_cid) {
  const params = {
    TableName: process.env.aws_table_name,
    FilterExpression: '#cv_cid = :cv_cid',
    ExpressionAttributeNames: { '#cv_cid': 'cv_cid' },
    ExpressionAttributeValues: {
      ':cv_cid': cv_cid,
    },
  };
  console.log(params);
  const data = await client.send(new ScanCommand(params));
console.log(data);
  return data;
}
