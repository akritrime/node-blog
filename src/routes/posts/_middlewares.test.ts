import { getAll, getOne } from './_middlewares'
import { withDB as _withDB, withoutDB } from '../../../test/utils/commonTestPatterns'
import { getCtx, returnsErr, respondsWith } from '../../../test/utils/forMiddlewares'
import { Model } from 'objection'
import { Post } from '../../db/models/post'

const withDB = _withDB(Model)

describe("middlewares : posts", () => {
    describe("getAll : ", () => {
        withoutDB(() => {   
            returnsErr(getAll)
        })
    
        withDB(() => {
            respondsWith("all the posts", getAll,  () => Post.query())
        })
    })

    describe("getOne : ", () => {
        withoutDB(() => {   
            returnsErr(getOne)
        })
    
        withDB(() => {
            respondsWith("specific post", getOne,  () => Post.query().where("id", 1).then(arr => arr[0]))

            describe("on requesting with an unabsent id", () => {
                test("returns error", async () => {
                    const ctx = {
                        ...getCtx(),
                        params: {
                            id: 23
                        }
                    }
                    await getOne(ctx, async () => {})
                    expect(ctx.status).toBe(404)
                    expect(ctx.body).toEqual({
                        status: "error",
                        data: "Post with id 23 doesn't exist."
                    })
                })
            })
        })
    })
})