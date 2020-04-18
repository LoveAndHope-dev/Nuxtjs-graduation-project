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
    staffworkdate: ctx.request.body.staffworkdate,
    staffname: ctx.request.body.staffname,
    staffemail: ctx.request.body.staffemail,
    staffphonenumber: ctx.request.body.staffphonenumber,
    staffsex: ctx.request.body.staffsex,
    staffphoto: ctx.request.body.staffphoto,
    staffpassword: ctx.request.body.staffpassword,
    staffwages: ctx.request.body.staffwages
  })
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [
        {
          staffid: result._id,
          staffname: result.staffname,
          staffsex: result.staffsex,
          staffworkdate: result.staffworkdate,
          staffphoto: result.staffphoto,
          staffemail: result.staffemail,
          staffphonenumber: result.staffphonenumber,
          staffpassword: result.staffpassword,
          staffwages: result.staffwages
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
  let result = await Staff.deleteOne({ '_id': removeID })
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
  let result = await Staff.findOneAndUpdate({ '_id': changeID }, {
    staffname: ctx.request.body.staffname,
    staffemail: ctx.request.body.staffemail,
    staffphonenumber: ctx.request.body.staffphonenumber,
    staffphoto: ctx.request.body.staffphoto,
    staffpassword: ctx.request.body.staffpassword,
    staffwages: ctx.request.body.staffwages
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      staff: {
        id: result._id,
        name: result.staffname,
        sex: result.staffsex,
        workdate: result.staffworkdate,
        photo: result.staffphoto,
        email: result.staffemail,
        phonenumber: result.staffphonenumber,
        password: result.staffpassword,
        wages: result.staffwages
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
  console.log(ctx.request.body.staffphonenumber)
  var reg = new RegExp(ctx.request.body.staffphonenumber, 'i');
  let result = await Staff.find({ $or: [{ staffphonenumber: { $regex: reg } }] })
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
