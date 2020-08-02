<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <template v-if="this.$route.path.indexOf('school')!=-1">
      <breadcrumb :unit="this.school" v-if="this.school.schoolName!=''"></breadcrumb>
    </template>
    <template v-else>
      <breadcrumb :unit="this.unit" v-if="this.unit.schoolName!=''"></breadcrumb>
    </template>





    <el-dropdown class="avatar-container" trigger="click" size="medium">
      <div class="avatar-wrapper" style="float: right">
        <img class="user-avatar" :src="logo">
        <i class="el-icon-caret-bottom"></i>
      </div>


<!--      <div  style="float: right;padding-right: 20px;">-->
<!--        <el-button type="primary"  size="small" @click="logout">退出登录</el-button>-->
<!--      </div>-->

      <div  style="float: right;padding-right: 20px;">
        <a href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf"><el-button type="primary" size="small" v-if="backTOHome==0">帮助文档</el-button></a>
        <el-button type="primary"  size="small" v-if="backTOHome==1" @click="enterHomepage">进入学院主页</el-button>
        <el-button type="primary"  size="small" v-if="backTOHome==2" @click="enterHomepage">进入学校主页</el-button>
      </div>
<!--      <span style="float: right;margin-right: 20px;text-underline: #7e8c8d">{{username}}</span>-->
      <el-dropdown-menu class="user-dropdown" slot="dropdown" style="margin-left:70px">
        <el-dropdown-item >
          <span  style=" display:block;">账号名称:{{username}}</span>
        </el-dropdown-item>
<!--        <el-dropdown-item >-->
<!--          <a href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf"><el-button type="primary" size="small" v-if="!backTOHome">帮助文档</el-button></a>-->
<!--            <span type="primary"  size="small" v-if="backTOHome" @click="enterHomepage">进入学院主页</span>-->
<!--        </el-dropdown-item>-->
        <el-dropdown-item >
          <a v-if="backTOHome==1" href="/user/password" style=" display:block;">账号管理</a>
          <a v-if="backTOHome==2" href="/school/user/password" style=" display:block;">账号管理</a>
        </el-dropdown-item>
        <el-dropdown-item divided>
          <span @click="logout" style=" display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import img_404 from '@/assets/404_images/404.png'
import logo from '@/assets/defaultLogo.png'
export default {
  created(){
    console.log("+++++++++++++++++进入到管理页面+++++++++++++++++")
    /*this.$store.dispatch('GetInfo').then(data=>{
      console.log("data="+JSON.stringify(data));
      this.username=data.userPermission.username;
    })*/


    if(this.$route.path.indexOf("scholat")!=-1){
      this.backTOHome = 0;
    }else if (this.$route.path.indexOf("school")!=-1){
      this.backTOHome = 2;
      this.getSchoolInfo();
      this.getSchoolUsername();
    }
    else {
      this.backTOHome = 1;
      this.getUnitInfo();
      this.getUsername();
    }
    console.log(this.backTOHome)
  },

  data(){
    return{
      img_404,
      logo,
      backTOHome:1,
      unit: {
        schoolName: '',
        unitName: '',
        schoolEng: '',
        unitEng: '',
        collegeUrl: '',
        logoUrl: '',
        state:'',
        domainName:'',
        schoolDomain:'',
        tagState:'',
        backgroundUrl:'',
        unitId:''
      },
      school:{
        schoolName: '',
        schoolEng: '',
        schoolUrl: '',
        logoUrl: '',
        state:'',
        schoolDomain:'',
        backgroundUrl:'',
        schoolId:''
      },
      username:''
    }
  },
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
  },
  methods: {
    getUnitInfo() {
        this.unit.unitId = this.$store.state.user.unitId;
        console.log("unitId为:........" + this.unit.unitId);
        this.api({
          url: "/unit/getUnitInfo",
          method: "get",
          params: {unitId: this.unit.unitId}
        }).then(data => {
          console.log("学院Id为:" + JSON.stringify(data))
          console.log("================================")
          this.listLoading = false;
          this.unit = data;
          this.$store.state.user.domainName=data.domainName
          this.$store.state.user.schoolDomain=data.schoolDomain
          console.log("unit="+this.unit);
          this.dataDone = true;
        }).catch(error => {
          console.log("QAQ........没有找到学院Id")
        })
    },
    getSchoolInfo() {
      this.school.schoolId = this.$store.state.schoolUser.schoolId;
      console.log("schoolId:........" + this.school.schoolId);
      this.api({
        url: "/school/getSchoolInfo",
        method: "get",
        params: {schoolId: this.school.schoolId}
      }).then(data => {
        console.log("学校Id为:" + JSON.stringify(data))
        console.log("================================")
        this.listLoading = false;
        this.school = data;
        this.$store.state.schoolUser.schoolDomain=data.schoolDomain
        console.log("school="+JSON.stringify(this.school));
        this.dataDone = true;
      }).catch(error => {
        console.log("QAQ........没有找到学校Id")
      })
    },
    getUsername(){
      this.api({
        url: '/login/getInfo',
        method: 'post'
      }).then(data=>{
        this.username=data.userPermission.username;
      }).catch(error=>{
        console.log("没有找到用户名")
      })
    },
    getSchoolUsername(){
      this.api({
        url: '/login/getSchoolInfo',
        method: 'post'
      }).then(data=>{
        this.username=data.userPermission.username;
      }).catch(error=>{
        console.log("没有找到用户名")
      })
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      console.log(this.$route.path)
      if(this.$route.path.indexOf("scholat")!=-1){
        this.$store.dispatch('scholatLogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }else if (this.$route.path.indexOf("school")!=-1){
        console.log("去执行schoolLogout方法")
        this.$store.dispatch('schoolLogout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }
      else{
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }

    },
    enterHomepage(){
      if (this.$route.path.indexOf("school")!=-1){
        let schoolDomain=this.school.schoolDomain;
        console.log("schoolDomain===="+schoolDomain);
        this.$router.push(
          { name:'home',
            params: {
              schoolDomain:schoolDomain,
              }})
      }
      else{
        let domainName=this.unit.domainName;
        let schoolDomain=this.unit.schoolDomain;
        let unitId = this.$store.state.user.unitId;
        console.log("schoolDomain===="+schoolDomain+"===="+domainName+"==="+unitId);
        this.$router.push(
          { name:'homepage',
            params: { domainName:domainName,
              schoolDomain:schoolDomain,
              unitId:unitId}})
        }
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  display: flex;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    float: right;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
