<template>
  <div class="home-body" >
    <div class="left">
      <left-nav @toList="toList"></left-nav>
    </div>
    <div class="middle-container">
      <div class="imgDiv">
        <!--getSchoolBackground(this.schoolBackground)-->
        <img class="imgLogo" :src="SchoolBg" :onerror="SchoolBg" style=" "/>

      </div>

      <div class="search">
        <search :recentTeacherCount="recentTeacherCount"></search>
      </div>
      <div>
        <div class="contentTitle" style="border: 0;margin-top: 20px">
          <span class="chTitle chTitle1">教师列表</span>
          <span class="engTitle">Teacher List</span>
          <span class="line"></span>
        </div>
        <!--<div class="middle">-->
          <teacher-list class="teacher-list-container" :unitId="unitId" :currentDomainName="currentDomainName" v-show="isDisplay" v-if="isRouterAlive">
          </teacher-list>
        <!--</div>-->
      </div>



      <!--最近更新教师主页-->
      <div class="recentTeacher">
        <div class="contentTitle" style="border: 0;">
          <span class="chTitle chTitle1">最近更新教师主页</span>
          <span class="engTitle">Teacher recently updated</span>
          <span class="line"></span>
        </div>
        <div class="eachScholar">
          <ul >
            <div style="margin: 10px 0 20px 50px;height: 60px" v-for="item in recentUpdateTeacherList">
              <div :title="item.username" @click="routerTo(item)" style="float: left; width: 62px; height: 62px;">
                <img class="recimg" :src="getImgUrl(item.avatar)" :onerror="imgErrorFun(this)">
              </div>
              <div class="recnametitle">
                <div :title="item.username" @click="routerTo(item)" class="recchn">{{item.username}}</div>
                <div class="titleandunit"> {{item.post}} </div>
                <div class="titleandunit"> {{item.department_name}}</div>
              </div>
              <div style="clear: left;"></div>
            </div>
          </ul>
        </div>
      </div>
      <!--推荐教师模块-->
      <div class="recomScholar">
        <div class="contentTitle" style="border: 0;">
          <span class="chTitle chTitle1">推荐教师</span>
          <span class="engTitle">Recommended teachers</span>
          <span class="line"></span>
        </div>
        <div class="eachScholar">
          <ul >
            <div style="margin: 10px 0 20px 50px;height: 60px" v-for="item in recommendList">
              <div :title="item.username" @click="routerTo(item)" style="float: left; width: 62px; height: 62px;">
                  <img class="recimg" :src="getImgUrl(item.avatar)" :onerror="imgErrorFun(this)">
              </div>
              <div class="recnametitle">
                <div :title="item.username" @click="routerTo(item)" class="recchn"> {{item.username}} </div>
                <div class="titleandunit"> {{item.post}} </div>
                <div class="titleandunit"> {{item.unit_name}}</div>
              </div>
              <div style="clear: left;"></div>
            </div>
          </ul>
        </div>
      </div>
      <!--学院列表模块-->
      <!--<div class="recomScholar">
        <div class="contentTitle" style="border: 0;">
          <span class="chTitle chTitle1">学院列表</span>
          <span class="engTitle">List of colleges</span>
          <span class="line"></span>
        </div>
        <div class="eachScholar">
          <el-card class="box-card" style="">
            <div v-for="o in unitList" class="item">
              <a :href="'/homepage/'+listQuery.schoolDomain+'/'+o.domain_name" class="text">
&lt;!&ndash;                {{o.unit_name}}&ndash;&gt;
                <img class="bgImg" :src="getBgImgUrl(o.background_url)" :onerror="imgErrorFun(this)">
              </a>
            </div>
          </el-card>
        </div>
      </div>-->
    </div>

    <FooterNav :unitList="unitList" :schoolDomain="listQuery.schoolDomain"></FooterNav>

    <footer style="">
      <div class="Info">
        <div  style="">
          <div style="margin-bottom: 5px">
            <a href="/schoolLogin" >管理员登录</a> |
            <a href="http://www.scholat.com/">学者网</a>
          </div>
          <div style="margin-bottom: 5px">
            免责声明 | 关于学者网 | 联系我们
          </div>
          <div style="margin-bottom: 5px">
            © 2020 SCHOLAT+LAB
          </div>
        </div>
        <div style="margin-left: 5px;margin-top: 25px">
          <img src="http://faculty.scholat.com:2333/public/images/index/QR.png" style="height: 50px">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
    import TopHeader from "../../components/Nav/TopHeader";
    import LeftNav from "./components/LeftNav";
    import TeacherList from "./components/TeacherList";
    import defaultAvatar from '@/assets/default1.png';
    import FooterNav from "./components/FooterNav";
    import Search from "./components/Search";
    import SchoolBg from '@/assets/img/schoolBg2.jpg';

    export default {
      name: "Home",
      provide:function(){
        return{
          reload:this.reload
        }
      },
      components:{
        'top-header':TopHeader,
        'LeftNav':LeftNav,
        'TeacherList':TeacherList,
        'FooterNav':FooterNav,
        'Search':Search,
      },
      data(){
        return{
          defaultAvatar:defaultAvatar,
          unitId:'',
          currentDomainName:'',
          recentTeacherCount:'',
          listQuery:{
            schoolId:'',
            unitId: '',
            schoolDomain:'',
            unitDomain:'',
          },
          recommendList:[],
          unitList:[],
          recentUpdateTeacherList:[],
          isDisplay:false,
          isRouterAlive:true,
          backgroundHome:'',
          backgroundHomeDefault:'backgroundHomeDefault.jpg',
          SchoolBg:SchoolBg,
          schoolBackground:'',
        }
      },
      watch:{
        $route(){

        }
      },
      created() {
        this.listQuery.schoolDomain=this.$route.path.split('/')[2];
        this.listQuery.unitDomain=this.$route.path.split('/')[3];
        this.init();

      },
      methods:{
        init(){
          this.getRecommendTeacher();
          this.getSchoolInfo();
          this.getRecentUpdateTeacher();
        },
        reload:function(){
          this.isRouterAlive=false;
          this.$nextTick(function () {
            this.isRouterAlive=true;
          })
        },
        getRecommendTeacher(){
          this.api({
            url: "/home/getRecommendTeacher",
            method: "get",
            params: this.listQuery
          }).then(data => {
            console.log("查询推荐教师信息为:" + JSON.stringify(data))
            console.log("================================")
            this.listLoading = false;
            this.recommendList = data;
          }).catch(error => {
            console.log("QAQ........没有找到推荐教师信息")
          })
        },
        getSchoolInfo(){
          this.api({
            url: "/home/"+this.listQuery.schoolDomain,
            method: "get",
          }).then(data => {
            console.log("查询学校信息为:" + JSON.stringify(data))
            console.log("================================")
            this.listLoading = false;
            this.unitList = data;
            /*console.log("schoolBackground="+data[0].backgroundUrl)
            this.schoolBackground=data[0].backgroundUrl;*/
            console.log("data[0].id="+data[0].id);
            this.isDisplay=true;
            this.unitId = data[0].id;
            this.currentDomainName=data[0].domain_name;
            this.reload();
          }).catch(error => {
            console.log("QAQ........没有找到学校信息")
          })
          this.listQuery.schoolDomain=this.$route.path.split('/')[2];
          this.api({
            url: "/school/getSchoolInfo2",
            method: "get",
            params:this.listQuery
          }).then(data => {
            console.log("查询学校背景图片信息为:" + JSON.stringify(data))
            console.log("================================")
            this.listLoading = false;
            console.log("schoolBackground="+data.backgroundUrl)
            this.schoolBackground=data.backgroundUrl;
            this.reload()
          }).catch(error => {
            console.log("QAQ........没有找到学校信息")
          })
        },
        getRecentUpdateTeacher(){
          this.api({
            url: "/home/getRecentUpdateTeacher",
            method: "get",
            params: this.listQuery
          }).then(data => {
            console.log("查询最近更新教师信息为:" + JSON.stringify(data))
            console.log("================================totalCount="+data.totalCount)
            this.recentTeacherCount=data.totalCount;
            this.listLoading = false;
            this.recentUpdateTeacherList = data.list;
          }).catch(error => {
            console.log("QAQ........没有找到学校信息")
          })
        },
        toList(uId) {
          this.unitId = uId;
          this.isDisplay=true;
        },
        getImgUrl(imgName) {
          if (imgName == null) {
            return this.defaultAvatar;
            console.log("if (imgName == null)")
          } else if(imgName=="default.png"){
            return this.defaultAvatar
            console.log("else if(imgName==\"default.png\")")
          } else if (imgName.indexOf("resources") != "-1") {
            return "http://www.scholat.com/" + imgName;
          } else {
            return "http://faculty.scholat.com:2333/public/images/avatar/" + imgName;
          }
        },
        getSchoolBackground(imgName){
          console.log("imgName="+imgName)
          if (this.schoolBackground){
            return "http://faculty.scholat.com:2333/public/images/schoolBackground/" + imgName;
          }else {
            return this.SchoolBg;
          }
        },
        getBgImgUrl(imgName){
          return "http://faculty.scholat.com:2333/public/images/background/" + imgName;
        },
        imgErrorFun(e) {
          let img = e;
          console.log("imgErrorFun(e) ")
          return 'this.src="defaultAvatar"';
        },
        routerTo(teacher) {
          console.log("teacher.tDomain_name="+teacher.domain_name)
          console.log("this.schoolDomain="+this.listQuery.schoolDomain)
          this.$router.push({
            name: 'teacherPersonlHomePage',
            params:{
              schoolDomain:this.listQuery.schoolDomain,
              teacherDomainName:teacher.domain_name
            }
          })

        },

      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../assets/css/base.css';
  .letterRed{
    color: red;
  }
  @media screen and (min-width: 1025px){
    .middle-container {
      max-width: 960px;
      margin: 0 auto;
      height: 100%;
      width: 100%;
      /*display: flex;*/
      min-height: calc(100vh - 120px);

    }
    .home-body {
      background-color: #f5f4f4;
      background: no-repeat;
      background-size:cover;
      width: 100%;
      min-width: 1000px;
      height: 100%;
      min-height: calc(100vh - 60px);
    }
    .left {
      /*margin: 0 auto;*/
      /*transform: translateY(32px);*/
    }

    .middle {
      margin: 32px 0 16px 0;
      width: 100%;
      height: auto;
      /*min-height: 400px;*/
      /*
      box-shadow: 0px 2px 10px 0px rgba(0, 81, 193, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      border-right: none !important;*/
    }

    .middle-nav {
      width: 100%;
      height: 36px;
      padding: 12px;
      background: aliceblue;
      display: flex;
      justify-content: space-between;
      border-radius: 8px 8px 0 0;
    }

    .letterList {
      font-size: 14px;
      letter-spacing: 5px;
      margin: 0 auto;
    }
    .letterRed{
      color: red;
    }
    .teacher-list-container{
      min-height: 200px;
    }
    .dynamic-page {
      height: auto;
      border-radius: 0 0 8px 8px;
    }

    .homePage-body {
      background-color: #1f2d3d;
      background: no-repeat;
      background-size:cover;
      /*background: url("../../assets/img/bg.png");*/
      width: 100%;
      min-width: 1000px;
      height: 100%;
      min-height: calc(100vh - 60px);
    }

    footer{
      .Info{
        background-color: #3a3d3c;
        padding: 20px 0;
        color: white;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        letter-spacing: 1.4px;
        display: flex;
        justify-content: center;
      }
      img{
        height:35px !important;
      }
    }
    /*底部栏样式结束*/
  }

  .top-header{
    height: 60px;
    z-index: 2;
  }
  .search{
    margin-top: 350px;
  }
  .imgLogo{
    /*opacity: 0.2;*/
    position:absolute;z-index:-2;width:100%;height:400px;
    left: 0;
    top: 0;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 400px;
    margin: 0 auto;
    width: 100%;
    /*background: #f5f4f4;*/
    background: #002d54;
    color: white;

  }
  div {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    vertical-align: baseline;
    background: transparent;
  }
  .recentTeacher{
    width: 960px;
    min-height: 200px;
    overflow: hidden;
    margin: 0 auto;
    background: white;
  }
  .recomScholar {
    width: 960px;
    min-height: 300px;
    overflow: hidden;
    margin: 0 auto;
    background: white;
  }

  .contentTitle {
    height: 24px;
    line-height: 24px;
    width: 100%;
    border-bottom: 2px solid #399;
    display: flex;
  }
  .eachScholar {
    width: 960px;
    height: auto;
    float: left;
    margin-top: 10px;
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ul {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-auto-rows: minmax(100px,auto);
  }
  .recchn {
    height: 20px;
    line-height: 20px;
    display: block;
    font-size: 16px;
    width: 240px;
    padding-right: 5px;
    word-break: keep-all;
    float: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    letter-spacing: 8px;
    cursor: pointer;
  }
  .titleandunit {
    height: 22px;
    line-height: 20px;
    display: block;
    font-size: 12px;
    width: 220px;
    word-break: keep-all;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  a {
    text-decoration: none;
  }
  .recchn a {
    color: #000;
    text-decoration: none;
  }
  img {
    vertical-align: middle;
    border: none;
  }
  .recimg {
    cursor: pointer;
    border-radius: 50%;
    height: 60px;
    border: 1px solid #909090;
    width: 60px;
    margin: 0 15px 0 0;
  }
  .bgImg{
    cursor: pointer;
    height: 72px;
    width: 420px;
    margin: 0 15px 0 0;
  }
  .recnametitle {
    float: left;
    margin-left: 10px;
    margin-top: 2px;
    width: 150px;
    height: 62px;
  }
  .chTitle {
    color: #333;
    font-weight: bold;
    font-size: 16px;

  }
  .chTitle1 {
    border-left: 2px solid #399;
    padding-left: 7px;
  }
  .engTitle {
    color: #999;
    font-size: 16px;
    margin-left: 5px;
    font-family: "Microsoft YaHei";
  }
  .line{
    display: inline-block;
    flex: 1;
    height: 12px;
    border-bottom: 1px solid #ccc ;
  }
  .more, .ccf_more, .ccfmore, .noticemore {
    float: right;
    color: #399;
    padding-right: 3px;
    font-size: 13px;
  }

  .text {
    font-size: 14px;
    cursor: pointer;
  }

  .item {
    padding: 18px 50px;

  }

  .box-card1{
   width: 960px;
    padding: 0;
  }
  .el-card{
    padding: 0 0;
  }
  .box-card {
    width: 960px;
  }

</style>
