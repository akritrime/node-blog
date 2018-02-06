import { app } from '../../src/app'
import * as request from 'supertest'
import * as Knex from 'knex'

const knexConf = require('../../knexfile')

export const knex = Knex(knexConf.test)

export const req = request(app.callback())

export const dbConf = (Model) => {
    const knexInit = () => Model.knex(knex)

    const knexDestroy = () => Model.knex().destroy()
    
    const setUp = async () => {
        await Model.knex()
            .migrate
            .rollback()
        await Model.knex()
            .migrate
            .latest()
        await Model.knex()
            .seed
            .run()
    }

    const tearDown = async () => {
        await Model.knex()
            .migrate
            .rollback()
    }

    return {
        setUp
        , tearDown
        , knexInit
        , knexDestroy
    }
}