const path = require('path');
const getFileMime = require('./mimes');
const fs = require('fs');
const logger = require('./logger');

function getFileContent$(fullStaticPath, type, logger) {
  try {
    let exist = fs.existsSync(fullStaticPath);
    if (!exist) {
      //如果请求路径不存在，返回404
      return false;
    } else {
      return fs.createReadStream(fullStaticPath, type);
    }
  } catch (err) {
    logger.error('getFileContent error', err, fullStaticPath, type);
    return false;
  }
}
function getAppName(url) {
  const appName = 'main';
  if (url == '' || url == '/') {
    return appName;
  }
  let firstParam = url.split('/')[0];
  if (/^\/\w+$/.test(url)) {
    return firstParam;
  }
  return appName;
}
function isRootResourcePath(url) {
  return /^\/\w+\.\w+$/.test(url);
}
function useBinaryReader(_mime) {
  // 如果是图片/其他资源，则用node原生res，输出二进制数据
  if (_mime) {
    if (_mime.indexOf('/json') >= 0) {
      return false;
    }
    if (_mime.indexOf('/html') >= 0) {
      return false;
    }
    if (_mime.indexOf('/javascript') >= 0) {
      return false;
    }
    if (_mime.indexOf('/css') >= 0) {
      return false;
    }
  }
  return true;
}
async function staticFileMidware(ctx, next) {
  const url = ctx.url;
  if (/^\/services\//.test(url) || /^\/api\//.test(url) || url == '/submit') {
    await next();
    return;
  }
  const crtAppName = getAppName(url);
  if (url == '' || url == '/') {
    ctx.redirect('./' + crtAppName + '/index.html');
    return;
  }
  let fullStaticPath = path.join(__dirname, '../../apps', url);
  if (url == '/main') {
    fullStaticPath = path.join(fullStaticPath, 'index.html');
  }
  if (fullStaticPath.indexOf('/server/') >= 0) {
    ctx.res.writeHead(403);
    ctx.res.end();
    return;
  }
  let _mime = getFileMime(fullStaticPath);
  ctx.type = _mime;
  logger.debug('staticFileMidware -- ', fullStaticPath);
  let content;
  if (useBinaryReader(_mime)) {
    content = getFileContent$(fullStaticPath, 'binary', logger);
  } else {
    content = getFileContent$(fullStaticPath, 'utf8', logger);
  }
  if (content == false) {
    if (crtAppName == 'main') {
      /** 处理前端路由 */
      ctx.type = 'text/html';
      fullStaticPath = path.join(__dirname, '../../apps', crtAppName, 'index.html');
      if (useBinaryReader(_mime)) {
        content = getFileContent$(fullStaticPath, 'binary', logger);
      } else {
        content = getFileContent$(fullStaticPath, 'utf8', logger);
      }
      ctx.body = content;
      return;
    }
    ctx.res.writeHead(404);
    ctx.body = 'Not Found';
  } else {
    ctx.body = content;
  }
}
module.exports = staticFileMidware;
