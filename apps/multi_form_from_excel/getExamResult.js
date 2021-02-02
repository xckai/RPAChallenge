/** 注入到window全局变量下，返回一个promise来做本地验证，验证通过返回data 不通过返回errMsg*/
function getExamResult() {
  return new Promise(function (resolve, reject) {
    resolve(formData)
  });
}
window.getExamResult = getExamResult;