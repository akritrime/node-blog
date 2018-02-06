import { get } from './_middlewares'
import { dbConf } from '../../../test/utils'
import { Model } from 'objection'
import { Post } from '../../db/models/post'

describe("middlewares : posts", () => {
    
    describe("without proper db initialization", () => {
        
        test("get responds with a JSON", async () => {
            const ctx: any = {}
            await get(ctx, async () => {})
            expect(ctx.status).not.toBe(200)
            // console.log(ctx)
            expect(ctx.body.status).toBe("error")
            // expect(ctx.body.data).toBeInstanceOf(String)
            // console.log(JSON.stringify(ctx.body))
        })
    
    })

    describe("with proper db initialization", () => {
        const { setUp, tearDown, knexInit, knexDestroy } = dbConf(Model)
        
        beforeAll(knexInit)
        beforeEach(setUp)
        
        afterEach(tearDown)
        afterAll(knexDestroy)
        
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