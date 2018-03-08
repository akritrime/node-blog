
exports.up = async function(knex, Promise) {
  await knex.schema.hasTable("users")
    .then((exists) => {
        if (!exists) {
            return knex.schema.createTable("users", (table) => {
                table.increments("id").unique()
                table.string("user_name").unique().notNullable()
                table.string("password_hash").unique().notNullable()
                table.string("salt").unique().notNullable()
                table.string("email").unique().notNullable()
                table.string("first_name")
                table.string("last_name")
            })
        }
    }).catch((err) => console.error(err))
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("users")
};
