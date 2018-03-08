import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import * as session from 'koa-session'
// import * as passport from 'koa-passport'
import { router as indexRouter } from './routes/index'
import { router as postsRouter } from './routes/posts'
import { router as authRouter } from './routes/auth'

export const app = new Koa()

const SECRET_KEYS = process.env.SECRET_KEYS

app.keys = SECRET_KEYS && JSON.parse(SECRET_KEYS) || ['secret-key', 'second-secret']
app.use(session(app))

app.use(bodyparser())

app.use(authRouter.routes())
// import './auth'
// app.use(passport.initialize())
// app.use(passport.session())

app.use(indexRouter.routes())
app.use(postsRouter.routes())