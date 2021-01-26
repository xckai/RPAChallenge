const path = require('path');
const mimes = require('./mimes')

const fs = require('fs');

function file(filePath,type) {
  let content = fs.readFileSync(filePath, type);
  return content;
}
function parseMime( url ) {
  let extName = path.extname( url )
  extName = extName ?  extName.slice(1) : 'unknown'
  return  mimes[ extName ]
}


function content(ctx, fullStaticPath, type) {
  // 封装请求资源的完绝对径
  let reqPath = path.join(fullStaticPath, ctx.url);

  let exist = fs.existsSync(reqPath);

  let content = '';

  if (!exist) {
    //如果请求路径不存在，返回404
    content = '404 Not Found!';
  } else {
    //判断访问地址是文件夹还是文件
    let stat = fs.statSync(reqPath);

    if (stat.isDirectory()) {
      //如果为目录，则渲读取目录内容
      content = file(path.join(reqPath,'./index.html'),'utf8');
    } else {
      // 如果请求为文件，则读取文件内容
      content = file(reqPath, type);
    }
  }

  return content;
}
async function appMidware(ctx) {
  const defaultAppName = 'base_form/index.html';
  let fullStaticPath = path.join(__dirname, "../../apps",ctx.url);
  let _mime = parseMime( ctx.url );
  if(ctx.url == "" || ctx.url=="/") {
    fullStaticPath = path.join(fullStaticPath,defaultAppName);
    _mime = 'html';
  }
  if ( _mime ) {
    ctx.type = _mime;
  }
  if ( _mime && _mime.indexOf('image/') >= 0 ) {
    // 如果是图片，则用node原生res，输出二进制数据
    ctx.res.writeHead(200)
    ctx.res.write( content( ctx, fullStaticPath, 'binary'), 'binary')
    ctx.res.end()
  } else {
    // 其他则输出文本
    if(_mime == "html") {
      ctx.res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    }
    ctx.body = content( ctx, fullStaticPath, 'utf8')
  }
}

module.exports = appMidware;
