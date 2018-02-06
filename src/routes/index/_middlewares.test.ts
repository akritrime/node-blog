import { get } from './_middlewares'

describe("middlewares : index", () => {
    test("get responds with a JSON", async () => {
        const ctx: any = {}
        await get(ctx, async () => {})
        expect(ctx.body).toEqual({
            status: "success"
            , message: "Hello, World!"
        })
    })
})