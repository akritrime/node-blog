import { success, error } from './forCtx'

describe("utilities for context mutation", () => {
    describe("success", () => {
        const ctx: any = {}
        success(ctx, "pass")
        
        test("adds 'success' status", () => {
            expect(ctx.body.status).toBe("success")
        })

        test("adds appropriate data", () => {
            expect(ctx.body.data).toBe("pass")
        })
    })

    describe("error", () => {
        const ctx: any = {}
        error(ctx, {}, "errored")
        
        test("adds 'error' status", () => {
            expect(ctx.body.status).toBe("error")
        })

        test("adds appropriate data", () => {
            expect(ctx.body.data).toBe("errored")
        })

        test("changes http status to 500", () => {
            expect(ctx.status).toBe(500)
        })

        test("reads data from error", () => {
            error(ctx, { status: 400, message: "From Error, With Love"})
            expect(ctx.status).toBe(400)
            expect(ctx.body.data).toBe("From Error, With Love")
        })

        test("has proper defaults", () => {
            error(ctx)
            expect(ctx.status).toBe(500)
            expect(ctx.body.data).toBe("Internal server error.")
        })
    })
})