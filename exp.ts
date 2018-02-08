import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyparser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

router.post("/getname", async (ctx, next) => {
    ctx.body = ctx.request.body
})

app.use(bodyparser())
app.use(router.routes())
app.listen(4000)
