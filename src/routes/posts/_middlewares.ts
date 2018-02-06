import { IMiddleware } from "koa-router"
import { Post } from '../../db/models/post'

export const get: IMiddleware = async (ctx, next) => {
    try {
        const posts = await Post.query()
        ctx.body = {
            status: "success"
            , data: posts
        }
    } catch (err) {
        // console.error(err)
        ctx.status = err.status || 500
        ctx.body = {
            status: "error"
            , data: err.message || "Err querying for posts"
        }
    }
}