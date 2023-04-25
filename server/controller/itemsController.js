// @ts-check

const dotenv = require('dotenv');
const path = require('path');
const mime = require('mime');
const { spawn } = require('child_process');
const fs = require('fs');

dotenv.config();
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  PutCommand,
  DeleteCommand,
  ScanCommand,
} = require('@aws-sdk/lib-dynamodb');

const {
  getItems,
  addItem,
  deleteItem,
  addAllAvailableItems,
  getSelectedItems,
} = require('../services/items/index');

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

//get all things from course id
exports.addAllAvailableItems = async (req, res) => {
  try {
    const data = await addAllAvailableItems(
      docClient,
      req.session.token.access_token,
      req.params.cv_cid
    );
    console.log(data);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

exports.getSelectedItems = async (req, res) => {
  try {
    const filepaths = await getSelectedItems(
      docClient,
      req.session.token.access_token,
      req.body
    );
    console.log(filepaths);

    const download = spawn(
      `rm -r -f * && ${filepaths.join(' && ')} && zip -r download_mcv.zip .`,
      {
        cwd: './spawn',
        shell: true,
      }
    );
    download.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
    });

    download.stderr.on('data', (data) => {
      // console.log(`stderr: ${data}`);
    });

    download.on('error', (error) => {
      // console.log(`error: ${error.message}`);
    });

    download.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
      const file = path.join(__dirname, '../spawn/download_mcv.zip');
      // console.log(file);
      res.download(file);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};
