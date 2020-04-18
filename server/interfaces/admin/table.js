import Router from 'koa-router';
import Table from '../../dbs/models/table'

let router = new Router({ prefix: '/manager/table_manage' })

router.get('/getTable', async ctx => {
  try {
    let result = await Table.find()
    ctx.body = {
      tmcode: 0,
      tmresult: result
    }
  } catch (e) {
    ctx.body = {
      tmcode: -1,
      tmresult: {}
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

router.post('/searchTable', async ctx => {
  var reg = new RegExp(ctx.request.body.tablename, 'i');
  let result = await Table.find({ $or: [{ tablename: { $regex: reg } }] })
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
      result: ''
    }
  }
})
export default router