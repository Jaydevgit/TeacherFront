<template>
  <!--    师资只显示姓名模式-->
  <div class="teacherList-container3"
       style="float: left;position: relative;width: 100%;padding: 14px 5px;background: #fff;">
    <ul class="ul-page3">
      <li v-for="teacher in teacherListAll" :key="teacher.tId"
          @click="routerTo(teacher)"
          style="    cursor: pointer;
    float: left;
    margin: 8px 0;
    width: 154.8px;height:25px;display: flex;justify-content: center">

              <el-popover
                popper-class="popoverBackB"
                placement="bottom"
                width="350"
                trigger="hover">
                <el-row>
                  <el-col :span="3"><div class="grid-content bg-purple">
                    <img class="imgAvatar" :src="getImgUrl(teacher.tAvatar)" :onerror="imgErrorFun(this)"/>
                  </div></el-col>
                  <el-col :span="16"><div class="grid-content bg-purple-light">
                    <el-table-column width="150" label="职称"><span style="color:#fff;">职称：{{teacher.tPost}}</span></el-table-column>
                    <el-table-column width="150" label="职务"><span style="color:#fff;">职务：{{teacher.tDuty}}</span></el-table-column>
                    <el-table-column width="150" label="邮箱"><span style="color:#fff;">邮箱：{{teacher.tEmail}}</span></el-table-column>
                    <el-table-column width="150" label="部门"><span style="color:#fff;">部门：{{teacher.tDepartmentName}}</span></el-table-column>
                  </div></el-col>
                </el-row>
                <span style="font-size: 16px;letter-spacing: 3px;text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;" class="teacherLi3" slot="reference">
              {{teacher.tName}}
                </span>
                <!--<el-button slot="reference">hover 激活</el-button>-->
              </el-popover>

      </li>
    </ul>
  </div>
</template>

<script>
    import bus from "../../../utils/eventBus";

    export default {
      name: "TeacherList",
      data(){
        return{
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
          teacherListAll:[],
          totalCount: 0, //分页组件--数据总条数
          visible: false,
        }

      },
      watch:{
        $route(){
          this.schoolDomain=this.$route.path.split('/')[2];
          this.unitDomain=this.$route.path.split('/')[3];
          this.getListAll();
        }
      },
      props: ['unitId','currentDomainName'],
      created() {
        this.schoolDomain=this.$route.path.split('/')[2];
        this.unitDomain=this.$route.path.split('/')[3];
        this.getListAll();
      },
      mounted() {
        let _self = this;
        bus.$on("changePageList3", function (searchKey) {
          _self._changeSearchTeacher(searchKey)
        })
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
              this.totalCount = data.totalCount;
            }).catch(error => {
              console.log("QAQ........没有找到教师列表")
            })
          }

        },
        routerTo(teacher) {
          console.log("teacher.tDomain_name="+teacher.tDomain_name)
          console.log("this.schoolDomain="+this.schoolDomain)
          this.$router.push({
            name: 'teacherPersonlHomePage',
            params:{
              schoolDomain:this.schoolDomain,
              teacherDomainName:teacher.tDomain_name
            }
          })
        },
        _changeSearchTeacher(searchKey) {
          this.searchFlag=true
          this.listQuery.schoolDomain =  this.$route.path.split('/')[2];
          this.listQuery.key = searchKey
          this.api({
            url: "/teacher/searchTeacherBySchoolDomain",
            method: "get",
            params: this.listQuery
          }).then(data => {
            console.log("查询教师信息为---:" + JSON.stringify(data.list))
            this.teacherListAll = data.list
            this.totalCount = data.totalCount;
          }).catch(error => {
            console.log("QAQ........获取教师失败")
          })
        },
        getImgUrl(imgName) {
          if (imgName == null) {
            return this.defaultAvatar;
          } else if(imgName=="default.png"){
            return this.defaultAvatar
          } else if (imgName.indexOf("resources") != "-1") {
            return "http://www.scholat.com/" + imgName;
          } else {
            return "http://faculty.scholat.com:2333/public/images/avatar/" + imgName;
          }
        },
        imgErrorFun(e) {
          /*let img = e;
          img.onerror = null;
          console.log("执行了imgErrorFun函数，onerror=" + img.onerror + "，img.src=" + img.src);
          return 'this.src="http://faculty.scholat.com:2333/public/images/avatar/default.png"';*/
          return 'this.src="defaultAvatar"';
        },
      }
    }
</script>

<style rel="stylesheet/scss" >
  @import '../../../styles/catalogueVariables.scss';

  el-menu-item {
    background-color: white;
  }

  el-menu-item:hover {
    background-color: white;
  }
  .popoverBackB{
    /* #303133是el-tooltip的背景色 */
    background: #303133 !important;
    min-width: 300px;
    width: auto;
  }
  .popoverBackB .popper__arrow::after {
    /* 注意：placement位置不同，下面的属性不同 */
    border-bottom-color: #303133 !important;
  }
  .newsLi {
    height: 76px;
    padding: 5px 5px 5px 0px;
  }

  .is-active {
    background-color: #0099cc !important;
    color: white;
  }

  .is-active > span {
    color: white;
  }

  .teacherLi3:hover {
    padding-bottom: 2px;
    border-bottom: 2px solid #0099CC;
  }

  .bigText {
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText {
    color: #8590a6;
  }

  .teacherList-container3 {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;

    height: calc(100% - 36px);
    /*_height: 520px;
    min-height: 520px;*/
    margin: 0 auto;
    width: 100%;
    background: #fff;
  }
  .imgAvatar{
    display: inline-block;vertical-align: top;width: 75px;height: 75px;
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


  .subcatalogueName {
    padding-left: 15px;
    color: #8590a6;
  }

  .parentCatalogue {
    font-size: 16px;
  }

  .list-img {
    display: block;
    margin: auto;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    border: 3px solid #efefef;
    background-color: #f5f5f5;
  }

  .right-info{
    width: 120px;text-align: center;padding-top: 40px
  }

  .ul-page {
    width: inherit;
  }
  @media screen and (min-width: 1025px){
    .teacherLi {
      float: left;
      padding: 5px 5px 0px 5px;
      height: 60px;
      min-width: calc(100% - 36px);
      border-bottom: thin solid #EAEAEA;
      display: flex;
      flex-direction: row;
    }
    .teacherLi2 {
      float: left;
      padding: 10px 5px 5px 5px;
      height: 150px; /*224*/
      width: 238px;
      display: flex;
      margin: 0 10px 10px 10px;
      flex-direction: row;
    }

    .teacherLi2:hover {
      float: left;
      padding: 10px 5px 5px 5px;
      height: 150px; /*224*/
      display: flex;
      margin: 0 10px 10px 10px;
      box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
      transition: box-shadow 0.5s;
      background-color: #F7F7F7;
    }
    .el-row{
      height: 60px;padding-top: 15px;min-width: 758px
    }
  }
</style>
