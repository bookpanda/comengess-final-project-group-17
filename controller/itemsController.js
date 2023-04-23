// @ts-check

const dotenv = require('dotenv');
dotenv.config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  PutCommand,
  DeleteCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const { getItems, addItem, deleteItem } = require('../services/items/index');

// @ts-ignore
const docClient = new DynamoDBClient({
  regions: process.env.AWS_REGION,
});

exports.getItems = async (req, res) => {
  try {
    const data = await getItems(docClient);
    console.log(data);
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.addItem = async (req, res) => {
  try {
    const data = await addItem(docClient, req.body);
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const data = await deleteItem(docClient, req.params.item_id);
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
