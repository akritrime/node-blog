import { getAll, getOne, post } from './_middlewares'

import { getCtx
       , returnsErr
       , returnsSuccess
       } from '../../../test/utils/forMiddlewares'

import { Model } from 'objection'
import { Post } from '../../db/models/post'
import { dbConf } from '../../../test/utils/index';

const { knexInit
      , knexDestroy
      , setUp
      , tearDown
      } = dbConf(Model)

const next = async () => {}

beforeAll(knexInit)
afterAll(knexDestroy)

describe("middlewares : posts", () => {
    describe("getAll : ", () => {
        
        describe("without DB connection" , () => {
            const ctx = getCtx()
            beforeAll(async () => await getAll(ctx, next))
            it("responds with an error", async () => {
                returnsErr(ctx)
            })
        })

        describe("with DB connection", () => {
            const ctx = getCtx()

            beforeEach(async () => { 
                await setUp()
                await getAll(ctx, next)
            })
            afterEach(tearDown)
            
            it("responds with success", async () => {
                returnsSuccess(ctx)
            })

            it("response has all the posts", async () => {
                const posts  = await Post.query()
                expect(posts.length).toBe(3)
                expect(ctx.body.data.length).toBe(3)
                expect(ctx.body.data).toEqual(posts)
            })

        })
    })

    describe("getOne : ", () => {

        describe("without DB connection" , () => {
            const ctx = getCtx()
            beforeAll(async () => await getOne(ctx, next))
            it("responds with an error", async () => {
                returnsErr(ctx)
            })
        })

        describe("with DB connection", () => {
            const ctx = getCtx()
            const properties = ["id","title", "content"]

            beforeEach(setUp)
            afterEach(tearDown)
            
            it("responds with success", async () => {
                await getOne(ctx, next)
                returnsSuccess(ctx)
            })

            it("response with specific post", async () => {
                const post = await Post.query().findById(1)
                await getOne(ctx, next)
                properties.map( v => {
                    expect(post).toHaveProperty(v)
                    expect(ctx.body.data).toHaveProperty(v)
                })
                // expect(ctx.body.data.length).toBe(3)
                expect(ctx.body.data).toEqual(post)
            })

            it("errors for wrong id", async () => {
                const ctx = {
                    ...getCtx(),
                    params: {
                        id: 4
                    }
                }
                await getOne(ctx, next)
                returnsErr(ctx)
                expect(ctx.status).toBe(404)
                expect(ctx.body.data).toBe("Post with id 4 doesn't exist.")
            })

        })

    })

    describe("post : ", () => {

        describe("without DB connection" , () => {
            const ctx = getCtx()
            beforeAll(async () => await post(ctx, next))
            it("responds with an error", async () => {
                returnsErr(ctx)
            })
        })

        describe("with DB connection", () => {
            const ctx = getCtx()
            const properties = ["id","title", "content"]

            beforeEach(setUp)
            afterEach(tearDown)
            
            it("responds with success", async () => {
                await post(ctx, next)
                returnsSuccess(ctx)
            })

            it("response with specific post", async () => {
                await post(ctx, next)
                const newPost = await Post.query().findById(4)
                
                properties.map( v => {
                    expect(newPost).toHaveProperty(v)
                    expect(ctx.body.data).toHaveProperty(v)
                })
                // expect(ctx.body.data.length).toBe(3)
                expect(ctx.body.data).toEqual(newPost)
            })

            it("inserts a new post", async () => {
                const before = await Post.query()
                await post(ctx, next)
                const after = await Post.query()
                expect(before.length).toBe(after.length - 1)
            })

            it("requires both title and content", async () => {
                const expectErr = async (req) => {
                    const ctx = {
                        ...getCtx(),
                        ...req
                    }
                    await post(ctx, async () => {})
                    expect(ctx.status).toBe(400)
                    expect(ctx.body).toEqual({
                        status: "error",
                        data: "Both content and title are needed."
                    })
                }
                
                await Promise.all([
                    expectErr({
                        request: {
                            body: {
                                title: "NEW TITLE AND NO CONTENT"
                            }
                        }
                    })
                    , expectErr({
                        request: {
                            body: {
                                content: "NEW CONTENT AND NO TITLE"
                            }
                        }
                    })
                ])
            })

        })

    })

})
