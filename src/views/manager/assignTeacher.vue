<template>
  <div class="container" style="padding-top: 10px;padding-left: 20px">
    <div class="main-content"style="transform: translateX(20px)">
      <el-row type="flex" class="row-bg" justify="start">
        <el-col :span="4" style="padding-left: 17px">
          <div
            style="height: calc(100vh - 80px);display: flex;justify-content: center;">
            <div>
              <el-card class="box-card" style="width: fit-content">
                <el-menu
                  default-active="0"
                  class="el-menu-vertical-demo"
                  style="width: 280px;float: left"
                  background-color="#ffffff"
                  @open="handleOpen"
                  @close="handleClose">

                  <el-menu-item index="0" @click="getList()">
                    <i class="el-icon-menu"></i>
                    <span slot="title" class="parentCatalogue">师资队伍</span>
                  </el-menu-item>

                  <!--假如有子列表-->
                  <el-submenu v-for="(item, flag) in catalogueList" v-if="Object.keys(item.subCatalogueList).length!=0"
                              :key="'cId'+item.id" :index="flag +'1'">
                    <div slot="title" @click="addTeacherVisible=false">
                      <span :id="'seq'+item.id" style="display: none" v-if="sortVisualable" class="seq"></span>
                      <i class="el-icon-menu"></i>
                      <span class="catalogueName" style="margin-right: 20px;margin-left: 8px;">{{item.name}}</span>
                    </div>

                    <el-menu-item-group>
                      <el-menu-item style="display: flex;justify-content: space-between;align-items: center"
                                    v-for="(sub, index) in item.subCatalogueList" :key="'subId'+sub.id"
                                    :index="flag + '-'+ index"
                                    @click="getTeacherByCatalogue(sub.id)">
                        <span :id="'seq_child'+sub.id" style="display: none" v-if="sortSubVisualable"
                              class="seq"></span>
                        <span style="margin-right: 20px;margin-left: 8px;">{{sub.name}}</span>
                        <el-button type="primary" size="small" @click="showListTeacher(sub.id)" style="height: fit-content;">
                          添加教师
                        </el-button>
                      </el-menu-item>
                    </el-menu-item-group>

                  </el-submenu>
                  <!--假如没有子列表-->
                  <el-menu-item v-else :key="'cId'+item.id" :index="flag +'1'">
                    <div slot="title" @click="getTeacherByCatalogue(item.id,item.state)"
                         style="display: flex;justify-content: space-between;align-items: center;">
                      <div>
                        <i class="el-icon-menu"></i>
                        <span style="margin-right: 20px;margin-left: 8px;">{{item.name}}</span>
                      </div>

                      <el-button type="primary" size="small" style="float:right;"
                                 @click="showListTeacher(item.id)">添加教师
                      </el-button>
                    </div>
                  </el-menu-item>
                </el-menu>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :span="7" style="padding-left: 33px">
          <el-card class="box-card" style="width: 400px">
            <div style="height: 60px;width: 100%" class="teacher-nav" v-if="unitVisualable==false">
              <div style="margin-left: 8px;">
                <el-button type="success" size="small"
                           @click="sortTeacher" v-if="addTeacherVisible">排序
                </el-button>
                <!--                <el-button type="success" size="small"-->
                <!--                           @click="sortTeacher" v-if="unitVisualable">排序学院教师-->
                <!--                </el-button>-->
                <div v-if="!(teacherVisualable==true && unitVisualable==false)" style="display: inline-block">
                  <el-input v-model="searchKey" v-if="addTeacherVisible"
                            style="width: 150px;" size="small"
                            placeholder="搜索添加的教师"></el-input>
                  <el-button type="primary" size="small" style="margin-left: 10px"
                             @click="searchTeacher" v-if="addTeacherVisible">搜索
                  </el-button>
                  <el-button style="float: right"
                             size="small"
                             type="danger"
                             @click="removeMultTeacher()">移除选中
                  </el-button>
                </div>

              </div>
              <div style="display: flex;margin-right: 8px;align-items: center;justify-content: space-between;">
                <!--                <el-button type="success" size="mini"-->
                <!--                           @click="sortTeacherSubmit(1)" v-if="unitVisualable==true && teacherVisualable==true">提交学院排序-->
                <!--                </el-button>-->
                <el-button type="success" size="mini" style="margin-left: 20px;float: left"
                           @click="sortTeacherSubmit(0)" v-if="teacherVisualable==true && unitVisualable==false">提交排序
                </el-button>

              </div>
            </div>
            <div style="height: calc(100vh - 155px);overflow-y: scroll;">
              <el-table
                ref="multipleTable1"
                :data="teacherList" @selection-change="teacherChange"
                style="width: 400px;">
                <el-table-column key="-1"
                  v-if="teacherVisualable||!unitVisualable"
                  type="selection"
                  width="45"
                >
                </el-table-column>
                <el-table-column key="0"
                  v-if="teacherVisualable"
                  label="排序" align="center"
                  :width="nameWidth">
                  <template slot-scope="scope">
                    <span :id="'seq_teacher'+scope.row.tId" style="display: none" v-if="teacherVisualable"
                          class="seq"></span>
                  </template>
                </el-table-column>
                <!--<el-table-column
                  label="头像"
                  width="120" align="center">
                  <template slot-scope="scope">
                    <img @click="routerTo(scope.row.tId)"
                         :src="getImgUrl(scope.row.tAvatar)" :onerror="defaultImage"
                         style="width:60px;height:60px;cursor:pointer;">
                  </template>
                </el-table-column>-->
                <el-table-column align="center" label="姓名" :width="nameWidth"  key="1">
                  <template slot-scope="scope">
          <span class="teacher-homepage" @click="routerTo(scope.row.tDomain_name)"
                style="cursor:pointer;">{{scope.row.tName}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="职称":width="postWidth" key="2">
                  <template slot-scope="scope">
                    <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.tPost}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" v-if="unitVisualable == false&&teacherVisualable==false" align="center":width="doWidth" key="3">
                  <template slot-scope="scope">
                    <el-button v-if="unitVisualable == false"
                               size="mini"
                               type="danger"
                               @click="removeTeacher(scope.row.ctId)">移除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>

        </el-col>
        <el-col :span="7" style="padding-left: 30px" v-if="dialogFormVisible">
          <el-card class="box-card" style="width:400px">
            <div style="height: 60px;width: 100%;" class="teacher-nav">
              <span style="margin-left: 10px">请选择要添加教师</span>
              <div style="margin: 0;display: flex;justify-content: space-between; ">
                <el-button size="small"
                           type="success"
                           @click="">添加选中
                </el-button>
                <!--<el-button type="success" @click="addCatalogueTeacher" size="small">确 定</el-button>-->
                <el-button type="primary" @click="dialogFormVisible = false" size="small" style="margin-right: 10px">取消</el-button>
              </div>
            </div>
            <div   style="height: calc(100vh - 155px);overflow-y: scroll;">

              <el-table :data="searchList" @selection-change="teacherAddMulChange" v-if="searchList!=null">

                <!--<el-table-column
                  type="selection"
                  width="55">
                </el-table-column>-->

                <!--<el-table-column
                  label="头像"
                  width="100" align="center">
                  <template slot-scope="scope">
                    <img @click="routerTo(scope.row.tId)"
                         :src="getImgUrl(scope.row.tAvatar)" :onerror="defaultImage"
                         style="width:60px;height:60px;cursor:pointer;">

                  </template>
                </el-table-column>-->
                <el-table-column
                                 type="selection"
                                 width="45">
                </el-table-column>
                <el-table-column align="center" label="姓名" :width="nameWidth">
                  <template slot-scope="scope">
            <span class="teacher-homepage" @click="routerTo(scope.row.tDomain_name)"
                  style="cursor:pointer;">{{scope.row.tName}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="职称" :width="postWidth">
                  <template slot-scope="scope">
                    <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.tPost}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" :width="doWidth">
                  <template slot-scope="scope">
                    <el-button size="mini"
                               type="success"
                               @click="addSingleTeacher(scope.row.tId)">添加
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: "assignTeacher",
    data() {
      return {
        //变量
        defaultImage: 'this.src="../src/assets/img/defaultAvatar.png"',
        isActive: '',
        sourceUrl: 'http://47.106.132.95:2333/',
        listName: '最新更新',
        totalCount: 0, //分页组件--数据总条数
        totalUpdate: 0,// 学者网更新总数
        listLoading: false,//数据加载等待动画
        listQuery: {
          unitId: '',
          catalogue: ''
        },
        checkList: [],
        searchKey: '',
        addTeacherVisible: false,
        currentCat: '',//当前栏目
        currentName: '',
        searchList: [],
        catalogueList: [],
        multipleSelection: [],
        teacherSort: [],
        teacherSort_id: [],
        teacherRemoveMult_id:[],
        teacherAddMul_id:[],
        teacherList: [],
        dialogFormVisible: false,
        sortVisualable: false,
        teacherVisualable: false,
        unitVisualable: false,
        sortSubVisualable: false,
        form: {
          tId: [],
          cId: ''
        },
        seq_main: [],
        seq_child: [],
        seq_teacher: [],
        formLabelWidth: '120px',
        nameWidth:'130px',
        postWidth:'130px',
        doWidth:'130px',
      }
    },
    created() {
      this.getCatalogues()
      this.getList()
    },
    ready() {
    }
    ,
    computed: {},
    methods: {
      teacher_check(e) {
        alert("hhh")
      },
      getList() {

        this.listLoading = true;
        this.nameWidth='180px'
        this.postWidth='180px'
        this.doWidth='180px'
        this.teacherVisualable = false;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/catalogue/listTeacherAll",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          console.log("查询教师信息为:" + data.totalUpdate)
          console.log("================================")
          this.listLoading = false;
          this.teacherList = data.list;
          this.totalCount = data.totalCount;
          this.addTeacherVisible = false
          this.unitVisualable = true;
          this.dialogFormVisible=false
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      },
      sortCat() {
        if (this.teacherVisualable === true) {
          this.teacherVisualable = false;
        }
        this.sortVisualable = !this.sortVisualable;
        this.sortSubVisualable = false;
        this.checkList = [];
      },
      sortSubCat() {
        if (this.teacherVisualable === true) {
          this.teacherVisualable = false;
        }

        this.sortSubVisualable = !this.sortSubVisualable;
        this.sortVisualable = false;
        this.checkList = [];
      },

      sortTeacher() {
        this.teacherSort = [];//把selection删除
        this.$refs.multipleTable1.clearSelection();
        if(!(this.teacherVisualable==true && this.unitVisualable==false))//如果没有展示了提交排序
        {
          this.$notify({
            title: '警告',
            message: '注：请依据您的点击顺序来排序教师（如想恢复默认按姓氏首字母排序则不点击任何选项，直接提交即可）',
            type: 'warning',
            position: 'bottom-left'
          });
        }else{
          //删除职称前排序号
          this.teacherSort_id.forEach((v, k) => {
            let d = document.getElementById('seq_teacher' + v);
            if(d.innerText!==''){
              d.style.display = 'inline';
              d.innerText = '';
            }

          });
        }

        if (this.sortVisualable === true || this.sortSubVisualable === true) {
          this.sortVisualable = false;
          this.sortSubVisualable = false;
        }
        this.teacherVisualable = !this.teacherVisualable;

        this.teacherSort_id = [];

      },
      sortTeacherSubmit(state) {
        //删除职称前排序号
        this.teacherSort_id.forEach((v, k) => {
          let d = document.getElementById('seq_teacher' + v);
          d.style.display = 'inline';
          d.innerText = '';
        });
        if(this.nameWidth==='180px'){
          this.nameWidth='110px'
          this.postWidth='110px'
          this.doWidth='110px'
        }
        //state参数0，即为目录教师排序
        if (!state) {
          let ctIds = [];
          //检查已选择教师的ID
          console.log(JSON.stringify(this.teacherSort))
          //把ID存到数组
          for (let i = 0; i < this.teacherSort.length; i++) {

            ctIds.push(this.teacherSort[i].ctId)
          }
          this.api({
            url: "/catalogue/sortTeacher",
            method: "post",
            data: {
              "ctIds": ctIds,
              "id": this.currentCat
            }
          }).then(data => {
            this.$message.success('排序成功');
            this.getTeacherByCatalogue(this.currentCat)
            this.teacherVisualable = false;
            this.teacherSort = []
          }).catch(error => {
            console.log("QAQ........排序失败")
          })
        }
        //否则，是整个学院教师排序
        else {
          let tIds = [];
          //检查已选择教师的ID
          console.log(JSON.stringify(this.teacherSort))
          for (let i = 0; i < this.teacherSort.length; i++) {

            tIds.push(this.teacherSort[i].tId)
          }
          this.api({
            url: "/catalogue/sortUnitTeacher",
            method: "post",
            data: {
              "tIds": tIds,
              "unitId": this.$store.getters.unitId
            }
          }).then(data => {
            this.$message.success('排序成功');
            this.getList()
            this.unitVisualable = false;
            this.teacherVisualable = false;
            this.teacherSort = []
          }).catch(error => {
            console.log("QAQ........排序失败")
          })
        }
      },
      changeFun(val) {
        this.multipleSelection = val // 返回的是选中的列的数组集合
        console.log(JSON.stringify(this.multipleSelection))
      },
      teacherAddMulChange(val) {//add change
        this.teacherAddMul_id = [];
        val.forEach((val, index, arr) => {
          this.teacherAddMul_id.push(val.tId);
        });
        console.log(this.teacherAddMul_id);

      },
      teacherChange(val) {
        this.teacherSort_id = [];
        this.teacherRemoveMult_id=[]
        val.forEach((val, index, arr) => {
          this.teacherSort_id.push(val.tId);
          this.teacherRemoveMult_id.push(val.ctId)
        });
        if(this.teacherVisualable==true && this.unitVisualable==false)//如果没有展示了提交排序
        {
          this.teacherList.forEach((v, k) => {
            let d = document.getElementById('seq_teacher' + v.tId);
            d.style.display = 'none';
          });
          this.teacherSort_id.forEach((v, k) => {
            let d = document.getElementById('seq_teacher' + v);
            d.style.display = 'inline';
            d.innerText = k + 1;
          });
        }
        console.log(this.teacherSort_id);
        console.log(this.teacherRemoveMult_id)
        this.teacherSort = val // 返回的是选中的列的数组集合

      },
      /*添加单个教师*/
      addSingleTeacher(tId){
        console.log("tId="+tId);
        console.log("currentCat="+this.currentCat);
        this.api({
          url: "/catalogue/addSingleTeacher",
          method: "post",
          data: {"tId": tId, "cId": this.currentCat}
        }).then(data => {
          this.$message.success('添加成功');
          this.getTeacherByCatalogue(this.currentCat);
          /*this.dialogFormVisible = false;*/
        }).catch(error => {
          console.log("QAQ........添加失败");
          this.$message.warning('请勾选要添加的教师');
        });
        this.api({
          url: "/catalogue/listTeacherAll",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          console.log(JSON.stringify(data.list))
          setTimeout(()=>{
            this.searchList = data.list.filter((item)=>{
              console.log("item.tId="+item.tId);
              return this.checkTeacherList(item.tId) != false;
            });
          },500)

          console.log(JSON.stringify(this.searchList))
          this.dialogFormVisible = true;
        }).catch(error => {
          console.log("QAQ........添加学科失败")
        })
      },
      removeMultTeacher() {
        var removeArrayId='('
        var arrayId=this.teacherRemoveMult_id
        for (var i=0;i<arrayId.length-1;i++)
        {
          removeArrayId+=arrayId[i]+','
        }
        removeArrayId+=arrayId[arrayId.length-1]+')'
        console.log(removeArrayId)
        this.$confirm('确定移除此栏目中选中的教师?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.api({
            url: "/catalogue/removeMultTeacher",
            method: "post",
            data: {
              "removeArrayId": removeArrayId
            }
          }).then((data) => {
            this.getTeacherByCatalogue(this.currentCat);
            this.$message.success("移除选中教师成功")
          }).catch(e => {
            this.$message.error("QAQ.....")
          });
          this.api({
            url: "/catalogue/listTeacherAll",
            method: "get",
            params: {unitId: this.$store.getters.unitId}
          }).then(data => {
            console.log(JSON.stringify(data.list))
            setTimeout(()=>{
              this.searchList = data.list.filter((item)=>{
                console.log("item.tId="+item.tId);
                return this.checkTeacherList(item.tId) != false;
              });
            },500)

            console.log(JSON.stringify(this.searchList))
            this.dialogFormVisible = true;
          }).catch(error => {
            console.log("QAQ........添加学科失败")
          })
        })
      },
      removeTeacher(ctId) {
        this.$confirm('确定在此栏目中移除该教师?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.api({
            url: "/catalogue/removeTeacher",
            method: "post",
            data: {
              "ctId": ctId
            }
          }).then((data) => {
            this.getTeacherByCatalogue(this.currentCat);
            this.$message.success("移除该教师成功")
          }).catch(e => {
            this.$message.error("QAQ.....")
          });
          this.api({
            url: "/catalogue/listTeacherAll",
            method: "get",
            params: {unitId: this.$store.getters.unitId}
          }).then(data => {
            console.log(JSON.stringify(data.list))
            setTimeout(()=>{
              this.searchList = data.list.filter((item)=>{
                console.log("item.tId="+item.tId);
                return this.checkTeacherList(item.tId) != false;
              });
            },500)

            console.log(JSON.stringify(this.searchList))
            this.dialogFormVisible = true;
          }).catch(error => {
            console.log("QAQ........添加学科失败")
          })
        })
      },
      showAdd() {
        if (this.teacherVisualable === true) {
          this.teacherVisualable = false;
        }
        this.$prompt('', '请输入主栏目名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          if (this.checkName(value)) {
            this.api({
              url: "/catalogue/addCatalogue",
              method: "post",
              data: {
                "unitId": this.$store.state.user.unitId,
                "catalogue": value
              }
            }).then(data => {
              this.getCatalogues()
            }).catch(error => {
              console.log("QAQ........添加栏目失败")
            })
          } else
            this.$message({
              type: 'warning',
              message: '该栏目已经存在，请重新输入'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      },
      searchTeacher() {

        this.api({
          url: "/manager/getTeacherByKey",
          method: "get",
          params: {
            unitId: this.$store.state.user.unitId,
            key: this.searchKey
          }
        }).then(data => {
          this.searchList = data.list;
          this.dialogFormVisible = true;
        }).catch(error => {
          console.log("QAQ........获取教师失败")
        })
      },
      showListTeacher(cId) {
        if(this.nameWidth==='180px'){
          this.nameWidth='110px'
          this.postWidth='110px'
          this.doWidth='110px'
        }


        this.api({
          url: "/catalogue/getTeacherByCatalogue",
          method: "get",
          params: {id: cId}
        }).then(data => {
          console.log("CatalogueTeachers+++++" + JSON.stringify(data));
          this.teacherList = data.list;

        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        });
        this.api({
          url: "/catalogue/listTeacherAll",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          console.log(JSON.stringify(data.list))
          setTimeout(()=>{
            this.searchList = data.list.filter((item)=>{
              console.log("item.tId="+item.tId);
              return this.checkTeacherList(item.tId) != false;
            });
          },500)

          console.log(JSON.stringify(this.searchList))
          this.dialogFormVisible = true;
        }).catch(error => {
          console.log("QAQ........添加学科失败")
        })
      },
      getImgUrl(imgName) {
        if (imgName == null) {
          return ""
        } else if (imgName.indexOf("resources") != "-1") {
          return "http://www.scholat.com/" + imgName;
        } else {
          return "http://faculty.scholat.com:2333/public/images/avatar/" + imgName;
        }
      },
      routerTo(tDomain_name) {
        console.log("tDomain_name="+tDomain_name);
        console.log("school_domain_name="+this.$store.getters.domainName);
        this.$router.push({
          name: 'teacherPersonlHomePage',
          params: {
            facultyDomainName: this.$store.getters.domainName,
            teacherDomainName:tDomain_name

          }
        })
      },
      checkName(value) {
        for (let a = 0; a < this.catalogueList.length; a++) {
          if (this.catalogueList[a].name == value) {
            return false
          }
        }
        this.currentName = value
        return true
      },

      checkTeacherList(value) {
        for (let a = 0; a < this.teacherList.length; a++) {
          if (this.teacherList[a].tId == value) {
            return false
          }
        }
        return true
      },
      hasTeacher(cId) {

        this.api({
          url: "/catalogue/getTeacherByCatalogue",
          method: "get",
          params: {id: cId}
        }).then(data => {
          console.log("dataList....." + JSON.stringify(data));
          console.log(Object.keys(data.list).length);
          if (Object.keys(data.list).length != 0)
            return true
          else
            return false
        }).catch(error => {
          console.log("QAQ........查询教师失败")
        })

      },
      getCatalogues() {

        this.listQuery.unitId = this.$store.state.user.unitId
        this.api({
          url: "/catalogue/getCatalogues",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("getCatalogues得到的数据："+JSON.stringify(data))
          this.catalogueList = data.list;

        }).catch(error => {
          console.log("QAQ........没有找到栏目信息")
        })
      },

      getTeacherByCatalogue(cId, state) {
        console.log("state++++" + state);
        this.api({
          url: "/catalogue/getTeacherByCatalogue",
          method: "get",
          params: {id: cId}
        }).then(data => {
          console.log("CatalogueTeachers+++++" + JSON.stringify(data));
          this.teacherList = data.list;
          this.currentCat = cId;
          this.unitVisualable = false;
          //如果是部门、学科则不能增加教师，只能添加子目录，再添加教师
          if (state != 0 && state != 1)
            this.addTeacherVisible = true;
          else
            this.addTeacherVisible = false;
          if(this.nameWidth==='180px'){
            this.nameWidth='110px'
            this.postWidth='110px'
            this.doWidth='110px'
          }
        }).catch(error => {
          console.log("QAQ........没有找到教师")
        })
      },
      //添加教师（原先的批量添加）
      addCatalogueTeacher() {
        let tIds = [];
        //检查已选择教师的ID
        console.log(JSON.stringify(this.multipleSelection))
        //检查教师是否已经加入该栏目
        for (let i = 0; i < this.multipleSelection.length; i++) {

          if (!this.checkTeacherList(this.multipleSelection[i].tId)) {
            this.$message({
              type: 'warning',
              message: '该教师已经存在在此栏目，请重新选择！'
            });
            return false;

          } else tIds.push(this.multipleSelection[i].tId)
        }
        console.log("tIds===++++" + tIds);
        this.api({
          url: "/catalogue/addCatalogueTeacher",
          method: "post",
          data: {"tIds": tIds, "cId": this.currentCat}
        }).then(data => {
          this.$message.success('添加成功');
          this.getTeacherByCatalogue(this.currentCat);
          /*this.dialogFormVisible = false;*/
        }).catch(error => {
          console.log("QAQ........添加失败");
          this.$message.warning('请勾选要添加的教师');
        });
        this.api({
          url: "/catalogue/listTeacherAll",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          console.log(JSON.stringify(data.list))
          setTimeout(()=>{
            this.searchList = data.list.filter((item)=>{
              console.log("item.tId="+item.tId);
              return this.checkTeacherList(item.tId) != false;
            });
          },500)

          console.log(JSON.stringify(this.searchList))
          this.dialogFormVisible = true;
        }).catch(error => {
          console.log("QAQ........添加学科失败")
        })

      },
      topTeacher(ctId) {
        this.$confirm('是否要在该栏目置顶该教师?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.api({
            url: "/catalogue/topTeacher",
            method: "post",
            data: {
              "ctId": ctId,
              "tSeq": 1
            }
          }).then(data => {
            this.getTeacherByCatalogue(this.currentCat);
          }).catch(error => {
            console.log("QAQ........删除失败")
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消置顶'
          });
        });

      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../styles/catalogueVariables.scss';

  .newsLi {
    height: 76px;
    padding: 5px 5px 5px 0px;
  }

  .is-active {
    background-color: #CCCCCC !important;
    color: #409EFF;
  }

  .threeButton {
    float: right;
    margin: 4% 4% 2% 1%;
    padding: 2px 6px 3px 6px;
  }

  .catalogueName {
    width: 50px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .teacherLi {
    float: left;
    padding: 20px 30px 15px 5px;

  }

  .bigText {
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText {
    color: #8590a6;
  }

  .container {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    min-width: 1400px;

  }


  .header-navs {
    position: relative;
    border: 2px solid #3399CC;
  }

  .navs {
    height: 50px;
    line-height: 50px;
  }


  .nav {
    float: left;
    width: 120px;
    text-align: center;
    border-right: 2px solid #3399CC;
  }

  .nav-item {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #3399CC;
  }

  .nav-item:hover {
    color: white;
    background-color: #3399CC;

  }

  .nav2 {
    display: inline-block;
    width: 30px;
    text-align: center;
  }

  .nav-item2 {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-decoration: none;
    color: #3399CC;
  }

  .nav-item2:hover {
    color: white;
    background-color: #3399CC;
  }

  .nav-item-active {
    color: white;
    background: #3399CC;
  }

  li {
    list-style-type: none;
  }

  .seq {
    background: #f56c6c;
    font-size: 14px;
    border-radius: 50px;
    padding: 3px;
    color: white;
    height: 55px;
    text-align: center;
  }

  .teacher-nav {
    background: #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
