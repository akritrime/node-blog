import { Middleware } from "koa"
import { User } from '../../db/models'
import { success, error, ErrorWithStatus } from '../../utils/forCtx'

export const getAll: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        error(ctx)
    }
}

export const getOne: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        
    }
}

// export const post: Middleware = async (ctx, next) => {
//     try {
        
//     } catch (err) {
        
//     } finally {
//         return next()
//     }
// }

export const put: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        
    }
}

export const del: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        
    }
}