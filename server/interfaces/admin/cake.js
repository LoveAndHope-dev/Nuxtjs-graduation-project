import Router from 'koa-router'
import Cake from '../../dbs/models/cake'

let router = new Router({ prefix: '/manager/cake_manage' })

router.get('/getCake', async ctx => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  let skip = (page - 1) * pageSize
  try {
    const total = await Cake.find({ $or: [{ cakename: { $regex: reg } }] }).sort({_id: -1}).count()
    let result = await Cake.find({ $or: [{ cakename: { $regex: reg } }] }).sort({_id: -1}).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      cmcode: 0,
      cmresult: result,
      isMore: isMore
    }
  } catch (e) {
    ctx.body = {
      cmcode: -1,
      cmesult: {}
    }
  }
})

router.get(`/cakenamevalid`, async ctx => {
  let result = await Cake.findOne({
    $and: [
      { cakename: ctx.request.query.name }, 
      { $nor: [{ _id: ctx.request.query.id }] }
    ]
  })
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

// router.post('/searchCake', async ctx => {
//   var reg = new RegExp(ctx.request.body.cakename, 'i');
//   let result = await Cake.find({ $or: [{ cakename: { $regex: reg } }] })
//   if (result) {
//     ctx.body = {
//       code: 0,
//       msg: 'success',
//       result: result
//     }
//   } else {
//     ctx.body = {
//       code: -1,
//       msg: 'fail',
//       result: ' '
//     }
//   }
// })

export default router