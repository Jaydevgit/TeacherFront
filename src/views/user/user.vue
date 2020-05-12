<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" icon="plus" v-if="hasPerm('user:add')" @click="showCreate">添加
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="80">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <!--<el-table-column align="center" label="昵称" prop="nickname" style="width: 60px;"></el-table-column>-->
      <el-table-column align="center" label="用户名" prop="username" style="width: 60px;"></el-table-column>
<!--      <el-table-column align="center" label="密码" prop="password" style="width: 60px;"></el-table-column>-->
      <!--<el-table-column align="center" label="角色" width="160">
        <template slot-scope="scope">
          <el-tag type="success" v-text="scope.row.roleName" v-if="scope.row.roleId===1"></el-tag>
          <el-tag type="primary" v-text="scope.row.roleName" v-else></el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="菜单&权限" width="320">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.roleName==adminName" type="success">全部</el-tag>
          <div v-else>
            <div v-for="menu in scope.row.menus" style="text-align: left">
              <span style="width: 100px;display: inline-block;text-align: right ">{{menu.menuName}}</span>
              <el-tag v-for="perm in menu.permissions" :key="perm.permissionName" v-text="perm.permissionName"
                      style="margin-right: 3px;"
                      type="primary"></el-tag>
            </div>
          </div>
        </template>
      </el-table-column>-->
      <el-table-column align="center" label="管理" width="220" v-if="hasPerm('user:update')">
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="showUpdate(scope.$index)">重置密码</el-button>
          <el-button type="danger" icon="delete" v-if="scope.row.userId!=userId "
                     @click="removeUser(scope.$index)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" ref="tempUser" :model="tempUser"  :rules="userRules" label-position="left" label-width="80px"
               style='width: 300px; margin-left:50px;'>
        <el-form-item label="用户名" prop="username" required v-if="dialogStatus=='create'">
          <el-input type="text" v-model="tempUser.username">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="dialogStatus=='create'" required>
          <el-input type="password" v-model="tempUser.password">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" v-else>
          <el-input type="password" v-model="tempUser.password" placeholder="不填则表示不修改">
          </el-input>
        </el-form-item>
        <!--<el-form-item label="角色" required style="width: 420px">
          <el-select v-model="tempUser.roleId" :disabled="roles.length===0" :placeholder="roleMessage" style="float: left;width: 220px;">
            <el-option
              v-for="item in roles"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
          <el-button v-if="roles.length===0" type="success" @click="addRole" style="float: left;margin-left: 10px">添加角色</el-button>
          <span v-if="roles.length===0" style="color: red;float: left;">暂无权限角色，请先添加</span>
        </el-form-item>
        <el-form-item label="昵称" required>
          <el-input type="text" v-model="tempUser.nickname">
          </el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="createUser">创 建</el-button>
        <el-button type="primary" v-else @click="updateUser">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'

  export default {
    data() {

      let validateUserName = (rule, value, callback) => {
        let _self = this;
        if (!value) {
          return callback(new Error('请正确填写用户名'));
        } else {
          if (value !== '') {
            var pattern = /^[0-9a-zA-Z_]{1,}$/;
            if (!pattern.test(value)) {
              return callback(new Error("请输入有效的用户名(支持数字、下划线_和英文)"));
            } else {
              this.api({
                url: '/register/judgeUserNameExist',
                method: 'post',
                data: {
                  "username": value
                }
              }).then(res => {
                // console.log("=====" + JSON.stringify(res));
                if (res.UserName === true) {
                  console.log("该用户名已注册");
                  _self.ifCollegeDomainExist = false;
                  return callback(new Error("该用户名已注册"));
                } else {
                  _self.ifCollegeDomainExist = true;
                  return callback();
                }
              }).catch();
            }
          }
        }
      };

      return {
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          unitId: '',
        },
        roles: [],//角色列表
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '添加子账号'
        },
        tempUser: {
          username: '',
          password: '',
          nickname: '',
          roleId: '3',
          userId: '',
          unitId:'',
          domainName:'',
        },
        userRules:{
          username: [
            {validator: validateUserName, trigger: 'blur'},
            {required: true, min: 1, max: 25, message: '请输入用户名', trigger: 'blur'}
          ],
        },
        adminName: '高级管理员',
        roleIf:'',
        roleMessage:'请选择'
      }
    },

    created() {
      this.getList();
      if (this.hasPerm('user:add') || this.hasPerm('user:update')) {
        this.getRolesByUnitId();
      }

    },
    computed: {
      ...mapGetters([
        'userId'
      ])
    },
    methods: {
      addRole(){
        this.$router.push("/user/role");
      },
      getRolesByUnitId() {

        this.listQuery.unitId= this.$store.state.user.unitId;
        this.api({
          url: "/user/getRolesByUnitId",
          method: "post",
          data: this.listQuery
        }).then(data => {
          this.roles = data.list;
        })
      },
      getList() {
        //查询列表
        this.listLoading = true;
        this.listQuery.unitId= this.$store.state.user.unitId;
        console.log('this.listQuery='+JSON.stringify(this.listQuery));
        console.log('unitId=='+this.listQuery.unitId);
        this.api({
          url: "/user/list",
          method: "get",
          params: this.listQuery
        }).then(data => {
          this.listLoading = false;
          this.list = data.list;
          console.log("======list="+JSON.stringify(this.list));
          this.totalCount = data.totalCount;
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      handleFilter() {
        //查询事件
        this.listQuery.pageNum = 1
        this.getList()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        this.tempUser.username = "";
        this.tempUser.password = "";
        this.tempUser.nickname = "";
        this.tempUser.roleId = "3";
        this.tempUser.userId = "";
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        console.log('$index='+$index)
        let user = this.list[$index];
        this.tempUser.username = user.username;
        this.tempUser.nickname = user.nickname;
        this.tempUser.roleId = user.roleId;
        this.tempUser.userId = user.userId;
        this.tempUser.state = '1';
        this.tempUser.password = '';
        this.dialogStatus = "update"
        this.dialogFormVisible = true
      },
      createUser() {
        //添加新用户
        this.tempUser.domainName=this.$store.state.user.domainName
        console.log("===this.tempUser.domainName==="+this.tempUser.domainName);
        this.tempUser.unitId= this.$store.state.user.unitId;
        console.log("加密后的密码为："+this.md5(this.tempUser.password+this.salt));
        this.tempUser.password = this.md5(this.tempUser.password+this.salt);
        this.api({
          url: "/user/addUser",
          method: "post",
          data: this.tempUser
        }).then(() => {
          this.getList();
          this.dialogFormVisible = false
        })
      },
      updateUser() {
        //修改用户信息
        let _vue = this;
        console.log("加密后的密码为："+this.md5(this.tempUser.password+this.salt));
        this.tempUser.password = this.md5(this.tempUser.password+this.salt);
        this.api({
          url: "/user/updateUser",
          method: "post",
          data: this.tempUser
        }).then(() => {
          let msg = "修改成功";
          this.dialogFormVisible = false
          if (this.userId === this.tempUser.userId) {
            msg = '修改成功,部分信息重新登录后生效'
          }
          this.$message({
            message: msg,
            type: 'success',
            duration: 1 * 1000,
            onClose: () => {
              _vue.getList();
            }
          })
        })
      },
      removeUser($index) {
        let _vue = this;
        this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let user = _vue.list[$index];
          user.state = '2';
          console.log("----user:-----"+user);
          _vue.api({
            url: "/user/updateUser",
            method: "post",
            data: user
          }).then(() => {
            _vue.getList()
          }).catch(() => {
            _vue.$message.error("删除失败")
          })
        })
      },
    }
  }
</script>
