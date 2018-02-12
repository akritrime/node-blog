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
      tableName: "knex_migrations"
    },
    seeds: {
      directory: join(BASE_PATH, 'knex_seeds'),
      tableName: "knex_seeds"
    }
  },

  test_posts: {
    client: 'pg',
    connection: {
      database: 'api_test_posts',
      user:     'postgres',
      password: 'secret_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: join(BASE_PATH, 'knex_migrations'),
      tableName: "knex_migrations"
    },
    seeds: {
      directory: join(BASE_PATH, 'knex_seeds'),
      tableName: "knex_seeds"
    }
  },

  test_users: {
    client: 'pg',
    connection: {
      database: 'api_test_users',
      user:     'postgres',
      password: 'secret_password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: join(BASE_PATH, 'knex_migrations'),
      tableName: "knex_migrations"
    },
    seeds: {
      directory: join(BASE_PATH, 'knex_seeds'),
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
      tableName: "knex_migrations"
    },
    seeds: {
      directory: join(BASE_PATH, 'knex_seeds'),
      tableName: "knex_seeds"
    }
  }

};
