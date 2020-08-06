import Vue from 'vue'
import Router from 'vue-router'
// in development env not use Lazy Loading,because Lazy Loading too many pages will cause webpack hot update too slow.so only in production use Lazy Loading
/* layout */
import configJson from '../../static/config.json'
import persona from '../views/persona/persona'
import Layout from '../views/layout/Layout'
import teacherPersonalHomePage from '../views/teacher/teacherPersonalHomePage'
import HomePage from '../views/homePage/HomePage'
import Home from '../views/home/Home'
import index from '../views/index/index'
import scholatLogin from "../views/scholat/login/login"
import fa from "element-ui/src/locale/lang/fa";
import researchManagement from "../views/research/researchManagement";

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/scholat/login',
    name: 'scholatLogin',
    component: _import('scholat/login/login'),//scholatLogin,
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/index',
    name: 'index',
    component: _import('index/index'),
    hidden: true,
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/homepage/:schoolDomain/:domainName',
    name: 'homepage',
    component: _import('homePage/HomePage'),
    hidden: true,
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: '/homepage/:schoolDomain/:domainName/:cId',
        name: 'catalogue',
        component: _import('homePage/HomePage'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/homepage/:schoolDomain/:domainName/search=:searchKey',
        name: 'search',
        component:_import('homePage/HomePage'),
        meta: {
          keepAlive: true
        },
      },
      {
        path: '/homepage/:schoolDomain/:domainName/:cId/:tId',
        name: 'teacher',
        component:_import('homePage/HomePage'),
        meta: {
          keepAlive: true
        },
      }
    ]
  },
  {
    path: '/home/:schoolDomain',
    name: 'home',
    component:_import('home/Home'),
    hidden: true,
    meta: {
      keepAlive: true
    },
    children: [
      {
        path: '/home/:schoolDomain/:domainName',
        name: 'unit',
        component:_import('homePage/HomePage'),
        meta: {
          keepAlive: true
        },
      },
    ]
  },
  {
    path: '/teacher/:scholat_username/:user_id/persona',
    name: 'persona',
    component:_import('persona/persona'),
    hidden: true,
    children: [],
    meta: {
      keepAlive: false
    }
  },
  {
    path: '/teacher/:schoolDomain/:teacherDomainName',
    component: _import('teacher/teacherPersonalHomePage'),
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
  {
    path: '/schoolLogin',
    name: "main-color",
    component: _import('login/schoolLogin'),
    hidden: true,
    meta: {
      keepAlive: true
    }
  },
  {path: '/404', component: _import('404'), hidden: true},
  {path: '/applySuccess', name: 'applySuccess', component: _import('unitApply/ApplySuccess'), hidden: true},
  /*  {path: '/applySuccess', name: 'applySuccess', component: _import('unitApply/ApplySuccess'), hidden: true},*/
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
    path: '/unitApplySchool',
    name: 'unitApplySchool',
    component: _import('unitApply/UnitApplySchool'),
    hidden: true
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
    component: _import('layout/Layout'),
    hidden: true,
    /*    children: [{
          path: 'dashboard', component: _import('dashboard/index')
        }]*/
  },
  {
    path: '/',
    component:_import('layout/Layout'),
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
  /*  {
      path: '/teacher/:id',
      component: teacherPersonalHomePage,
      name: 'teacherPersonlHomePage'
    },*/
  {
    path: '/school/schoolInfo',
    component: Layout,
    redirect: '/school/schoolInfo',
    name: '学校信息管理',
    meta: {title: '信息管理', icon: 'tree'},
    children: [
      {

        path: '',
        name: 'SchoolInfo',
        component: _import('unitInfo/SchoolInfo'),
        meta: {title: '学校信息', icon: 'user'},
        menu: 'school'

      }

    ]
  },
  {
    path: '/school/manager',
    component: Layout,
    redirect: '/school/manager/college',
    name: '学院管理',
    meta: {title: '学院管理', icon: 'tree'},
    children: [
      {
        path: 'college',
        name: '学院列表',
        component: _import('managerSchool/CollegeManagement'),
        meta: {title: '学院列表', icon: 'example'},
        menu: 'school',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
      },
      {
        path: 'teacher',
        name: '教师列表',
        component: _import('managerSchool/teacher'),
        meta: {title: '教师列表', icon: 'example'},
        menu: 'school',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
      },
    ]
  },
  {
    path: '/school/user',
    component: Layout,
    redirect: '/school/user/user',
    name: '账号管理',
    meta: {title: '账号管理', icon: 'table'},
    children: [
      /*{
        path: 'user',
        name: '账号列表',
        component: _import('user/SchoolUser'),
        meta: {title: '子账号管理', icon: 'user'},
        menu: 'school'
      },*/
      {
        path: 'password',
        name: '本账号管理',
        component: _import('user/SchoolPassword'),
        meta: {title: '本账号管理', icon: 'password'},
        menu: 'school'
      },
    ]
  },


  {
    path: '/unitInfo',
    component: _import('layout/Layout'),
    redirect: '/unitInfo',
    name: '学院设置',
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
    component:_import('layout/Layout'),
    redirect: '/manager/teacher',
    name: '学院教师信息管理',
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
        path: '/modifyTeacher/:id',
        name: 'modifyTeacher',
        component: _import('manager/updateTeacher'),
        meta: {title: '修改教师', icon: 'example'},
        menu: 'teacher', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {
        path: '/personAcademic/:scholat_username',
        name:'personAcademic',
        component: _import('manager/personAcademic'),
        meta: {title: '学者网个人学术成果', icon: 'example'},
        menu:'teacher',
        hidden: true
      }

    ]
  },
  {
    path: '/homeSet',
    component: _import('layout/Layout'),
    redirect: '/homeSet/teacherSet',
    name: '师资队伍主页定制',
    meta: {title: '师资队伍主页定制', icon: 'tree'},
    children: [

      {
        path: 'catalogueList',
        name: '师资栏目设置',
        component: _import('homeSet/catalogue/catalogueList'),
        meta: {title: '师资栏目设置', icon: 'user'},
        menu: 'user'
      },
      {
        path: 'assignTeacher',
        name: 'assignTeacher',
        component: _import('manager/assignTeacher'),
        meta: {title: '教师分类设置', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      /*经过进一步调研，由于我们这里的数据不是教师人事数据（可以跟学院人事数据对接），所以我们这里先删去“毕业学校”和“专业”等一般教师主页不需要显示的字段*/
      /*{
        path: 'teacherSet',
        name: '教师主页设置',
        component: _import('homeSet/teacher/teacherSet'),
        meta: {title: '教师主页设置', icon: 'user'},
        menu: 'user'
      },*/

    ]
  },
  {
    path: '/research',
    component: _import('layout/Layout'),
    redirect: '/research',
    name: '科研信息采集',
    meta: {title: '科研信息采集',icon: "table"},
    children: [
      {
        path: 'researchCollect',
        name: '科研采集',
        component: _import('research/researchCollect'),
        meta: {title: '科研采集', icon: 'user'},
        menu: 'user'
      },
      {
        path: 'paper',
        name: 'paper',
        component: _import('research/paperList'),
        meta: {title: '论文管理', icon: 'user'},
        menu: 'user'
      },
      {
        path: 'addPaper',
        name: 'addPaper',
        component: _import('research/addPaper'),
        meta: {title: '添加论文', icon: 'example'},
        menu: 'teacher',
        hidden: true
      },
      {
        path: '/modifyPaper/:id',
        name: 'modifyPaper',
        component: _import('research/updatePaper'),
        meta: {title: '修改论文', icon: 'example'},
        menu: 'teacher',
        hidden: true
      },
      {

        path: 'project',
        name: '项目管理',
        component: _import('research/projectList'),
        meta: {title: '项目管理', icon: 'user'},
        menu: 'user'

      },
      {
        path: 'addProject',
        name: 'addProject',
        component: _import('research/addProject'),
        meta: {title: '添加项目', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {
        path: '/modifyProject/:id',
        name: 'modifyProject',
        component: _import('research/updateProject'),
        meta: {title: '修改项目', icon: 'example'},
        menu: 'teacher', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {

        path: 'patent',
        name: '专利管理',
        component: _import('research/patentList'),
        meta: {title: '专利管理', icon: 'user'},
        menu: 'user'

      },
      {
        path: 'addPatent',
        name: 'addPatent',
        component: _import('research/addPatent'),
        meta: {title: '添加专利', icon: 'example'},
        menu: 'teacher',// 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {
        path: '/modifyPatent/:id',
        name: 'modifyPatent',
        component: _import('research/updatePatent'),
        meta: {title: '修改专利', icon: 'example'},
        menu: 'teacher', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {

        path: 'publication',
        name: '著作管理',
        component: _import('research/publicationList'),
        meta: {title: '著作管理', icon: 'user'},
        menu: 'user'
      },
      {
        path: '/modifyPublication/:id',
        name: 'modifyPublication',
        component: _import('research/updatePublication'),
        meta: {title: '修改著作', icon: 'example'},
        menu: 'teacher', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: true
      },
      {
        path: 'researchManagement',
        name: '科研导出',
        component: _import('research/researchManagement'),
        meta: {title: '科研导出', icon: 'user'},
        menu: 'user'
      },

    ]
  },
  {
    path: '/user',
    component: _import('layout/Layout'),
    redirect: '/user/',
    name: '账号管理',
    meta: {title: '账号管理', icon: 'table'},
    children: [
      {
        path: '',
        name: '账号列表',
        component: _import('user/user'),
        meta: {title: '子账号管理', icon: 'user'},
        menu: 'role'
      },
      {
        path: 'role',
        name: '权限管理',
        component: _import('user/role'),
        meta: {title: '权限管理', icon: 'password'},
        menu: 'role'
      },
      {
        path: 'password',
        name: '本账号管理',
        component: _import('user/password'),
        meta: {title: '本账号管理', icon: 'password'},
        menu: 'user'
      },
    ]
  },
  {
    path: '/scholat/unit',
    component: _import('layout/Layout'),
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
    component: _import('layout/Layout'),
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
  {
    path: '/scholat',
    component: Layout,
    redirect: '/scholat/applySchool/wait', // 跳转到申请处理页面
    name: 'scholatHomeSchool',
    meta: {title: '学校申请管理', icon: 'tree'},
    children: [
      {
        path: 'applySchool/wait',
        name: 'applySchoolWait',
        component: _import('scholat/ApplySchool/Wait'),
        meta: {title: '待处理申请', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'ApplySchool/processed',
        name: 'applySchoolProcessed',
        component: _import('scholat/ApplySchool/Processed'),
        meta: {title: '待修改申请', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      },
      {
        path: 'ApplySchool/black',
        name: 'applySchoolBlack',
        component: _import('scholat/ApplySchool/Black'),
        meta: {title: '申请的黑名单', icon: 'example'},
        menu: 'unit', // 这里的menu和权限有关，如果权限menu没有返回对应的menu就不会显示，所以要写上menu
        hidden: false
      }
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]
