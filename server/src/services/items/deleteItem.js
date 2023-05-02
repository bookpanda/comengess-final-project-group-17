// @ts-check

import { DeleteCommand } from '@aws-sdk/lib-dynamodb';

/**
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 * @param {string} item_id
 */
export async function deleteItem(client, item_id) {
  const params = {
    TableName: process.env.aws_table_name,
    Key: {
      student_id: item_id,
    },
  };
  console.log(item_id);
  const data = await client.send(new DeleteCommand(params));
  return data;
}
