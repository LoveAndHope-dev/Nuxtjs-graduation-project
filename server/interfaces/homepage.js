import Router from 'koa-router'
import Article from '../dbs/models/article'

let router = new Router({ prefix: '/index' })

router.get('/gethomepageArticle', async ctx => {
  try {
    let result = await Article.find().sort({_id: -1}).limit(4)
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

export default router
