const path = require('path');
const getFileMime = require('./mimes');
const fs = require('fs');
const createError = require('http-errors');
const util = require('util');
const logger = require('./logger');
const appsDirPath = path.join(__dirname, '../../apps');
const mainAppName = 'main';
const maxCatchAge = 60 * 60 * 24 * 30;
const access = util.promisify(fs.access);
const stat = util.promisify(fs.stat);

async function isExists(path) {
  try {
    await access(path);
    return true;
  } catch (e) {
    return false;
  }
}
function getAppName(url) {
  const appName = mainAppName;
  if (url == '' || url == '/') {
    return appName;
  }
  let firstParam = url.split('/')[1];
  if (/^\/\w+\/?/.test(url)) {
    return firstParam;
  }
  return appName;
}

function decodeURL(url) {
  try {
    const resUrl = decodeURIComponent(url);
    return resUrl.split('?')[0];
  } catch (err) {
    throw new Error('decodeURL error: ' + url);
  }
}
function getFileURIByURL(url, appName) {
  try {
    let crtUrl = decodeURL(url);
    crtUrl = crtUrl.trim();
    let fileLocation = appsDirPath;
    if (crtUrl == '' || crtUrl == '/' || /^\/\w+$/.test(crtUrl)) {
      return path.join(fileLocation, './' + appName, './index.html');
    }
    crtUrl = crtUrl.split('?')[0];
    crtUrl = crtUrl.replace(/(\.\/)?/g, '').replace(/(\.\.\/)?/g, '');
    crtUrl = path.join(fileLocation, crtUrl);
    return crtUrl;
  } catch (e) {
    logger.debug('getFileURIByURL error: ', e.message);
    throw createError(400, 'Invalid URL');
  }
}

async function staticFileMidware(ctx, next) {
  const url = ctx.url;
  if (url == '' || url == '/') {
    ctx.redirect('./' + mainAppName + '/index.html');
    return;
  }
  logger.debug('Url: ', url);
  if (/^\/services\//.test(url) || /^\/api\//.test(url) || url == '/submit') {
    await next();
    return;
  }
  if (ctx.method !== 'HEAD' && ctx.method !== 'GET') {
    throw createError(403, 'Invalid Method: ' + ctx.method);
  }
  const crtAppName = getAppName(url);
  logger.debug('Current app: ', crtAppName);
  let fullStaticPath = getFileURIByURL(url, crtAppName);
  let exist = await isExists(fullStaticPath);
  if (!exist) {
    logger.debug('File not exist: ', fullStaticPath);
    if (crtAppName == mainAppName) {
      fullStaticPath = getFileURIByURL('/', mainAppName);
    } else {
      throw createError(404);
    }
  }
  let _mime = getFileMime(fullStaticPath);
  ctx.type = _mime;
  logger.debug('File info: ', fullStaticPath, ' mime: ', _mime);
  let fileStat;
  try {
    fileStat = await stat(fullStaticPath);
  } catch (err) {
    const notfound = ['ENOENT', 'ENAMETOOLONG', 'ENOTDIR'];
    if (notfound.includes(err.code)) {
      logger.error('File not exist: ', err.message);
      throw createError(404);
    }
    err.status = 500;
    throw err;
  }
  const lastModified = fileStat.mtime.toUTCString();
  const ifModifiedSince = 'If-Modified-Since'.toLowerCase();
  if (ctx.req.headers[ifModifiedSince] && lastModified == ctx.req.headers[ifModifiedSince]) {
    logger.debug('Not modified: ', url);
    ctx.res.writeHead(304, 'Not Modified');
    ctx.res.end();
  } else {
    ctx.res.setHeader('Content-Length', fileStat.size);
    ctx.res.setHeader('Last-Modified', lastModified);
    if (ctx.type == 'text/html') {
      ctx.res.setHeader('Cache-Control', `max-age=${maxCatchAge}`);
    } else {
      ctx.res.setHeader('Cache-Control', `public,max-age=${maxCatchAge},immutable`);
    }
    ctx.body = fs.createReadStream(fullStaticPath);
  }
}
module.exports = staticFileMidware;
