import * as Knex from 'knex'
import { knexSnakeCaseMappers } from 'objection'
import { ModelClass } from 'objection';

const knexConf = require('../../knexfile.js')

export const knex = () => Knex(Object.assign({}, knexConf[process.env.NODE_ENV || 'development'], knexSnakeCaseMappers()))


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
        // knexInit()
        try {
            await rollback()
            .then(migrate)
            .then(seed)
        } catch (err) {
            await Model.knex().table("knex_migartions_lock").del()
            
            await rollback()
            .then(migrate)
            .then(seed)
        }
    }

    const tearDown = async () => {
        try {
            await rollback()
        } catch (_) {
            await Model.knex().table("knex_migartions_lock").del()
            await rollback()
        }
        
    }

    return {
        setUp
        , tearDown
        , knexInit
        , knexDestroy
    }
}