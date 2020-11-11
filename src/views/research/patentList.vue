<template>
  <div class="app-container">

    <div class="filter-container" style="border-bottom: solid 3px #336699">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline" >
        <el-form-item label="教师姓名" >
          <el-input v-model="listQuery.name" style="width: 100px" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="起始日期" >
          <el-date-picker
            v-model="listQuery.valueStart"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="截至日期">
          <el-date-picker
            v-model="listQuery.valueEnd"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="selectTeacher">批量选择教师</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出Excel</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table
      ref="multipleTable"
      :data="list"
      v-loading.body="listLoading" element-loading-text="拼命加载中"  fit
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'ascending'}">
      <el-table-column
        label="专利名称"
        prop="title"
        min-width="300px"
      >
        <template slot-scope="scope"><div >
<!--          @click="routeTo(scope.row.id)" style="cursor: pointer"-->
          {{ scope.row.title }}</div></template>
      </el-table-column>
      <el-table-column
        prop="authors"
        label="作者"
        width="450">
        <template slot-scope="scope">{{ scope.row.authors}}</template>
      </el-table-column>

      <el-table-column
        prop="authors"
        label="专利类型"
        width="350">
        <template slot-scope="scope">{{ scope.row.patentType}}</template>
      </el-table-column>

<!--      <el-table-column-->
<!--        prop="projectNumber"-->
<!--        label="专利编号"-->
<!--        width="180">-->
<!--        <template slot-scope="scope">-->
<!--          {{ scope.row.patentNumber}}-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column
        prop="date"
        sortable
        label="发表时间"
        width="130">
        <template slot-scope="scope">{{ scope.row.datetime}}</template>
      </el-table-column>
      <el-table-column fixed="right" align="center" label="管理" width="200" v-if="hasPerm('teacher:update')">
        <template slot-scope="scope">
          <template>
            <el-button type="primary" icon="el-icon-edit"  size="mini" round @click="showUpdate(scope.row.id)"></el-button>
          </template>
          <el-button type="danger" icon="el-icon-delete"  size="mini" round v-if="hasPerm('teacher:delete')"
                     @click="removePatent(scope.row.id)"></el-button>
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

    <el-dialog title="请勾选教师导出论文" :visible.sync="dialogFormVisible" style="margin-top: -20px; margin-bottom: 18px;" width="520px">
      <div style="margin-bottom: 14px;display: flex;justify-content: space-between;">
        <el-button type="success" @click="tIdsExport">确定导出Excel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
      </div>
      <el-table :data="teacherList" @selection-change="changeFun" style="overflow-y: auto;height: 510px">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="头像"
          width="100" align="center">
          <template slot-scope="scope">
            <img @click="routerTo(scope.row.tId)"
                 :src="getImgUrl(scope.row.tAvatar)" :onerror="defaultImage"
                 style="width:60px;height:60px;cursor:pointer;">

          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" width="130">
          <template slot-scope="scope">
            <span class="teacher-homepage" @click="routerTo(scope.row.tId)"
                  style="cursor:pointer;">{{scope.row.tName}}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职称" width="175">
          <template slot-scope="scope">
            <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.tPost}}</span>
            <span></span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>



  </div>
</template>
<script>
  import teacherPersonalHomePage from '../teacher/teacherPersonalHomePage'
  import store from '../../store'

  export default {
    // -------------------这个用来获取路由表, 因为我点击教师链接需要跳转到教师主页
    components: {teacherPersonalHomePage},
    data() {
      return {
        list: [],//表格的数据
        totalCount: 0, //分页组件--数据总条数
        listLoading: true,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          unitId: '',
          name:'',
          valueStart:'',
          valueEnd:'',
          key: '',
        tIds:[] ,//批量选择教师的id
        },
        dialogFormVisible: false,
        searchList: [],
        teacherList: [],
      }
    },
    created() {
      console.log("--------------------开始查询patentList")
      this.patentList();
    },
    methods: {
      tIdsExport(){
        this.listQuery.unitId= this.$store.state.user.unitId
        var json = JSON.stringify(this.listQuery);
        var json2=encodeURI(json) //解析中文字符
        window.open("/api/academic/exportTeacherPatent?data="+json2);
      },
      selectTeacher(){
        this.dialogFormVisible=true
        this.getList()
      },
      changeFun(val) {
        //   console.log(JSON.stringify(val)) // 返回的是选中的列的数组集合
        this.listQuery.tIds=[]
        for(let i=0;i<=val.length-1;i++){
          this.listQuery.tIds.push(val[i].tId)
        }
        console.log(this.listQuery.tIds)
      },
      checkTeacherList(value) {
        for (let a = 0; a < this.teacherList.length; a++) {
          if (this.teacherList[a].tId === value) {
            return false
          }
        }
        return true
      },
      getList() {
        this.listLoading = true;
        this.nameWidth='180px'
        this.postWidth='180px'
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/catalogue/listTeacherAllNoScholat",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          // console.log("查询教师信息为:" + JSON.stringify(data))
          console.log("================================")
          this.listLoading = false;
          this.teacherList = data.list;
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
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
      onSubmit() {
        this.listLoading=true
        this.listQuery.pageNum = 1
        this.listQuery.pageRow = 10
        this.listQuery.unitId= this.$store.state.user.unitId
        this.api({
          url: "/academic/searchPatent",
          method: "post",
          data: this.listQuery
        }).then(data => {
          console.log("查询成果成功"+JSON.stringify(data))
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.listLoading=false
        }).catch(error => {
          console.log("QAQ........没有找到成果列表")
        })
        console.log('submit!');
      },
      exportExcel(){
        this.listQuery.unitId= this.$store.state.user.unitId
        var json = JSON.stringify(this.listQuery);
        var json2=encodeURI(json) //解析中文字符
        window.open("/api/academic/exportPatent2?data="+json2);
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.changePageNum()
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.changePageNum()
      },
      showCreate() {
        //显示新增对话框
        /*this.tempTeacher.name = "";
        this.dialogStatus = "create"
        this.dialogFormVisible = true*/
        this.$router.push({
          path: '/academic/addPatent'
        })
      },
      showUpdate(patentId) {

        this.$router.push({
          name: 'modifyPatent',
          params: {
            id: patentId,
          }
        })
      },
      patentList(){
        this.listQuery.pageNum = 1
        this.listQuery.pageRow = 10
        this.changePageNum();
      },
      removePatent(patentId) {
        var _vue = this;
        this.$confirm('确定删除该论文?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          _vue.api({
            url: "/academic/deletePatent",
            method: "post",
            data: {
              "id": patentId
            }
          }).then((data) => {
            this.$message.success("删除成果成功")
            this.patentList();
          }).catch(e => {
            this.$message.error("QAQ.....")
          })
        })
      },
      routeTo(id){
        let routeData = this.$router.resolve({
          name: 'patentInfo',
          params: {
            id: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      changePageNum(){
        this.listQuery.unitId =  this.$store.state.user.unitId;
        this.api({
          url: "/academic/searchPatent",
          method: "post",
          data: this.listQuery
        }).then(data => {
          console.log("查询科研组织成果成功")
          console.log(data)
          this.list = data.list;
          this.listLoading = false;
          this.totalCount = data.totalCount;
        }).catch(error => {
          console.log("QAQ........没有找到成果列表")
        })
      }
    }
  }
</script>
<style>
  .el-tooltip__popper {

    max-width: 800px;

  }
</style>
