//电话验证
export function isPhone(rule, value, callback) {
  if (!value) {
    return callback(new Error("电话号码不能为空"));
  }
  var pattern = /^1[345789]\d{9}$/;
  if (pattern.test(value)){
    return callback();
  }
  return callback(new Error("输入手机号错误"));
}
//邮箱验证
export function isEmail(rule, value, callback) {
  if (!value ) {
    return callback(new Error('请正确填写邮箱'));
  }
  else {
    if (value !== '') {
      var pattern = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!pattern.test(value)){
        return callback(new Error("请输入有效的邮箱"));
      }

    }
    return callback();
  }
}
//英文名称验证
export function isEnglish(rule, value, callback) {
  if (!value){
    return callback(new Error('请正确填写英文名'));
  }
  else{
    if (value !== ''){
      var pattern = /^[a-zA-Z\s]{1,50}$/;
      if (!pattern.test(value)){
        return callback(new Error("请输入有效的英文名"));
      }
    }
    return callback();
  }
}
//密码验证大写字母（不少于一位）+小写字母+数字，8-20位
export function passwordStyle(rule, value, callback) {
  if (!value){
    return callback(new Error("密码不能为空"));
  }
  var pattern = "/[a-zA-Z](?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{7,19}/";
  if (pattern.test(value)){
    return callback();
  }
  return callback(new Error("请输入有效的密码"));
}

export function validatePassword(rule, value, callback) {
  if (value === ''){
    return callback(new Error("请再次输入密码"));
  } else if (value != this.applyForm.password) {
    return callback(new Error("两次输入密码不一致，请重新输入"))
  }
  return callback();
}

