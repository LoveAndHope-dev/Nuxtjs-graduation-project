import Router from 'koa-router';
import Admin from '../../dbs/models/admin'
let router = new Router({ prefix: '/manager/myself_infomation' })

router.get('/getInfo', async ctx => {
  try {
    ctx.body = {
      micode: 0,
      miresult: [ctx.req.user.result]
    }
  } catch (e) {
    ctx.body = {
      micode: -1,
      miresult: []
    }
  }
})

router.post('/changeInfo', async ctx => {
  let result = await Admin.findByIdAndUpdate(ctx.request.body.adminid, {
    adminname: ctx.request.body.adminname,
    adminemail: ctx.request.body.adminemail,
    adminphonenumber: ctx.request.body.adminphonenumber,
    adminsex: ctx.request.body.adminsex,
    adminphoto: ctx.request.body.adminphoto
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
      info: []
    }
  }
})

export default router