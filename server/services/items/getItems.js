const { ScanCommand } = require('@aws-sdk/lib-dynamodb');

exports.getItems = async (client) => {
  const params = {
    TableName: process.env.aws_table_name,
  };
  const data = await client.send(new ScanCommand(params));
  return data;
};
