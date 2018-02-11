import * as Koa from 'koa'
import * as bodyparser from 'koa-bodyparser'
import { router as indexRouter } from './routes/index'
import { router as postsRouter } from './routes/posts'

export const app = new Koa()

app.use(bodyparser())
app.use(indexRouter.routes())
app.use(postsRouter.routes())