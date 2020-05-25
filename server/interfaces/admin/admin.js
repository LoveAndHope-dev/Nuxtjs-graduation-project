import Router from 'koa-router';
import Admin from '../../dbs/models/admin'

let router = new Router({ prefix: '/manager/manager_manage' })

router.get('/getAdmin', async ctx => {
  try {
    let result = await Admin.find()
    ctx.body = {
      mmcode: 0,
      mmresult: result
    }
  } catch (e) {
    ctx.body = {
      mmcode: -1,
      mmdata: {}
    }
  }
})

router.get(`/phonenumbervalid`, async ctx => {
  let result = await Admin.findOne({ adminphonenumber: ctx.request.query.phonenumber })
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

router.get(`/emailvalid`, async ctx => {
  let result = await Admin.findOne({ adminemail: ctx.request.query.email })
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

router.post('/addadmin', async ctx => {
  let addnew = new Admin({
    adminworkdate: ctx.request.body.adminworkdate,
    adminname: ctx.request.body.adminname,
    adminemail: ctx.request.body.adminemail,
    adminphonenumber: ctx.request.body.adminphonenumber,
    adminsex: ctx.request.body.adminsex,
    adminphoto: ctx.request.body.adminphoto,
    adminpassword: ctx.request.body.adminpassword,
    admintype: ctx.request.body.admintype,
    adminwages: ctx.request.body.adminwages
  })
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [
        {
          adminid: result._id,
          adminname: result.adminname,
          adminsex: result.adminsex,
          adminworkdate: result.adminworkdate,
          adminphoto: result.adminphoto,
          adminemail: result.adminemail,
          adminphonenumber: result.adminphonenumber,
          adminpassword: result.adminpassword,
          adminwages: result.adminwages,
          admintype: result.admintype
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

router.post('/removeadmin', async ctx => {
  let removeID = ctx.request.body.submitID
  let result = await Admin.deleteOne({ '_id': removeID })
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

router.post('/changeadmin', async ctx => {
  let changeID = ctx.request.body.adminid
  let result = await Admin.findOneAndUpdate({ '_id': changeID }, {
    adminname: ctx.request.body.adminname,
    adminemail: ctx.request.body.adminemail,
    adminsex: ctx.request.body.adminsex,
    adminphonenumber: ctx.request.body.adminphonenumber,
    adminphoto: ctx.request.body.adminphoto,
    adminpassword: ctx.request.body.adminpassword,
    adminwages: ctx.request.body.adminwages
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      admin: {
        id: result._id,
        name: result.adminname,
        sex: result.adminsex,
        workdate: result.adminworkdate,
        photo: result.adminphoto,
        email: result.adminemail,
        phonenumber: result.adminphonenumber,
        password: result.adminpassword,
        wages: result.adminwages,
        type: result.admintype
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      admin: ''
    }
  }
})

router.post('/searchadmin', async ctx => {
  console.log(ctx.request.body.adminphonenumber)
  var reg = new RegExp(ctx.request.body.adminphonenumber, 'i');
  let result = await Admin.find({ $or: [{ adminphonenumber: { $regex: reg } }] })
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
