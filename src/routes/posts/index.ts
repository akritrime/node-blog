import * as Router from 'koa-router'
import { get } from './_middlewares'
export const router = new Router()

router.get("/posts", get)