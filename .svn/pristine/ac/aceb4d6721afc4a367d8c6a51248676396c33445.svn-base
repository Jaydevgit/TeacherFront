import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken, getScholatToken} from '@/utils/auth' // 验权
const whiteList = ['/scholat/login', '/login','/index',
  '/404', '/teacher/', '/homepage/', '/home','/teacherDetail',
  '/departmentPage', '/unitApply','/applySuccess'] //白名单,不需要登录的路由
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log("=================================")
  console.log("准备前往的路径是：" + to.path);
  console.log("ScholatToken: "+getScholatToken())
  console.log("UnitToken: "+getToken())
  if (to.path.indexOf("scholat") != -1) {

    // 说明前往的是scholar页面， 也就是后台页面
    if (getScholatToken()) {
      console.log("发现是学者网的token")
      if (to.path === '/scholat/login') {
        console.log("学者网管理员地址路径正确")
        next({path: '/scholat'})
        NProgress.done() // 结束Progress
      } else if (!store.getters.scholatRole) {
        console.log("验证完密码了准备获取权限...")
        // 刚刚验证完密码后获取权限管理
        store.dispatch('GetScholatInfo').then(() => {
          next({...to})
        }).catch(e=>{
          console.log("虽然验证完了密码，但是后台没有找到用户信息，那就再登录一遍好了")
          store.dispatch('scholatLogOut').then(()=>{
            next({path: '/scholat'})
          })
        })
      } else {
        next()
      }
    } else if (checkUrl(to.path) == 1) {
      //如果前往的路径是白名单内的,就可以直接前往
      next()
    } else {
      //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
      store.commit('RESET_SCHOLAT_USER')
      next('/scholat/login')
      NProgress.done() // 结束Progress
    }
  } else {
    // 跳转的是学院管理页面
    if (getToken()) {
      console.log("发现是学院的token")
      //如果已经登录
      if (to.path === '/login') {
        next({path: '/'})
        NProgress.done() // 结束Progress
      } else if (!store.getters.role) {
        console.log("验证完密码了准备获取权限...")
        // 刚刚验证完密码后获取权限管理
        store.dispatch('GetInfo').then(() => {
          next({...to})
        }).catch(e=>{
          console.log("虽然验证完了密码，但是后台没有找到用户信息，那就再登录一遍好了")
          store.dispatch('LogOut').then(()=>{
            next({path: '/'})
          })
        })
      } else {
        next()
      }
    } else if (checkUrl(to.path) == 1) {
      //如果前往的路径是白名单内的,就可以直接前往
      next()
    } else {
      //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
      store.commit('RESET_USER')
      next('/index')
      NProgress.done() // 结束Progress
    }
  }


})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})


function checkUrl(path) {
  let flag = 0
  for (let i = 0, len = whiteList.length; i < len; i++) {
    if (path.indexOf(whiteList[i]) != -1) {
      flag = 1;
      break;
    }
  }
  return flag;
}
