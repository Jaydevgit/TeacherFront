<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <breadcrumb></breadcrumb>
    <el-dropdown class="avatar-container" trigger="click">


      <div class="avatar-wrapper" style="float: right">
        <img class="user-avatar" :src="logo">
        <i class="el-icon-caret-bottom"></i>
      </div>

      <div  style="float: right;padding-right: 20px;">
        <el-button type="primary"  size="small" v-if="backTOHome" @click="enterHomepage">进入学院主页</el-button>
      </div>

      <el-dropdown-menu class="user-dropdown" slot="dropdown">
        <el-dropdown-item divided>
          <span @click="logout" style="display:block;">退出登录</span>
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
      backTOHome:true
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
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
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
