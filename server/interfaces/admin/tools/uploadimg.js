const Router = require('koa-router');
const path = require('path');
const fs = require('fs')

let router = new Router({ prefix: '/manager' })

router.post('/uploadimg', async (ctx, next) => {
  const file = ctx.request.files.file; // 获取上传文件
  var extname = path.extname(file.name);
  const reader = fs.createReadStream(file.path);
  var filename = 'upload_' + new Date() * 1 + extname
  let filePath = path.join(__dirname, '../../../../static/articleimg/') + filename;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  ctx.body = { filename }
});
export default router
