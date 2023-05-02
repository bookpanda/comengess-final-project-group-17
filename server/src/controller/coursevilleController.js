// @ts-check

import https from 'node:https';
import url from 'node:url';
import querystring from 'querystring';

import * as CoursevilleService from '../services/courseville/index.js';

const redirect_uri = `http://${process.env.backendIPAddress}/courseville/access_token`;
const authorization_url = `https://www.mycourseville.com/api/oauth/authorize?response_type=code&client_id=${process.env.client_id}&redirect_uri=${redirect_uri}`;
const access_token_url = 'https://www.mycourseville.com/api/oauth/access_token';

/** @satisfies {import('express').RequestHandler} */
export const authApp = (req, res) => {
  res.redirect(authorization_url);
};

/** @satisfies {import('express').RequestHandler} */
export const accessToken = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const parsedQuery = querystring.parse(parsedUrl.query ?? '');

  if (parsedQuery.error) {
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end(`Authorization error: ${parsedQuery.error_description}`);
    return;
  }

  if (parsedQuery.code) {
    const postData = querystring.stringify({
      grant_type: 'authorization_code',
      code: parsedQuery.code,
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      redirect_uri: redirect_uri,
    });

    const tokenOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length,
      },
    };

    const tokenReq = https.request(
      access_token_url,
      tokenOptions,
      (tokenRes) => {
        let tokenData = '';
        tokenRes.on('data', (chunk) => {
          tokenData += chunk;
        });
        tokenRes.on('end', () => {
          const token = JSON.parse(tokenData);
          req.session.token = token;
          console.log(req.session);
          if (token) {
            res.writeHead(302, {
              Location: `http://${process.env.frontendIPAddress}/index.html`,
            });
            res.end();
          }
        });
      }
    );
    tokenReq.on('error', (err) => {
      console.error(err);
    });
    tokenReq.write(postData);
    tokenReq.end();
  } else {
    res.writeHead(302, { Location: authorization_url });
    res.end();
  }
};

// Example: Send "GET" request to CV endpoint to get user profile information
/** @satisfies {import('express').RequestHandler} */
export const getProfileInformation = (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  try {
    const profileOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const profileReq = https.request(
      'https://www.mycourseville.com/api/v1/public/users/me',
      profileOptions,
      (profileRes) => {
        let profileData = '';
        profileRes.on('data', (chunk) => {
          profileData += chunk;
        });
        profileRes.on('end', () => {
          const profile = JSON.parse(profileData);
          res.send(profile);
          res.end();
        });
      }
    );
    profileReq.on('error', (err) => {
      console.error(err);
    });
    profileReq.end();
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
    res.status(500).send(`${error}`);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourses = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  try {
    const data = await CoursevilleService.getCourses(token);
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
    res.status(500).send(`${error}`);
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourseInfo = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  const cv_cid = req.params.cv_cid;
  try {
    const data = await CoursevilleService.getCourseInfo(token, cv_cid);
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourseAssignments = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  const cv_cid = req.params.cv_cid;
  try {
    const data = await CoursevilleService.getCourseAssignments(token, cv_cid);
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourseMaterials = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  const cv_cid = req.params.cv_cid;
  try {
    const data = await CoursevilleService.getCourseMaterials(token, cv_cid);
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getMaterial = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  const item_id = req.params.item_id;
  try {
    const data = await CoursevilleService.getMaterial(token, item_id);
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
  }
};

/** @satisfies {import('express').RequestHandler} */
export const getCourseMaterialsLinks = async (req, res) => {
  const token = req.session.token?.access_token;

  if (!token) {
    res.status(401).send('No access token');
    return;
  }

  const cv_cid = req.params.cv_cid;
  try {
    const data = await CoursevilleService.getCourseMaterialsLinks(
      token,
      cv_cid
    );
    res.send(data);
  } catch (error) {
    console.log(error);
    console.log('Please logout, then login again.');
  }
};

/** @satisfies {import('express').RequestHandler} */
export const logout = (req, res) => {
  req.session.destroy(() => null);
  res.redirect(`http://${process.env.frontendIPAddress}/login.html`);
  res.end();
};
