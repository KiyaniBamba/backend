const db = require("../database/db");

const getById = id => {
  return db("users")
    .where({ id })
    .select("id", "username", "email", "city", "full_name")
    .first();
};

const getPassword = username => {
  return db("users")
    .where({ username })
    .select("password")
    .first();
};

const add = user => {
  return db("users")
    .insert(user)
    .then(([id]) => getById(id));
};

module.exports = {
  add,
  getById,
  getPassword
};
