import { IMiddleware, IRouterContext } from "koa-router"
import { withDB as withDBPattern } from './commonTestPatterns'

// get minimum object that resembles the required aspect of a middleware's context
export const getCtx = (): any => ({
    status: 200
    , params: {
        id: 1
    }
    , request: {
        body: {
            title: "A title befitting a test."
            , content: "Winner of content of the century award"
        }
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
export const respondsWith = (obj: string, fn: IMiddleware, prmObj, _ctx?: any) => test(`responds with ${obj}`, async () => {
    const ctx = _ctx || getCtx()
    const obj = await prmObj()
    await fn(ctx, async () => {})
    expect(ctx.body.status).toBe("success")
    expect(ctx.body.data).toEqual(obj)
})

// export const raisesErrWithStatus = (fn: IMiddleware, _ctx?: any, _next = async() => {}) => test("returns an error with status", async () => {
//     const ctx = {
//         ...getCtx()
//         , ..._ctx
//     }
//     await fn(ctx, _next)
// })