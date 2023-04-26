const { ScanCommand } = require('@aws-sdk/lib-dynamodb');

exports.getCourseItems = async (client, cv_cid) => {
  const params = {
    TableName: process.env.aws_table_name,
    FilterExpression: '#cv_cid = :cv_cid',
    ExpressionAttributeNames: { '#cv_cid': 'cv_cid' },
    ExpressionAttributeValues: {
      ':cv_cid': cv_cid,
    },
  };
  const data = await client.send(new ScanCommand(params));
  return data;
};
