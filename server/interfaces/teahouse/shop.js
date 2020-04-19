import Router from 'koa-router'
import Drink from '../../dbs/models/drink'
import Cake from '../../dbs/models/cake'
import Staff from '../../dbs/models/staff'

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

router.post('/addTea', async (ctx) => {
  let teaId = ctx.request.body.teaId
  let teanum = parseInt(ctx.request.body.teanum)
  let staffid = ctx.req.user.result._id

  let tea = await Drink.findOne({ '_id': teaId })

  if (ctx.isAuthenticated()) {
    let params = {
      goodsId: tea._id,
      goodsPrice: tea.drinkprice,
      goodsPhoto: tea.drinkphoto,
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
      goodsPhoto: cake.cakephoto,
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
  if (userDoc) {
    ctx.body = {
      code: 0,
      result: userDoc.cartList
    }
  } else {
    ctx.body = {
      code: -1,
      result: ''
    }
  }
})

export default router