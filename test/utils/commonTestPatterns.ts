import { dbConf } from "./index";
import { SuperTest, Test } from 'supertest'
// For writing tests that needs a working knex connection.
// You supply the Model as an argument rather than depending on the global state.
// Also it returns a closure, in case more than one collection of tests needs to written with the same model. 
export const withDB = (Model) => (tests: jest.EmptyFunction) => describe("with db properly initialized", () => {
    const { setUp, tearDown, knexInit, knexDestroy } = dbConf(Model)
    
    
    beforeEach(setUp)
    
    afterEach(tearDown)
    
    tests()
})


// following function is just because I am too lazy to write common strings
export const withoutDB = (tests: jest.EmptyFunction) => describe("without proper db initialization", tests)

// expect test for JSON api endpoints
export const expectJSON = (res, status: "success"|"error") => {
    expect(res.type).toBe("application/json")
    expect(res.body).toBeInstanceOf(Object)
    if (status === "success") {
        expect(res.status).toBe(200)
    } else {
        expect(res.status).not.toBe(200)
    }
    expect(res.body.status).toBe(status)
}
// common test for all api endpoints. Start with this, always.
export const returnsJSON = (req: SuperTest<Test>) => (path: string, status: "success"|"error") => (description: string, tests: jest.EmptyFunction) => describe(description, () => {
    test("returns JSON.", async () => {
        const res = await req.get(path)
        expectJSON(res, status)
    })

    tests()
})

// expect an error message
export const expectErr = (res) => {
    expect(res.body.status).toBe("error")
    expect(res.body.data).toBeDefined()
}

// common test for api returning error
export const returnsErr = (req: SuperTest<Test>) => (path: string) => {
    test("returns proper error message", async () => {
        const res = await req.get("/posts")
        expectErr(res)
    })
}