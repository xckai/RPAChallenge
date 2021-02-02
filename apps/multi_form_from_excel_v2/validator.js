/** 支持async 调用的validator, 入参即为getExamResult函数中返回的 data ， true代表验证通过，其余其他返回均表示未通过校验*/
async function validator(examResult) {
  var expectResult = [
    { name: '张小云', tel: '13800001231', gender: 'female', birthday: '2000-01-01', address: '上海市徐汇区东一路大街223号' },
    { name: '张小扩', tel: '13800001233', gender: 'male', birthday: '2000-01-01', address: '上海市徐汇区南一路大街223号' },
    { name: '张小科', tel: '13800001234', gender: 'male', birthday: '2000-01-11', address: '上海市徐汇区东一路大街226号' },
    { name: '张小技', tel: '13800001237', gender: 'male', birthday: '2000-06-16', address: '上海市徐汇区西一路大街223号' }
  ];
  if(expectResult.length!=examResult.length){
    return "录入记录总数不匹配，请重试!"
  }
  for(let i =0; i<= expectResult.length; ++i){
    if(JSON.stringify(expectResult[i]) != JSON.stringify(examResult[i])){
      return `第${i}记录不匹配：\n期待：${JSON.stringify(expectResult[i])} \n 提交：${JSON.stringify(examResult[i])} `
    }
  }
  return true;
}
module.exports = validator;
