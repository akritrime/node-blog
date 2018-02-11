import { get } from './_middlewares'

describe("middlewares : index", () => {
    it("get responds with a JSON", async () => {
        const ctx: any = {}
        await get(ctx, async () => {})
        expect(ctx.body).toEqual({
            status: "success"
            , data: "Hello, World!"
        })
    })
})