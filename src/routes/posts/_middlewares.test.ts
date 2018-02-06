import { get } from './_middlewares'
import { knex, dbConf } from '../../../test/utils'
import { Model } from 'objection'
import { Post } from '../../db/models/post'

describe("middlewares : posts", () => {
    
    describe("without proper db initialization", () => {
        
        test("get responds with a JSON", async () => {
            const ctx: any = {}
            await get(ctx, async () => {})
            expect(ctx.status).not.toBe(200)
            expect(ctx.body.status).toBe("error")
            // expect(ctx.body.data).toBeInstanceOf(String)
            // console.log(JSON.stringify(ctx.body))
        })
    
    })

    describe("with proper db initialization", () => {
        Model.knex(knex)
        const { setUp, tearDown } = dbConf(Model)
        
        beforeEach(setUp)
        afterEach(tearDown)
        
        test("get responds with a JSON", async () => {
            const ctx: any = {}
            const posts = await Post.query()
            await get(ctx, async () => {})
            expect(ctx.body.status).toBe("success")
            expect(ctx.body.data).toEqual(posts)
            // console.log(JSON.stringify(ctx.body))
        })
    
    })
})