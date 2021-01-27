function getExamResult() {
  var res = new Promise(function (res, rej) {
    var formArray = $(document.getElementById("base_form")).serializeArray();
    var formData = {};
    for (var i = 0; i < formArray.length; ++i) {
      formData[formArray[i].name] = formArray[i].value;
    }
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