import * as Router from 'koa-router'
import { getAll, getOne, post } from './_middlewares'
export const router = new Router()

router.get("/posts", getAll)
router.get("/posts/:id", getOne)
router.post("/posts", post)