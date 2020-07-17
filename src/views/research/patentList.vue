<template>
  <div class="app-container">

    <div class="filter-container" style="border-bottom: solid 3px #336699">
      <el-form>
        <el-form-item>
<!--          <el-button style="float: right;margin-right: 20px;margin-top: 10px;" round type="primary" size="small" @click="showCreate" v-if="hasPerm('teacher:add')">添加专利-->
<!--          </el-button>-->
          <!--<el-button style="float:right;margin-right: 15px;margin-top: 3px;" size="small" type="success" icon="plus"-->
          <!--@click="patentList">所有成果-->
          <!--</el-button>-->
          <!--<el-button type="primary" size="small" style="float:right;margin-right: 15px;margin-top: 3px;"-->
          <!--@click="searchTeahcer">搜索-->
          <!--</el-button>-->
          <!--<el-input v-model="searchKey" style="width: 150px;float:right;height: 24px;margin-right: 15px;"-->
          <!--placeholder="搜索要查询的信息"-->
          <!--@keydown.enter.native="searchTeahcer"></el-input>-->
          <!--<el-input type="text" style="display:none"/> &lt;!&ndash;确保keydown.enter触发&ndash;&gt;-->

          <div style="clear: both;"></div>
        </el-form-item>
        <el-form-item style="margin-bottom:0;display:none;">
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
      >
        <template slot-scope="scope"><div @click="routeTo(scope.row.id)" style="cursor: pointer">{{ scope.row.title }}</div></template>
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
          key: ''
        }
      }
    },
    created() {
      console.log("--------------------开始查询patentList")
      this.patentList();
    },
    methods: {
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
          url: "/academic/listPatent",
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
<style>
  .el-tooltip__popper {

    max-width: 800px;

  }
</style>
