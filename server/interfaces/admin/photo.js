import Router from 'koa-router'
import Photo from '../../dbs/models/photo'

let router = new Router({ prefix: '/manager/new_manage' })

router.get('/getPhoto', async ctx => {
  try {
    var full
    let result = await Photo.find().sort({ _id: -1 })
    if (result.length >= 5) {
      full = true
    } else {
      full = false
    }
    ctx.body = {
      code: 0,
      result: result,
      full: full
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: {}
    }
  }
})

router.post('/addPhoto', async ctx => {
  let addnew = new Photo(ctx.request.body)
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

router.post('/deletePhoto', async ctx => {
  let result = await Photo.findByIdAndDelete(ctx.request.body.submitID)
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

export default router