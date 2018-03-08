import { Middleware } from 'koa'
import { success, error } from '../../utils/forCtx'
import { User } from '../../db/models'

export const signup: Middleware = async (ctx, next) => {
    try {
        const { username, email, password, password_conf, firstName, lastName } = ctx.request.body

        const  user = 1
        return next()
    } catch (err) {
        error(ctx, err, "Error signing up.")
    }
}

export const login: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        error(ctx, err, "Error loging in.")
    }
}

export const logout: Middleware = async (ctx, next) => {
    try {
        
        return next()
    } catch (err) {
        error(ctx, err, "Error loging out.")
    }
}