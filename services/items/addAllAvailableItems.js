const { PutCommand } = require('@aws-sdk/lib-dynamodb');

const { getCourseMaterialsLinks } = require('../courseville/index');

// course_id item_id filepath name thumbnail
exports.addAllAvailableItems = async (client, access_token, cv_cid) => {
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
};
