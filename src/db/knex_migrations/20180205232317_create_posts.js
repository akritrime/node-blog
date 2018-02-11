
exports.up = function(knex, Promise) {
    return knex.schema.hasTable("posts").then((exists) =>
        !exists && knex.schema.createTable("posts", (table) => {
            table.increments("id").unique()
            table.string("title")
            //   table.integer("author")
            //     .references("id")
            //     .inTable("users")
            table.text("content")
            table.timestamps(true, true)
        })
    )
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("posts")
};
