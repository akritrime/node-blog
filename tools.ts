import { knex } from './test/utils'

knex().table("knex_migrations_lock").del().then()
knex().destroy().then()