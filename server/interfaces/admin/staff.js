import Router from 'koa-router';
import Staff from '../../dbs/models/staff'

let router = new Router({ prefix: '/manager/worker_manage' })

router.get('/getStaff', async ctx => {
  try {
    let result = await Staff.find()
    ctx.body = {
      code: 0,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: {}
    }
  }
})

router.post('/addStaff', async ctx => {
  let addnew = new Staff({
    staffid: 'TC' + ctx.request.body.staffphonenumber,
    staffworkdate: ctx.request.body.staffworkdate,
    staffname: ctx.request.body.staffname,
    staffemail: ctx.request.body.staffemail,
    staffphonenumber: ctx.request.body.staffphonenumber,
    staffsex: ctx.request.body.staffsex,
    staffphoto: ctx.request.body.staffphoto,
    staffpassword: ctx.request.body.staffpassword
  })
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [
        {
          staffid: result.staffid,
          staffname: result.staffname,
          staffsex: result.staffsex,
          staffworkdate: result.staffworkdate,
          staffphoto: result.staffphoto,
          staffemail: result.staffemail,
          staffphonenumber: result.staffphonenumber,
          staffpassword: result.staffpassword
        }
      ]
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: []
    }
  }
})

router.post('/removeStaff', async ctx => {
  let removeID = ctx.request.body.submitID
  let result = await Staff.deleteOne({ 'staffid': removeID })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      removeID: removeID
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      removeID: ''
    }
  }
})

router.post('/changeStaff', async ctx => {
  let changeID = ctx.request.body.staffid
  let result = await Staff.findOneAndUpdate({ 'staffid': changeID }, {
    staffname: ctx.request.body.staffname,
    staffemail: ctx.request.body.staffemail,
    staffphonenumber: ctx.request.body.staffphonenumber,
    staffphoto: ctx.request.body.staffphoto,
    staffpassword: ctx.request.body.staffpassword
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      staff: {
        id: result.staffid,
        name: result.staffname,
        sex: result.staffsex,
        workdate: result.staffworkdate,
        photo: result.staffphoto,
        email: result.staffemail,
        phonenumber: result.staffphonenumber,
        password: result.staffpassword
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      staff: ''
    }
  }
})

router.post('/searchStaff', async ctx => {
  let result = await Staff.findOne({ 'staffphonenumber': ctx.request.body.staffphonenumber })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      result: [
        {
          staffid: result.staffid,
          staffname: result.staffname,
          staffsex: result.staffsex,
          staffworkdate: result.staffworkdate,
          staffphoto: result.staffphoto,
          staffemail: result.staffemail,
          staffphonenumber: result.staffphonenumber,
          staffpassword: result.staffpassword
        }
      ]
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: [{}]
    }
  }
})

export default router
