const { join } = require('path')
const BASE_PATH = join(__dirname, 'src', 'db')

module.exports = {

  test: {
    client: 'pg',
    connection: {
      database: 'api_test',
      user:     'postgres',
      password: 'secret_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: join(BASE_PATH, 'knex_migrations'),
      tableName: "knex_migartions"
    },
    seeds: {
      directory: join(BASE_PATH, 'test', 'knex_seeds'),
      tableName: "knex_seeds"
    }
  },

  development: {
    client: 'pg',
    connection: {
      database: 'api',
      user:     'postgres',
      password: 'secret_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: join(BASE_PATH, 'knex_migrations'),
      tableName: "knex_migartions"
    },
    seeds: {
      directory: join(BASE_PATH, 'development', 'knex_seeds'),
      tableName: "knex_seeds"
    }
  }

};
