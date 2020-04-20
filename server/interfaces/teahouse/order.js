import Router from 'koa-router'
import Staff from '../../dbs/models/staff'
import Order from '../../dbs/models/order'

let router = new Router({ prefix: '/teahouse/order' })

router.get('/getOrder', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 2
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  // 总数
  const total = await Order.find({ staffid: ctx.req.user.result._id }).count()
  // 数据
  const lists = await Order.find({ staffid: ctx.req.user.result._id }).skip(skip).limit(pageSize)

  if (lists) {
    let isMore = total - (((page - 1) * pageSize) + lists.length) > 0 ? true : false
    ctx.body = {
      code: 200,
      data: lists,
      isMore: isMore
    }
  } else {
    ctx.body = {
      code: 0,
      data: '获取数据失败'
    }
  }
})

export default router
