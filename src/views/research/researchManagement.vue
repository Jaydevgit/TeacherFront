<template>
    <div class="researchManagement">
      <div class="top">
        <div class="left">
          <el-form ref="form" :model="AcademicForm" label-width="80px" size="mini">
            <el-form-item label="教师姓名"  >
              <el-input v-model="AcademicForm.name" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="科研类型">
              <el-select v-model="AcademicForm.type" placeholder="请选择科研类型">
                <el-option label="论文信息" value="0"></el-option>
                <el-option label="项目信息" value="1"></el-option>
                <el-option label="专利信息" value="2"></el-option>
                <el-option label="著作信息" value="3"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="起始日期">
              <el-date-picker
                v-model="AcademicForm.valueStart"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="截至日期">
              <el-date-picker
                v-model="AcademicForm.valueEnd"
                type="month"
                placeholder="选择月">
              </el-date-picker>
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="onSubmit" size="small">立即查询</el-button>
              <el-button type="primary" @click="exportAcademic" size="small">导出查询结果</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="right">
          <PieChart></PieChart>
        </div>
      </div>

      <div class="bottom">
            <el-table
              v-show="AcademicForm.type==='0'"
              ref="multipleTable1"
              :data="paperList"
              v-loading.body="listLoading"
              style="width: 100%"
              :default-sort = "{prop: 'date', order: 'descending'}">
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
                <template slot-scope="scope">{{ scope.row.datetime}}</template>
              </el-table-column>

              <el-table-column
                prop="type"
                label="论文类型"
                width="120">
                <template slot-scope="scope">
                  <div v-if="scope.row.papertype==0">期刊论文</div>
                  <div v-else >会议论文</div>
                </template>
              </el-table-column>
            </el-table>
        <el-table
          v-show="AcademicForm.type==='1'"
          ref="multipleTable2"
          :data="projectList"
          v-loading.body="listLoading"
          style="width: 100%"
          :default-sort = "{prop: 'startDate', order: 'descending'}">
          <!--          <el-table-column-->
          <!--            type="selection"-->
          <!--            width="50">-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="title"
            label="项目类型"
           >
            <template slot-scope="scope">{{ scope.row.title}}</template>
          </el-table-column>
          <el-table-column
            prop="project_type"
            label="项目类型"
            width="300">
            <template slot-scope="scope">{{ scope.row.project_type}}</template>
          </el-table-column>

<!--          <el-table-column-->
<!--            prop="project_number"-->
<!--            label="项目编号"-->
<!--            width="150">-->
<!--            <template slot-scope="scope">-->
<!--              {{ scope.row.project_number}}-->
<!--            </template>-->
<!--          </el-table-column>-->

          <el-table-column
            prop="startDate"
            sortable
            label="开始时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.start_date}}</template>
          </el-table-column>

          <el-table-column
            label="结束时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.end_date}}</template>
          </el-table-column>

          <el-table-column
            prop="funding"
            label="经费(万)"
            width="90">
            <template slot-scope="scope">
              {{ scope.row.funding}}
            </template>
          </el-table-column>
        </el-table>
          <el-table
            v-show="AcademicForm.type==='2'"
            ref="multipleTable"
            :data="patentList"
            v-loading.body="listLoading"
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
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
              prop="authors"
              label="作者"
              width="450">
              <template slot-scope="scope">{{ scope.row.authors}}</template>
            </el-table-column>

            <el-table-column
              prop="patentType"
              label="专利类型"
              width="350">
              <template slot-scope="scope">{{ scope.row.patentType}}</template>
            </el-table-column>

<!--            <el-table-column-->
<!--              prop="projectNumber"-->
<!--              label="专利编号"-->
<!--              width="180">-->
<!--              <template slot-scope="scope">-->
<!--                {{ scope.row.patentNumber}}-->
<!--              </template>-->
<!--            </el-table-column>-->

            <el-table-column
              prop="datetime"
              sortable
              label="发表时间"
              width="130">
              <template slot-scope="scope">{{ scope.row.datetime}}</template>
            </el-table-column>

          </el-table>
        <el-table
          v-show="AcademicForm.type==='3'"
          ref="multipleTable"
          :data="publicationList"
          style="width: 100%"
          :default-sort = "{prop: 'date', order: 'descending'}">
          <!--          <el-table-column-->
          <!--            type="selection"-->
          <!--            width="50">-->
          <!--          </el-table-column>-->
          <el-table-column
            label="著作名称"
            prop="title"
          >
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column
            prop="authors"
            label="作者"
            width="450">
            <template slot-scope="scope">{{ scope.row.authors}}</template>
          </el-table-column>

          <el-table-column
            prop="press"
            label="出版社"
            width="350">
            <template slot-scope="scope">{{ scope.row.press}}</template>
          </el-table-column>
          <!--          <el-table-column-->
          <!--            prop="citation"-->
          <!--            label="著作简介"-->
          <!--            width="180">-->
          <!--            <template slot-scope="scope">-->
          <!--              {{ scope.row.citation}}-->
          <!--            </template>-->
          <!--          </el-table-column>-->
          <el-table-column
            prop="datetime"
            sortable
            label="出版时间"
            width="130">
            <template slot-scope="scope">{{ scope.row.datetime}}</template>
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
  import PieChart from './components/PieChart'
    export default {
        name: "researchManagement",
      components:{
        PieChart
      },
      data() {
        return {
          AcademicForm: {
            name: '',
            type: '0',//0:论文,1:项目,2:知识产权
            desc: '',
            valueStart: '',
            valueEnd: '',
            unitId:''
          },
          paperList:[],
          projectList:[],
          patentList:[],
          publicationList:[],
          listLoading: false,//数据加载等待动画

        };
      },
      methods: {

        onSubmit() {
          this.listLoading=true
          this.AcademicForm.unitId= this.$store.state.user.unitId
          let type= this.AcademicForm.type
          this.api({
            url: "/academic/getAchievement",
            method: "post",
            data: this.AcademicForm
          }).then(data => {
            console.log("查询成果成功")
            if(type==='0'){
              this.paperList = data.list;
            }else if(type==='1'){
              this.projectList = data.list;
            }else if(type==='2'){
              this.patentList = data.list;
            }else if(type==='3'){
              this.publicationList = data.list;
            }

           // console.log("this.data==="+JSON.stringify( this.paperList));
            this.listLoading=false

          }).catch(error => {
            console.log("QAQ........没有找到成果列表")
          })
          console.log('submit!');
        },
        exportAcademic(){
          this.AcademicForm.unitId= this.$store.state.user.unitId
          var json = JSON.stringify(this.AcademicForm);
          var json2=encodeURI(json) //解析中文字符
          window.open("/api/academic/exportAcademic?data="+json2);
          // window.open("/api/academic/exportAcademic?type="+this.AcademicForm.type
          //   +"?unitId="+ this.$store.state.user.unitId
          //   +"?name="+this.AcademicForm.name
          //   +"?startDate=" +this.AcademicForm.valueStart+"?endDate="+this.AcademicForm.valueEnd)
        }
      }
    }
</script>

<style scoped>
.researchManagement{

}
.top{
  display: flex;
}
.left{
  flex: 1;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 30px 30px 10px 30px;
}
.right{
  flex: 1;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 20px;
  padding: 30px 30px 10px 30px;
}
.bottom{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 10px 20px 10px 20px;
  padding: 30px 30px 10px 30px;
}
.card-panel-description {
  float: left;
  font-weight: bold;
  margin: 10px;
}
.card-panel-text {
  line-height: 26px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 22px;
  margin-bottom: 12px;
}

</style>
