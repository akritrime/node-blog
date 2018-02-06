import { getAll, getOne } from './_middlewares'
import { getCtx, returnsErr, withoutDB, respondsWith, withDB } from '../../../test/utils/forMiddlewares'
import { Model } from 'objection'
import { Post } from '../../db/models/post'

describe("middlewares : posts", () => {
    describe("getAll : ", () => {
        withoutDB(() => {   
            returnsErr(getAll)
        })
    
        withDB(Model, () => {
            respondsWith("all the posts", getAll,  () => Post.query())
        })
    })

    describe("getOne : ", () => {
        withoutDB(() => {   
            returnsErr(getOne)
        })
    
        withDB(Model, () => {
            respondsWith("specific post", getOne,  () => Post.query().where("id", 1))
        })
    })
})