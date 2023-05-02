// @ts-check

import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuidv4 } from 'uuid';

/**
 * course_id item_id filepath name thumbnail
 *
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 * @param {*} body
 */
export async function addItem(client, body) {
  const item_id = uuidv4();
  const created_date = Date.now();
  const item = { item_id: item_id, ...body, created_date: created_date };
  const params = {
    TableName: process.env.aws_table_name,
    Item: item,
  };
  const data = await client.send(new PutCommand(params));
  return data;
}
