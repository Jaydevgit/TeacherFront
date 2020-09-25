<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-button type="primary" icon="plus" v-if="hasSchoolPerm('schoolUser:add')" @click="showCreate">添加
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
      <el-table-column align="center" label="昵称" prop="nickname" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="用户名" prop="username" style="width: 60px;"></el-table-column>
      <el-table-column align="center" label="管理" width="220" >
        <template slot-scope="scope">
          <el-button type="primary" icon="edit" @click="showUpdate(scope.$index)">重置密码</el-button>
          <el-button type="danger" icon="delete" v-if="scope.row.userId!=userId&&hasSchoolPerm('schoolUser:update') "
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
        <el-form-item label="昵称" prop="nickname" required v-if="dialogStatus=='create'">
          <el-input type="text" v-model="tempUser.nickname">
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
                                url: '/register/judgeSchoolUserNameExist',
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
                    schoolId:''
                },
                roles: [],//角色列表
                dialogStatus: 'create',
                dialogFormVisible: false,
                textMap: {
                    update: '重置子账号密码',
                    create: '新建子账号'
                },
                tempUser: {
                    username: '',
                    password: '',
                    nickname: '',
                    roleId: '51',
                    userId: '',
                    schoolId:'',
                    schoolDomain:''
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
            if (this.hasSchoolPerm('schoolUser:add') || this.schoolUser('schoolUser:update')) {
                this.getRolesBySchoolId();
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
            getRolesBySchoolId() {

                this.listQuery.schoolId= this.$store.state.schoolUser.schoolId;
                this.api({
                    url: "/user/getRolesBySchoolId",
                    method: "post",
                    data: this.listQuery
                }).then(data => {
                    this.roles = data.list;
                })
            },
             getList() {
                //查询列表
                this.listLoading = true;
                this.listQuery.schoolId= this.$store.state.schoolUser.schoolId;
                console.log('this.listQuery='+JSON.stringify(this.listQuery));
                console.log('schoolId=='+this.listQuery.schoolId);
                this.api({
                    url: "/user/listSchoolUser",
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
                this.tempUser.roleId = "51";
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
                this.tempUser.schoolDomain=this.$store.state.schoolUser.schoolDomain
                console.log("===this.tempUser.schoolDomain==="+this.tempUser.schoolDomain);
                this.tempUser.schoolId= this.$store.state.schoolUser.schoolId;
                console.log("加密后的密码为："+this.md5(this.tempUser.password+this.salt));
                this.tempUser.password = this.md5(this.tempUser.password+this.salt);
                console.log("this.tempUser.roleId："+this.tempUser.roleId);
                this.api({
                    url: "/user/addSchoolUser",
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
                    url: "/user/updateSchoolUser",
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
                    user.state = '-1';
                    console.log("----user:-----"+user);
                    _vue.api({
                        url: "/user/updateSchoolUser",
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
