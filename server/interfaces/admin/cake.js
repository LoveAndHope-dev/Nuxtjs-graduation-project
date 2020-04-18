import Router from 'koa-router'
import Cake from '../../dbs/models/cake'

let router = new Router({ prefix: '/manager/cake_manage' })

router.get('/getCake', async ctx => {
  try {
    let result = await Cake.find()
    ctx.body = {
      cmcode: 0,
      cmresult: result
    }
  } catch (e) {
    ctx.body = {
      cmcode: -1,
      cmesult: {}
    }
  }
})

router.post('/addCake', async ctx => {
  let addnew = new Cake(ctx.request.body)
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [result]
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: [{}]
    }
  }
})

router.post('/removeCake', async ctx => {
  let result = await Cake.findByIdAndDelete(ctx.request.body.submitID)
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      removeID: ctx.request.body.submitID
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      removeID: ctx.request.body.submitID
    }
  }
})

router.post('/changeCake', async ctx => {
  let result = await Cake.findByIdAndUpdate(ctx.request.body.cakeid, {
    cakename: ctx.request.body.cakename,
    cakeprice: ctx.request.body.cakeprice,
    caketype: ctx.request.body.caketype,
    caketaste: ctx.request.body.caketaste,
    cakedescription: ctx.request.body.cakedescription,
    cakephoto: ctx.request.body.cakephoto
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      cake: {
        id: result._id,
        name: result.cakename,
        price: result.cakeprice,
        description: result.cakedescription,
        type: result.caketype,
        taste: result.caketaste,
        photo: result.cakephoto
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      cake: ''
    }
  }
})

router.post('/searchCake', async ctx => {
  var reg = new RegExp(ctx.request.body.cakename, 'i');
  let result = await Cake.find({ $or: [{ cakename: { $regex: reg } }] })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      result: result
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: ' '
    }
  }
})

export default router