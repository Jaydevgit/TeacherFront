<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item >
          <div style="display: flex;justify-content: space-between">
            <div style="display: flex;justify-content: flex-start;flex-wrap: wrap">
              <div style="float: left;margin-left: 10px;margin-top: 2px" v-if="totalUpdate>0">
                <el-tag type="warning" style="font-size: 14px;">学者网教师信息更新数
                  <div style="font-size: 20px;font-weight: bold;color:#f56c6c;display: inline-block;margin:auto 0">{{totalUpdate}}</div>
                </el-tag>
              </div>
            </div>
            <div style="display: flex;float: right;max-height: 36px">
              <el-button type="primary" size="small" style="float:right;margin-right: 15px;margin-top: 3px;max-height: 36px"
                         @click="searchTeacher">教师搜索
              </el-button>
              <el-input v-model="searchKey" style="width: 150px;float:right;height: 24px;margin-right: 15px;"
                        placeholder="搜索要查询的信息"
                        @keydown.enter.native="searchTeacher"></el-input>
              <el-input type="text" style="display:none"/> <!--确保keydown.enter触发-->

            </div>
          </div>


          <div style="clear: both;"></div>
        </el-form-item>
        <el-form-item style="margin-bottom:0;display:none;">
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="unitList"
              v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row
              @sort-change='sortChange'>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="学院名"  sortable='custom' prop="pinyin">
        <template slot-scope="scope">
          <span class="teacher-homepage" @click="routerTo(scope.row)" style="cursor:pointer;">{{scope.row.unitName}}</span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学院教师主页地址"  prop="pinyin">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">
            <a :href="'http://faculty.scholat.com/homepage/'+listQuery.schoolDomain+'/'+scope.row.domainName">
              http://faculty.scholat.com/homepage/{{listQuery.schoolDomain}}/{{scope.row.domainName}}
            </a>
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学院域名"  sortable='custom' prop="pinyin">
        <template slot-scope="scope">
          <span class="teacher-homepage" @click="routerTo(scope.row)" style="cursor:pointer;">{{scope.row.domainName}}</span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学院地址"  prop="">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">
            <a :href="scope.row.collegeUrl">
              {{scope.row.collegeUrl}}
            </a>
          </span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学院用户"  prop="">
        <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">
              {{scope.row.usernames}}
          </span>
          <span></span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="更新时间"  min-width="160" sortable='custom' prop="update_time">
        <template slot-scope="scope">
          <span>{{scope.row.update_time}}</span>
          <div style="margin-top: 7px;"><el-tag v-if="scope.row.editName" type="success" effect="plain" >编辑者:{{ scope.row.editName }} </el-tag></div>
        </template>
      </el-table-column>-->
      <!--域名修改-->
      <!--<el-table-column fixed="right" align="center" label="域名修改" width="90">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-star-off" circle @click="openAssignment(scope.row.id)"></el-button>
        </template>
      </el-table-column>-->
      <!--域名修改结束-->
      <!--<el-table-column fixed="right" align="center" label="学术档案" width="90">
        <template slot-scope="scope">
          <el-button v-if="scope.row.scholat_username!==''" type="success" icon="el-icon-info" circle @click="showAcademic(scope.row.scholat_username)"></el-button>
        </template>
      </el-table-column>-->
      <!--<el-table-column fixed="right" align="center" label="教师分配" width="90">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-star-off" circle @click="openAssignment(scope.row.id)"></el-button>
        </template>
      </el-table-column>-->

      <!--<el-table-column fixed="right" align="center" label="管理" width="120" v-if="hasSchoolPerm('school:update')">
        <template slot-scope="scope">
          <template v-if="scope.row.scholat_update_time > scope.row.update_time">
            <el-button type="warning" icon="el-icon-edit" circle @click="showUpdate(scope.row)"></el-button>
          </template>
          <template v-else>
            <el-button type="primary" icon="el-icon-edit" circle @click="showUpdate(scope.row)"></el-button>
          </template>
          <el-button type="danger" icon="el-icon-delete" circle v-if="hasSchoolPerm('school:delete')"
                     @click="removeTeacher(scope.row.id)"></el-button>
        </template>
      </el-table-column>-->
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
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/default1.png'
  export default {
    name: "CollegeManagement",
    inject:['reload'],
    data() {
      return {
        defaultImage: 'http://faculty.scholat.com:2333/public/images/avatar/default.png',
        defaultAvatar:defaultAvatar,
        searchKey: '',
        totalCount: 0, //分页组件--数据总条数
        totalUpdate: 0,// 学者网更新总数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          schoolId: '',
          schoolDomain:'',
          key: '',//排序关键字
          sort:'', //升降序标记
          state:1 ,//在岗状态
          scholatUsernameFlag:true,
        },
        currentSearch: 'false',
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '添加新成员'
        },
        tempTeacher: {
          id: "",
          name: "",
          sex: 0,
          avatar: '',
          department: '',
          post: '',
          state: 1,
          intro: '',
          update_time: '',
          email: '',
          phone: ''
        },
        showMask: false,
        showRoleAssigment: false,
        roleId: '',//角色分配id
        teacherState:'1',//教师是否在岗
        flagScholat:true, //是否关联学者网
        unitQuery:{
          domainName:'',
          unitId:''
        },
        schoolQuery:{
          schoolDomain:'',
          schoolId:''
        },
        schoolId:'',
        dialogTableVisible: false,
        dialogImportVisible: false,
        fileList:[],
        unitList:[],
        changeType:''
      }
    },
    created() {
      console.log("--------------------开始查询教师权限")
      /*this.getList();*/
      this.getUnitList();
      this.schoolId=this.$store.state.schoolId
    },
    methods: {

      submitUpload(){
        this.$refs.upload.submit()
        this.dialogImportVisible=false
        this.$message.success("教师信息导入完成")
        setTimeout(() => {
          this.getList();
        },1000)

      },
      countTeacherUpdate() {
        // this.listQuery.key="update_time";
        // this.listQuery.sort="desc";
        this.listQuery.unitId = this.$store.state.user.unitId;
        console.log("### 开始查询学者网更新教师数据总为")
        this.api({
          url: "/manager/listTeacherUpdateScholat",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("学者网更新教师数据总countScholat====" + data.countScholat)
          this.totalUpdate = data.countScholat;
        }).catch((e) => {
        });
      },
      inviteToScholat(Form) {
        console.log("Form=" + JSON.stringify(Form))
        if (Form.email) {
          this.$confirm('此操作将会给该用户发送邀请邮件, 是否继续?', '提示', {

            confirmButtonText: '确认发送邀请',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            /*this.$message.success("准备邀请" + Form.email + "加入学者网");*/
            this.api({
              url: '/scholat/invite',
              method: 'post',
              data: {
                "form": Form
              }
            }).then((data) => {
              this.$message.success("邀请" + Form.email + "成功")
            }).catch(e => {
              if (e.code == "400") {
                this.$message.error("邀请" + Form.email + "失败")
              } else if (e.code == "10009") {
                this.$message.error("邮件已发送，请勿重复邀请")
              } else if (e.code == "90003") {
                this.$message.error("缺少必填参数email")
              }
            });
            this.dialogFormVisible = false;
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消邀请'
            });
            this.dialogFormVisible = false;
          });

        } else {
          this.dialogFormVisible = true;
        }
      },
      updateFromScholat() {
        this.$message.error("正在写")

      },
      searchTeacher() {
        this.listQuery.pageNum = 1;
        this.listQuery.schoolId = this.$store.state.schoolUser.schoolId
        this.listQuery.key = this.searchKey
        if (this.searchKey != null && this.searchKey != "") {
          this.api({
            url: "/school/searchTeacher",
            method: "get",
            params: this.listQuery
          }).then(data => {
            this.list = data.list;
            console.log(" this.list" + JSON.stringify(this.list));
            this.totalCount = data.totalCount;
            this.totalUpdate = data.totalUpdate;
            this.currentSearch = true;
          }).catch(error => {
            console.log("QAQ........获取教师失败")
          })
        }
      },
      changeTeacher() {
        console.log("----------执行了changeTeacher方法-------------")
        this.listQuery.unitId = this.$store.state.user.unitId
        this.listQuery.key = this.searchKey
        this.api({
          url: "/manager/searchTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("QAQ........获取教师失败")
        })
      },
      removeTeacher(teacherId) {
        console.log("teacherId="+teacherId);
        var _vue = this;
        this.$confirm('确定删除该教师?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          _vue.api({
            url: "/school/deleteTeacher",
            method: "post",
            data: {
              "teacherId": teacherId
            }
          }).then((data) => {
            this.$message.success("删除该教师成功")
            this.getList();
          }).catch(e => {
            this.$message.error("QAQ.....")
          })
        })
      },
      getState(state) {
        if (state == 1) {
          return "在岗"
        } else if (state == 0) {
          return "调出"
        } else {
          return "退休"
        }
      },
      getImgUrl(imgName) {
        if (imgName == null) {
          return this.defaultAvatar;
        } else if (imgName == "default.png") {
          return this.defaultAvatar
        } else if (imgName.indexOf("resources") != "-1") {
          return "http://www.scholat.com/" + imgName;
        } else {
          return "http://faculty.scholat.com:2333/public/images/avatar/" + imgName;
        }
        /*return 'http://faculty.scholat.com:2333/public/images/avatar/'+imgName;*/

      },
      imgErrorFun(e) {
        return 'this.src="defaultAvatar"';
      },
      routerTo(teacher) {
        if (this.$route.path.split('/')[3]==='college'){
          console.log("=========================================")
          console.log("schoolDomain=" + this.$store.state.schoolUser.schoolDomain);
          console.log("id="+teacher.id)
          console.log("点击跳转........" + teacher.domainName);
          let routeData = this.$router.push({
            name: 'homepage',
            params: {
              // facultyDomainName:this.$store.state.user.domainName,
              schoolDomain: this.$store.state.schoolUser.schoolDomain,
              domainName: teacher.domainName
            }
          });
          window.open(routeData.href, '_blank');
        }else if (this.$route.path.split('/')[3]==='teacher'){
          console.log("=========================================")
          console.log("schoolDomain=" + this.$store.state.schoolUser.schoolDomain);
          console.log("id="+teacher.id)
          console.log("点击跳转........" + teacher.domainName);
          let routeData = this.$router.push({
            name: 'teacherPersonlHomePage',
            params: {
              // facultyDomainName:this.$store.state.user.domainName,
              schoolDomain: this.$store.state.schoolUser.schoolDomain,
              teacherDomainName: teacher.domainName,
              id: teacher.id
            }
          });
          window.open(routeData.href, '_blank');
        }


      },
      getList() {
        //查询列表
        console.log("this.hasSchoolPerm('school:list')="+this.hasSchoolPerm('school:list'))
        console.log('permissions==' + this.$store.state.schoolUser.permissions);
        if (!this.hasSchoolPerm('school:list')) {
          return
        }
        this.listQuery.pageNum = 1;
        this.listQuery.schoolDomain = this.$store.state.schoolUser.schoolDomain;
        console.log('schoolDomain==' + JSON.stringify(this.listQuery));
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/school/listTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询教师信息为:")
          console.log("=================展示学校教师列表信息===============")
          this.listLoading = false;
          this.list = data.list;
          console.log(data);
          this.list.forEach((v, k) => {
            let t = v.update_time.replace(/\./g, '-').slice(0, 16);
            v.update_time = t;
          });
          this.totalCount = data.totalCount;
          this.changeType='school';
          console.log("getList.changeType="+this.changeType)
          this.currentSearch = false
          console.log(this.totalCount + "  " + this.totalUpdate + " " + this.listQuery.pageNum);
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })

      },
      getUnitList(){
        console.log("this.hasSchoolPerm('school:list')="+this.hasSchoolPerm('school:list'))
        console.log('permissions==' + this.$store.state.schoolUser.permissions);
        if (!this.hasSchoolPerm('school:list')) {
          return
        }
        this.listQuery.pageNum = 1;
        this.listQuery.schoolDomain = this.$store.state.schoolUser.schoolDomain;
        console.log('schoolDomain==' + JSON.stringify(this.listQuery));
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/school/getUnitList",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("=================展示学院信息===============")
          this.listLoading = false;
          this.unitList = data.list;
          console.log(data);
          this.currentSearch = false
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      },
      changeList() {
        console.log("===============执行changeList方法=================")
        console.log("this.changeType="+this.changeType)
        if (this.changeType=="school"){
          //查询列表
          if (!this.hasSchoolPerm('school:list')) {
            return
          }
          this.listQuery.schoolDomain = this.$store.state.schoolUser.schoolDomain;
          console.log('schoolDomain==' + JSON.stringify(this.listQuery));
          this.listLoading = true;
          console.log("### 开始查询教师成员列表")
          this.api({
            url: "/school/listTeacher",
            method: "get",
            params: this.listQuery
          }).then(data => {
            console.log("查询教师信息为:" + data.totalUpdate)
            console.log("================================")
            this.listLoading = false;
            this.list = data.list;
            this.totalCount = data.totalCount;
            this.totalUpdate = data.totalUpdate;
          }).catch(error => {
            console.log("QAQ........没有找到教师列表")
          })
        }else if(this.changeType=="unit"){
          this.listLoading = true;
          console.log("### 开始查询教师成员列表")
          this.api({
            url: "/school/listTeacherByUnit",
            method: "get",
            params: this.listQuery
          }).then(data => {
            console.log("查询某学院的教师信息为:")
            console.log("=================展示学院教师列表信息===============")
            this.listLoading = false;
            this.list = data.list;
            console.log(data);
            this.list.forEach((v, k) => {
              let t = v.update_time.replace(/\./g, '-').slice(0, 16);
              v.update_time = t;
            });
            this.totalCount = data.totalCount;
            this.changeType='unit';
            console.log("unitChange.changeType="+this.changeType)
            this.currentSearch = false
            console.log(this.totalCount + "  " + this.totalUpdate + " " + this.listQuery.pageNum);
          }).catch(error => {
            console.log("QAQ........没有找到教师列表")
          })
        }

      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleFilter() {
        //查询事件
        this.listQuery.pageNum = 1
        if (this.changeType=='school'){
          this.getList()
        }else if(this.changeType=='unit'){
          this.unitChange(this.listQuery.unitId)
        }

      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        if (!this.currentSearch)
          this.changeList()
        else
          this.changeTeacher()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      showCreate() {
        //显示新增对话框
        /*this.tempTeacher.name = "";
            this.dialogStatus = "create"
            this.dialogFormVisible = true*/
        this.$router.push({
          path: '/manager/addTeacher'
        })
      },
      exportInfo() {
        console.log("this.listQuery.unitId=" + this.listQuery.unitId);
        var json = {unitId: this.listQuery.unitId}
        var json2 = JSON.stringify(json);
        window.open("/api/manager/exportTeacher?json=" + escape(json2))
      },
      importInfo() {
        window.open("/api/manager/exportTeacher2")
      },
      showUpdate(teacher) {
        //显示修改对话框
        /*   this.tempTeacher.id = this.list[$index].id;
               this.tempTeacher.name = this.list[$index].name;
               this.dialogStatus = "update"
               this.dialogFormVisible = true*/
        //修改文章
        let d1 = new Date(teacher.scholat_update_time);    //Tue Jul 04 2017 08:00:00 GMT+0800 (中国标准时间)
        let d2 = new Date(teacher.update_time);    //Wed Jul 05 2017 08:00:00 GMT+0800 (中国标准时间)

// 获取他们的距离1970年以来的毫秒
        let time1 = d1.getTime();
        let time2 = d2.getTime();
        var scholatUserName = "";
        if (time1 > time2) {
          scholatUserName = teacher.scholat_username;
        }
        this.$router.push({
          name: 'modifyTeacher',
          params: {
            t: teacher,
            id: teacher.id,
            scholatUpdate: scholatUserName
          }
        })
      },
      openQuery() {
        this.showMask = true;
      },
      // 教师分配
      openAssignment(id) {
        this.showRoleAssigment = true;
        this.roleId = id;
        console.log("当前分栏目标教师Id:" + id)
        this.$notify({
          title: '提示',
          message: '本页面教师已存在栏目为不可选状态栏目。若需要管理教师已分配栏目，请到教师分配页面进行管理。',
          type: 'info',
          position: 'bottom-left'
        });
        this.$refs.childRole.getTeacherAllCatalogues(id);
      },

      //教师状态改变
      teacherStateChange(value) {
        if (value === 1) {
          this.teacherState = "1";
          this.listQuery.state = '1'
        }
        if (value === 2) {
          this.teacherState = "2";
          this.listQuery.state = ''
        }
        this.getList();

      },
      //学院改变
      unitChange(unitId){
        this.listQuery.pageNum = 1;
        this.listQuery.unitId = unitId;
        console.log('unitId==' + JSON.stringify(this.listQuery));
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/school/listTeacherByUnit",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询某学院的教师信息为:")
          console.log("=================展示学院教师列表信息===============")
          this.listLoading = false;
          this.list = data.list;
          console.log(data);
          this.list.forEach((v, k) => {
            let t = v.update_time.replace(/\./g, '-').slice(0, 16);
            v.update_time = t;
          });
          this.totalCount = data.totalCount;
          this.changeType='unit';
          console.log("unitChange.changeType="+this.changeType)
          this.currentSearch = false
          console.log(this.totalCount + "  " + this.totalUpdate + " " + this.listQuery.pageNum);
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      },

      //姓名排序
      sortChange(column) {
        this.listQuery.key = column.prop;
        if (column.order === 'descending') {
          this.listQuery.sort = 'desc';
        } else {
          this.listQuery.sort = '';
        }
        console.log(this.listQuery.key + " " + this.listQuery.sort);
        this.getList();
        //console.log(JSON.stringify(column) + '-' + column.prop + '-' + column.order)
      },

      //学者网关联状态改变
      changeScholat() {

        console.log(this.flagScholat);
        if (this.flagScholat === true) {
          this.listQuery.scholatUsernameFlag = true
        }
        if (this.flagScholat === false) {
          this.listQuery.scholatUsernameFlag = false
        }
        this.getList();
      },
      showAcademic(scholat_username) {
        this.$router.push({
          name: 'personAcademic',
          params: {
            scholat_username: scholat_username
          }
        })
      },
    }
  }
</script>

<style scoped>
  .el-badge__content.is-dot {
    width: 15px;
    height: 15px;
  }
  .el-switch{
    border: 1px !important;
  }
</style>

