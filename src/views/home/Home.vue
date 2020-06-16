<template>
  <div class="home-body">
    <div class="middle-container">
      <div class="left">
        <left-nav @toList="toList"></left-nav>
      </div>
      <div class="middle">
        <div class="middle-nav">

          <div style="margin-top: -4px;" >
            <!--            <el-button @click="defaultSort" type="info" round style="padding: inherit;margin-right: -5px;width: 70px">-->
            <!--              默认排序-->
            <!--            </el-button>-->
            <!--            <el-button @click="showSort" type="info" round style="padding: inherit;margin-right: 5px;width: 70px">-->
            <!--              姓名排序-->
            <!--            </el-button>-->
            <!--<i @click="simpleList" class="el-icon-menu"
               style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>
            <i @click="detailList" class="el-icon-tickets"
               style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>-->

          </div>
        </div>
        <teacher-list :unitId="unitId">

        </teacher-list>
      </div>

    </div>

    <footer style="">
      <div class="Info" style="margin-top: 10px">
        <div  style="">
          <div style="margin-bottom: 5px">
            <a href="/login" >管理员登录</a> |
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
          <img src="http://47.106.132.95:2333/images/index/QR.png" style="height: 50px">
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
    import TopHeader from "../../components/Nav/TopHeader";
    import LeftNav from "./components/LeftNav";
    import TeacherList from "./components/TeacherList";

    export default {
      name: "Home",
      components:{
        'top-header':TopHeader,
        'LeftNav':LeftNav,
        'TeacherList':TeacherList
      },
      data(){
        return{
          unitId:'',

        }
      },
      watch:{
        $route(){

        }
      },
      methods:{
        toList(uId) {
          this.unitId = uId;
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
      max-width: 1000px;
      margin: 0 auto;
      height: 100%;
      width: 100%;
      display: flex;
      min-height: calc(100vh - 120px);
    }

    .left {
      width: 25%
    }

    .middle {
      margin: 32px 8px 16px 12px;
      width: 100%;
      min-height: 900px;
    }

    .right {
      position: absolute;
      width: 200px;
      float: right;
      right: 0;
      top: 0;
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
    }
    .letterRed{
      color: red;
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
</style>
