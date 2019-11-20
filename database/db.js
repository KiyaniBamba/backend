const knex = require("knex");
const config = require("../knexfile");
const { env } = require("../config");

module.exports = knex(config[env]);
