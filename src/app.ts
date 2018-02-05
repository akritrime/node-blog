import * as Koa from 'koa'
import { router as indexRouter } from './routes/index'

export const app = new Koa()

app.use(indexRouter.routes())