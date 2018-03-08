import { Middleware } from 'koa'
import * as jwt from 'jsonwebtoken'
import { error, ErrorWithStatus } from './forCtx'
import { User } from '../db/models'


export const authourize: Middleware = async (ctx, next) => {
    try {
        // const 
        const token = ctx.headers.authorization
        const jwtSecret = process.env.JWT_SECRET || "secret... shhh..."

        if (!token) throw new ErrorWithStatus("Forbidden. Authorization header missing", 403)

        const _id = jwt.verify(token, jwtSecret, { 
            issuer: 'api:backend'
        })
        
        const id = base64.decode(_id)

        const user = await User.query()
            .where('id', id)
            .first()
        
        if (!user) throw new ErrorWithStatus("Invalid token. Please create an account or re-login.", 401)

        ctx.state.user = user

        return next()
    } catch (err) {
        error(ctx, err, "Unauthorized access.")
    }
}

export const base64 = {
    encode: (val: object | string) => {
        if (typeof val === 'object')
            val = JSON.stringify(val)
        return Buffer.from(val).toString('base64')
    },
    decode: (val: object | string) => {
        if (typeof val === 'object')
            val = JSON.stringify(val)
        return Buffer.from(val, 'base64').toString()
    }
}