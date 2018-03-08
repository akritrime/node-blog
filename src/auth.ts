// import * as passport from 'koa-passport'
// import { User } from './db/models/user'
// import { Strategy } from 'passport-local'

// passport.serializeUser((user: any, done) => { done(null, user.id)})

// passport.deserializeUser(async (id: any, done) => {
//     try {
//         const user = await User.query().findById(id)
//         done(null, user)
//     } catch (err) {
//         done(err)
//     }
// })

// const opts: any = {}

// passport.use(new Strategy(opts, async (username, password, done) => {
//     const user = await User.query().where({username}).first()
// }))