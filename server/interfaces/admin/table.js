import Router from 'koa-router';
import Table from '../../dbs/models/table'

let router = new Router({ prefix: '/manager/table_manage' })

router.get('/getTable', async ctx => {
  let pageSize = ctx.request.query.pageSize ? parseInt(ctx.request.query.pageSize) : 15
  let page = ctx.request.query.page ? parseInt(ctx.request.query.page) : 1
  let keyword = ctx.request.query.word || ''
  var reg = new RegExp(keyword, 'i');
  let skip = (page - 1) * pageSize
  try {
    const total = await Table.find({ $or: [{ tablename: { $regex: reg } }] }).sort({_id: -1}).count()
    let result = await Table.find({ $or: [{ tablename: { $regex: reg } }] }).sort({_id: -1}).skip(skip).limit(pageSize)
    let isMore = total - (((page - 1) * pageSize) + result.length) > 0 ? true : false
    ctx.body = {
      tmcode: 0,
      tmresult: result,
      isMore: isMore
    }
  } catch (e) {
    ctx.body = {
      tmcode: -1,
      tmresult: {}
    }
  }
})

router.get(`/tablenamevalid`, async ctx => {
  let result = await Table.findOne({
    $and: [
      { tablename: ctx.request.query.name }, 
      { $nor: [{ _id: ctx.request.query.id }] }
    ]
  })
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

router.post('/addTable', async ctx => {
  let addnew = new Table(ctx.request.body)
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

router.post('/removeTable', async ctx => {
  let result = await Table.findByIdAndDelete(ctx.request.body.submitID)
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

router.post('/changeTable', async ctx => {
  let result = await Table.findByIdAndUpdate(ctx.request.body.tableid, {
    tablename: ctx.request.body.tablename,
    tablepeople: ctx.request.body.tablepeople,
    tablecondition: ctx.request.body.tablecondition
  }, { 'new': true })
  if (result) {
    ctx.body = {
      code: 0,
      msg: 'success',
      table: {
        id: result._id,
        name: result.tablename,
        people: result.tablepeople,
        condition: result.tablecondition
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'fail',
      table: ''
    }
  }
})

// router.post('/searchTable', async ctx => {
//   var reg = new RegExp(ctx.request.body.tablename, 'i');
//   let result = await Table.find({ $or: [{ tablename: { $regex: reg } }] })
//   if (result) {
//     ctx.body = {
//       code: 0,
//       msg: 'success',
//       result: result
//     }
//   } else {
//     ctx.body = {
//       code: -1,
//       msg: 'fail',
//       result: ''
//     }
//   }
// })
export default router