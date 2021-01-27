/** 注入到window全局变量下，返回一个promise来做本地验证，验证通过返回data 不通过返回errMsg*/
function getExamResult() {
  var res = new Promise(function (res, rej) {
    var formArray = $(document.getElementById("base_form")).serializeArray();
    var formData = {};
    for (var i = 0; i < formArray.length; ++i) {
      formData[formArray[i].name] = formArray[i].value;
    }

    formData.age = $("#age").val();
    formData.birthday = $("#birthday").val();
    if (formData.name != "" && formData.gender != "" && formData.age != "" && formData.birthday != "" && formData.marry != "" && formData.address != "" && formData.aggree != "") {
      res(formData);
    }else{
      rej("表单填写不完整，请填写所有字段");
    }
  });
  return res;
}
window.getExamResult = getExamResult;