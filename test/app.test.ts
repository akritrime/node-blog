import { req, returnsJSON, knex, dbConf } from './utils'
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

describe("routes : posts", () => {
    Model.knex(knex)
    const { setUp, tearDown } = dbConf(Model)

    beforeEach(setUp)
    afterEach(tearDown)

    describe("GET /posts", () => {
        test("returns all the posts.", async () => {
            const res = await req.get("/posts")
            returnsJSON(res)
            expect(res.body.status).toBe("success")
            expect(res.body.data.length).toBe(3)
        })
    })
})