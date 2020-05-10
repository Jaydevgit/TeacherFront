<template>
  <div style="height: 100vh;">
    <nav>
      <div class="nav-inner">
        <div style="height: 60px;display: flex;align-items: center;">
          <img src="../../assets/img/logo-white.png" height="100%">
          <span style="font-size: 24px;
    font-family: initial;
    font-weight: bold;
    letter-spacing: 9px;
    margin-left: 21px;
    color: #fff;">SCHOLAT+</span>
          <span style="font-size: 22px;
    font-weight: bold;
    color: rgb(123, 186, 186);">学院师资信息管理平台</span>
        </div>
        <div class="nav-inner-login">
          <a href="/index" class="title" style="flex: 1;min-width: 40px">首页</a>
          <a href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf" class="title" style="min-width: 80px">帮助文档</a>
         <a href="/login" class="title" style="flex: 1;min-width: 40px">登录</a>
         <a href="/unitApply" class="title" style="flex: 1;min-width: 40px">注册</a>
          <a href="http://www.scholat.com/"  class="title" style="flex: 1;min-width: 60px">
            学者网
          </a>
        </div>
      </div>
    </nav>
    <article style="display: flex;
    align-items: center;
    justify-content: center;">
      <el-row style="height: calc(100vh - 160px);">
        <el-col :span="14" class="main-inner">
          <div class="main-inner-left">
            <div class="shuffling-img">
              <div id="zouma" style="height: 77%;width:100%;display: flex;align-items: center;">
                <el-carousel indicator-position="outside"
                              style="width: 100%;height:100%;">
                  <el-carousel-item v-for="item in 3" :key="item">
                    <div style="height: 100%;width: 100%;display: flex;justify-content: center">
                      <el-card>
                        <img :src="'http://47.106.132.95:2333/images/index/index-show-'+item+'.png'"
                             style="width: 100%;display: inline-block;"
                             lazy>
                      </el-card>
                    </div>
                  </el-carousel-item>
                </el-carousel>
              </div>

            </div>
          </div>
        </el-col>
        <el-col :span="10" class="main-inner">
          <div class="main-inner-right">
            <div class="intro">
              <div style="height: 100%">
                <span style="font-size: 28px;
    font-weight: bold;
    color: rgb(57, 119, 119);">
                  学院师资栏目管理系统
                </span>
                <!--<div style="display: inline-block;margin-top: 12px;">
                  &lt;!&ndash;                  <span class="font-1" style="display: block">版本: 1.0-beta-1</span>&ndash;&gt;
                  <span class="font-1" style="display: block">发布日期: 2020年01月12日</span>
                </div>-->
                <div class="font-1" style="margin: 7px 50px 42px 0;
                text-indent: 40px;
                line-height: 34px;
                height: 40%;
                text-overflow: ellipsis;
                overflow: auto;">
                  学院师资栏目系统是
                  <a href="http://www.scholat.com" style="color: orange">学者网</a>
                  推出的一个学院教师信息管理的通用平台，
                  该平台针对目前学院师资队伍模块面临着教师数据采集难、教师信息
                  更新不及时、教师人员管理不方便、教师信息展示不全面和直观、教
                  师推荐机制不佳，并且学院师资栏目定制不方便，自行搭建师资栏目
                  管理需要一定成本的七大问题提出了一站式解决方案。
                </div>
                <div>
                  <el-button style="background-color: #397777">
                    <a href="/unitApply" style="color: #fff">
                      立即申请使用
                    </a>
                  </el-button>
                  <div class="font-1" style="margin-top: 20px;">
                    示例:<a style="color: orange;margin-left: 15px;cursor: pointer" href="/homepage/scnu">华南师范大学·计算机学院</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </article>
    <footer style="display: flex;justify-content: center;align-items: center">
      <div style="height: 100%;
      width:100%;display: flex;
      justify-content: space-between;margin: 0 20px;">
        <div style="display: flex;align-items: center;width: 350px;flex-wrap: wrap;">
          <!--<div style="color: #eee;display: block">联系我们: 华南师范大学计算机学院232实验室</div>
          <div style="color: #eee;display: block">邮箱: help@scholat.com</div>-->
          <div style="color: #eee;display: block"><a href="http://www.scholat.com/">© 2020-2022 SCHOLAT + LAB</a></div>

        </div>
        <div style="display: flex;align-items:center;height: 100%;margin-left: 16px">
          <img src="http://47.106.132.95:2333/images/index/QR.png" style="height: 50px">
        </div>

      </div>
    </footer>
  </div>
</template>

<script>
    export default {
        name: "entry"
    }
</script>
<style lang="scss">
  #zouma{
    .el-carousel .el-carousel__container{
      height: calc(100% - 32px);
    }
  }
</style>
<style scoped lang="scss">

  header, section, footer, aside, nav, article, figure {
    display: block;
  }

  nav {
    background-color: #555555;
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  footer {
    background-color: #555555;
    height: 80px;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .main-inner-left {
    height: 100%;
    padding: 0 16px;
    display: flex;
    align-items: center;
  }

  .main-inner-right {
    height: 100%;
    display: flex;
    align-items: center;
  }

  .main-inner {
    height: 100%;
  }

  .nav-inner {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin: 0 20px;
  }

  .nav-inner-login {
    display: flex;
    align-content: center;
  }

  .shuffling-img {
    height: 77%;
    width: 100%;
    display: flex;
    align-items: end;
  }

  .intro {
    height: 77%;
    width: 100%;
    padding: 0px 8px 0 16px;
  }

  .font-1 {
    font-weight: bold;
    font-size: 18px;
    color: #666;
  }

  article {
    background: url("../../assets/img/bg2.png") no-repeat;
    background-size: 100% 100%;
  }
  .title{

    color: #fff;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    margin-right: 24px;margin-top: 10px;
    height: 30px;
    display: table-cell;
    vertical-align:middle
  }
  .title:hover{
   border-bottom:2px solid #fff;
  }
</style>
