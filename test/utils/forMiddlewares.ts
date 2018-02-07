import { IMiddleware, IRouterContext } from "koa-router"
import { withDB as withDBPattern } from './commonTestPatterns'

// get minimum object that resembles the required aspect of a middleware's context
export const getCtx = (): any => ({
    status: 200,
    params: {
        id: 1
    }
})

// a common test for checking error.
export const returnsErr = (fn: IMiddleware) => test("responds with an error.", async () => {
    const ctx = getCtx()
    await fn(ctx, async () => {})
    expect(ctx.status).not.toBe(200)
    expect(ctx.body.status).toBe("error")
})

// checks if a middleware returns the desired the response
export const respondsWith = (obj: string, fn: IMiddleware, prmObj) => test(`responds with ${obj}`, async () => {
    const ctx = getCtx()
    const obj = await prmObj()
    await fn(ctx, async () => {})
    expect(ctx.body.status).toBe("success")
    expect(ctx.body.data).toEqual(obj)
})