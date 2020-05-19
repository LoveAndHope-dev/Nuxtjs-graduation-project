import Router from 'koa-router';
import Article from '../../dbs/models/article'

let router = new Router({ prefix: '/manager/article_manage' })

router.get('/getArticle', async ctx => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  let skip = (page - 1) * pageSize
  try {
    const total = await Article.find({ $or: [{ articlename: { $regex: reg } }] }).sort({_id: -1}).count()
    let result = await Article.find({ $or: [{ articlename: { $regex: reg } }] }).sort({_id: -1}).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      amcode: 0,
      amresult: result,
      isMore: isMore
    }
  } catch (e) {
    ctx.body = {
      amcode: -1,
      amesult: {}
    }
  }
})

router.post('/addarticle', async ctx => {
  let addnew = new Article(ctx.request.body)
  let result = await addnew.save()
  if (result) {
    ctx.body = {
      code: 0,
      msg: '',
      result: [result]
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      result: [{}]
    }
  }
})

router.post('/removearticle', async ctx => {
  let result = await Article.findByIdAndDelete(ctx.request.body.submitID)
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      removeID: ctx.request.body.submitID
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      removeID: ctx.request.body.submitID
    }
  }
})

router.post('/searcharticle', async ctx => {
  var reg = new RegExp(ctx.request.body.articlename, 'i');
  let result = await Article.find({ $or: [{ articlename: { $regex: reg } }] })
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
      result: []
    }
  }
})

export default router