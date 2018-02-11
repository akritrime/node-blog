import { IMiddleware } from "koa-router";

export const get: IMiddleware = (ctx) => {
    ctx.body = {
        status: "success"
        , data: "Hello, World!"
    }
}