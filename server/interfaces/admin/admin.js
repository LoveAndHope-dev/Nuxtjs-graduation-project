import Router from 'koa-router';
import Admin from '../../dbs/models/admin'

let router = new Router({ prefix: '/manager/manager_manage' })

router.get('/getManager', async ctx => {
  try {
    let result = await Admin.find()
    ctx.body = {
      code: 0,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      data: {}
    }
  }
})

export default router
