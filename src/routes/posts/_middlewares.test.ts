import { getAll } from './_middlewares'
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
})