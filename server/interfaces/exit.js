import Router from 'koa-router';
import Redis from 'koa-redis'
import passport from './utils/passport'

let router = new Router()

let Store = new Redis().client

router.get('/exit', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1
    }
  }
})

export default router