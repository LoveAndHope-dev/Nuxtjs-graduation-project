import Router from 'koa-router'
import Drink from '../../dbs/models/drink'
import Cake from '../../dbs/models/cake'
import Staff from '../../dbs/models/staff'
import Table from '../../dbs/models/table'
import Order from '../../dbs/models/order'

let router = new Router({ prefix: '/teahouse/shop' })

router.get('/getTea', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 12
  let page = ctx.request.query.teapage ? parseInt(ctx.request.query.teapage) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  try {
    const total = await Drink.find({ $or: [{ drinkname: { $regex: reg } }] }).sort({ _id: -1 }).count()
    let result = await Drink.find({ $or: [{ drinkname: { $regex: reg } }] }).sort({ _id: -1 }).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      thtcode: 0,
      thtresult: result,
      isMoreTea: isMore
    }
  } catch (e) {
    ctx.body = {
      thtcode: -1,
      thtresult: {}
    }
  }
})

router.get('/getCake', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 12
  let page = ctx.request.query.cakepage ? parseInt(ctx.request.query.cakepage) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  try {
    const total = await Cake.find({ $or: [{ cakename: { $regex: reg } }] }).sort({ _id: -1 }).count()
    let result = await Cake.find({ $or: [{ cakename: { $regex: reg } }] }).sort({ _id: -1 }).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      thccode: 0,
      thcresult: result,
      isMoreCake: isMore
    }
  } catch (e) {
    ctx.body = {
      thccode: -1,
      thcresult: {}
    }
  }
})

router.post('/addTea', async (ctx) => {
  let teaId = ctx.request.body.teaId
  let teanum = parseInt(ctx.request.body.teanum)
  let staffid = ctx.req.user.result._id

  let tea = await Drink.findOne({ '_id': teaId })

  if (ctx.isAuthenticated()) {
    let params = {
      goodsId: tea._id,
      goodsPrice: tea.drinkprice,
      goodsName: tea.drinkname,
      goodsNum: teanum
    }
    let userDoc = await Staff.findOne({ '_id': staffid })
    if (userDoc) {
      let goodsItem = ''
      userDoc.cartList.forEach(function (item) {
        if (item.goodsId == teaId) {
          goodsItem = item;
          item.goodsNum += teanum;
        }
      })
      if (goodsItem) {
        let res = await userDoc.save()
        ctx.body = {
          code: 0,
          msg: '添加购物车成功'
        }
      } else {
        userDoc.cartList.push(params);
        let res = await userDoc.save()
        ctx.body = {
          code: 0,
          msg: '添加购物车成功'
        }
      }
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '用户没有登录'
    }
  }
})

router.post('/addCake', async (ctx) => {
  let cakeId = ctx.request.body.cakeId
  let cakenum = parseInt(ctx.request.body.cakenum)
  let staffid = ctx.req.user.result._id

  let cake = await Cake.findOne({ '_id': cakeId })

  if (ctx.isAuthenticated()) {
    let params = {
      goodsId: cake._id,
      goodsPrice: cake.cakeprice,
      goodsName: cake.cakename,
      goodsNum: cakenum
    }
    let userDoc = await Staff.findOne({ '_id': staffid })
    if (userDoc) {
      let goodsItem = ''
      userDoc.cartList.forEach(function (item) {
        if (item.goodsId == cakeId) {
          goodsItem = item;
          item.goodsNum += cakenum;
        }
      })
      if (goodsItem) {
        let res = await userDoc.save()
        ctx.body = {
          code: 0,
          msg: '添加购物车成功'
        }
      } else {
        userDoc.cartList.push(params);
        let res = await userDoc.save()
        ctx.body = {
          code: 0,
          msg: '添加购物车成功'
        }
      }
    }
  } else {
    ctx.body = {
      status: -1,
      msg: '用户没有登录'
    }
  }
})

router.get('/getCart', async (ctx) => {
  let staffid = ctx.req.user.result._id
  let userDoc = await Staff.findOne({ '_id': staffid })
  let tableDoc = await Table.find({ 'tablecondition': '可用' })
  if (userDoc) {
    ctx.body = {
      code: 0,
      result: userDoc.cartList,
      tableresult: tableDoc
    }
  } else {
    ctx.body = {
      code: -1,
      result: '',
      tableresult: ' '
    }
  }
})

router.delete('/deletePro', async (ctx) => {
  let id = ctx.request.query.id
  let _id = ctx.req.user.result._id

  if (id) {
    if (ctx.isAuthenticated()) {
      let res = await Staff.update({ _id: _id }, { $pull: { cartList: { goodsId: id } } })
      if (res) {
        ctx.body = {
          status: 200,
          msg: '删除成功'
        }
      } else {
        ctx.body = {
          status: 0,
          msg: '删除失败'
        }
      }
    } else {
      ctx.body = {
        status: -1,
        msg: '用户没有登录'
      }
    }
  } else {
    ctx.body = {
      status: -1,
      msg: 'id is required'
    }
  }
})

router.post('/updatePro', async (ctx) => {
  let id = ctx.request.body.id
  let num = ctx.request.body.num
  let _id = ctx.req.user.result._id
  if (ctx.isAuthenticated()) {
    let userDoc = await Staff.findOne({ '_id': _id })
    if (userDoc) {
      userDoc.cartList.forEach(function (item) {
        if (item.goodsId == id) {
          item.goodsNum = num;
        }
      })
      let result = await userDoc.save();
      ctx.body = {
        code: 0,
        msg: 'ojbk',
        result: result
      }
    } else {
      ctx.body = {
        code: 0,
        msg: '没有找到该用户'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '用户没有登录'
    }
  }
})

router.delete('/cleanCart', async (ctx) => {
  let _id = ctx.req.user.result._id
  let res = await Staff.update({ _id: _id }, { cartList: [] })
  if (res) {
    ctx.body = {
      code: 0,
      msg: '删除成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '删除失败'
    }
  }
})

router.post('/addOrder', async (ctx) => {
  let tresult = await Table.findByIdAndUpdate(ctx.request.body.ordertableid, {
    tablecondition: '已满'
  }, { 'new': true })
  let addnew = new Order({
    ordertime: ctx.request.body.ordertime,
    staffid: ctx.req.user.result._id,
    staffname: ctx.req.user.result.staffname,
    ordertableid: ctx.request.body.ordertableid,
    ordertable: tresult.tablename,
    orderstatus: true,
    orderlist: JSON.parse(ctx.request.body.orderlist)
  })
  let result = await addnew.save()
  if (result && tresult) {
    ctx.body = {
      code: 0,
      msg: ''
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail'
    }
  }
})
export default router