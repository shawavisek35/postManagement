'use strict'

const jwt = require('jsonwebtoken');

async function verifyIdToken(req, res, next) {
  let idToken = req.headers.authorization;
  if (!idToken) {
    return res.status(401).json('Auth Header is missing.');
  }
  try {
    jwt.verify(idToken, process.env.SECRET_KEY, (err, user) => {
      if(err) res.status(400).send('Error in authentication');
      req.user = user;
      console.log(user);
      return next();
    });
  } catch (e) {
    return res.status(500).json('error.auth_failed');
  }
}

module.exports = { verifyIdToken };