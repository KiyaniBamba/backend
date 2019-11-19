const dotenv = require("dotenv");

dotenv.config();

const port = process.env.PORT || 4400;
const dbUrl = process.env.DB_URL;
const env = process.env.NODE_ENV || "development";

module.exports = {
  port,
  dbUrl,
  env
};
