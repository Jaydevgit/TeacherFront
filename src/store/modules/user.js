import {getInfo, login, logout} from '@/api/login'
import {getToken, removeToken, setToken} from '@/utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'

const user = {
  state: {
    username:'',
    nickname: "",
    userId: "",
    avatar: 'https://raw.githubusercontent.com/sansenlian/PicPlace/master/img/20190610104613.png',
    role: '',
    menus: [],
    unitname:'',
    unitId: '',
    permissions: [],
    domainName:'',
    tagState:''
  },
  mutations: {
    SET_USER: (state, userInfo) => {
      state.username = userInfo.username;
      state.nickname = userInfo.nickname;
      state.userId = userInfo.userId;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.unitName = userInfo.unitName;
      state.permissions = userInfo.permissionList;
      state.unitId = userInfo.unitId;
      state.domainName = userInfo.domainName;
      state.tagState = userInfo.tagState;
    },
    RESET_USER: (state) => {
      state.username = "";
      state.nickname = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.unitname = '';
      state.permissions = [];
    }
  },
  actions: {
    // 登录
    Login({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "login/auth",
          method: "post",
          data: loginForm
        }).then(data => {
          if (data.result === "success") {
            //cookie中保存前端登录状态
            setToken();
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取学院用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/getInfo',
          method: 'post'
        }).then(data => {
          // 返回的是一个json
          console.log("----------获取权限信息:"+data.userPermission.permissionList);
          //储存用户信息
          commit('SET_USER', data.userPermission);
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setToken();
          //生成路由
          let userPermission = data.userPermission ;
          store.dispatch('GenerateRoutes', userPermission).then(() => {
            //生成该用户的新路由json操作完毕之后,调用vue-router的动态新增路由方法,将新路由添加
            console.log("获取完权限后,去添加到路由")
            router.addRoutes(store.getters.addRouters)
            console.log("添加路由完成")
          })
          console.log("权限为......."+data.userPermission.permissionList)
          console.log(data.userPermission.menuList)
          console.log("保存数据, 完成权限获取访问")
          resolve(data)
        }).catch(error => {
          console.log("权限获取失败")
          reject(error)
        })
      })
    },
    // 登出
    LogOut({commit}) {
      return new Promise((resolve) => {
        api({
          url: "login/logout",
          method: "post"
        }).then(data => {
          commit('RESET_USER')
          removeToken()
          resolve(data);
        }).catch(() => {
          commit('RESET_USER')
          removeToken()
        })
      })
    },
    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_USER')
        removeToken()
        resolve()
      })
    }
  }
}
export default user
