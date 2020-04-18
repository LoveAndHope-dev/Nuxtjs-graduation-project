import Router from 'koa-router';
import Article from '../../dbs/models/article'

let router = new Router({ prefix: '/manager/article_manage' })

router.get('/getArticle', async ctx => {
  try {
    let result = await Article.find()
    ctx.body = {
      amcode: 0,
      amresult: result
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