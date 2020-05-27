import Router from 'koa-router';
import Staff from '../../dbs/models/staff'

let router = new Router({ prefix: '/teahouse/info' })

router.get('/getInfo', async ctx => {
  try {
    ctx.body = {
      smicode: 0,
      smiresult: [ctx.req.user.result]
    }
  } catch (e) {
    ctx.body = {
      smicode: -1,
      smiresult: []
    }
  }
})

router.post('/changeInfo', async ctx => {
  let changeID = ctx.request.body.staffid
  console.log(ctx.request.body.staffid)
  let result = await Staff.findOneAndUpdate({ '_id': changeID }, {
    staffname: ctx.request.body.staffname,
    staffemail: ctx.request.body.staffemail,
    staffsex: ctx.request.body.staffsex,
    staffphonenumber: ctx.request.body.staffphonenumber,
    staffphoto: ctx.request.body.staffphoto,
    staffpassword: ctx.request.body.staffpassword
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      info: [result]
    }
    ctx.req.user.result = result
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      info: [result]
    }
  }
})

export default router
