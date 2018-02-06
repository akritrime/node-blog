import { req, returnsJSON } from './utils'
import { withDB } from './utils/commonTestPatterns'
import { Model } from 'objection'


process.env.NODE_ENV = "test"

describe("routes : index.", () => {
    
    describe("GET /", () => {
        
        test("Returns a JSON.", async () => {
            const res = await req.get("/")
            returnsJSON(res)
        })
        
    })
})

withDB(Model)("routes : posts", () => {
    // const { setUp, tearDown, knexInit, knexDestroy } = dbConf(Model)
    
    // beforeAll(knexInit)
    // beforeEach(setUp)

    // afterEach(tearDown)
    // afterAll(knexDestroy)

    describe("GET /posts", () => {
        test("returns all the posts.", async () => {
            const res = await req.get("/posts")
            returnsJSON(res)
            expect(res.body.status).toBe("success")
            expect(res.body.data.length).toBe(3)
        })
    })
})