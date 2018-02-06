import * as Router from 'koa-router'
import { getAll } from './_middlewares'
export const router = new Router()

router.get("/posts", getAll)