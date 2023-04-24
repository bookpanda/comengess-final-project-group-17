const { PutCommand } = require('@aws-sdk/lib-dynamodb');
const { v4: uuidv4 } = require('uuid');

// course_id item_id filepath name thumbnail
exports.addItem = async (client, body) => {
  const item_id = uuidv4();
  const created_date = Date.now();
  const item = { item_id: item_id, ...body, created_date: created_date };
  const params = {
    TableName: process.env.aws_table_name,
    Item: item,
  };
  const data = await client.send(new PutCommand(params));
  return data;
};
