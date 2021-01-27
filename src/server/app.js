const Koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const staticFileMidware = require('./utils/staticFileMidware');
const invokeValidator = require('./utils/validator');
const opts = {
  errorEventName: 'error',
  logDirectory: './logs',
  fileNamePattern: 'server-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};
const logger = require('simple-node-logger').createRollingFileLogger(opts);
const app = new Koa();
const port = 9000;
app.listen(port, '0.0.0.0');
app.use(staticFileMidware(logger));
app.use(koaBody());
app.use(route.post('/submit', async (ctx,name)=>{
  console.log(ctx.request.body)
  const res = await invokeValidator(ctx.request.body);
  if(res.error) {
    ctx.res.writeHead(500);
    ctx.res.end(res.message);
  }else{
    ctx.res.writeHead(200);
    ctx.res.end();
  }
}))

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});
logger.info(`Server start at : 0.0.0.0:${port}`);
