const getters = {
  // -------------------学院用户---------------------
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  username: state => state.user.username,
  nickname: state => state.user.nickname, // 单位登录账号的用户名
  userId: state => state.user.userId, // 用户id
  unitName: state => state.user.unitName, // 单位名称
  unitId: state => state.user.unitId, // 单位ID
  avatar: state => state.user.avatar, // 单位头像
  role: state => state.user.role, // 单位的角色权限名称
  menus: state => state.user.menus, // 单位所拥有的菜单
  permissions: state => state.user.permissions, // 单位所拥有的权限
  domainName: state => state.user.domainName, // 单位域名
  schoolDomain: state => state.user.schoolDomain, // 学校域名
  tagState: state => state.user.tagState, // 学院教师主页信息显示标记字段

  // -------------------学校用户---------------------
  schoolUsername: state => state.schoolUser.username,
  schoolNickname: state => state.schoolUser.nickname, // 学校登录账号的用户名
  schoolUserId: state => state.schoolUser.userId, // 学校用户id
  schoolName: state => state.schoolUser.unitName, // 学校名称
  schoolId: state => state.schoolUser.schoolId, // 学校ID
  schoolAvatar: state => state.schoolUser.avatar, // 学校头像
  schoolRole: state => state.schoolUser.role, // 学校的角色权限名称
  schoolMenus: state => state.schoolUser.menus, // 学校所拥有的菜单
  schoolPermissions: state => state.schoolUser.permissions, // 学校所拥有的权限
  schoolDomainName: state => state.schoolUser.schoolDomain, // 学校域名

  // -------------------学者网用户---------------------
  scholatNickname: state => state.scholat.nickname, // 学者网管理员登录账号的用户名
  scholatUserId: state => state.scholat.userId, // 学者网管理员id
  scholatAvatar: state => state.scholat.avatar, // 学者网管理员头像
  scholatRole: state => state.scholat.role, // 学者网管理员的角色权限名称
  scholatMenus: state => state.scholat.menus, // 学者网管理员所拥有的菜单
  scholatPermissions: state => state.scholat.permissions, // 学者网管理员所拥有的权限
  scholatDomainName: state => state.scholat.DomainName, // 学者网管理员所拥有的权限

  // -------------------路由---------------------
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
}
export default getters
