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
            <span style="font-size: 16px;color: #0099CC;letter-spacing: 3px;text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;" class="teacherLi3">
              {{teacher.tName}}
            </span>
      </li>
    </ul>
  </div>
</template>

<script>
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
            key: '',
            letter: ''
          },
          teacherListAll:[],
          totalCount: 0, //分页组件--数据总条数
        }

      },
      watch:{
        $route(){
          this.schoolDomain=this.$route.path.split('/')[2];
          this.unitDomain=this.$route.path.split('/')[3];
          this.getListAll();
        }
      },
      props: ['unitId'],
      created() {
        this.schoolDomain=this.$route.path.split('/')[2];
        this.unitDomain=this.$route.path.split('/')[3];
        this.getListAll();
      },
      methods:{
        getListAll() {
          this.currentCat = 0
          this.listQuery.unitDomain = this.$route.path.split('/')[3];
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
      }
    }
</script>

<style rel="stylesheet/scss" scoped>
  @import '../../../styles/catalogueVariables.scss';

  el-menu-item {
    background-color: white;
  }

  el-menu-item:hover {
    background-color: white;
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
