import { IMiddleware } from "koa-router"
import { Post } from '../../db/models/post'
import { success, error, ErrorWithStatus } from '../../utils/forCtx'

export const getAll: IMiddleware = async (ctx, next) => {
    try {
        const posts = await Post.query()
        success(ctx, posts)
    } catch (err) {
        error(ctx, err, "Error querying for posts")
    }
}

export const getOne: IMiddleware = async (ctx, next) => {
    try {
        const id = ctx.params.id
        const post = await Post.query()
            .where("id", id)
        // console.log(post)
        if(post.length == 0) {
            const err = new ErrorWithStatus(`Post with id ${id} doesn't exist.`)
            err.status = 404
            throw err
        }
        success(ctx, post[0])
    } catch (err) {
        // console.error(err)
        error(ctx, err, "Error querying for post")
    }
}

export const post: IMiddleware = async (ctx, next) => {
    try {
        
    } catch (err) {
        
    }
}