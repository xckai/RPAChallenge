const Koa = require('koa');
const route = require('koa-route');
const appMidware = require("./utils/appMidware");
const opts = {
  errorEventName:'error',
      logDirectory:'./logs', // NOTE: folder must exist and be writable...
      fileNamePattern:'roll-<DATE>.log',
      dateFormat:'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger( opts );
const app = new Koa();
app.listen(9000);
app.use(appMidware);

app.on('error', (err, ctx) => {
  log.error('server error', err, ctx)
});