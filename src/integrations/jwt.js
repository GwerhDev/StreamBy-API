const jwt = require('jsonwebtoken');
const { privateSecret } = require('../config');

const createClientSecret = async (payload, expiresIn) => {
  const options = {
    expiresIn: expiresIn || "100y"
  };

  const token = jwt.sign(payload, privateSecret, options);
  return token;
};

const createToken = async (data, time) => {
  const expiration = time * 60 * 60 * 24;
  const payload = {
    data,
    exp: Math.floor(Date.now() / 1000) + expiration
  };
  const token = jwt.sign(payload, privateSecret);
  return token;
};

const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, privateSecret);
    return decoded;
  } catch (error) {
    return error;
  }
};

module.exports = {
  createToken,
  decodeToken,
  createClientSecret,
};