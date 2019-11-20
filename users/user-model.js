const bcrypt = require("bcryptjs");
const db = require("../database/db");
const config = require("../config");

const getById = id => {
  return db("users")
    .where({ id })
    .select("id", "username", "email", "city", "full_name")
    .first();
};

const authenticate = async (username, password) => {
  const user = await db("users")
    .where({ username })
    .first();
  const match = bcrypt.compareSync(password, user.password);
  return match ? user : null;
};

const add = user => {
  const salt = bcrypt.genSaltSync(config.round);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return db("users")
    .insert(user)
    .then(([id]) => id);
};

const getAll = () =>
  db("users").select("id", "username", "full_name", "email", "city");

module.exports = {
  add,
  getById,
  authenticate,
  getAll
};
