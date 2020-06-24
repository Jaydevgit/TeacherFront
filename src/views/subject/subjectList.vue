<template>
  <div class="container" style="padding-top: 30px;">

    <el-button type="primary" style="margin-left: 20px;padding-bottom: 15px"
    @click="showAdd">添加学科</el-button>
    <div>
      <el-row  style="width: 320px;float: left">
        <el-col >

          <el-menu
            default-active="0"
            class="el-menu-vertical-demo">
            <el-menu-item  v-for="(item, flag) in subjectList" :key="item.catalogue_name" :index="flag +''"
                           @click="getTeacherBySubject(item.id)">
              <el-button type="danger" size="mini" @click="showDelete(item.id)" icon="el-icon-delete"></el-button>
              <el-button type="success" size="mini" @click="showEdit(item.id)" icon="el-icon-edit-outline"></el-button>
              <i class="el-icon-menu"></i>
              <span slot="title">{{item.name}}</span>
            </el-menu-item>

          </el-menu>
        </el-col>
      </el-row>
    </div>
    <div style="width: 850px; height: 420px;float: left;padding-left: 30px;">
      <ul>
        <li v-for="teacher in teacherList" :key="teacher.tId" class="teacherLi">
          <img :src="getImgUrl(teacher.tAvatar)" :onerror="defaultImage" style="border-radius: 50%;width: 120px;padding: 0px 5px 0px 5px">

          <div style="width: 130px;text-align: center;padding-top: 10px;">
            <div style="font-size: 18px;font-weight: bold;padding: 0px 0px 10px 0px;cursor: pointer;"
                 @click="routerTo(teacher.tId)">{{teacher.tName}}</div>
            <div class="smallText">{{teacher.tTitle}}</div>
          </div>
        </li>
      </ul>
    </div>



  </div>


</template>

<script>
  export default {
    data () {
      return {
        //变量
        defaultImage: 'this.src="../src/assets/img/defaultAvatar.png"',
        isActive: '',
        sourceUrl: 'http://47.106.132.95:2333/',
        listName: '最新更新',
        totalCount: 0, //分页组件--数据总条数
        totalUpdate:0,// 学者网更新总数
        listLoading: false,//数据加载等待动画
        listQuery: {
          unitId : '',
          subject: ''
        },
        currentName:'',
        listAdd:{

        },
        subjectList:[
        ],
        teacherList:[]


      }
    },
    created () {
      this.getSubject()
    },
    ready(){
    }
    ,
    computed: {

    },
    methods: {


      showAdd() {
        this.$prompt('','请输入学科名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          if (this.checkName(value)){
            this.api({
              url: "/unit/addSubject",
              method: "post",
              data:{"unitId" : this.$store.state.user.unitId,
                    "subject": value}
            }).then(data => {
              this.getSubject()
            }).catch(error => {
              console.log("QAQ........添加学科失败")
            })
          }
          else
            this.$message({
              type: 'warning',
              message: '该学科已经存在，请重新输入'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      showDelete(subject) {
        this.$confirm('','确定删除该学科？', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {

            this.api({
              url: "/unit/deleteSubject",
              method: "post",
              data:{"unitId" : this.$store.state.user.unitId,
                "subject": subject}
            }).then(data => {
              this.getSubject()
            }).catch(error => {
              console.log("QAQ........添加学科失败")
            })
          }

        ).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      showEdit(value){
        let oldName = value;
        this.$prompt('','请修改学科名称', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputValue: value
        }).then(({ value }) => {
          if (this.checkName(value)){
            this.api({
              url: "/unit/updateSubject",
              method: "post",
              data:{"unitId" : this.$store.state.user.unitId,
                "subject": oldName,
                "newName": value}
            }).then(data => {
              this.getSubject()
            }).catch(error => {
              console.log("QAQ........添加学科失败")
            })
          }
          else
            this.$message({
              type: 'warning',
              message: '该学科已经存在，请重新输入'
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },


      getImgUrl(imgName) {
        if (imgName == null) {
          return ""
        } else if (imgName.indexOf("resources") != "-1") {
          return "http://www.scholat.com/" + imgName;
        } else {
          return "http://39.108.169.193:2333/public/images/avatar/" + imgName;
        }
      },
      routerTo(tId){
        this.$router.push({
          name:'teacherPersonlHomePage',
          params:{
            id:tId
          }
        })
      },
      checkName(value){
        for (let a = 0;a < this.subjectList.length; a++){
          if (this.subjectList[a].name == value)
          {
            return false
          }
        }
        this.currentName = value
        return true
      },
      getSubject(){

        this.listQuery.unitId = this.$store.state.user.unitId
        this.api({
          url: "/unit/listSubject",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("subject+++++"+ JSON.stringify(data));
          this.subjectList = data.list;
          if (this.subjectList.length > 0)
          this.getTeacherBySubject(this.subjectList[0].name)

        }).catch(error => {
          console.log("QAQ........没有找到学科信息")
        })
      },

      getTeacherBySubject(name){

        this.listQuery.subject = name

        this.api({
          url:"/unit/getTeacherBySubject",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("SubjectTeachers+++++"+data);
          this.teacherList = data;
        }).catch(error => {
          console.log("QAQ........没有找到教师")
        })
      }





    },
    components: {
    }
  }
</script>




<style scoped>

  .newsLi{
    height: 76px;
    padding: 5px 5px 5px 0px;
  }
  li {list-style-type:none;}

  .teacherLi {
    float: left;
    padding: 20px 30px 15px 5px;

  }

  .bigText{
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText{
    color: #8590a6;
  }

  .container {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 1226px;
    height: 100%;
    margin: 0 auto;
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

  .nav-item2{
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

  .nav-item-active{
    color: white;
    background: #3399CC;
  }





</style>
