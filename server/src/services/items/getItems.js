// @ts-check

import { ScanCommand } from '@aws-sdk/lib-dynamodb';

/**
 * @param {import('@aws-sdk/client-dynamodb').DynamoDBClient} client
 */
export async function getItems(client) {
  const params = {
    TableName: process.env.aws_table_name,
  };
  const data = await client.send(new ScanCommand(params));

  return data;
}
