import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyparser from 'koa-bodyparser'

const app = new Koa()
const router = new Router()

router.post("/getname", async (ctx, next) => {
    ctx.body = ctx.request.body
})

router.get("/",async (ctx, next) => {
    ctx.body = "Hello, world"
    try {
        throw 'shit'
    } catch (error) {
        throw 'shit'
    } finally {
        return next()
    }
})

app.use(bodyparser())
app.use(async (ctx, next) => {
    try {
        console.log("before", ctx.status)
        await next()
        console.log("after", ctx.status)
    } catch (error) {
        console.log("shit error")
    }
})
app.use(router.routes())
app.use(ctx => {
    console.log('reached')
    // throw 'shit'
})
app.listen(4000)
