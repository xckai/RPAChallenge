/** 支持async 调用的validator, 入参即为getExamResult函数中返回的 data ， true代表验证通过，其余其他返回均表示未通过校验*/
async function validator(examResult) {
  if (examResult.name != '张小扩') {
    return '姓名输入错误';
  }
  if (examResult.gender != 'male') {
    return '性别输入错误';
  }
  if (examResult.age != 20) {
    return '年龄输入错误';
  }
  if (examResult.birthday != '2000-01-01') {
    return '出生日期输入错误';
  }
  if (examResult.marry != 'secret') {
    return '婚姻状况输入错误';
  }
  if (examResult.address != '中国上海市徐汇区虹梅国际广场902室') {
    return '住址输入错误';
  }
  if (examResult.aggree != 'on') {
    return '请勾选同意用户条例';
  }
  return true;
}
module.exports = validator;
