/** 支持async 调用的validator, 入参即为getExamResult函数中返回的 data */
async function validator(examResult){

  return true;
}
module.exports = validator