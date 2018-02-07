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
        const post = await Post.query().findById(id)
        // console.log(post)
        if(!post) {
            const err = new ErrorWithStatus(`Post with id ${id} doesn't exist.`)
            err.status = 404
            throw err
        }
        success(ctx, post)
    } catch (err) {
        // console.error(err)
        error(ctx, err, "Error querying for post")
    }
}

export const post: IMiddleware = async (ctx, next) => {
    try {
        const { title, content } = ctx.request.body
        if (!title || !content) {
            const err = new ErrorWithStatus("Both content and title are needed.")
            err.status = 400
            throw err 
        }
        const post = await Post.query().insert({ title, content })
        success(ctx, post)
    } catch (err) {
        // console.error(err)
        error(ctx, err, "Error querying for post")
    }
}