import { req } from './utils'
import { withDB as _withDB
        , returnsJSON as _returnsJSON
        , withoutDB
        , returnsErr as _returnsErr
        , expectJSON
        , expectErr
        } from './utils/commonTestPatterns'
import { Model } from 'objection'

process.env.NODE_ENV = "test"

const returnsJSON = _returnsJSON(req)
const returnsErr = _returnsErr(req)
const withDB = _withDB(Model)

describe("routes : index.", () => {
    
    returnsJSON("/", "success")("GET /", () => {
        
        test("Returns Hello, World.", async () => {
            const res = await req.get("/")
            expect(res.body).toEqual({
                status: "success"
                , message: "Hello, World!"
            })
        })
        
    })
})

describe("routes : posts", () => {
    withoutDB(() => {
        returnsJSON("/posts", "error")("GET /posts", () => {
            returnsErr("/posts")
        })
        
        returnsJSON("/posts/1", "error")("GET /posts/:id", () => {
            returnsErr("/posts/1")
        })

        // describe("POST /posts", () => {
        //     const vars = {
        //         res: {}
        //     }
        //     beforeAll(async () => {
        //         vars.res = await req
        //             .post("/posts")
        //             .send({ 
        //                 title: "A"
        //                 , content: "B" 
        //             }) 
        //     })
        //     test("returns a JSON", async () => {
        //         const { res } = vars
        //         expectJSON(res, "error")
        //     })

        //     test("returns proper error message", async() => {
        //         expectErr(vars.res)
        //     })
        // })
    })
    withDB(() => {

        returnsJSON("/posts", "success")("GET /posts", () => {
            test("returns all the posts", async () => {
                const res = await req.get("/posts")
                expect(res.body.status).toBe("success")
                expect(res.body.data.length).toBe(3)
            })
        })

        returnsJSON("/posts/1", "success")("GET /posts/:id", () => {
            test("returns a specific post", async () => {
                const res = await req.get("/posts/1")
                expect(res.body.status).toBe("success")
                expect(res.body.data).toHaveProperty("id")
                expect(res.body.data).toHaveProperty("title")
                expect(res.body.data).toHaveProperty("content")
            })
        })
    })
})