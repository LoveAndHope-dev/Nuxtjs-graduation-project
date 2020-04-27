import Router from 'koa-router';
import Redis from 'koa-redis'
import passport from './utils/passport'

let router = new Router({ prefix: '/login' })

let Store = new Redis().client

router.post('/staffsignin', async (ctx, next) => {
  console.log('staffsignin')
  return passport.authenticate('staff', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info,
          user: user
        }
      }
    }
  })(ctx, next)
})

router.post('/adminsignin', async (ctx, next) => {
  console.log('adminsignin')
  return passport.authenticate('admin', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info,
          user
        }
      }
    }
  })(ctx, next)
})

export default router