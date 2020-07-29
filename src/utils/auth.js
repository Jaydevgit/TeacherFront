import Cookies from 'js-cookie'

const LoginKey = 'hasLogin'
const SchoolLoginKey = 'schoolHasLogin'
const ScholatLoginKey = 'scholatHasLogin'
/*
* 学院层面登录cookie
* */
export function getToken() {
  return Cookies.get(LoginKey);
}

export function setToken() {
  var oneday = 1;
  return Cookies.set(LoginKey, "1",{
    expires: oneday
  })
}

export function removeToken() {
  return Cookies.remove(LoginKey)
}
/*
* 学校层面登录cookie
* */
export function getSchoolToken() {
  return Cookies.get(SchoolLoginKey);
}

export function setSchoolToken() {
  var oneday = 1;
  return Cookies.set(SchoolLoginKey, "1",{
    expires: oneday
  })
}

export function removeSchoolToken() {
  return Cookies.remove(SchoolLoginKey)
}
/*
* 学者网登录cookie
* */
export function getScholatToken() {
  return Cookies.get(ScholatLoginKey);
}

export function setScholatToken() {
  return Cookies.set(ScholatLoginKey, "1")
}

export function removeScholatToken() {
  return Cookies.remove(ScholatLoginKey)
}
