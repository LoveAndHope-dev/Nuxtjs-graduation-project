import mongoose from 'mongoose'
import bodyParser from 'koa-bodyparser'
import session from 'koa-generic-session'
import Redis from 'koa-redis'
import json from 'koa-json'
import koabody from 'koa-body'

import passport from './interfaces/utils/passport'
import userauth from './interfaces/utils/userauth'
import dbConfig from './dbs/config'
import Staff from './interfaces/admin/staff'
import Article from './interfaces/admin/article'
import Admin from './interfaces/admin/admin'
import Drink from './interfaces/admin/drink'
import Cake from './interfaces/admin/cake'
import Table from './interfaces/admin/table'
import Info from './interfaces/admin/info'
import Commonusers from './interfaces/commonusers'
import Uploadimg from './interfaces/admin/tools/uploadimg'

import Koa from 'koa'
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

app.keys = ['tc', 'keyskeys']
app.proxy = true
app.use(session({ key: 'tc', prefix: 'tc:uid', store: new Redis() }))
app.use(bodyParser({
  extendTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(koabody({
  multipart: true,
  formidable: {
    maxFileSize: 200 * 1024 * 1024
  }
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(userauth.userAuth)

mongoose.connect(dbConfig.dbs, {
  useNewUrlParser: true
})
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(Staff.routes()).use(Staff.allowedMethods())
  app.use(Admin.routes()).use(Admin.allowedMethods())
  app.use(Drink.routes()).use(Drink.allowedMethods())
  app.use(Cake.routes()).use(Cake.allowedMethods())
  app.use(Table.routes()).use(Table.allowedMethods())
  app.use(Info.routes()).use(Info.allowedMethods())
  app.use(Commonusers.routes()).use(Commonusers.allowedMethods())
  app.use(Uploadimg.routes()).use(Uploadimg.allowedMethods())
  app.use(Article.routes()).use(Article.allowedMethods())

  app.use(ctx => {
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset

    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  app.listen(port, host)
  consola.ready({ message: `Server listening on http://${host}:${port}`, badge: true })
}

start()
