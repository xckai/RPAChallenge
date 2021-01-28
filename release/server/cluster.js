const cluster = require('cluster');
const cpus = require('os').cpus();
const logger = require('./utils/logger');

logger.info('master ' + process.pid + ' is starting.');

cluster.setupMaster({
  exec: 'app.js'
});

for (let i = 0; i < cpus.length - 1 && i < 4; i++) {
  cluster.fork();
}

cluster.on('online', function (worker) {
  /* 进程启动成功 */
  logger.info('worker ' + worker.process.pid + ' is online.');
});
cluster.on('exit', function (worker, code, signal) {
  /* 应用进程退出时，记录日志并重启 */
  logger.info('worker ' + worker.process.pid + ' died.');
  cluster.fork();
});
