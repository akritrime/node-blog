import { Middleware } from "koa"
import { Post } from '../../db/models'
import { success, error, ErrorWithStatus } from '../../utils/forCtx'

export const getAll: Middleware = async (ctx, next) => {
    try {
        const posts = await Post.query()
        success(ctx, posts)
        return next()
    } catch (err) {
        error(ctx, err, "Error querying for posts")
    }
}

export const getOne: Middleware = async (ctx, next) => {
    try {
        const id = ctx.params.id
        const post = await Post.query().findById(id)
        // console.log((<Post>post).createdAt)
        
        if(!post) {
            throw new ErrorWithStatus(`Post with id ${id} doesn't exist.`, 404)
        }
        success(ctx, post)
        return next()
    } catch (err) {
        // console.error(err)
        error(ctx, err, "Error querying for post")
    }
}

export const post: Middleware = async (ctx, next) => {
    try {
        const { title, content } = ctx.request.body
        if (!(title && content)) {
            throw new ErrorWithStatus("Both content and title are needed.", 400)
        }
        const post = await Post.query()
            .insert({ title, content })
            .returning("*")
        success(ctx, post)
        return next()
    } catch (err) {
        // console.error(err)
        error(ctx, err, "Error querying for post")
    }
}

export const put: Middleware = async (ctx, next) => {
    try {
        const { title, content } = ctx.request.body
        const id = ctx.params.id
        if(!(title || content)) {
            throw new ErrorWithStatus("Needs either title or content", 400)
        }
        const opts: any = {}
        if (title) opts.title = title
        if (content) opts.content = content
        const updatedPost = await Post.query()
            .where("id", id)
            .patch(opts)
            .returning("*")
            .first()
        if (!updatedPost) {
            throw new ErrorWithStatus(`Post with id ${id} doesn't exist.`, 404)
        }
        success(ctx, updatedPost)
        return next()
    } catch (err) {
        error(ctx, err, "Error with updating post")
    }
}

export const del: Middleware = async (ctx, next) => {
    try {
        const id = ctx.params.id
        const post = await Post.query()
            .where('id', id)
            .del()
            .returning("*")
            .first()
        
        if(!post) throw new ErrorWithStatus(`Post with id ${id} doesn't exist.`, 404)

        success(ctx, post)
        return next()
    } catch (err) {
        error(ctx, err, "Error deleting post")
    }
}