exports.up = function(knex) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table
        .string("username", 25)
        .unique()
        .notNullable();
      table.string("full_name", 50).notNullable();
      table.string("password", 100).notNullable();
      table.string("city", 50).notNullable();
      table
        .string("email", 100)
        .unique()
        .notNullable();
    })
    .createTable("restaurants", table => {
      table.increments();
      table.string("restaurantName", 100).notNullable();
      table.string("city", 50).notNullable();
      table.string("zipcode", 10).notNullable();
      table.integer("myRating").defaultsTo(1);
      table.text("notes");
      table
        .boolean("stamped")
        .unsigned()
        .defaultsTo(false);
      table
        .integer("user_id")
        .unsigned()
        .references("users.id")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
