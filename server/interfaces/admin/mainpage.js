import Router from 'koa-router';

let router = new Router({ prefix: '/manager' })

router.get('/loginauth', async ctx => {
  console.log('ok')
})

export default router