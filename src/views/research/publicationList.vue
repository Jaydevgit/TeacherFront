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
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="selectTeacher">批量选择教师</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button type="primary" @click="exportExcel">导出Excel</el-button>-->
<!--        </el-form-item>-->
      </el-form>
    </div>

    <el-table
      ref="multipleTable"
      :data="list"
      v-loading.body="listLoading" element-loading-text="拼命加载中"  fit
      highlight-current-row
      tooltip-effect="dark"
      style="width: 100%"
      :default-sort = "{prop: 'datetime', order: 'descending'}">

      <el-table-column
        label="著作名称"
        prop="title">
        <template slot-scope="scope" >
          <div >
<!--            @click="routeTo(scope.row.id)" style="cursor: pointer"-->
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="authors"
        label="作者"
        width="300">
        <template slot-scope="scope">{{ scope.row.authors }}</template>
      </el-table-column>

      <el-table-column
        prop="type"
        label="出版社"
        width="200">
        <template slot-scope="scope">{{ scope.row.press }}</template>
      </el-table-column>
      <el-table-column
        prop="type"
        label="概要"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.citation }}</template>
      </el-table-column>
      <el-table-column
        prop="datetime"
        sortable
        label="日期"
        width="90">
        <template slot-scope="scope">{{ scope.row.datetime}}</template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="管理" width="200" v-if="hasPerm('teacher:update')">
        <template slot-scope="scope">
          <!--              <el-button type="success" icon="el-icon-bell"  size="mini" round-->
          <!--                         @click="aiPaper(scope.row.id)"></el-button>-->
          <el-button type="primary" icon="el-icon-edit" size="mini" round @click="showUpdate(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" round v-if="hasPerm('teacher:delete')"
                     @click="removePubilcation(scope.row.id)"></el-button>
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

  </div>
</template>

<script>
  export default {
    name: "publicationList",
    data() {
      return {
        list: [],//表格的数据
        totalCount: 0, //分页组件--数据总条数
        listLoading: true,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          unitId: '',
          key: '',
          name:'',
          valueStart:'',
          valueEnd:'',
        }
      }
    },
    created() {
      console.log("--------------------开始查询paperList")
      this.publicationList();
    },
    methods: {
      onSubmit() {
        this.listLoading=true
        this.listQuery.pageNum = 1
        this.listQuery.pageRow = 10
        this.listQuery.unitId= this.$store.state.user.unitId
        this.api({
          url: "/academic/searchPublication",
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
          path: '/research/addPaper'
        })
      },
      showUpdate(publicationId) {

        this.$router.push({
          name: 'modifyPublication',
          params: {
            id: publicationId,
          }
        })
      },
      aiPaper(paperId) {

        this.$router.push({
          name: 'aiPaper',
          params: {
            id: paperId,
          }
        })
      },
      publicationList(){
        this.listQuery.pageNum = 1
        this.listQuery.pageRow = 10
        this.changePageNum();
      },
      removePubilcation(pubilcationId) {
        var _vue = this;
        this.$confirm('确定删除该著作?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          _vue.api({
            url: "/academic/deletePubilcation",
            method: "post",
            data: {
              "id": pubilcationId
            }
          }).then((data) => {
            this.$message.success("删除成果成功")
            this.publicationList();
          }).catch(e => {
            this.$message.error("QAQ.....")
          })
        })
      },
      routeTo(id){
        let routeData = this.$router.resolve({
          name: 'paperInfo',
          params: {
            id: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      changePageNum(){
        this.listQuery.unitId =  this.$store.state.user.unitId;
        this.api({
          url: "/academic/listPublication",
          method: "get",
          params: this.listQuery
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

<style scoped>

</style>
