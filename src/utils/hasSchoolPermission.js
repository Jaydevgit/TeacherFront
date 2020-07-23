import store from '../store'

export function hasSchoolPermission(permission) {
  // console.log("..........我去查下有没有"+permission+"权限")
  let myPermissions = store.getters.permissions;
  if(myPermissions.indexOf(permission) > 0) {
    // console.log("........................找到啦,有"+permission+"权限")
  }
  return myPermissions.indexOf(permission) > -1;
}
