<template>
  <header class="top-container">

    <!--两种模式：模式 1 学校Logo+文字-->
    <div class="background" v-if="!unit.state && dataDone">
      <div @click="goToCollege" style="display: inline-block;height: 90%;width: auto;min-width: 75px">
        <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo"
             style="height: 100%;width: auto;bottom: 0;"/>
      </div>
      <div @click="goToCollege"
           style="height: 100%;max-width: 900px;display: flex;justify-content: center;align-items: center;
           cursor: pointer">
       <div class="background1-name" style="color: steelblue">
         <span class="university" style="white-space: nowrap;font-weight: bold;">{{unit.schoolName}}</span>
         <span class="unitName" style="color:steelblue;font-weight: bold;white-space:nowrap;">{{unit.unitName}}</span>
       </div>
      </div>

      <div class="font-jsgrzy" style="display: inline-block;" v-if="$route.path.indexOf('homepage')!==-1">
        师资队伍
      </div>
      <div class="font-jsgrzy" style="display: inline-block;" v-if="$route.path.indexOf('teacher')!==-1">
        教师个人主页
      </div>


      <div class="search bar6">
        <div class="formDiv" style="">
          <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                 style="color: gray;background-color: white;">
          <!--<button @click="keySend"></button>-->
          <img src="@/assets/img/search.png" @click="keySend" style="cursor: pointer;">
        </div>
      </div>
      <a class="college-link" :href="unit.collegeUrl" v-if="dataDone && this.$route.path.indexOf('teacher')===-1">
        <el-button type="text" style=" font-size: 13px;
        font-weight: bold;position: relative;transform: translateX(-40px);color: #3399CC;" @click="">学院首页</el-button>
      </a>

    </div>

    <!--两种模式：模式 2 自定义背景模式-->

    <div v-else class="background2">
      <!--<div @click="goToCollege" style="display: inline-block;height: 90%;width: auto;">
        <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo" style="height:100%;width:auto;bottom: 0;"/>
      </div>-->

      <div class="apply-nav" v-if="$route.path.indexOf('unitApply')!==-1">
        <div style="color: #595959;font-size: 26px;white-space: nowrap;">
          SCHOLAT+ 学院师资信息管理平台
        </div>
        <!--color: steelblue;font-size: 26px;white-space: nowrap;font-weight: bold;-->
        <div style=" display: flex;align-content: center;margin-left: 120px">
        <a href="/index" class="title" style="color: #595959;flex: 1;min-width: 40px;font-size: 18px">首页</a>
        <!--<a href="http://www.yuque.com/vd7ii9/dvybyk/na3nsf" class="title" style="min-width: 80px">帮助文档</a>-->
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="flex: 1;min-width: 80px;color: #595959;font-size: 18px">
              登录<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="display: table"><a href="/schoolLogin" class="title" style="flex: 1;min-width: 40px;color: #595959;font-size: 18px">学校登录</a></el-dropdown-item>
              <el-dropdown-item ><a href="/login" class="title" style="flex: 1;min-width: 40px;color: #595959;font-size: 18px">学院登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="flex: 1;min-width: 80px;color: #595959;font-size: 18px">
              注册<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="display: table"><a href="/unitApplySchool" class="title" style="flex: 1;min-width: 40px;color: #595959;font-size: 18px">学校注册</a></el-dropdown-item>
              <el-dropdown-item ><a href="/unitApply" class="title" style="flex: 1;min-width: 40px;color: #595959;font-size: 18px">学院注册</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        <a href="http://www.scholat.com/"  class="title" style="flex: 1;min-width: 60px;color: #595959;font-size: 18px">
          学者网
        </a>
        </div>
      </div>

      <div v-if="titleFlag"></div>
      <div v-else-if="$route.path.indexOf('login')!==-1||$route.path.indexOf('schoolLogin')!==-1">
        <span style="padding-left: 0;color: #595959;font-size: 26px;white-space: nowrap;margin-left: 15px">
          SCHOLAT+ 学院师资信息管理平台
          </span>
      </div>
      <!--若判断为学校首页-->
      <div v-else-if="$route.path.split('/')[1]=='home'" style="display: flex;align-items: center;height: 100%;width: 960px;margin: 0 auto">
        <div style="display: flex;height: 90%;width: auto;">
          <img :src="'http://www.scholat.com/images/uni_logo/'+this.unitList[0].school_name+'.png'" :onerror="defaultLogo"
               style="height: 100%;width: auto;bottom: 0;"/>
        </div>
        <div style="height: 100%;max-width: 900px;display: flex;justify-content: center;align-items: center;margin-left: 20px" >
          <div class="font-jsgrzy" style="display: inline-block;" v-if="this.unitList[0]">
            <span style="">{{this.unitList[0].school_name}}</span>
          </div>
          <div class="font-jsgrzy" style="display: inline-block;">
            &nbsp教师个人主页
          </div>
        </div>
        <!--<div class="search bar6">
          <div class="formDiv" style="">
            <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                   style="color: gray;background-color: white;">
            <img src="@/assets/img/search.png" @click="keySend" style="cursor: pointer;">
          </div>
        </div>-->

      </div>

      <!--若判断为教师信息页，则显示学校logo，学校名称，教师主页，搜索-->
      <div v-else-if="$route.path.indexOf('teacher')!==-1" style="display: flex;align-items: center;height: 100%;width: 100%">
        <div @click="goToCollege" style="height: 90%;width: auto;bottom: 0;cursor: pointer">
          <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo" style="height: 100%;width:auto;"/>
        </div>
        <span style="" class="font-jsgrzy">
            <span v-if="$route.path.indexOf('login')!==-1">SCHOLAT+学院师资信息管理平台</span>
            <span v-else>
              <span style="font-family: 华文新魏;font-size: 38px">{{unit.schoolName}}|</span>
              <span style="font-family: 华文行楷 ;font-size: 34px;margin-left: -10px">教师个人主页</span>
            </span>
        </span>
        <div class="search bar6" v-if="dataDone">
          <div class="formDiv" style="min-width:200px;float: right;">
            <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                   style="color: gray;background-color: white;">
            <!--<button @click="keySend"></button>-->
            <img src="@/assets/img/search.png" @click="keySend" style="cursor: pointer;">
          </div>
        </div>
      </div>
      <div v-else style="display: flex;align-items: center;height: 100%;" @click="goToCollege">
        <!--如果有背景图，则显示学院背景图片+文字-->
        <template v-if="unit.backgroundUrl">
          <div class="backgroundImage"  @click="goToCollege" style="">
            <img :src="'http://faculty.scholat.com:2333/public/images/background/' + unit.backgroundUrl"
                 style="height:90%;vertical-align: center"
                 :onerror="defaultBack" title="点击访问该学院"/>
          </div>
          <!--<span style="font-size: 26px;margin-left: 20px;
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      color: steelblue;
      white-space: nowrap;" class="font-jsgrzy-none">
            师资队伍
          </span>-->
        </template>
        <!--如果没有背景图，则显示学校LOGO+xx学院+文字，登录页面按照逻辑会跳到这里，所以要判断-->
        <template v-else>
          <div @click="goToCollege" style="height: 90%;width: auto;bottom: 0;cursor: pointer">
            <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo" title="点击访问该学院" style="height: 55px;width:auto;margin-top: 7px"/>
          </div>
          <!--<span style="" class="font-jsgrzy">
            <span v-if="$route.path.indexOf('login')!=-1">SCHOLAT+学院师资信息管理平台</span>
            <span v-else>
              <span style="font-family: 华文新魏;font-size: 38px">{{unit.unitName}}|</span>
              <span style="font-family: 华文行楷 ;font-size: 34px;margin-left: -10px">教师个人主页</span>
            </span>
          </span>-->
          <div @click="goToCollege"
               style="height: 100%;display: flex;justify-content: center;align-items: center;
           cursor: pointer">
            <div style="color: steelblue;margin-left: 40px;
      display: flex;
      flex-direction: column;">
              <span class="university" style="white-space: nowrap;font-weight: bold;">{{unit.schoolName}}</span>
              <span class="unitName" style="color:steelblue;font-weight: bold;white-space:nowrap;">{{unit.unitName}}</span>
            </div>
          </div>
        </template>
      </div>
      <table>
        <td>
        <span style="" class="teacherTeam" v-if="dataDone && this.$route.path.indexOf('teacher')===-1">
            师资队伍
        </span>
        </td>
      </table>
      <div class="search bar6" v-if="dataDone && this.$route.path.indexOf('teacher')===-1">
        <div class="formDiv" style="margin-right: 7%">
          <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                 style="color: gray;background-color: white;">
          <!--<button @click="keySend"></button>-->
          <img src="@/assets/img/search.png" @click="keySend" style="cursor: pointer;">
        </div>
      </div>

        <div style=" display: flex;
    align-content: center;margin-left: 120px"
             v-if="$route.path.indexOf('login')!==-1||$route.path.indexOf('schoolLogin')!==-1">
          <a href="/index" class="title" style="flex: 1;min-width: 40px;color: #595959;font-size: 18px;margin-left: 148px">首页</a>
          <!--<a href="http://www.yuque.com/vd7ii9/dvybyk/na3nsf" class="title" style="min-width: 80px">帮助文档</a>-->
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="flex: 1;min-width: 80px;color: #595959;font-size: 18px">
              登录<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="display: table"><a href="/schoolLogin" class="title" style="color: #595959;font-size: 18px;flex: 1;min-width: 40px">学校登录</a></el-dropdown-item>
              <el-dropdown-item><a href="/login" class="title" style="color: #595959;font-size: 18px;flex: 1;min-width: 40px">学院登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="color: #595959;font-size: 18px;flex: 1;min-width: 80px">
              注册<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="display: table"><a href="/unitApplySchool" class="title" style="color: #595959;font-size: 18px;flex: 1;min-width: 40px">学校注册</a></el-dropdown-item>
              <el-dropdown-item><a href="/unitApply" class="title" style="color: #595959;font-size: 18px;flex: 1;min-width: 40px">学院注册</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a href="http://www.scholat.com/"  class="title" style="color: #595959;font-size: 18px;flex: 1;min-width: 60px">
            学者网
          </a>
<!--          <span><svg-icon icon-class="S"/></span>-->
<!--          <a href="http://www.scholat.com/" style="color: #399;margin-left: 4px ;-->
<!--          text-overflow: ellipsis;white-space: nowrap;">-->
<!--            学者网-->
<!--          </a>-->
        </div>
    </div>

  </header>
</template>

<script>
    import Img from '@/assets/img/home.png'
    import bus from '@/utils/eventBus'
    import searchImage from '@/assets/img/search.png'

    export default {
        data() {
            return {
                defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
                img: Img,
                searchImage:searchImage,
                searchKey: '',
                unitQuery: {unitId: '',domainName:'',schoolDomain:''},
                defaultBack: 'this.src="http://faculty.scholat.com:2333/public/images/background/1569738575202258.png"',
                unit: {
                    schoolName: '',
                    unitName: '',
                    collegeUrl: '',
                    logoUrl: '',
                    state: '',
                    backgroundUrl: ''
                },
                listLoading: '',
                dataDone: false,
                schoolDomain:'',
                unitList:[],

            }
        },
        props:{
          titleFlag:'',
        },
        watch:{
          $route(){
            this.getUnitInfo();
          }
        },
        created() {
            this.getUnitInfo();
            this.initDisplay();
        },
      mounted() {

      },
      ready() {
        },
        methods: {
            initDisplay(){
              var mql = window.matchMedia("(max-width: 767px)");//mql = media query list
              var collegeLink=document.getElementsByClassName('college-link');
              if (mql.matches) {
                collegeLink.style.display = "none";
              }
            },
            routerToAdmin() {
                console.log("=========================================")
                this.$router.push({
                    name: 'managerTeacher'
                })
            },
            getUnitInfo() {
                //如果是教師的頁面
                if (window.location.href.indexOf('teacher') != -1) {
                    /*var teacherId = this.GetUrlRelativePath_id();*/
                    var tDomain_name= this.GetUrlRelativePath_id();
                    console.log("head教师domain_name为:........" + tDomain_name);
                    this.api({
                        url: "/unit/getUnitBytDomain_name",
                        method: "get",
                        params: {tDomain_name: tDomain_name}
                    }).then(data => {
                        console.log("学院Id为:" + JSON.stringify(data))
                        console.log("================================")
                        this.listLoading = false;
                        this.unit = data;
                      this.$store.state.user.tagState=data.tagState
                      this.$store.state.user.unitId=data.id
                        console.log("unit="+this.unit);
                        this.dataDone = true;
                    }).catch(error => {
                        console.log("QAQ........没有找到学院Id")
                    })
                }
                else if (this.$route.path.split('/')[1]=='home'){
                  this.schoolDomain=this.$route.path.split('/')[2];
                  console.log("schoolDomain="+this.schoolDomain)
                  this.api({
                    url: "/home/"+this.schoolDomain,
                    method: "get",
                  }).then(data => {
                    console.log("查询学校信息为:" + JSON.stringify(data))
                    console.log("================================")
                    this.listLoading = false;
                    this.unitList = data;
                    this.dataDone = false;
                  }).catch(error => {
                    console.log("QAQ........没有找到学校信息")
                  })
                }else if (this.$route.path.split('/')[1]==='login'||this.$route.path.split('/')[1]==='schoolLogin'){
                  //是登录页面
                }
                //是主頁
                else {
                  this.unitQuery.schoolDomain=this.$route.path.split('/')[2];
                  this.unitQuery.domainName=this.$route.path.split('/')[3];
                  console.log(this.$route.path+" this.unitQuery.schoolDomain this.unitQuery.schoolDomain this.unitQuery.schoolDomain="+ this.unitQuery.schoolDomain+this.unitQuery.domainName)
                  // console.log("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"+this.$route.params.domainName+"this.$route.params.unitId"+this.$route.params.unitId);

                 //   this.unitQuery.unitId = this.$route.params.unitId
                    this.api({
                        url: "/homepage/getUnitInfo2",
                        method: "get",
                        params: this.unitQuery
                    }).then(data => {
                        console.log("查询学院信息为:" + JSON.stringify(data))
                        console.log("================================")
                        this.listLoading = false;
                        this.unit = data;
                   //   console.log("cccc"+JSON.stringify(data));
                      this.unitQuery.unitId=data.unitId
                      this.$store.state.user.unitId=data.unitId
                      this.$store.state.user.tagState=data.tagState
                     console.log("dddddd"+this.$route.params.unitId+"vvv"+this.$store.state.user.unitId);
                      console.log("学校图标是："+"http://www.scholat.com/images/uni_logo/"+data.schoolName+".png");
                      this.unitQuery.unitId=data.unitId
                        this.dataDone = true;
                    }).catch(error => {
                        console.log("QAQ........没有找到学院信息")
                    })
                }
            },
            GetUrlRelativePath_id() {
                /*var url = document.location.toString();
                var arrUrl = url.split("//");

                var start = arrUrl[1].indexOf("teacher/scnu/");
                var relUrl_id = arrUrl[1].substring(start + 8);//stop省略，截取从start开始到结尾的所有字符

                if (relUrl_id.indexOf("?") != -1) {
                    relUrl_id = relUrl_id.split("?")[0];
                }
                return relUrl_id;*/
              /*获取最后一个斜杠后的参数*/
              var url = window.location.href;
              var index = url.lastIndexOf("\/");
              var str = url.substring(index + 1,url.length);
              console.log("str"+str);
              return str
            },
            goToCollege() {
                if (this.unit.collegeUrl) {
                    window.location.href = (this.unit.collegeUrl);
                } else {
                    console.log("this.unit.collegeUrl" + this.unit.collegeUrl)
                }
            },
            searchTeacher() {
                if (this.$store.state != null) {
                    this.api({
                        url: "/teacher/searchTeacher",
                        method: "get",
                        params: {
                            unitId: this.unitQuery.unitId,
                            key: this.searchKey
                        }
                    }).then(data => {
                        console.log(JSON.stringify(data.list));
                    }).catch(error => {
                        console.log("QAQ........获取教师失败")
                    })
                }
            },
            keySend: function () {
                console.log("send++++" + this.searchKey + this.unitQuery.unitId)
              if (this.searchKey&&this.$route.path.indexOf('homepage')!==-1){
                bus.$emit("changePageList", this.searchKey);
              }
              if (this.searchKey&&this.$route.path.indexOf('teacher')!==-1){
                bus.$emit("changePageList2", this.searchKey,this.unitQuery.unitId);
              }
              if (this.searchKey&&this.$route.path.split('/')[1]==='home'){
                bus.$emit("changePageList3", this.searchKey,this.unitQuery.unitId);
              }
                // this.$nextTick(function () {
                //     bus.$emit("key", this.searchKey);
                // })
            },
          /*keySend2: function () {
            console.log("send2222++++" + this.searchKey+this.unitQuery.unitId,this.unitQuery.unitId)
            if (this.searchKey){
              bus.$emit("changePageList2", this.searchKey,this.unitQuery.unitId);
            }

            // this.$nextTick(function () {
            //     bus.$emit("key", this.searchKey);
            // })
          },*/
        },
        computed: {
            /*getPic() {
                if (this.unit.logoUrl) {
                    if (this.unit.logoUrl.indexOf('scholat') == -1) {
                        /!*return 'http://faculty.scholat.com:2333/public/images/unit_logo/' + this.unit.logoUrl*!/
                      console.log("******学校图片为"+this.unit.logoUrl+"******");
                      return '"http://www.scholat.com/images/uni_logo/"+data.schoolName+".png"';
                    } else {
                        return this.unit.logoUrl;
                    }
                } else {
                    return this.defaultLogo;
                }
            }*/
        },
        components: {}
    }
</script>

<style scoped>

  input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: white;
  }
  .header-home{
    display: flex;
    align-items: center;
    height:60px;
    width: 960px;
    margin: 0 auto;
  }

  @media screen and (min-width: 1025px){
    .top-container {
      width: 100%;
      height: 80px;
      min-width: 980px;
      background-color: #f9f9f9;
      /*background: url('../../assets/img/home.png') no-repeat;*/
      /*background-size: cover;*/
    }
    .background {
      background-color: #f9f9f9;
      padding: 0px 0px 5px 0px;
      width: 100%;
      height: 100%;
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
    }
    .background2 {
      background-color: #f9f9f9;
      width: 100%;
      height: 100%;
      /*background-color: white;*/
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
    }
    div.search {
      width: 65%;
    }
    .font-jsgrzy {
      font-family: '等线 Light';
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      font-size: 26px;
      color: steelblue;
      white-space: nowrap;
    }
    .backgroundImage{
      cursor: pointer;height: 100%;display: flex;align-items: center
    }
    .bar6 input {
      border: 2px solid white;
      border-radius: 46px;
      background: transparent;
      top: 0;
      right: 0;
      box-shadow:2px 2px 10px #909090;
    }

    .bar6 button {
      background: white;
      border-radius: 0 46px 46px 0;
      width: 50px;
      top: 0;
      right: 0;
      background-image: url("../../assets/search.png");
      background-size:50% 70%;
      background-repeat:no-repeat;
      background-position:center center;
    }

    .bar6 img{
      width: 32px;
      height: 32px;
      position: absolute;
      top: 2px;
      right: 10px;
    }
    .bar6 button:before {
      /*content: "搜索";*/
      font-size: 13px;
      font-weight: bold;
      color: #3399CC;

    }
    .formDiv {
      position: relative;
      width: 250px;
      margin: 0 auto;
      max-width:150px;
      transform: translateX(20px)
    }
    .teacherTeam{
      margin-left: 20px;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      color: steelblue;
      white-space: nowrap;
    }
  }
  @media screen and (min-width: 768px) and (max-width: 1024px){
    .top-container {
      width: 100%;
      height: 80px;
      background-color: #f9f9f9;
      /*background: url('../../assets/img/home.png') no-repeat;*/
      /*background-size: cover;*/
    }
    .background {
      padding: 0px 0px 5px 0px;
      width: 90%;
      height: 100%;
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
    }
    .background2 {
      width: 100%;
      height: 100%;
      /*background-color: white;*/
      background-color: #f9f9f9;
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      align-items: center;
    }
    div.search {
      width: 65%;
    }
    .font-jsgrzy {
      font-family: '等线 Light';
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      font-size: 26px;
      color: steelblue;
      white-space: nowrap;
    }
    .backgroundImage{
      cursor: pointer;height: 100%;display: flex;align-items: center
    }
    .college-link{
      /*display: none;*/
    }
    .bar6 input {
      border: 2px solid white;
      border-radius: 46px;
      background: transparent;
      top: 0;
      right: 0;
      box-shadow:2px 2px 10px #909090;
      min-width: 130px;
    }

    .bar6 button {
      background: white;
      border-radius: 0 46px 46px 0;
      width: 50px;
      top: 0;
      right: 0;
      background-image: url("../../assets/search.png");
      background-size:50% 70%;
      background-repeat:no-repeat;
      background-position:center center;
    }

    .bar6 img{
      width: 32px;
      height: 32px;
      position: absolute;
      top: 2px;
      right: 10px;
    }

    .bar6 button:before {
      /*content: "搜索";*/
      font-size: 13px;
      font-weight: bold;
      color: #3399CC;
    }
    .formDiv {
      position: relative;
      width: 180px;
      margin: 0 auto;
      max-width:180px;transform: translateX(10px)
    }
    .teacherTeam{
      margin-left: 20px;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      color: steelblue;
      white-space: nowrap;
    }
  }
  @media screen and (max-width: 767px){
    .top-container {
      width: 100%;
      box-sizing:border-box;
      max-width: 700px;
      height: 80px;
      background-color: #f9f9f9;
    }
    .background {
      padding: 0px 0px 5px 0px;
      width: 90%;
      height: 100%;
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    .background2 {
      width: 100%;
      height: 100%;
      /*background-color: white;*/
      background-color: #f9f9f9;
      max-width: 1000px;
      text-align: center;
      margin: auto;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
    }
    div.search {
      /*display: none;*/
      width: 50%
    }
    .background1-name{
      margin-left: 60px;
      display: flex;
      flex-direction: column;
    }
    .backgroundImage{
      cursor: pointer;height: 100%;display: flex;align-items: center;
      width:100%;
      justify-content: flex-end;
    }
    .backgroundImage img{
      width: 100%;
    }
    .college-link{
      margin-left: 32px;
    }

    .font-jsgrzy {
      margin-left: 10px;
      font-family: '等线 Light';
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 60px;
      font-size: 18px;
      color: steelblue;
      white-space: nowrap;
    }
    .font-jsgrzy-none{
      display: none;
    }
    .formDiv {
      position: relative;
      /*float: right;*/
      width: 50%;
      max-width:150px;
      margin-bottom: 5px;
      transform: translateX(20px)
    }
    .bar6 input {
      border: 2px solid white;
      border-radius: 46px;
      background: transparent;
      top: 0;
      right: 0;
      box-shadow:2px 2px 10px #909090;
      min-width: 130px;
    }

    .bar6 button {
      background: white;
      border-radius: 0 46px 46px 0;
      width: 50px;
      top: 0;
      right: 0;
      background-image: url("../../assets/search.png");
      background-size:50% 70%;
      background-repeat:no-repeat;
      background-position:center center;
    }

    .bar6 img{
      width: 32px;
      height: 32px;
      position: absolute;
      top: 2px;
      right: -30px;
    }

    .bar6 button:before {
      /*content: "搜索";*/
      font-size: 13px;
      font-weight: bold;
      color: #3399CC;
    }

    .teacherTeam{
      min-width: 80px;
      margin-left: 15px;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      color: steelblue;
      white-space: nowrap;
    }
    .collegeHomePage{
      min-width: 80px;
      margin-left: 15px;
      font-size: 13px;
      font-weight: bold;
      letter-spacing: 3.5px;
      line-height: 60px;
      color: steelblue;
      white-space: nowrap;
    }
  }







  .university {
    letter-spacing: 3.5px;
    font-size: 21px;
    color: steelblue;
    padding-bottom: 3px;
    border-bottom: 2px solid steelblue;

  }

  .unitName {
    padding-top: 3px;
    font-size: 20px;
    letter-spacing: 3.5px;
    color: white;

  }

  input, button {
    border: none;
    outline: none;
  }

  input {
    width: 95%;
    height: 37px;
    padding-left: 13px;
  }

  button {
    height: 37px;
    width: 42px;
    cursor: pointer;
    position: absolute;
  }




  li {
    display: inline
  }

  .linkScholat a:hover {
    text-decoration:underline;
  }
  .apply-nav{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 4px;
    padding-left: 14px;
  }
  .title{

    color: steelblue;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    margin-right: 24px;margin-top: 10px;
    height: 30px;
    display: table-cell;
    vertical-align:middle
  }
  .title:hover{
    border-bottom:2px solid #ffffff;
  }
</style>
