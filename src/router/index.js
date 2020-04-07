import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import configJson from '../../static/config.json'
import persona from '../views/persona/persona'
import Layout from '../views/layout/Layout'
import teacherPersonalHomePage from '../views/teacher/teacherPersonalHomePage'
import HomePage from '../views/homePage/HomePage'
import index from '../views/index/index'
import scholatLogin from "../views/scholat/login/login"
import fa from "element-ui/src/locale/lang/fa";

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/scholat/login',
    name: 'scholatLogin',
    component: scholatLogin,
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/homepage/:unitId',
    name: 'homepage',
    component: HomePage,
    hidden: true,
    meta: {
      keepAlive: true
    },
    children: []
  },
  {
    path: '/teacher/:scholat_username/:user_id/persona',
    name: 'persona',
    component: persona,
    hidden: true,
    children: [],
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/teacher/:id',
    component: teacherPersonalHomePage,
    name: 'teacherPersonlHomePage',
    meta: {
      keepAlive: true
    },
  },

  {
    path: '/login',
    name: "main-color",
    component: _import('login/index'),
    hidden: true,
    meta: {
      keepAlive: true
    }
    },
  {path: '/404', component: _import('404'), hidden: true},
  {path: '/applySuccess', name: 'applySuccess', component: _import('unitApply/ApplySuccess'), hidden: true},
  {path: '/applySuccess', name: 'applySuccess', component: _import('unitApply/ApplySuccess'), hidden: true},
  {
    path: '/unitApply',
    name: 'unitApply',
    component: _import('unitApply/UnitApply'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/unitApply/:token',
    name: 'unitApply',
    component: _import('unitApply/UnitApply'),
    hidden: true
  },
  {
    path: '/scholat',
    redirect: '/scholat/apply/wait',
    name: 'scholat',
    component: Layout,
    hidden: true,
/*    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]*/
  },
  {
    path: '/',
    component: Layout,
    redirect: '/manager/teacher',
    name: 'managerTeacher',
    hidden: true,
/*    children: [{
      path: 'dashboard', component: _import('dashboard/index')
    }]*/
  },
]
export default new Router({
  //去除#号
  mode: 'history',
  base: configJson.publishFolder,
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  /*  {
      path:'/modifyTeacher/:id',
      name:'modifyTeacher',
      component:_import('manager/updateTeacher'),
    },*/
  {
    path: '/teacher/:id',
    component: teacherPersonalHomePage,
    name: 'teacherPersonlHomePage'
  },
  {
    path: '/unitInfo',
    component: Layout,
    redirect: '/unitInfo',
    name: 'unitInfo',
    meta: {title: '信息管理', icon: 'tree'},
    children: [
      {

        path: '',
        name: 'unitInfo',
        component: _import('unitInfo/unitInfo'),
        meta: {title: '学院信息', icon: 'user'},
        menu: 'user'

      }

    ]
  },
  {
    path: '/manager',
    component: Layout,
    redirect: '/manager/teacher',
    name: '教师信息管理',
    meta: {title: '教师信息管理', icon: 'tree'},
    children: [
      {
        path: 'teacher',
        name: '教师列表',
        component: _import('manager/teacher'),
        meta: {title: '教师列表', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'addTeacher',
        name: 'addTeacher',
        component: _import('manager/addTeacher'),
        meta: {title: '添加教师', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'assignTeacher',
        name: 'assignTeacher',
        component: _import('manager/assignTeacher'),
        meta: {title: '分配教师', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: '/modifyTeacher/:id',
        name: 'modifyTeacher',
        component: _import('manager/updateTeacher'),
        meta: {title: '修改教师', icon: 'example'},
        menu: 'teacher', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },

    ]
  },
  {
    path: '/catalogue',
    component: Layout,
    redirect: '/catalogue',
    name: '首页栏目',
    meta: {title: '首页栏目', icon: 'tree'},
    children: [
      {

        path: '',
        name: '栏目管理',
        component: _import('catalogue/catalogueList'),
        meta: {title: '栏目列表', icon: 'user'},
        menu: 'user'

      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/',
    name: '',
    meta: {title: '账号管理', icon: 'table'},
    children: [
      {
        path: '', name: '账号列表', component: _import('user/user'), meta: {title: '用户列表', icon: 'user'}, menu: 'user'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
    ]
  },
  {
    path: '/scholat/unit',
    component: Layout,
    name: 'scholatUnit',
    meta: {title: '学院管理', icon: 'tree'},
    children: [
      {
        path: 'all',
        name: 'allUnit',
        component: _import('scholat/unit/all'),
        meta: {title: '全部学院', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'black',
        name: 'black',
        component: _import('scholat/unit/black'),
        meta: {title: '黑名单', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },

    ]
  },
  {
    path: '/scholat',
    component: Layout,
    redirect: '/scholat/apply/wait', // 跳转到申请处理页面
    name: 'scholatHome',
    meta: {title: '学院申请管理', icon: 'tree'},
    children: [
      {
        path: 'apply/wait',
        name: 'applyWait',
        component: _import('scholat/apply/wait'),
        meta: {title: '待处理申请', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'apply/processed',
        name: 'applyProcessed',
        component: _import('scholat/apply/processed'),
        meta: {title: '待修改申请', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'apply/black',
        name: 'applyBlack',
        component: _import('scholat/apply/black'),
        meta: {title: '申请的黑名单', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
