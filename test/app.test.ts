import { req } from './utils'
import { withDB, returnsJSON } from './utils/commonTestPatterns'
import { Model } from 'objection'


process.env.NODE_ENV = "test"

describe("routes : index.", () => {
    
    returnsJSON(req)("GET /", () => {
        
        test("Returns Hello, World.", async () => {
            const res = await req.get("/")
            expect(res.body).toEqual({
                status: "success"
                , message: "Hello, World!"
            })
        })
        
    })
})

withDB(Model)("routes : posts", () => {

    describe("GET /posts", () => {
        test("returns all the posts.", async () => {
            const res = await req.get("/posts")
            returnsJSON(res)
            expect(res.body.status).toBe("success")
            expect(res.body.data.length).toBe(3)
        })
    })
})