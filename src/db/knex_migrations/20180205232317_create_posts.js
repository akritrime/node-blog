
exports.up = function(knex, Promise) {
  knex.schema.createTable("posts", (table) => {
      table.increments("id").unique()
      table.string("title")
    //   table.integer("author")
    //     .references("id")
    //     .inTable("users")
      table.text("content")
      table.timestamps()
  })
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable("posts")
};
