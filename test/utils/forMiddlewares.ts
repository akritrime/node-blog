import { IMiddleware, IRouterContext } from "koa-router"
import { withDB as withDBPattern } from './commonTestPatterns'

export const getCtx = (): any => ({
    status: 200,
    params: {
        id: 1
    }
})

export const returnsErr = (fn: IMiddleware) => test("responds with an error.", async () => {
    const ctx = getCtx()
    await fn(ctx, async () => {})
    expect(ctx.status).not.toBe(200)
    expect(ctx.body.status).toBe("error")
})

export const withoutDB = (tests: jest.EmptyFunction) => describe("without proper db initialization", tests)

export const withDB = (Model, tests: jest.EmptyFunction) => withDBPattern(Model)("with proper db initialization", tests)

export const respondsWith = (obj: string, fn: IMiddleware, prmObj) => test(`responds with ${obj}`, async () => {
    const ctx = getCtx()
    const obj = await prmObj()
    await fn(ctx, async () => {})
    expect(ctx.body.status).toBe("success")
    expect(ctx.body.data).toEqual(obj)
})