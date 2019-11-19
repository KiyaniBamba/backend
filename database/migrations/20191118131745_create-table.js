exports.up = function(knex) {
  return knex.schema.createTable("users", table => {
    table.increments();
    table.string("username", 25).unique();
    table.string("full_name", 50);
    table.string("password", 100);
    table.string("city", 50);
    table.string("email", 100).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
