import Router from 'koa-router'
import Drink from '../../dbs/models/drink'
import Cake from '../../dbs/models/cake'

let router = new Router({ prefix: '/teahouse/shop' })

router.get('/getTea', async (ctx) => {
  try {
    let result = await Drink.find()
    ctx.body = {
      thtcode: 0,
      thtresult: result
    }
  } catch (e) {
    ctx.body = {
      thtcode: -1,
      thtresult: {}
    }
  }
})

router.get('/getCake', async (ctx) => {
  try {
    let result = await Cake.find()
    ctx.body = {
      thccode: 0,
      thcresult: result
    }
  } catch (e) {
    ctx.body = {
      thccode: -1,
      thcresult: {}
    }
  }
})

export default router