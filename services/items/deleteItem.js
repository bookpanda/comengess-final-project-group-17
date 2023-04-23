const { DeleteCommand } = require('@aws-sdk/lib-dynamodb');

exports.deleteItem = async (client, item_id) => {
  const params = {
    TableName: process.env.aws_table_name,
    Key: {
      student_id: item_id,
    },
  };
  console.log(item_id);
  const data = await client.send(new DeleteCommand(params));
  return data;
};
