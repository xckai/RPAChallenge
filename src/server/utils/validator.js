const path = require('path');
async function invokeValidator(postData) {
  let res = {
    error: false,
    message: '',
    result: false
  };
  let appName = postData.appName;
  let data = postData.data;
  try {
    let validatorPath = path.join(__dirname, '../../apps', appName, './validator.js');
    let validator = require(validatorPath);
    res.result = await validator(data);
  } catch (ex) {
    res.error = true;
    res.message = ex.message;
    res.result = false;
  }
  return res;
}
module.exports = invokeValidator;
