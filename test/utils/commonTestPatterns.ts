import { dbConf } from "./index";

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

export const returnsJSON = (req, opts = {}) => (description, tests) => describe(description, () => {
    test("returns JSON.", async () => {
        const res = await req.get("/")
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