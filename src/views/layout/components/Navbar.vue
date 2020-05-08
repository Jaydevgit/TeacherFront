<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb :unit="this.unit" v-if="this.unit.schoolName!=''"></breadcrumb>



    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper" style="float: right">
        <img class="user-avatar" :src="logo">
        <i class="el-icon-caret-bottom"></i>
      </div>

      <div  style="float: right;padding-right: 20px;">
        <el-button type="primary"  size="small" v-if="backTOHome" @click="enterHomepage">进入学院主页</el-button>
      </div>
      <div  style="float: right;padding-right: 20px;">
        <el-button type="primary"  size="small" v-if="backTOHome" @click="logout">退出登录</el-button>
      </div>
      <span style="float: right;margin-right: 20px;text-underline: #7e8c8d">{{username}}</span>

      <div  style="float: right;padding-right: 20px;">

      </div>
      <!--<div  style="float: right;padding-right: 20px;">
        <el-button type="primary"  size="small" v-if="!backTOHome" @click="logoutAdmin">退出管理员账号</el-button>
      </div>-->

      <el-dropdown-menu class="user-dropdown" slot="dropdown">
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
    this.$store.dispatch('GetInfo').then(data=>{
      console.log("data="+JSON.stringify(data));
      this.username=data.userPermission.username;
    })
    this.getUnitInfo();
    if(this.$route.path.indexOf("scholat")!=-1){
      this.backTOHome = false
    }else {
      this.backTOHome = true
    }

    console.log(this.backTOHome)
  },
  data(){
    return{
      img_404,
      logo,
      backTOHome:true,
      unit: {
        schoolName: '',
        unitName: '',
        schoolEng: '',
        unitEng: '',
        collegeUrl: '',
        logoUrl: '',
        state:'',
        domainName:'',
        tagState:'',
        backgroundUrl:'',
        unitId:''
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
          console.log("unit="+this.unit);
          this.dataDone = true;
        }).catch(error => {
          console.log("QAQ........没有找到学院Id")
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
      }else{
        this.$store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      }

    },
    enterHomepage(){
      let domainName=this.$store.state.user.domainName;
      let unitId = this.$store.state.user.unitId;
      this.$router.push(
        { name:'homepage',
          params: { domainName:domainName,
            unitId:unitId}})
    },


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
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
