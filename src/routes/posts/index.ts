import * as Router from 'koa-router'
import { getAll, getOne, post, put, del } from './_middlewares'
export const router = new Router()

router.get("/posts", getAll)
router.get("/posts/:id", getOne)
router.post("/posts", post)
router.put("/posts/:id", put)
router.del("/posts/:id", del)