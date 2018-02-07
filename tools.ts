import { knex } from './test/utils'

knex().table("knex_migartions_lock").del().then()
knex().destroy().then()
