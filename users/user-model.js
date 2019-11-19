const bcrypt = require("bcryptjs");
const db = require("../database/db");
const config = require("../config");

const getById = id => {
  return db("users")
    .where({ id })
    .select("id", "username", "email", "city", "full_name")
    .first();
};

const authenticate = (username, password) => {
  const user = db("users")
    .where({ username })
    .select("password")
    .first();
  return bcrypt.compareSync(password, user.password);
};

const add = user => {
  const salt = bcrypt.genSaltSync(config.round);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  return db("users")
    .insert(user)
    .then(([id]) => getById(id));
};

module.exports = {
  add,
  getById,
  authenticate
};
