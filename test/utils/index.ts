import { app } from '../../src/app'
import * as request from 'supertest'
import { ModelClass } from 'objection';
import { knex } from './../../src/db/utils'

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