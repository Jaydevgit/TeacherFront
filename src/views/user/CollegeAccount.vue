<template>
  <div class="app-container">
    <!--<div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="success" icon="plus" v-if="hasPerm('user:add')" @click="showCreate">添加角色
          </el-button>
        </el-form-item>
      </el-form>
    </div>-->
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="昵称" prop="roleName" width="150">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.nickname}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学院">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.unitName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.username}}</span>
          <el-tag v-if="scope.row.roleId === 1"
            type="primary"
            disable-transitions>主账号</el-tag>
          <el-tag v-if="scope.row.roleId !== 1"
                  type="info"
                  disable-transitions>子账号</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="管理">
        <template slot-scope="scope">
          <el-radio-group v-model="scope.row.state" size="small">
            <el-radio-button class="user-radio" label="1"><div class="user-radio-div">正常</div></el-radio-button>
            <el-radio-button class="user-radio" label="2"><div class="user-radio-div">变更</div></el-radio-button>
            <el-radio-button class="user-radio" label="-1"><div class="user-radio-div">注销</div></el-radio-button>

          </el-radio-group>
        </template>
      </el-table-column>


    </el-table>
  </div>
</template>

<script>
export default {
  name: "CollegeAccount",
  data() {
    return {
      radio: '',
      list: [],//表格的数据
      listQuery: {
        pageNum: 1,//页码
        pageRow: 10,//每页条数
        schoolId:'',
        unitId: 0,
        name: ''
      },
      allPermission: [],
      listLoading: false,//数据加载等待动画
      dialogStatus: 'create',
      dialogFormVisible: false,
      textMap: {
        update: '编辑',
        create: '新建角色'
      },
      tempRole: {
        roleName: '',
        roleId: '',
        permissions: [],
        unitId: ''
      },
      adminName: '高级管理员'
    }
  },
  created() {
    this.getList();
    // this.getAllPermisson();
  },
  methods: {
    getAllPermisson() {
      //查询所有权限
      this.api({
        url: "/user/listAllPermission",
        method: "get"
      }).then(data => {
        this.allPermission = data.list;
      })
    },
    getList() {
      //查询列表
      this.listLoading = true;
      this.listQuery.schoolId= this.$store.state.schoolUser.schoolId;
      console.log('schoolId=='+this.listQuery.schoolId);
      this.api({
        url: "/user/listAllUnitUser",
        method: "get",
        params: this.listQuery
      }).then(data => {
        console.log(data.list);
        this.listLoading = false;
        this.list = data.list;
      })
    },
    getIndex($index) {
      //表格序号
      return $index + 1
    },
    showCreate() {
      //显示新增对话框
      this.tempRole.roleName = '';
      this.tempRole.roleId = '';
      this.tempRole.permissions = [];
      this.dialogStatus = "create"
      this.dialogFormVisible = true
    },
    showUpdate($index) {
      let role = this.list[$index];
      this.tempRole.roleName = role.roleName;
      this.tempRole.roleId = role.roleId;
      this.tempRole.permissions = [];
      for (let i = 0; i < role.menus.length; i++) {
        let perm = role.menus[i].permissions;
        for (let j = 0; j < perm.length; j++) {
          this.tempRole.permissions.push(perm[j].permissionId);
        }
      }
      this.dialogStatus = "update"
      this.dialogFormVisible = true
    },
    createRole() {
      if (!this.checkRoleNameUnique()) {
        return;
      }
      if (!this.checkPermissionNum()) {
        return;
      }
      //添加新角色
      this.tempRole.unitId = this.$store.state.user.unitId
      this.api({
        url: "/user/addRole",
        method: "post",
        data: this.tempRole
      }).then(() => {
        this.getList();
        this.dialogFormVisible = false
      })
    },
    updateRole() {
      if (!this.checkRoleNameUnique(this.tempRole.roleId)) {
        return;
      }
      if (!this.checkPermissionNum()) {
        return;
      }
      //修改角色
      this.api({
        url: "/user/updateRole",
        method: "post",
        data: this.tempRole
      }).then(() => {
        this.getList();
        this.dialogFormVisible = false
      })
    },
    checkPermissionNum() {
      //校验至少有一种权限
      if (this.tempRole.permissions.length === 0) {
        this.$message.error("请至少选择一种权限");
        return false;
      }
      return true;
    },
    checkRoleNameUnique(roleId) {
      //校验名称重复
      let roleName = this.tempRole.roleName;
      if (!roleName) {
        this.$message.error("请填写角色名称");
        return false;
      }
      let roles = this.list;
      let result = true;
      for (let j = 0; j < roles.length; j++) {
        if (roles[j].roleName === roleName && (!roleId || roles[j].roleId !== roleId  )) {
          this.$message.error("角色名称已存在");
          result = false;
          break;
        }
      }
      return result;
    },
    removeRole($index) {
      let _vue = this;
      this.$confirm('确定删除此角色?', '提示', {
        confirmButtonText: '确定',
        showCancelButton: false,
        type: 'warning'
      }).then(() => {
        let role = _vue.list[$index];
        _vue.api({
          url: "/user/deleteRole",
          method: "post",
          data: {
            roleId: role.roleId
          }
        }).then(() => {
          _vue.getList()
        }).catch(e => {
        })
      })
    },
    isMenuNone(_index) {
      //判断本级菜单内的权限是否一个都没选
      let menu = this.allPermission[_index].permissions;
      let result = true;
      for (let j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) > -1) {
          result = false;
          break;
        }
      }
      return result;
    },
    isMenuAll(_index) {
      //判断本级菜单内的权限是否全选了
      let menu = this.allPermission[_index].permissions;
      let result = true;
      for (let j = 0; j < menu.length; j++) {
        if (this.tempRole.permissions.indexOf(menu[j].id) < 0) {
          result = false;
          break;
        }
      }
      return result;
    },
    checkAll(_index) {
      //点击菜单   相当于全选按钮
      let v = this;
      if (v.isMenuAll(_index)) {
        //如果已经全选了,则全部取消
        v.noPerm(_index);
      } else {
        //如果尚未全选,则全选
        v.allPerm(_index);
      }
    },
    allPerm(_index) {
      //全部选中
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        this.addUnique(menu[j].id, this.tempRole.permissions)
      }
    },
    noPerm(_index) {
      //全部取消选中
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        let idIndex = this.tempRole.permissions.indexOf(menu[j].id);
        if (idIndex > -1) {
          this.tempRole.permissions.splice(idIndex, 1);
        }
      }
    },
    addUnique(val, arr) {
      //数组内防重复地添加元素
      let _index = arr.indexOf(val);
      if (_index < 0) {
        arr.push(val);
      }
    },
    checkRequired(_perm, _index) {
      //本方法会在勾选状态改变之后触发
      let permId = _perm.id;
      if (this.tempRole.permissions.indexOf(permId) > -1) {
        //选中事件
        //如果之前未勾选本权限,现在勾选完之后,tempRole里就会包含本id
        //那么就要将必选的权限勾上
        this.makeReuqiredPermissionChecked(_index);
      } else {
        //取消选中事件
        if (_perm.requiredPerm === 1) {
          //如果是必勾权限,就把本菜单的权限全部移出
          //(其实也可以提示用户本权限是菜单里的必选,请先取消勾选另外几个权限,交互太麻烦,此处就直接全部取消选中了)
          this.noPerm(_index);
        }
      }
    },
    makeReuqiredPermissionChecked(_index) {
      //将本菜单必选的权限勾上
      let menu = this.allPermission[_index].permissions;
      for (let j = 0; j < menu.length; j++) {
        let perm = menu[j];
        if (perm.requiredPerm === 1) {
          //找到本菜单的必选权限,将其勾上
          this.addUnique(perm.id, this.tempRole.permissions)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .requiredPerm {
      color: #ff0e13;
    }
    .user-radio {
      &-div{
        font-size: 14px;
      }
      &-p{
        font-size: 20px;
      }
      // 因为设置了scoped，所以固定的classname要用/deep/操作
      /deep/ {
        .el-radio-button__inner {
          border: none;
          border-radius: 4px;
          background: #e5e5e5;
        }

        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #1e6abc;
        }
      }
    }

</style>
