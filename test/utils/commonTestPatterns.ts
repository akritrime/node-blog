import { dbConf } from "./index";

// For writing tests that needs a working knex connection.
// You supply the Model as an argument rather than depending on the global state.
// Also it returns a closure, in case more than one collection of tests needs to written with the same model. 
export const withDB = (Model) => (description: string, tests: jest.EmptyFunction) => {
    describe(description, () => {
        const { setUp, tearDown, knexInit, knexDestroy } = dbConf(Model)
        
        beforeAll(knexInit)
        beforeEach(setUp)
        
        afterEach(tearDown)
        afterAll(knexDestroy)
        
        tests()
    })
}

// common test for all api endpoints. Start with this, always.
export const returnsJSON = (req, path = "/", opts = {}) => (description, tests) => describe(description, () => {
    test("returns JSON.", async () => {
        const res = await req.get(path)
        const check = {
            type: "application/json",
            status: 200,
            ...opts
        }
        expect(res.type).toBe(check.type)
        expect(res.status).toBe(check.status)
        expect(res.body).toBeInstanceOf(Object)
    })

    tests()
})