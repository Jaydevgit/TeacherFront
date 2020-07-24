import {getScholatInfo, scholatLogin, scholatLogout} from '@/api/login'
import {getScholatToken, removeScholatToken, setScholatToken} from '@/utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'

const scholat = {
  state: {
    id: "",
    username:'',
    nickname: "",
    role: '',
    avatar: 'https://raw.githubusercontent.com/sansenlian/PicPlace/master/img/20190610104613.png',
    menus: [],
    permissions: [],
  },
  mutations: {
    SET_SCHOLAT_USER: (state, userInfo) => {
      state.id = userInfo.id;
      state.nickname = userInfo.nickname;
      state.username = userInfo.username;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.permissions = userInfo.permissionList;
    },
    RESET_SCHOLAT_USER: (state) => {
      state.id = "";
      state.username = "";
      state.nickname = "";
      state.role = '';
      state.menus = [];
      state.permissions = [];
    }
  },
  actions: {
    //  学者网登录
    scholatLogin({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "scholat/login/auth",
          method: "post",
          data: loginForm
        }).then(data => {
          console.log("账号密码验证正确, 下一步保存token,登录后台传过来的是："+data.result)
          if (data.result === "success") {
            //cookie中保存前端登录状态
            setScholatToken();
          }
          resolve(data);
        }).catch(err => {
          console.log("注册token失败，可能是已经登录")
          reject(err)
        })
      })
    },
    // 获取学者网管理员用户信息
    GetScholatInfo({commit, state}) {
      console.log("现在准备去后台获取学者网用户信息...")
      return new Promise((resolve, reject) => {
        api({
          url: '/scholat/login/getInfo',
          method: 'post'
        }).then(data => {
          // 返回的是一个json
          console.log("----------获取权限信息:"+data.userPermission.permissionList);
          //储存用户信息
          commit('SET_SCHOLAT_USER', data.userPermission);
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setScholatToken();
          //生成路由
          let userPermission = data.userPermission ;
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            console.log("获取完权限,去添加到路由")
            router.addRoutes(store.getters.addRouters)
            console.log("添加路由完成")
          })
          console.log("找到的权限为："+data.userPermission.permissionList)
          console.log(data.userPermission.menuList)
          console.log("保存数据, 完成权限获取访问")
          resolve(data)
        }).catch(error => {
          console.log("获取权限失败")
          reject(error)
        })
      })
    },
    // 登出
    scholatLogOut({commit}) {
      return new Promise((resolve) => {
        api({
          url: "scholat/login/logout",
          method: "post"
        }).then(data => {
          commit('RESET_SCHOLAT_USER')
          removeScholatToken()
          console.log("登出成功，移除了scholatToken")
          resolve(data);
        }).catch(() => {
          commit('RESET_SCHOLAT_USER')
          removeScholatToken()
          console.log("登出虽然失败，但是移除了scholaToken")
        })
      })
    },
    // 前端 登出
    scholatFedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_SCHOLAT_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default scholat
