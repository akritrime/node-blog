import { IMiddleware } from "koa-router"
import { Post } from '../../db/models/post'

export const getAll: IMiddleware = async (ctx, next) => {
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
            , data: err.message || "Error querying for posts"
        }
    }
}

export const getOne: IMiddleware = async (ctx, next) => {
    try {
        const post = await Post.query()
            .where("id", ctx.params.id)
        ctx.body = {
            status: "success"
            , data: post
        }
    } catch (err) {
        // console.error(err)
        ctx.status = err.status || 500
        ctx.body = {
            status: "error"
            , data: err.message || "Error querying for posts"
        }
    }
} 