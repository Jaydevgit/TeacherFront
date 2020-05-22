import Cookies from 'js-cookie'

const LoginKey = 'hasLogin'
const ScholatLoginKey = 'scholatHasLogin'

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
