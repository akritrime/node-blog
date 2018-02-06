
exports.up = function(knex, Promise) {
    return knex.schema.createTableIfNotExists("posts", (table) => {
        table.increments("id").unique()
        table.string("title")
        //   table.integer("author")
        //     .references("id")
        //     .inTable("users")
        table.text("content")
        table.timestamps(true, true)
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("posts")
};
