<template>
  <div class="search-container">
    <el-row>
      <el-col :span="12"><div class="grid-content bg-purple">
        <el-form :inline="true" class="demo-form-inline" @submit.native.prevent>
          <span class="title">教师查询</span>
          <el-form-item>
            <el-input v-model="searchKey"
                      placeholder="请输入教师名"
                      prefix-icon="el-icon-search"
                      class=""
                      @keyup.enter.native="keySend()"
                      clearable>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="keySend()">查找</el-button>
          </el-form-item>
        </el-form>
      </div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple-light">
        <div class="info">
          <div class="info-item">
            <i><img class="info-img" :src="teacherImg"></i>
            <div class="txt">
              <div class="info-title">
                已开通主页教师人数</div>
              <div class="info-num">{{ totalCount }}</div>
            </div>
          </div>
          <div class="info-item">
            <i><img class="info-img" :src="timeImg"></i>
            <div class="txt">
              <p class="info-title">
                近期更新的教师人数</p>
              <div class="info-num">{{recentTeacherCount}}</div>
            </div>
          </div>
        </div>
      </div></el-col>
    </el-row>

    <div class="letter-container">
      <div >
        <span style="font-weight: bold;font-size: 15px;
  margin:0 40px 0 40px;">姓名首字母</span>
        <a class="letterList" v-for="letter in Letters" @click="jumper(letter)">
          <span class="letter-item" >{{letter}}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import TeacherImg from '@/assets/img/teacher.png'
import TimeImg from '@/assets/img/time.png'
import bus from '@/utils/eventBus'
export default {
  name: "Search",
  data(){
    return{
      searchKey:'',
      teacherImg:TeacherImg,
      timeImg:TimeImg,
      totalCount: 0, //分页组件--数据总条数
      schoolDomain:'',
      unitDomain:'',
      listQuery: {
        pageNum: 1,//页码
        pageRow: 15,//每页条数
        unitId: '',
        schoolDomain:'',
        unitDomain:'',
        cId: '',
        key: '',  //排序，搜索的关键字
        letter: '',
        sort:'', //升降序标记
        state:1 ,//在岗状态
      },
      Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    }
  },
  props: ['recentTeacherCount'],
  created() {
    this.schoolDomain=this.$route.path.split('/')[2];
    this.unitDomain=this.$route.path.split('/')[3];
    this.getListAll();
  },
  methods:{
    getListAll() {
      if (this.$route.path.split('/')[3]!=null){
        console.log("执行了TeacherList的created中的getListAll方法")
        this.currentCat = 0
        if (this.$route.path.split('/')[3]!=null){
          this.listQuery.unitDomain = this.$route.path.split('/')[3];
        }else{
          console.log("currentDomainName="+this.currentDomainName);
          this.listQuery.unitDomain = this.currentDomainName
        }
        this.listQuery.schoolDomain = this.$route.path.split('/')[2];
        // this.listLoading = true;
        console.log("传入参数为:"+JSON.stringify(this.listQuery))
        this.api({
          url: "/home/listTeacherByUnitDomain",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询所有教师信息为:" + JSON.stringify(data))
          console.log("=================getListAll===============")
          console.log("data.list="+data.list)
          console.log("this.listQuery="+this.listQuery)
          // this.listLoading = false;
          this.teacherListAll = data.list;
          //console.log(this.teacherListAll);
          console.log("已开通教师主页人数="+data.totalCount)
          this.totalCount = data.totalCount;
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      }else {
        this.listQuery.schoolDomain = this.$route.path.split('/')[2];
        console.log('schoolDomain==' + JSON.stringify(this.listQuery));
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/school/listAllTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询教师信息为:")
          console.log("=================展示学校教师列表信息===============")
          this.listLoading = false;
          this.teacherListAll = data.list;
          console.log(data);
          console.log("已开通教师主页人数="+data.totalCount)
          this.totalCount = data.totalCount;
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      }
    },
    jumper(letter) {
      if (this.$route.path.split('/')[3]) {
        bus.$emit("changeSchoolUnitTeacherByLetter", letter);
      } else {
        bus.$emit("changeSchoolTeacherByLetter", letter);
      }

    },
    keySend: function () {
      console.log("send++++" + this.searchKey + this.listQuery.unitId)
      if (this.searchKey&&this.$route.path.indexOf('homepage')!==-1){
        bus.$emit("changePageList", this.searchKey);
      }
      if (this.searchKey&&this.$route.path.indexOf('teacher')!==-1){
        bus.$emit("changePageList2", this.searchKey,this.listQuery.unitId);
      }
      if (this.searchKey&&this.$route.path.split('/')[1]==='home'){
        bus.$emit("changePageList3", this.searchKey);
      }
    },
  }
}
</script>

<style scoped>
.search-container{
  background-color: #f5f4f4;
  height: 150px;
}
.letter-container{
  height: 50px;
  line-height: 50px;
  background: #EEE;
}

.letterList {
  font-size: 14px;
  letter-spacing: 15px;
}
.letter-item:hover{
  cursor: pointer;
  font-weight: bolder;
  color: red;
}
.title{
  font-weight: bold;
  margin-right: 20px;
  line-height: 100px;
}
.el-row{
  height: 100px;
  padding: 0;
  padding-left: 50px;
  margin-bottom: 0;
}
.el-col{
  height: 100px;
}
.el-form{
  height: 100px;
  padding: 0;
  margin: 0;
}
.el-form-item{
  height: 50px;
  transform: translateY(30px);
  padding: 0;
  margin: 0;
}
.txt{
  margin-left: 20px;

}
.info{
  display: flex;
}
.info-item{
  width: 200px;
  height: 100px;
  /*line-height: 100px;*/
  display: flex;
}
.info-title{
  font-size: 10px;
  color: grey;
  height: 20px;
  margin-top: 20px;

}
.info-num{
  font-size: 30px;
  font-family: "等线 Light";
  color: #1e6abc;
}
.info-img{
  width: 50px;
  height: 50px;
  margin-top: 27px;
}

</style>
