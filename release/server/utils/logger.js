const simpleNodeLogger = require('simple-node-logger');
const config = require('../config.json');
const opts = {
  logDirectory: './logs',
  fileNamePattern: 'server-<DATE>.log',
  dateFormat: 'YYYY.MM.DD'
};
const fileLogger = simpleNodeLogger.createRollingFileLogger(opts);
const stdLogger = simpleNodeLogger.createSimpleLogger();
fileLogger.setLevel(config.logLevel || 'info');
stdLogger.setLevel(config.logLevel || 'info');
function stringfyArgs(args) {
  return (args || []).map((obj) => {
    if (typeof obj == 'string' || typeof obj == 'number') {
      return obj;
    } else {
      return JSON.stringify(obj, null, 2);
    }
  });
}

const logger = {
  info: function () {
    const args = Array.from(arguments);
    fileLogger.info.apply(fileLogger, args);
    stdLogger.info.apply(stdLogger, args);
  },
  debug: function () {
    const args = Array.from(arguments);
    fileLogger.debug.apply(fileLogger, args);
    stdLogger.debug.apply(stdLogger, args);
  },
  warn: function () {
    const args = Array.from(arguments);
    fileLogger.warn.apply(fileLogger, args);
    stdLogger.warn.apply(stdLogger, args);
  },
  error: function () {
    const args = Array.from(arguments);
    fileLogger.error.apply(fileLogger, args);
    stdLogger.error.apply(stdLogger, args);
  },
  silent:function(){

  }
};
module.exports = logger;
