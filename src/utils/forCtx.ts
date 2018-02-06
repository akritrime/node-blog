import { Context } from 'koa'

export const success = (ctx: Context, data: any) => {
    ctx.body = {
        status: "success"
        , data
    }
}

export const error = (ctx: Context, err: any = {}, msg?: string) => {
    ctx.status = err.status || 500
    ctx.body = {
        status: "error"
        , data: err.message || msg || "Internal server error."
    }
}