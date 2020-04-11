const getters = {
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,

  nickname: state => state.user.nickname, // 单位登录账号的用户名
  userId: state => state.user.userId, // 用户id
  unitName: state => state.user.unitName, // 单位名称
  unitId: state => state.user.unitId, // 单位ID
  avatar: state => state.user.avatar, // 单位头像
  role: state => state.user.role, // 单位的角色权限名称
  menus: state => state.user.menus, // 单位所拥有的菜单
  permissions: state => state.user.permissions, // 单位所拥有的权限
  domainName: state => state.user.domainName, // 单位域名



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
