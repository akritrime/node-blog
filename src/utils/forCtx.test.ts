import { success, error } from './forCtx'

describe("utilities for context mutation", () => {
    describe("success", () => {
        const ctx: any = {}
        success(ctx, "pass")
        
        it("adds 'success' status", () => {
            expect(ctx.body.status).toBe("success")
        })

        it("adds appropriate data", () => {
            expect(ctx.body.data).toBe("pass")
        })
    })

    describe("error", () => {
        const ctx: any = {}
        error(ctx, {}, "errored")
        
        it("adds 'error' status", () => {
            expect(ctx.body.status).toBe("error")
        })

        it("adds appropriate data", () => {
            expect(ctx.body.data).toBe("errored")
        })

        it("changes http status to 500", () => {
            expect(ctx.status).toBe(500)
        })

        it("reads data from error", () => {
            error(ctx, { status: 400, message: "From Error, With Love"})
            expect(ctx.status).toBe(400)
            expect(ctx.body.data).toBe("From Error, With Love")
        })

        it("has proper defaults", () => {
            error(ctx)
            expect(ctx.status).toBe(500)
            expect(ctx.body.data).toBe("Internal server error.")
        })
    })
})