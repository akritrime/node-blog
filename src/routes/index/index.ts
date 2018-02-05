import * as Router from 'koa-router'
import { get } from './_handler'
export const router = new Router()

router.get("/", get)