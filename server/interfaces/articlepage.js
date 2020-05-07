import Router from 'koa-router'
import Article from '../dbs/models/article'

let router = new Router({ prefix: '/article' })

router.get('/getArticle', async (ctx) => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 4
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  // 跳多少条数据
  let skip = (page - 1) * pageSize
  try {
    const total = await Article.find({ $or: [{ articlename: { $regex: reg } }] }).sort({ _id: -1 }).count()
    let result = await Article.find({ $or: [{ articlename: { $regex: reg } }] }).sort({ _id: -1 }).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      code: 0,
      result: result,
      isMore: isMore
    }
  } catch (e) {
    ctx.body = {
      code: -1,
      result: {}
    }
  }
})

router.get('/getArticleDetails', async ctx => {
  const id = ctx.request.query.id
  try {
    const result = await Article.findOne({ _id: id })
    ctx.body = {
      code: 0,
      result: result
    }
  } catch (e) {
    ctx.body = {
      code: -1, 
      result: ''
    }
  }
})
export default router