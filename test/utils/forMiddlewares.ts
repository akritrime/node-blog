import { IMiddleware, IRouterContext } from "koa-router"
// import { expect } from 'chai'

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
export const returnsErr = (ctx: any = {}) => {
    expect(ctx.status).not.toBe(200)
    expect(ctx.body.status).toBe("error")
    expect(ctx.body.data).toBeDefined()
}

// checks if a middleware returns the desired the response
export const returnsSuccess = (ctx: any ={}) => {
    expect(ctx.status).toBe(200)
    expect(ctx.body.status).toBe("success")
    expect(ctx.body.data).toBeDefined()
    // expect(ctx.body.data).toEqual(obj)
}
