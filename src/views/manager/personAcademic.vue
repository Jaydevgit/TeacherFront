<template>
  <div class="app-container">
    <div style="float: left">
      <el-button v-if="this.activeName==='first'" type="primary" @click="addAllScholatPaper">添加所有论文</el-button>
<!--      <el-button v-if="this.activeName==='second'" type="primary" @click="addAllScholatProject">添加所有项目</el-button>-->
<!--      <el-button v-if="this.activeName==='third'" type="primary" @click="addAllScholatPaper">添加所有知识产权</el-button>-->
    </div>
    <div style="float: right;">
      <i type="success" class="el-icon-success" style="font-size: 40px; color: #67C23A;transform: translateY(10px)"
        ></i><span style="color: #909399;">&nbsp已存在&nbsp&nbsp&nbsp</span>
      <el-button size="small" type="primary" icon="el-icon-plus" circle></el-button>  <span style="color: #909399;">&nbsp可添加&nbsp&nbsp&nbsp</span>
      <!--  <el-button size="small" type="warning" icon="el-icon-star-off" circle></el-button>
       <span style="color: #909399;">&nbsp存在相似成果&nbsp&nbsp&nbsp</span>-->
    </div>
    <el-tabs type="border-card" style="margin-top: 70px;" v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="论文信息" name="first">
        <el-table
          ref="multipleTable"
          :data="list"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">

<!--          <el-table-column-->
<!--            type="selection"-->
<!--            width="50">-->
<!--          </el-table-column>-->
          <el-table-column type="expand" label="详细" width="80">
            <template slot-scope="props">
              <el-form label-position="left" class="demo-table-expand">
                <el-form-item label="论文来源" >
                  <span>{{ props.row.source }}</span>
                </el-form-item>
                <el-form-item label="来源详细">
                  <span>{{ props.row.sourceDetail }}</span>
                </el-form-item>
                <el-form-item label="论文摘要">
                  <span>{{ props.row.summary }}</span>
                </el-form-item>
                <el-form-item label="论文关键字">
                  <span>{{props.row.keyword}}</span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="论文题目"
            prop="title"
            >
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column
            prop="authors"
            label="作者"
            width="400">
            <template slot-scope="scope">{{ scope.row.authors }}</template>
          </el-table-column>

          <el-table-column
            prop="date"
            sortable
            label="日期"
            width="130">
            <template slot-scope="scope">{{ scope.row.date}}</template>
          </el-table-column>

          <el-table-column
            prop="type"
            label="论文类型"
            width="120">
            <template slot-scope="scope">
              <div>{{scope.row.type}}</div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="120" v-if="hasPerm('teacher:update')">
            <template slot-scope="scope" >
              <i type="success" class="el-icon-success" style="font-size: 40px; color: #67C23A"
                 v-if="scope.row.exist === 1" ></i>
              <el-button size="small" type="primary" icon="el-icon-plus" circle
                         v-else="scope.row.exist == 0" @click="addScholatPaper(scope.row)"></el-button>
<!--              <el-button size="small" type="warning" icon="el-icon-star-off" circle-->
<!--                         v-else @click="modifyPaper(scope.row.similarId)"></el-button>-->
            </template>
          </el-table-column>
        </el-table>


      </el-tab-pane>
<!--      v-loading.body="listLoading" element-loading-text="拼命加载中" border fit-->
<!--      highlight-current-row-->
<!--      tooltip-effect="dark"-->
      <el-tab-pane label="项目信息" name="second">
        <el-table
          ref="multipleTable"
          :data="list2"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
<!--          <el-table-column-->
<!--            type="selection"-->
<!--            width="50">-->
<!--          </el-table-column>-->
          <el-table-column
            label="项目题目"
            prop="title"
            >
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            prop="authors"
            label="项目类型"
            width="300">
            <template slot-scope="scope">{{ scope.row.originAndId}}</template>
          </el-table-column>

          <el-table-column
            prop="projectNumber"
            label="项目编号"
            width="150">
            <template slot-scope="scope">
              {{ scope.row.projectNumber}}
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            sortable
            label="开始时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.startDate}}</template>
          </el-table-column>

          <el-table-column
            label="结束时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.endDate}}</template>
          </el-table-column>


          <el-table-column
            prop="funding"
            label="经费(万)"
            width="90">
            <template slot-scope="scope">
              {{ scope.row.funding}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" align="center" label="操作" width="120" v-if="hasPerm('teacher:update')">
            <template slot-scope="scope" >
              <i type="success" class="el-icon-success" style="font-size: 40px; color: #67C23A"
                 v-if="scope.row.exist === 1" ></i>
              <el-button size="small" type="primary" icon="el-icon-plus" circle
                         v-else="scope.row.exist == 0" @click="addScholatProject(scope.row)"></el-button>
<!--              <el-button size="small" type="warning" icon="el-icon-star-off" circle-->
<!--                         v-else @click="modifyProject(scope.row.similarId)"></el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="知识产权信息" name="third">
        <el-table
          ref="multipleTable"
          :data="list3"

          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">

<!--          <el-table-column-->
<!--            type="selection"-->
<!--            width="50">-->
<!--          </el-table-column>-->
          <el-table-column
            label="专利名称"
            prop="title"
          >
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            prop="authors"
            label="作者"
            width="300">
            <template slot-scope="scope">{{ scope.row.authors}}</template>
          </el-table-column>

          <el-table-column
            prop="authors"
            label="专利类型"
            width="200">
            <template slot-scope="scope">{{ scope.row.typeAndId}}</template>
          </el-table-column>

          <el-table-column
            prop="projectNumber"
            label="专利编号"
            width="180">
            <template slot-scope="scope">
              {{ scope.row.patentNumber}}
            </template>
          </el-table-column>

          <el-table-column
            prop="date"
            sortable
            label="发表时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.date}}</template>
          </el-table-column>
<!--          <el-table-column fixed="right" align="center" label="操作" width="120" v-if="hasPerm('teacher:update')">-->
<!--            <template slot-scope="scope" >-->
<!--              <i size="small" type="success" icon="el-icon-check" circle-->
<!--                         v-if="scope.row.exist === 1" ></i>-->
<!--              <el-button size="small" type="primary" icon="el-icon-plus" circle-->
<!--                         v-else="scope.row.exist === 0" @click="addScholatPatent(scope.row)"></el-button>-->
<!--&lt;!&ndash;              <el-button size="small" type="warning" icon="el-icon-star-off" circle&ndash;&gt;-->
<!--&lt;!&ndash;                         v-else @click="modifyPatent(scope.row.similarId)"></el-button>&ndash;&gt;-->
<!--            </template>-->
<!--          </el-table-column>-->
        </el-table>

      </el-tab-pane>
    </el-tabs>

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
        list2:[],
        list3:[],
        listLoading: true,//数据加载等待动画
        pids : [],
        paperForm: {
          id: '',
          title:'',
          authors:'',
          source:'',
          sourceDetail:'',
          datetime :'',
          papertype:'',
          scholat_username:'',
          keyword:'',
          summary:'',
          updateTime:'',
          deleted:'0',
          unitId: '',// 单位编号
          scholat_paper_id :''
        },
        projectForm: {
          id: '',
          title:'',
          startDate :'',
          endDate:'',
          application:'',
          projectType:'',
          funding:'',
          projectNumber:'',
          updateTime:'',
          deleted:'0',
          unitId: '',// 单位编号
          scholat_project_id :'',
          scholat_username:''
        },
        patentForm:{
          id:'',
          title:'',
          authors:'',
          datetime:'',
          patentType:'',
          patentNumber:'',
          unitId:'',
          updateTime:'',
          deleted:'0',
          scholat_patent_id :'',
          scholat_username:''
        },
        activeName : 'first'
      }
    },
    created() {
    },
    mounted(){
        this.scholatPaper()
    },
    //用来监听标签的变化
    watch:{
      activeName(){
        console.log('------test--------'+this.activeName)
        if(this.activeName==='first'){
          this.scholatPaper();

        }
         if(this.activeName==='second'){
          this.scholatProject();

        }
         if(this.activeName==='third'){
          this.scholatPatent()
        }
      }
    },
    methods: {
      handleClick(tab, event) {
      },
      modifyPaper(id){
          let routeData = this.$router.resolve({
            name: 'modifyPaper',
            params: {
              id: id
            }
          });
          window.open(routeData.href, '_blank');
      },
      modifyPatent(id){
        let routeData = this.$router.resolve({
          name: 'modifyPatent',
          params: {
            id: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      modifyProject(id){
        let routeData = this.$router.resolve({
          name: 'modifyProject',
          params: {
            id: id
          }
        });
        window.open(routeData.href, '_blank');
      },
      scholatPaper() {
        this.listLoading = true
        console.log("执行了scholat_paper")
        let unitId = this.$store.state.user.unitId;
        this.api({
          url: "/academic/getPaperFromScholat",
          method: "post",
          data: {"scholat_username" : this.$route.params.scholat_username,
                  "unitId" :unitId}
        }).then(data => {
          console.log("查询成果成功")
          this.list = data;
        //  console.log("this.list==="+JSON.stringify(this.list));
          this.listLoading = false;
        }).catch(error => {
          console.log("QAQ........没有找到成果列表")
        })
      },
      scholatProject() {
        this.listLoading = true
        console.log("执行了scholat_project")
        let unitId = this.$store.state.user.unitId;
        this.api({
          url: "/academic/getProjectFromScholat",
          method: "post",
          data: {"scholat_username" : this.$route.params.scholat_username,
            "unitId" :unitId}
        }).then(data => {
          console.log("查询成果成功")
          this.list2 = data;
          this.listLoading = false;
        }).catch(error => {
          console.log("QAQ........没有找到成果列表")
        })
      },
      scholatPatent() {
        this.listLoading = true
        let unitId = this.$store.state.user.unitId;
        this.api({
          url: "/academic/getPatentFromScholat",
          method: "post",
          data: {"scholat_username" : this.$route.params.scholat_username,
            "unitId" :unitId}
        }).then(data => {
          console.log("查询成果成功")
          console.log(data)
          this.list3 = data;
          this.listLoading = false;
        }).catch(error => {
          console.log("QAQ........没有找到成果列表")
        })
      },
      addScholatPaper(scholat){
       this.tranPaperForm(scholat)
        var _vue = this;
        this.$confirm('确定添加该论文到机构?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.paperForm.unitId = this.$store.state.user.unitId;
          this.api({
            url: "/academic/addPaper",
            method: "post",
            data: this.paperForm
          }).then((res) => {
            this.$message.success("添加论文信息成功")
            this.scholatPaper()
          }).catch(e => {

          })
        })
      },
      addAllScholatPaper(){
        var jsonObj = {};
        let list = this.list;
        let unitId = this.$store.state.user.unitId;
        let scholat_username=this.$route.params.scholat_username;
        this.$confirm('确定添加所有论文到机构?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.paperForm.unitId = this.$store.state.user.unitId;
          this.api({
            url: "/academic/addAllPaper",
            method: "post",
            data: {
              "data":list,
              "scholat_username" : scholat_username,
              "unitId" :unitId
            }
          }).then((res) => {
            this.$message.success("添加论文信息成功")
            this.scholatPaper()
          }).catch(e => {

          })
        })
      },
      addAllScholatProject(){
        let list2 = this.list2;
        let unitId = this.$store.state.user.unitId;
        let scholat_username=this.$route.params.scholat_username;
        this.$confirm('确定添加所有论文到机构?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.paperForm.unitId = this.$store.state.user.unitId;
          this.api({
            url: "/academic/addAllProject",
            method: "post",
            data: {
              "data":list2,
              "scholat_username" : scholat_username,
              "unitId" :unitId
            }
          }).then((res) => {
            this.$message.success("添加论文信息成功")
            this.scholatPaper()
          }).catch(e => {

          })
        })
      },
      tranPaperForm(scholat){
        console.log(scholat)
        this.paperForm.title = scholat.title;
        this.paperForm.authors = scholat.authors;
        this.paperForm.source = scholat.source;
        this.paperForm.sourceDetail = scholat.sourceDetail;
        this.paperForm.datetime = scholat.date;
        this.paperForm.keyword = scholat.keyword;
        this.paperForm.summary = scholat.summary;
        this.paperForm.scholat_paper_id = scholat.id;
        this.paperForm.scholat_username = this.$route.params.scholat_username;
        if (scholat.type == "期刊论文")
          this.paperForm.papertype = "0";
        else
          this.paperForm.papertype = "1";
      },
      addScholatProject(scholat){
        this.tranProjectForm(scholat)
        var _vue = this;
        this.$confirm('确定添加该项目到机构?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.projectForm.unitId = this.$store.state.user.unitId;
          this.api({
            url: "/academic/addProject",
            method: "post",
            data: this.projectForm
          }).then((res) => {
            scholat.exist == 1
            this.$message.success("添加项目信息成功")
            this.$router.push({
              path: '/personAcademic/' + this.$route.params.scholat_username
            })
          }).catch(e => {

          })
        })
      },
      tranProjectForm(scholat){
        console.log(scholat)
        this.projectForm.title = scholat.name
        this.projectForm.startDate = scholat.startDate
        this.projectForm.endDate = scholat.endDate
        this.projectForm.application = scholat.application
        this.projectForm.projectType = scholat.originAndId
        this.projectForm.projectNumber = scholat.projectNumber
        this.projectForm.funding = scholat.funding
        this.projectForm.unitId = this.$store.state.user.unitId;
        this.projectForm.scholat_project_id =scholat.id
        this.projectForm.scholat_username = this.$route.params.scholat_username
      },
      addScholatPatent(scholat){
        this.tranPatentForm(scholat)
        var _vue = this;
        this.$confirm('确定添加该专利到机构?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.patentForm.unitId = this.$store.state.user.unitId;
          this.api({
            url: "/academic/addPatent",
            method: "post",
            data: this.patentForm
          }).then((res) => {
            this.$message.success("添加专利信息成功")
            this.$router.push({
              path: '/personAcademic/' + this.$route.params.scholat_username
            })
          }).catch(e => {

          })
        })
      },
      tranPatentForm(scholat){
        console.log(scholat)
        this.patentForm.title = scholat.name
        this.patentForm.authors = scholat.authors
        this.patentForm.datetime = scholat.date
        this.patentForm.patentType = scholat.typeAndId
        this.patentForm.patentNumber = scholat.patentNumber
        this.patentForm.unitId = this.$store.state.user.unitId;
        this.patentForm.scholat_patent_id =scholat.id
        this.patentForm.scholat_username = this.$route.params.scholat_username
      },
    }
  }
</script>
<style>
  .el-tooltip__popper {

    max-width: 800px;

  }
</style>
