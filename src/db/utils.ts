import * as Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'
const knexConf = require('../../knexfile.js')

export const knex = () => Knex(Object.assign({}, knexConf[process.env.NODE_ENV], knexSnakeCaseMappers()))
