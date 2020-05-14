import Router from 'koa-router'
import Staff from '../../dbs/models/staff'
import Table from '../../dbs/models/table'
import Order from '../../dbs/models/order'

let router = new Router({ prefix: '/teahouse/order' })

router.get('/getOrder', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 2
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  // 总数
  const total = await Order.find({ staffid: ctx.req.user.result._id, orderstatus: true }).sort({ _id: -1 }).count()
  // 数据
  const lists = await Order.find({ staffid: ctx.req.user.result._id, orderstatus: true }).sort({ _id: -1 }).skip(skip).limit(pageSize)
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

router.get('/getfinishOrder', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 2
  let page = ctx.request.query.finpage ? parseInt(ctx.request.query.finpage) : 1
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  // 总数
  const total = await Order.find({ staffid: ctx.req.user.result._id, orderstatus: false }).sort({ _id: -1 }).count()
  // 数据
  const lists = await Order.find({ staffid: ctx.req.user.result._id, orderstatus: false }).sort({ _id: -1 }).skip(skip).limit(pageSize)
  if (lists) {
    let finisMore = total - (((page - 1) * pageSize) + lists.length) > 0 ? true : false
    ctx.body = {
      fincode: 200,
      findata: lists,
      finisMore: finisMore
    }
  } else {
    ctx.body = {
      fincode: 0,
      findata: '获取数据失败'
    }
  }
})

router.post('/finishOrder', async (ctx) => {
  let result = await Order.findByIdAndUpdate(ctx.request.body.orderid, {
    orderstatus: false
  }, { 'new': true })
  let tresult = await Table.findByIdAndUpdate(ctx.request.body.tableid, {
    tablecondition: '可用'
  }, { 'new': true })
  if (result) {
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
