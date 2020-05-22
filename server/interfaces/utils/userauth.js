const allowpage = ['/login']
//身份拦截代替路由守卫，老子不玩路由守卫了操他妈
export default {
  userAuth: async (ctx, next) => {
    let url = ctx.originalUrl
    var parts = url.split('/', 3);
    if (allowpage.indexOf(url) > -1) {
      return next()
    } else {
      if (ctx.isAuthenticated()) {
        if (ctx.req.user.auth === 'staff') {
          if (parts[1] === 'manager') {
            await ctx.redirect('/login')
          } else {
            return next()
          }
        } else if (ctx.req.user.auth === 'admin') {
          if (parts[1] === 'teahouse') {
            await ctx.redirect('/login')
          } else if (parts[2] === 'manager_manage' & ctx.req.user.result.admintype === false) {
            await ctx.redirect('/login')
          } else {
            return next()
          }
        }
      } else {
        if (parts[1] === 'teahouse' || parts[1] === 'manager') {
          await ctx.redirect('/login')
        } else {
          return next()
        }
      }
    }
  }
}