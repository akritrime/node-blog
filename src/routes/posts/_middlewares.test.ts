import { getAll, getOne, post, put, del } from './_middlewares'

import { getCtx
       , returnsErr
       , returnsSuccess
       } from '../../../test/utils/forMiddlewares'

import { Model } from 'objection'
import { Post } from '../../db/models/post'
import { dbConf } from '../../db/utils';

const { knexInit
      , knexDestroy
      , setUp
      , tearDown
      } = dbConf(Model)
      
process.env.NODE_ENV = "test_posts"

const next = async () => {}

// beforeAll(knexInit)
// afterAll(knexDestroy)

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
            
            beforeAll(knexInit)
            afterAll(knexDestroy)

            beforeEach(async () => { 
                await setUp()
                await getAll(ctx, next)
            })
            afterEach(tearDown)
            
            it("responds with success", async () => {
                returnsSuccess(ctx)
                // console.log(Model.knex().client.config.connection)
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
            
            beforeAll(knexInit)
            afterAll(knexDestroy)

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

            beforeAll(knexInit)
            afterAll(knexDestroy)

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
                        ...{
                            request: {
                                body: {
                                    ...req
                                }
                            }
                        }
                    }
                    await post(ctx, async () => {})
                    expect(ctx.status).toBe(400)
                    expect(ctx.body).toEqual({
                        status: "error",
                        data: "Both content and title are needed."
                    })
                }
                
                await Promise.all([
                    expectErr( {title: "NEW TITLE AND NO CONTENT"})
                    , expectErr({content: "NEW CONTENT AND NO TITLE"})
                ])
            })

        })

    })

    describe("put : ", () => {

        describe("without DB connection" , () => {
            const ctx = getCtx()
            beforeAll(async () => await put(ctx, next))
            it("responds with an error", async () => {
                returnsErr(ctx)
            })
        })

        describe("with DB connection", () => {
            const vars: any = {}
            const ctx = getCtx()
            const properties = ["id","title", "content"]

            beforeAll(async () => {
                await knexInit()
                await setUp()
                vars.post = await Post.query().findById(1)
                await put(ctx, next)
                vars.updatedPost = await Post.query().findById(1)
            })

            // beforeEach(setUp)
            afterAll(async () => {
                await tearDown()
                await knexDestroy()
            })
            
            it("responds with success", async () => {
                // await put(ctx, next)
                returnsSuccess(ctx)
            })

            it("response with specific post", async () => {
                // await put(ctx, next)
                
                properties.map( v => {
                    expect(vars.updatedPost).toHaveProperty(v)
                    expect(ctx.body.data).toHaveProperty(v)
                })
                // expect(ctx.body.data.length).toBe(3)
                expect(ctx.body.data).toEqual(vars.updatedPost)
            })

            it("updated the specified post", async () => {
                const { post, updatedPost } = vars
                expect(post).not.toEqual(updatedPost)
                const { request: { body: {title, content}}} = getCtx()
                expect(updatedPost.title).toBe(title)
                expect(updatedPost.content).toBe(content)
            })

            it("errors for wrong id", async () => {
                const ctx = {
                    ...getCtx(),
                    params: {
                        id: 99
                    }
                }
                await put(ctx, next)
                returnsErr(ctx)
                expect(ctx.status).toBe(404)
                expect(ctx.body.data).toBe("Post with id 99 doesn't exist.")
            })

            it("errors if neither title or content is provided", async () => {
                const ctx = {
                    ...getCtx(),
                    ...{
                        request: {
                            body: {
                                
                            }
                        }
                    }
                }
                await put(ctx, async () => {})
                returnsErr(ctx)
                expect(ctx.status).toBe(400)
                expect(ctx.body.data).toEqual("Needs either title or content")
            })

        })

    })

    describe("del : ", () => {

        describe("without DB connection" , () => {
            const ctx = getCtx()
            beforeAll(async () => await del(ctx, next))
            it("responds with an error", async () => {
                returnsErr(ctx)
            })
        })

        describe("with DB connection", () => {
            const vars: any = {}
            const ctx = getCtx()
            const properties = ["id","title", "content"]

            beforeAll(async () => {
                await knexInit()
                await setUp()
                vars.before = await Post.query()
                vars.post = await Post.query().findById(1)
                await del(ctx, next)
                vars.after = await Post.query()
            })

            // beforeEach(setUp)
            afterAll(async () => {
                await tearDown()
                await knexDestroy()
            })
            
            it("responds with success", async () => {
                // await del(ctx, next)
                returnsSuccess(ctx)
                // console.log(vars.after.length)
            })

            it("response with specific post", async () => {
                // await del(ctx, next)
                
                properties.map( v => {
                    // expect(vars.updatedPost).toHaveProperty(v)
                    expect(ctx.body.data).toHaveProperty(v)
                })
                // expect(ctx.body.data.length).toBe(3)
                expect(ctx.body.data).toEqual(vars.post)
            })

            it("deleted the specified post", async () => {
                expect(vars.before.length).toBe(vars.after.length + 1)
                const post = await Post.query().findById(1)
                expect(post).toBeUndefined()
            })

            it("errors for wrong id", async () => {
                const ctx = {
                    ...getCtx(),
                    params: {
                        id: 99
                    }
                }
                await del(ctx, next)
                returnsErr(ctx)
                expect(ctx.status).toBe(404)
                expect(ctx.body.data).toBe("Post with id 99 doesn't exist.")
            })

        })

    })

})
