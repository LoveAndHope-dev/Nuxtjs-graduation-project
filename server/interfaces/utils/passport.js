import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import StaffModel from '../../dbs/models/staff'
import AdminModel from '../../dbs/models/admin'

passport.use('staff', new LocalStrategy(async function (staffphonenumber, password, done) {
  let where = {
    staffphonenumber
  };
  let result = await StaffModel.findOne(where)
  if (result != null) {
    if (result.staffpassword === password) {
      let auth = 'staff'
      return done(null, { result: result, auth: auth })
    } else {
      return done(null, false, '工作人员密码错误')
    }
  } else {
    return done(null, false, '工作人员用户不存在')
  }
}))

passport.use('admin', new LocalStrategy(async function (adminphonenumber, password, done) {
  let where = {
    adminphonenumber
  };
  let result = await AdminModel.findOne(where)
  if (result != null) {
    if (result.adminpassword === password) {
      let auth = 'admin'
      return done(null, { result: result, auth: auth })
    } else {
      return done(null, false, '管理员密码错误')
    }
  } else {
    return done(null, false, '管理员用户不存在')
  }
}))

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

// passport.deserializeUser(function (id, done) {
//   StaffModel.findById(id).then(function (err, user) {
//     if (err) { done(err) };
//     if (user) {
//       done(null, user);
//       console.log(user);
//     } else {
//       AdminModel.findById(id).then(function (err, user) {
//         if (err) { done(err) };
//         done(null, user);
//       })
//     }
//   })
// })

export default passport
