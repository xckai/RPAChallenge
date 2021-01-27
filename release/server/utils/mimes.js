var mime = require('mime-types');
function getFileMime(file){
  return mime.lookup(file) || 'application/octet-stream';
}
module.exports = getFileMime