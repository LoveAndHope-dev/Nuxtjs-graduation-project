import Router from 'koa-router';
import Staff from '../../dbs/models/staff'

let router = new Router({ prefix: '/teahouse/info' })

router.get('/getInfo', async ctx => {
  console.log('ok')
  try {
    ctx.body = {
      smicode: 0,
      smiresult: [ctx.req.user.result]
    }
  } catch (e) {
    ctx.body = {
      smicode: -1,
      smiresult: []
    }
  }
})

export default router
