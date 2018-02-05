import { req, returnsJSON } from './utils'

process.env.NODE_ENV = "test"

describe("routes : index.", () => {
    
    describe("GET /", () => {
        
        test("Returns a JSON.", async () => {
            const res = await req.get("/")
            returnsJSON(res)
        })
        
    })
})