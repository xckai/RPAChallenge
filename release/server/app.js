const Koa = require('koa');
const route = require('koa-route');
const koaBody = require('koa-body');
const staticFileMidware = require('./utils/staticFileMidware');
const invokeValidator = require('./utils/validator');
const { createProxyMiddleware } = require('http-proxy-middleware');
const k2c = require('koa2-connect');
const config = require('./config.json');
const axios = require('axios').default;
const app = new Koa();
const port = config.port;
const logger = require('./utils/logger');
const cluster = require('cluster');

app.listen(port, '0.0.0.0');
app.use(staticFileMidware);
const proxyMidware = createProxyMiddleware({
  target: config.remoteServerURL,
  changeOrigin: true,
  logLevel: config.logLevel,
  logProvider:function logProvider(provider) {
    return logger;
  }
});
app.use(route.all('/api/**/*', k2c(proxyMidware)));
app.use(koaBody());
app.use(
  route.post('/submit', async (ctx, name) => {
    logger.debug("/submit","resq body receive: " ,ctx.request.body);
    const res = await invokeValidator(ctx.request.body);
    if (res.error) {
      ctx.res.writeHead(500);
      ctx.res.end(res.message);
    } else {
      if (res.result === true) {
        let body = { isPassed: true, result: res.result };
        const options = {
          method: 'POST',
          headers: ctx.headers,
          data: { testId: ctx.request.body.testId, isPass: true },
          url: config.remoteServerURL + 'api/rpachallenge/submitchallenge?'+ `testId=${ctx.request.body.testId}&isPass=true`
        };
        try {
          var resp = await axios(options);
          body.timeout = resp.data.response;
          ctx.body = body;
          logger.debug("/submit", "remote return: ",body);
        } catch (e) {
          logger.error(e);
          body.isPassed = false;
          body.result = e.message;
          body.timeout = '--';
          ctx.body = body;
        }
      } else {
        ctx.body = { isPassed: false, result: res.result, timeout: '--' };
      }
    }
  })
);

app.on('error', (err, ctx) => {
  logger.error('server error', err, ctx);
});

if(cluster.isMaster){
  logger.info(`Server start at : 0.0.0.0:${port}`);
}
