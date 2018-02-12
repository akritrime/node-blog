import { req, knex, dbConf } from './utils'
import { expectJSON
    //    , expectErr
       , expectPost
       } from './utils/commonTestPatterns'
import { Model } from 'objection'

process.env.NODE_ENV = "test"

describe("routes : index.", () => {
    const res = req.get("/")
    describe("GET /", () => {
        it("responds with JSON", async () => {
            expectJSON(await res, "success")
        })

        it("responds with hello,world", async () => {
            const response = await res
            expect(response.body.data).toBe("Hello, World!")
        })
    })
})

describe("routes : posts", () => {
    const { knexInit, setUp, tearDown, knexDestroy } = dbConf(Model)
    beforeAll(async () => {
        await knexInit()
        await setUp()
    })

    afterAll(async () => {
        await tearDown()
        await knexDestroy()
    })

    describe("GET /posts", () => {
        
        it("returns a JSON with success status", async () => {
            const res = await req.get("/posts")
            expectJSON(res, "success")
        })

        it("returns all the posts", async () => {
            const { body } = await req.get("/posts")
            expect(body.data.length).toBe(3)
            Array.from(body.data).map((v: any, i) => {
                expectPost(v, i+1)
            })
        })
    })

    describe("GET /posts/:id", () => {
        
        it("returns a JSON with success status", async () => {
            const res = await req.get("/posts/1")
            expectJSON(res, "success")
        })

        it("returns specific posts", async () => {
            const { body: { data } } = await req.get("/posts/1")
            expectPost(data)
        })

        it("errors on providing unavailable id", async () => {
            const res = await req.get("/posts/9999")
            expectJSON(res, "error")
            expect(res.status).toBe(404)
            expect(res.body.data).toBe("Post with id 9999 doesn't exist.")
        })
    })

    describe("POST posts/", () => {
        const vars: any = {} 
        const newPost = {
            title: "Title worthy of a fine content"
            , content: "Thee shall see my content."
        }

        beforeAll(async () => {
            vars.res = await req.post("/posts").send(newPost)
        })

        it("returns a JSON with success status", async () => {
            const { res } = vars
            expectJSON(res, "success")
        })

        it("returns a Post", async () => {
            const { res } = vars
            expectPost(res.body.data)
        })

        it("has the right title and content", () => {
            const { data } = vars.res.body
            expect(data.title).toBe(newPost.title)
            expect(data.content).toBe(newPost.content)
        })


        it("adds a new post to the database", async () => {
            const res = await req.get("/posts")
            const { body } = res
            const { data: post } = vars.res.body
            expect(body.data.length).toBe(4)
            expect(post.id).toBe(4)
        })

        it("needs both title and content", async () => {
            const res = await req.post("/posts").send({
                title: "No Content for ya"
            })
            const { body: { data: allPosts } } = await req.get("/posts")
            expectJSON(res, "error")    
            expect(allPosts.length).toBe(4)
        })
    })

    describe("PUT /posts/:id", () => {
        const vars: any  = {}
        const newTitle = "something new"
        const newContent = "something new for you too"
        const testPath = "/posts/1";
        beforeAll(async () => {
            vars.before = await req.get(testPath)
            // await new Promise((resolve) => setTimeout(() => resolve(42), 10000))
            vars.res = await req.put(testPath).send({title: newTitle})
            vars.after = await req.get(testPath)
        })

        it("returns a JSON with success status", () => {
            const { res } = vars
            expectJSON(res, "success")
        })

        it("returns a Post", () => {
            const { res } = vars
            expectPost(res.body.data)
        })

        it("has the right title and content", () => {
            const { data } = vars.res.body
            const { data: before } = vars.before.body
            expect(data.title).toBe(newTitle)
            expect(data.content).toBe(before.content)
        })

        it("updates the post", async () => {
            const { data: before } = vars.before.body
            // console.log(await req.get(testPath))
            const { data: after } = vars.after.body
            // console.log(before, after)
            expect(before.created_at).toBe(after.created_at)
            expect(before.updated_at).not.toBe(after.updated_at)
            expect(after.content).toBe(before.content)
            expect(after.title).toBe(newTitle)
            await req.put(testPath).send({content: newContent})
            const { body: { data: update } } = await req.get(testPath)
            expect(update.updated_at).not.toBe(after.updated_at)
            expect(update.content).toBe(newContent)
        })

        it("errors on sending nothing", async () => {
            const res = await req.put(testPath).send({})
            expectJSON(res, "error")
        })

    })

    describe("DELETE /posts/:id", () => {
        const vars: any  = {}
        const newTitle = "something new"
        const newContent = "something new for you too"
        const testPath = "/posts/1";
        beforeAll(async () => {
            vars.before = await req.get(testPath)
            // await new Promise((resolve) => setTimeout(() => resolve(42), 10000))
            vars.res = await req.del(testPath).send({title: newTitle})
            vars.after = await req.get(testPath)
        })

        it("returns a JSON with success status", () => {
            const { res } = vars
            expectJSON(res, "success")
        })

        it("returns a Post", () => {
            const { res } = vars
            expectPost(res.body.data)
        })

        it("deletes the post", () => {
            expectJSON(vars.before, "success")
            expectJSON(vars.after, "error")
        })

        it("errors on wrong id", async () => {
            const res = await req.del("/posts/9")
            expectJSON(res, "error")
        })

    })
})
