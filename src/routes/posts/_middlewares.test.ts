import { getAll, getOne, post } from './_middlewares'
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
            respondsWith("all the posts", getAll, () => Post.query()
            )
        })
    })

    describe("getOne : ", () => {
        withoutDB(() => {   
            returnsErr(getOne)
        })
    
        withDB(() => {
            respondsWith(
                "specific post"
                , getOne
                ,  () => Post.query().where("id", 1).then(arr => arr[0])
            )

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

    describe("post : ", () => {
        withoutDB(() => {
            returnsErr(post)
        })

        withDB(() => {
            // respondsWith(
            //     "specific post"
            //     , getOne
            //     ,  () => Post.query().findById(4)
            // )
            test("inserts a new post", async () => {
                const ctx = getCtx()
                await post(ctx, async() => {})
                const insertedPost = await Post.query().findById(4)
                expect(ctx.body).toEqual({
                    status: "success"
                    , data: insertedPost
                })
            })

            test("returns error", async () => {
                const ctx = {
                    ...getCtx(),
                    request: {
                        body: {
                            title: "NEW TITLE AND NO CONTENT"
                        }
                    }
                }
                await post(ctx, async () => {})
                expect(ctx.status).toBe(400)
                expect(ctx.body).toEqual({
                    status: "error",
                    data: "Both content and title are needed."
                })
            })
        })
    })
})