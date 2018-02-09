import { app } from '../../src/app'
import * as request from 'supertest'
import * as Knex from 'knex'
import { ModelClass } from 'objection';

const knexConf = require('../../knexfile')

export const knex = () => Knex(knexConf.test)

export const req = request(app.callback())

export const dbConf = (Model: ModelClass<any>) => {
    const knexInit = () => Model.knex(knex())

    const rollback = () => Model.knex()
        .migrate
        .rollback()
        .then()

    const disconnect = () => Model.knex()
        .destroy()

    const knexDestroy = async () => {
        await rollback()
            .then(disconnect)
    }
    
    const migrate = () =>  Model.knex()
        .migrate
        .latest();

    const seed = () => Model.knex()
        .seed
        .run();

    const setUp = async () => {
        await rollback()
            .then(migrate)
            .then(seed)
    }

    const tearDown = async () => {
        await rollback()
    }

    return {
        setUp
        , tearDown
        , knexInit
        , knexDestroy
    }
}