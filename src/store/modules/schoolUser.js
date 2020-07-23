import {getSchoolToken, removeSchoolToken, setSchoolToken} from '@/utils/auth'
import {default as api} from '../../utils/api'
import store from '../../store'
import router from '../../router'


const schoolUser = {
  state: {
    username:'',
    nickname: "",
    userId: "",
    avatar: 'https://raw.githubusercontent.com/sansenlian/PicPlace/master/img/20190610104613.png',
    role: '',
    menus: [],
    schoolName:'',
    schoolId: '',
    permissions: [],
    schoolDomain:'',
  },
  mutations: {
    SET_SCHOOL_USER: (state, userInfo) => {
      state.username = userInfo.username;
      state.nickname = userInfo.nickname;
      state.userId = userInfo.userId;
      state.role = userInfo.roleName;
      state.menus = userInfo.menuList;
      state.schoolName = userInfo.schoolName;
      state.permissions = userInfo.permissionList;
      state.unitId = userInfo.unitId;
      state.domainName = userInfo.domainName;
      state.schoolDomain = userInfo.schoolDomain;
    },
    RESET_SCHOOL_USER: (state) => {
      state.username = "";
      state.nickname = "";
      state.userId = "";
      state.role = '';
      state.menus = [];
      state.schoolName = '';
      state.permissions = [];
    }
  },
  actions: {
    // 学校登录
    schoolLogin({commit, state}, loginForm) {
      return new Promise((resolve, reject) => {
        api({
          url: "login/schoolAuth",
          method: "post",
          data: loginForm
        }).then(data => {
          console.log("账号密码验证正确, 下一步保存token,登录后台传过来的是："+data.result)
          if (data.result === "success") {
            //cookie中保存前端登录状态
            setSchoolToken();
          }
          resolve(data);
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取学院用户信息
    GetSchoolInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        api({
          url: '/login/getSchoolInfo',
          method: 'post'
        }).then(data => {
          // 返回的是一个json
          console.log("----------获取权限信息:"+data.userPermission.permissionList);
          //储存用户信息
          commit('SET_SCHOOL_USER', data.userPermission);
          //cookie保存登录状态,仅靠vuex保存的话,页面刷新就会丢失登录状态
          setSchoolToken();
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

    // 学校登出
    schoolLogOut({commit}) {
      return new Promise((resolve) => {
        api({
          url: "login/schoolLogout",
          method: "post"
        }).then(data => {
          commit('RESET_SCHOOL_USER')
          removeSchoolToken()
          resolve(data);
        }).catch(() => {
          commit('RESET_SCHOOL_USER')
          removeSchoolToken()
        })
      })
    },
    // 前端 登出
    schoolFedLogOut({commit}) {
      return new Promise(resolve => {
        commit('RESET_SCHOOL_USER')
        removeSchoolToken()
        resolve()
      })
    }
  }
}
export default schoolUser
