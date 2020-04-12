<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-radio-group v-model="teacherState" @change="teacherStateChange" style="margin-top: -30px">
            <el-radio style="margin-left: 15px;"  label="1" size="small" border>在岗</el-radio>
            <el-radio  label="2" size="small" border>其他</el-radio>
          </el-radio-group>
          <el-card style="display: inline-block;margin-left: 15px;padding: 3px 0;height: 36px;line-height: 32px" shadow="never">
            <el-switch style="margin:0 5px 5px 5px"
                       v-model="flagScholat"
                       active-text="已关联学者网"
                       inactive-text="未关联学者网"
                       @change="changeScholat" >
            </el-switch>
          </el-card>
<!--          可以通过选择(在岗/其他)，关联学者网等功能快速添加、查询、修改教师基本信息-->
          <el-card style="display: inline-block;margin-left: 15px;padding: 3px 0;height: 36px;line-height: 36px " shadow="never">
            <div style="margin:0 5px 15px 5px">
              <el-tooltip class="item" effect="dark" content="可以通过选择(在岗/其他)，关联学者网等功能快速添加、查询、修改教师基本信息" placement="bottom">
                <el-button size="small">功能提示</el-button>
              </el-tooltip></div>
          </el-card>
          <el-button style="float: right;margin-top: 3px;" size="small"type="primary" icon="plus" @click="showCreate" v-if="hasPerm('teacher:add')">添加
          </el-button>
          <!--          <el-button style="float: left" type="primary" icon="plus" @click="openQuery" >筛选-->
          <!--          </el-button>-->
<!--          <el-button style="float:left;margin-left: 15px;margin-top: 4px;" size="small" type="success" icon="plus"-->
<!--                     @click="getList">教师列表-->
<!--          </el-button>-->
          <el-button type="primary" size="small" style="float:right;margin-right: 15px;margin-top: 3px;"
                     @click="searchTeahcer">教师搜索
          </el-button>
          <el-input v-model="searchKey" style="width: 150px;float:right;height: 24px;margin-right: 15px;"
                    placeholder="搜索要查询的信息"
                    @keydown.enter.native="searchTeahcer"></el-input>
          <el-input type="text" style="display:none"/> <!--确保keydown.enter触发-->
          <div style="float: right" v-if="totalUpdate>0">
            <el-badge :value="totalUpdate" :max="99" class="item">
              <span style="color:red">学者网有更新</span>
            </el-badge>
          </div>

          <div style="clear: both;"></div>
        </el-form-item>
        <el-form-item style="margin-bottom:0;display:none;">
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="list"
              v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row
              @sort-change='sortChange'>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像" width="150">

        <template slot-scope="scope">
          <template v-if="scope.row.scholat_update_time > scope.row.update_time">
            <el-badge is-dot aria-setsize="14px" class="item" style="margin-top: 10px;">
              <img class="preview" @click="routerTo(scope.row)" :src="getImgUrl(scope.row.avatar)"
                   :onerror="defaultImage" style="width:60px;height:60px;cursor:pointer;"/>
            </el-badge>
          </template>
          <template v-else>
            <img class="preview" @click="routerTo(scope.row)" :src="getImgUrl(scope.row.avatar)"
                 style="width:60px;height:60px;cursor:pointer;"/>
          </template>
        </template>

      </el-table-column>
      <el-table-column align="center" label="姓名" width="130" sortable='custom' prop="pinyin">
        <template slot-scope="scope">
          <span class="teacher-homepage" @click="routerTo(scope.row)" style="cursor:pointer;">{{scope.row.name}}</span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学历" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.degree}}</span>
        </template>
      </el-table-column>
<!--      <el-table-column align="center" label="状态" width="100">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag-->
<!--            :type="scope.row.state === '在岗' ? 'primary' : 'success'"-->
<!--            disable-transitions>-->
<!--            <span v-text='getState(scope.row.state)'></span>-->
<!--          </el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column align="center" label="职称" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.post}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="更新时间" width="170" sortable='custom' prop="update_time">
        <template slot-scope="scope">
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="学者网关联">
        <template slot-scope="scope">
          <a style="color: #399;
    text-decoration: underline;
    font-weight: bold;"
             :href="'http://www.scholat.com/'+scope.row.scholat_username">{{scope.row.scholat_username}}</a>
          <template v-if="scope.row.scholat_update_time > scope.row.update_time">
            <div style="color: #e6a23b;
    font-weight: bold;">学者网有更新信息</div>
          </template>
          <template v-if="!scope.row.scholat_update_time && scope.row.scholat_username">
            <div style="color:#848484;font-weight: bold;">已绑定学者网账号，但未查询到学者网更新日期</div>
          </template>
          <el-button type="success" @click="inviteToScholat(scope.row)" size="small"
                     v-if="!scope.row.scholat_username">邀请加入学者网
          </el-button>
        </template>
      </el-table-column>

            <el-table-column fixed="right" align="center" label="教师分配" width="110">
              <template slot-scope="scope">
                <el-button type="primary" icon="el-icon-star-off" circle @click="openAssignment(scope.row.id)"></el-button>
              </template>
            </el-table-column>
      <el-table-column fixed="right" align="center" label="管理" width="200" v-if="hasPerm('teacher:update')">
        <template slot-scope="scope">
          <template v-if="scope.row.scholat_update_time > scope.row.update_time">
            <el-button type="warning" icon="el-icon-edit" circle @click="showUpdate(scope.row)"></el-button>
          </template>
          <template v-else>
            <el-button type="primary" icon="el-icon-edit" circle @click="showUpdate(scope.row)"></el-button>
          </template>
          <el-button type="danger" icon="el-icon-delete" circle v-if="hasPerm('teacher:delete')"
                     @click="removeTeacher(scope.row.id)"></el-button>
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

   <!-- <el-dialog title="教师栏目分配" :visible.sync="showRoleAssigment">
      <el-card class="box-card" style="width: 600px;float: left;margin-left: 40px">
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
          style="width: 600px;float: left"
          background-color="#ffffff"
          @open="handleOpen"
          @close="handleClose">
          <el-checkbox-group v-model="checkList" @change="column_check">

            <el-menu-item index="0">
              <i class="el-icon-menu"></i>
              <span slot="title" class="parentCatalogue" style="font-size: 16px">师资队伍</span>
            </el-menu-item>

            &lt;!&ndash;假如有子列表&ndash;&gt;
            <el-submenu v-for="(item, flag) in catalogueList" v-if="Object.keys(item.subCatalogueList).length!=0"
                        :key="'cId'+item.id" :index="flag +'1'">
              <div slot="title" @click="addTeacherVisible=false">
                <el-checkbox v-if="sortVisualable" :label="item.id">&nbsp</el-checkbox>
                <i class="el-icon-menu"></i>
                <span class="catalogueName" style="margin-right: 20px;margin-left: 8px;font-size: 16px">{{item.name}}</span>
              </div>

              <el-menu-item-group>
                <el-menu-item style="padding-left: 95px;display: flex;justify-content: space-between;align-items: center;    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);"
                              v-for="(sub, index) in item.subCatalogueList" :key="'subId'+sub.id"
                              :index="flag + '-'+ index"
                              @click="getTeacherByCatalogue(sub.id)">
                  <el-checkbox v-if="sortSubVisualable" style="padding-right: 15px;" :label="sub.id">&nbsp</el-checkbox>
                  <span style="margin-right: 20px;margin-left: 8px;font-size: 16px">{{sub.name}}</span>
                </el-menu-item>

              </el-menu-item-group>

            </el-submenu>
            &lt;!&ndash;假如没有子列表&ndash;&gt;
            <el-menu-item v-else :key="'cId'+item.id" :index="flag +'1'">
              <div slot="title" @click="getTeacherByCatalogue(item.id,item.state)">
                <el-checkbox v-if="sortVisualable" :label="item.id">&nbsp</el-checkbox>
                <span class="catalogueName" style="margin-right: 20px;margin-left: 8px;font-size: 16px">{{item.name}}</span>
              </div>
            </el-menu-item>
          </el-checkbox-group>
        </el-menu>
      </el-card>
    </el-dialog>-->
         <!-- <v-dialog-bar v-model="showMask" title="筛选账号">
          </v-dialog-bar>-->
    <v-role-assignment-bar v-model="showRoleAssigment" :RoleId="roleId" ref="childRole"
                           title="教师分配"></v-role-assignment-bar>

  </div>
</template>
<script>
    import teacherPersonalHomePage from '../teacher/teacherPersonalHomePage'
    import store from '../../store'
    // import dialogBar from "./components/dialog";
    import roleAssignmentBar from "./components/roleAssignment";

    export default {
        // -------------------这个用来获取路由表, 因为我点击教师链接需要跳转到教师主页
        components: {
            teacherPersonalHomePage,
            // 'v-dialog-bar':dialogBar,
            'v-role-assignment-bar': roleAssignmentBar
        },
        data() {
            return {
                defaultImage: 'this.src="../../src/assets/img/defaultAvatar.png"',
                searchKey: '',
                totalCount: 0, //分页组件--数据总条数
                totalUpdate: 0,// 学者网更新总数
                list: [],//表格的数据
                listLoading: false,//数据加载等待动画
                listQuery: {
                    pageNum: 1,//页码
                    pageRow: 10,//每页条数
                    unitId: '',
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
              flagScholat:true //是否关联学者网
            }
        },
        created() {
            console.log("--------------------开始查询教师权限")
            this.getList();
        },
        methods: {
            inviteToScholat(Form) {
                this.$confirm('此操作将会给该用户发送邀请邮件, 是否继续?', '提示', {
                    confirmButtonText: '确认发送邀请',
                    cancelButtonText: '取消',
                    type: 'success'
                }).then(() => {
                    this.$message.success("准备邀请" + Form.email + "加入学者网");
                    this.api({
                        url: '/scholat/invite',
                        method: 'post',
                        data: {
                            "form": Form
                        }
                    }).then((data) => {
                        this.$message.success("邀请" + Form.email + "成功")
                    }).catch(e => {
                        this.$message.error("邀请" + Form.email + "失败")
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消邀请'
                    });
                });
            },
            updateFromScholat() {
                this.$message.error("正在写")

            },
            searchTeahcer() {
                this.listQuery.pageNum = 1;
                this.listQuery.unitId = this.$store.state.user.unitId
                this.listQuery.key = this.searchKey
                if (this.searchKey != null && this.searchKey != "") {
                    this.api({
                        url: "/manager/searchTeacher",
                        method: "get",
                        params: this.listQuery
                    }).then(data => {
                        this.list = data.list;
                        this.totalCount = data.totalCount;
                        this.totalUpdate = data.totalUpdate;
                        this.currentSearch = true;
                    }).catch(error => {
                        console.log("QAQ........获取教师失败")
                    })
                }
            },
            changeTeahcer() {
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
                var _vue = this;
                this.$confirm('确定删除该教师?', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'warning'
                }).then(() => {
                    _vue.api({
                        url: "/manager/deleteTeacher",
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
                    return ""
                } else if (imgName.indexOf("resources") != "-1") {
                    return "http://www.scholat.com/" + imgName;
                } else {
                    return "http://47.106.132.95:2333/images/avatar/" + imgName;
                }
            },
            routerTo(teacher) {
                console.log("=========================================")
                console.log("点击跳转........" + teacher.name);
                let routeData = this.$router.resolve({
                    name: 'teacherPersonlHomePage',
                    params: {
                        id: teacher.id
                    }
                });
                window.open(routeData.href, '_blank');
                /*  this.$router.push({
                      name: 'teacherPersonlHomePage',
                      params: {
                          id: teacher.id
                      }
                  })*/
            },
            getList() {

                //查询列表
                if (!this.hasPerm('teacher:list')) {
                    return
                }
                this.listQuery.pageNum = 1;
              // this.listQuery.key="update_time";
              // this.listQuery.sort="desc";
                this.listQuery.unitId = this.$store.state.user.unitId;
                console.log('unitId==' + JSON.stringify(this.listQuery));
                this.listLoading = true;
                console.log("### 开始查询教师成员列表")
                this.api({
                    url: "/manager/listTeacher",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + data.totalUpdate)
                    console.log("=================展示教师列表信息===============")
                    this.listLoading = false;
                    this.list = data.list;
                    console.log(data);
                    this.list.forEach((v, k) => {
                        let t = v.update_time.replace(/\./g, '-').slice(0, 16);
                        v.update_time = t;
                    });
                    this.totalCount = data.totalCount;
                    this.totalUpdate = data.totalUpdate;
                    this.currentSearch = false
                  console.log(this.totalCount+"  "+this.totalUpdate+" "+this.listQuery.pageNum);
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })
            },
          // getNoStateList() {
          //   //查询列表
          //   if (!this.hasPerm('teacher:list')) {
          //     return
          //   }
          //   this.listQuery.pageNum = 1;
          //   this.listQuery.unitId = this.$store.state.user.unitId;
          //   console.log('unitId==' + this.listQuery.unitId);
          //   this.listLoading = true;
          //   console.log("### 开始查询教师成员列表")
          //   this.api({
          //     url: "/manager/listTeacherNoState",
          //     method: "get",
          //     params: this.listQuery
          //   }).then(data => {
          //     console.log("查询未在岗教师信息为:" + data.totalUpdate)
          //     console.log("=================展示未在岗教师列表信息===============")
          //     this.listLoading = false;
          //     this.list = data.list;
          //     console.log(data.list);
          //     this.list.forEach((v, k) => {
          //       let t = v.update_time.replace(/\./g, '-').slice(0, 16);
          //       v.update_time = t;
          //     });
          //     this.totalCount = data.totalCount;
          //     this.totalUpdate = data.totalUpdate;
          //     this.currentSearch = false
          //   }).catch(error => {
          //     console.log("QAQ........没有找到未在岗教师列表")
          //   })
          // },
            changeList() {
                //查询列表
                if (!this.hasPerm('teacher:list')) {
                    return
                }
                this.listQuery.unitId = this.$store.state.user.unitId;
                console.log('unitId==' + this.listQuery.unitId);
                this.listLoading = true;
                console.log("### 开始查询教师成员列表")
                this.api({
                    url: "/manager/listTeacher",
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
            },
            handleSizeChange(val) {
                //改变每页数量
                this.listQuery.pageRow = val
                this.handleFilter();
            },
            handleCurrentChange(val) {
                //改变页码
                this.listQuery.pageNum = val
                if (!this.currentSearch)
                    this.changeList()
                else
                    this.changeTeahcer()
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
                    message: '本页面教师分配只展示未分配栏目。若需要管理教师已分配栏目，请到教师分配页面进行管理。',
                    type: 'info',
                    position: 'bottom-left'
                });
                this.$refs.childRole.getTeacherAllCatalogues(id);
            },

          //教师状态改变
          teacherStateChange(){
            if(parseInt(this.teacherState)===2){
              this.teacherState="2";
            }
            if(parseInt(this.teacherState)===1){
              this.teacherState="1";
            }
            if(this.listQuery.state===1){
              this.listQuery.state='';
            }else{
              this.listQuery.state=1;
            }
            this.getList();
            // if(parseInt(this.teacherState)===1){
            //   this.getList();
            // }else{
            //   this.getNoStateList();
            // }
          },

          //姓名排序
          sortChange(column){
            this.listQuery.key=column.prop;
            if(column.order==='descending'){
              this.listQuery.sort='desc';
            }else {
              this.listQuery.sort='';
            }
            console.log(this.listQuery.key+" "+this.listQuery.sort);
            this.getList();
            //console.log(JSON.stringify(column) + '-' + column.prop + '-' + column.order)
          },

          //学者网关联状态改变
          changeScholat(){

            console.log(this.flagScholat);
            if(this.flagScholat===true){
              this.listQuery.scholatUsernameFlag=true
            }
            if(this.flagScholat===false){
              this.listQuery.scholatUsernameFlag=false
            }
            this.getList();
          }
        }
    }
</script>
<style>
  .el-badge__content.is-dot {
    width: 15px;
    height: 15px;
  }
  .el-switch{
    border: 1px !important;
  }
</style>
