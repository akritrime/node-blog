import { dbConf } from "./index";

export const withDB = (Model) => (description, tests) => {
    describe(description, () => {
        const { setUp, tearDown, knexInit, knexDestroy } = dbConf(Model)
        
        beforeAll(knexInit)
        beforeEach(setUp)
        
        afterEach(tearDown)
        afterAll(knexDestroy)
        
        tests()
    })
}