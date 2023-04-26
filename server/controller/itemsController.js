// @ts-check

import { spawn } from 'node:child_process';
import path from 'node:path';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

import {
  getItems,
  getCourseItems,
  addItem,
  deleteItem,
  addAllAvailableItems,
  getSelectedItems,
} from '../services/items/index.js';

const docClient = new DynamoDBClient({
  regions: process.env.AWS_REGION,
});

/** @satisfies {import('express').RequestHandler} */
export const getItems = async (req, res) => {
  try {
    const data = await getItems(docClient);
    res.send(data.Items);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourseItems = async (req, res) => {
  const cv_cid = req.params.cv_cid;
  try {
    const data = await getCourseItems(docClient, cv_cid);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const addItem = async (req, res) => {
  try {
    const data = await addItem(docClient, req.body);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const deleteItem = async (req, res) => {
  try {
    const data = await deleteItem(docClient, req.params.item_id);
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

// get all things from course id
/** @satisfies {import('express').RequestHandler} */
export const addAllAvailableItems = async (req, res) => {
  try {
    const data = await addAllAvailableItems(
      docClient,
      req.session.token.access_token,
      req.params.cv_cid
    );
    res.send(data);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getSelectedItems = async (req, res) => {
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
