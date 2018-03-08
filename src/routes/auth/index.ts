import * as Router from "koa-router"
import { signup, login, logout } from './_middlewares'

export const router = new Router()

router.post("/auth/signup", signup)
router.post("/auth/login", login)
router.post("/auth/logout", logout)