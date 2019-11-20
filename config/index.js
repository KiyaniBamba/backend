const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4400;
const dbUrl = process.env.DATABASE_URL;
const env = process.env.NODE_ENV || "development";
const round = process.env.SALT_ROUND || 11;

module.exports = {
  port,
  dbUrl,
  env,
  round
};
