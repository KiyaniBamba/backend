const jwt = require("jsonwebtoken");

const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status(status);

  return error;
};

const generateToken = user => {
  const { id, username } = user;
  const payload = { id, username };
  const secret = process.env.JWT_SECRET || "secret";
  const option = {};
  const token = jwt.sign(payload, secret, option);
  return token;
};

module.exports = {
  createError,
  generateToken
};
