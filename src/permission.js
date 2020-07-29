import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {getToken, getScholatToken} from '@/utils/auth'
import {getSchoolToken} from "./utils/auth"; // 验权
const whiteList = ['/scholat/login', '/login','/schoolLogin','/index',
  '/404', '/teacher/', '/homepage/', '/home/','/teacherDetail',
  '/departmentPage', '/unitApply','/applySuccess'] //白名单,不需要登录的路由
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log("=================================")
  console.log("准备前往的路径（to.path）是：" + to.path);
  console.log("ScholatToken: "+getScholatToken())
  console.log("SchoolToken: "+getSchoolToken())
  console.log("UnitToken: "+getToken())
  if (to.path.indexOf("scholat") != -1) {

    // 说明前往的是scholar页面， 也就是后台页面
    if (checkUrl(to.path) == 1) {
      //如果前往的路径是白名单内的,就可以直接前往
      next()
    }
    else if (getScholatToken()) {
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
    }
    else {
      //如果路径不是白名单内的,而且又没有登录,就跳转登录页面
      store.commit('RESET_SCHOLAT_USER')
      next('/scholat/login')
      NProgress.done() // 结束Progress
    }
  }
  else if (to.path.indexOf("school") != -1){
    // 跳转的是学校管理页面
    if (checkUrl(to.path) == 1){
      //如果前往的路径是白名单内的,就可以直接前往
      console.log("前往的路径是白名单内的,就可以直接前往" );
      next()
    }
    else if (getSchoolToken()) {
      console.log("学校前端已经登录过")
      //如果已经登录还要前往登录页面
      if (to.path === '/loginSchool') {
        next({path: '/school/manager'})
        NProgress.done() // 结束Progress
      } else if (!store.getters.schoolRole) {
        console.log("已经登录过了,到了验证权限阶段")
        // next(...to)
        // 刚刚验证完密码后获取权限管理
        store.dispatch('getSchoolInfo').then(() => {
          next({...to})
        }).catch(e=>{
          console.log("虽然验证完了密码，但是后台没有找到用户信息，返回主页")
          store.dispatch('schoolLogout').then(()=>{
            next({path: '/'})
          })
        })
      } else {
        next()
      }
    }else {
      //如果路径不是白名单内的,而且又没有登录,就跳转到首页页面
      store.commit('RESET_SCHOOL_USER')
      next('/index')
      NProgress.done() // 结束Progress
    }
  }
  else {
        // 跳转的是学院管理页面
        if (checkUrl(to.path) == 1){
          //如果前往的路径是白名单内的,就可以直接前往
          console.log("前往的路径是白名单内的,就可以直接前往" );
          next()
        }
        else if (getToken()) {
          console.log("学院前端已经登录过")
          //如果已经登录还要前往登录页面
          if (to.path === '/login') {
            next({path: '/'})
            NProgress.done() // 结束Progress
          } else if (!store.getters.role) {
            console.log("已经登录过了,到了验证权限阶段")
            // 刚刚验证完密码后获取权限管理
            store.dispatch('GetInfo').then(() => {
              next({...to})
            }).catch(e=>{
              console.log("虽然验证完了密码，但是后台没有找到用户信息，返回主页")
              store.dispatch('LogOut').then(()=>{
                next({path: '/'})
              })
            })
          } else {
            next()
          }
        }else {
          //如果路径不是白名单内的,而且又没有登录,就跳转到首页页面
          store.commit('RESET_USER')
          next('/index')
          NProgress.done() // 结束Progress
        }
  }


})
router.afterEach(() => {
  NProgress.done() // 结束Progress
})

//判断是否是白名单里面的页面
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
