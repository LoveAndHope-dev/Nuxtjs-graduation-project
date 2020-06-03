import Router from 'koa-router'
import Order from '../../dbs/models/order'

let router = new Router({ prefix: '/manager/order_manage' })

router.get('/getOrder', async ctx => {
  let result, isMore
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 12
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word
  let skip = (page - 1) * pageSize
  try {
    if (isNaN(parseInt(keyword))) {
      const total = await Order.find().sort({ _id: -1 }).count()
      result = await Order.find().sort({ _id: -1 }).skip(skip).limit(pageSize)
      isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    } else {
      result = await Order.find({ $or: [{ _id: keyword }] })
      isMore = false
    }
    ctx.body = {
      omcode: 0,
      omresult: result,
      isMore: isMore
    }
  } catch (e) {
    if (e.name == 'CastError') {
      ctx.body = {
        omcode: -1,
        omresult: [{}]
      }
    } else {
      ctx.body = {
        omcode: -2,
        omresult: [{}]
      }
    }
  }
})

export default router