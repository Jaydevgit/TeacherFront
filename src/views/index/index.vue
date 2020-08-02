<template>
  <div style="height: 100vh;">
    <nav>
      <div class="nav-inner">
        <div class="nav_1" style="height: 60px;display: flex;align-items: center; margin: 0 20px;">
          <img src="../../assets/defaultLogo.png" height="100%">
          <span class="nav_1_1" style="color: #595959;font-size: 22px;margin-left: 28px">SCHOLAT+ 学院师资信息管理平台</span>
        </div>
        <div class="nav_2">
          <div class="nav_2_1">SCHOLAT+</div>
          <span class="nav_2_2" style=""> 学院师资信息管理平台</span>
        </div>
        <div class="nav-inner-login">
          <!--<a href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf" class="title" style="min-width: 80px">帮助文档</a>-->
<!--         <a href="/login" class="title" style="flex: 1;min-width: 40px">登录</a>-->
<!--         <a href="/unitApply" class="title" style="flex: 1;min-width: 40px">注册</a>-->
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="flex: 1;min-width: 80px">
              登录<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="/schoolLogin" class="title" style="flex: 1;min-width: 40px">学校登录</a></el-dropdown-item>
              <el-dropdown-item><a href="/login" class="title" style="flex: 1;min-width: 40px">学院登录</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown style="padding-top: 8px">
            <span class="title el-dropdown-link" style="flex: 1;min-width: 80px">
              注册<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item><a href="/unitApplySchool" class="title" style="flex: 1;min-width: 40px">学校注册</a></el-dropdown-item>
              <el-dropdown-item><a href="/unitApply" class="title" style="flex: 1;min-width: 40px">学院注册</a></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a href="http://www.scholat.com/"  class="title" style="flex: 1;min-width: 60px;">
            学者网
          </a>
        </div>
        <div class="nav-inner-login2">
          <el-dropdown>
            <img src="../../assets/index/crumb.png" style="height: 30px">
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <a href="/login" class="title2" >登录</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="/unitApply" class="title2" >注册</a>
              </el-dropdown-item>
              <el-dropdown-item>
                <a href="http://www.scholat.com/"  class="title2" >
                  学者网
                </a>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!--<a href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf" class="title" style="min-width: 80px">帮助文档</a>-->
        </div>
      </div>
    </nav>
    <article style="text-align: center">
      <div class="page1">
        <div class="title_1">SCHOLAT+师资，现代化的学院师资管理展示平台</div>
        <div class="title_2">
          <div>提供高度自定义化的栏目列表，一键采集教师信息更新。</div>
          <div>助力学院师资管理展示现代化。</div>
        </div>
        <a href="/unitApply"><div class="button_1" ><div class="b_name">立即申请使用</div></div></a>
      </div>
      <div class="page2">
        <div class="page2_left1"></div>
        <div class="page2_left2">
          <div class="page2_left2_1">师资队伍是高校发展的第一资源。学院官网“师资队伍”栏目是展现学院实力重要窗口，对学院发展和招生就业等都有极其重要的作用。
            采集教师科研信息也是学院一项经常性、重复性和繁琐性工作。
          </div>
          <div style="padding-top:30px;">
            但是，传统“师资队伍”网页是静态信息，编辑困难，时效性差；传统的科研信息采集方法也通常给老师和管理人员带来诸多困扰，
            而且难以保障准确性和及时性。
          </div>
        </div>
      </div>
      <div class="page2_sub">
        <div >师资队伍是高校发展的第一资源。学院官网“师资队伍”栏目是展现学院实力重要窗口，对学院发展和招生就业等都有极其重要的作用。
          采集教师科研信息也是学院一项经常性、重复性和繁琐性工作。
        </div>
        <div style="margin-top: 10px">
          但是，传统“师资队伍”网页是静态信息，编辑困难，时效性差；传统的科研信息采集方法也通常给老师和管理人员带来诸多困扰，
          而且难以保障准确性和及时性。
        </div>
      </div>
      <div class="page3">
        <div class="page3_left1" >
          SCHOLAT+师资平台主要提供学院官网“师资队伍”主页定制，学院教师科研信息采集工具。
          平台具有
          <el-tooltip class="item" effect="dark" content="平台发布的教师信息由学院管理部门管理，通过学院官网师资队伍栏目链接定制主页，属于学院官网组成部分" placement="top">
            <span style="color: #1890FF;">权威性</span>
          </el-tooltip> 、
          <el-tooltip class="item" effect="dark" content="平台管理员能实时“感知”教师学者网个人空间信息的更新，从而较准确地编辑教师的研究方向、学术简介及个人照片" placement="top">
            <span style="color: #1890FF;">时效性</span>
          </el-tooltip>、
          <el-tooltip class="item" effect="dark" content="平台管理的教师信息是非涉密学术性信息，而且是学院私有信息平台，与学者网教师空间只有数据交互，具有隔离性。" placement="top">
            <span style="color: #1890FF;">安全性</span>
          </el-tooltip> 、
          <el-tooltip class="item" effect="dark" content="教师只需要登录自己的学者空间做好日程学术管理。学院管理员登录平台管理和采集学术信息，无需“打扰”教师。" placement="top">
            <span style="color: #1890FF;">易用性</span>
          </el-tooltip>和
          <el-tooltip class="item" effect="dark" content="进而可以建立学校的教师主页系统和教师数据中心，基于学者网社交功能建立教师学术交流平台等。" placement="top">
             <span style="color: #1890FF;">可扩展性</span>
          </el-tooltip>等主要优点。
        </div>
      </div>
      <div class="page3_sub">
        SCHOLAT+师资平台主要提供学院官网“师资队伍”主页定制，学院教师科研信息采集工具。
        平台具有<span style="color: #1890FF;">权威性</span>、<span style="color: #1890FF;">时效性</span>、
        <span style="color: #1890FF;">安全性</span>、<span style="color: #1890FF;">易用性</span>和<span style="color: #1890FF;">可扩展性</span>等主要优点。
      </div>
      <div class="page4">
        <div class="page4_title">
         <span style=" border-bottom:1px solid #464646">他们都在使用</span>
        </div>
        <div class="page4_school">
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/scnu/cs">
            <div ><img :src="'http://www.scholat.com/images/uni_logo/华南师范大学.png'" alt=""></div>
            <div class="school_name" >华南师范大学</div>
            <div class="unit">计算机学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gziec/scie">
            <div><img :src="'http://www.scholat.com/images/uni_logo/广州涉外经济职业技术学院.png'" alt=""></div>
            <div class="school_name">广州涉外经济职业技术学院</div>
            <div class="unit">华文与国际教育学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gpnu/dxxy">
            <div><img :src="'http://www.scholat.com/images/uni_logo/广东技术师范大学.png'" alt=""></div>
            <div class="school_name">广东技术师范大学</div>
            <div class="unit">电子与信息学院 </div>
            </a>
          </div>
        </div>
        <div class="page4_school">
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/scnu/sic">
            <div><img :src="'http://www.scholat.com/images/uni_logo/华南师范大学.png'" alt=""></div>
            <div class="school_name">华南师范大学</div>
            <div class="unit">国际文化学院 </div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gdit/jsj">
            <div><img :src="'http://www.scholat.com/images/uni_logo/广东科学技术职业学院.png'" alt=""></div>
            <div class="school_name">广东科学技术职业学院</div>
            <div class="unit">计算机工程技术学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gdpu/xg">
            <div><img :src="'http://www.scholat.com/images/uni_logo/广东药科大学.png'" alt=""></div>
            <div class="school_name">广东药科大学</div>
            <div class="unit">医药信息工程学院</div>
            </a>
          </div>
        </div>
        <div class="page4_school">
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/zhku/xky">
              <div><img :src="'http://www.scholat.com/images/uni_logo/仲恺农业工程学院.png'" alt=""></div>
              <div class="school_name">仲恺农业工程学院</div>
              <div class="unit">信息科学与技术学院 </div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/fosu/eie">
              <div><img :src="'http://www.scholat.com/images/uni_logo/佛山科学技术学院.png'" alt=""></div>
              <div class="school_name">佛山科学技术学院</div>
              <div class="unit">电子信息工程学院</div>
            </a>
          </div>
          <div class="school">
<!--            <a href="http://faculty.scholat.com/homepage/gdpu/xg">-->
<!--              <div><img :src="'http://www.scholat.com/images/uni_logo/广东药科大学.png'" alt=""></div>-->
<!--              <div class="school_name">广东药科大学</div>-->
<!--              <div class="unit">医药信息工程学院</div>-->
<!--            </a>-->
          </div>
        </div>
        <div class="page4_school_sub">
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/scnu/cs">
              <div ><img :src="'http://www.scholat.com/images/uni_logo/华南师范大学.png'" alt="" ></div>
              <div class="school_name" >华南师范大学</div>
              <div class="unit">计算机学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gziec/scie">
              <div><img :src="'http://www.scholat.com/images/uni_logo/广州涉外经济职业技术学院.png'" alt=""></div>
              <div class="school_name">广州涉外经济职业技术学院</div>
              <div class="unit">华文与国际教育学院</div>
            </a>
          </div>
        </div>
        <div class="page4_school_sub" >
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gpnu/dxxy">
              <div ><img :src="'http://www.scholat.com/images/uni_logo/广东技术师范大学.png'" alt=""></div>
              <div class="school_name" >广东技术师范大学</div>
              <div class="unit">电子与信息学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gdit/jsj">
              <div><img :src="'http://www.scholat.com/images/uni_logo/广东科学技术职业学院.png'" alt=""></div>
              <div class="school_name">广东科学技术职业学院</div>
              <div class="unit">计算机工程技术学院</div>
            </a>
          </div>
        </div>
        <div class="page4_school_sub" >
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/scnu/sic">
              <div ><img :src="'http://www.scholat.com/images/uni_logo/华南师范大学.png'" alt=""></div>
              <div class="school_name" >华南师范大学</div>
              <div class="unit">国际文化学院</div>
            </a>
          </div>
          <div class="school">
            <a href="http://faculty.scholat.com/homepage/gdpu/xg">
              <div><img :src="'http://www.scholat.com/images/uni_logo/广东药科大学.png'" alt="" ></div>
              <div class="school_name">广东药科大学</div>
              <div class="unit">医药信息工程学院</div>
            </a>
          </div>
        </div>
        <a style="display: none"><div class="more_school">查看更多合作学院></div></a>
      </div>

    </article>
    <footer style="padding-top: 20px">
      <div class="Info" style="margin-top: 10px">
        <div  style=" display:table-cell;transform: translateY(-30px)">
          <div >
            免责声明 | 关于学者网 | 联系我们
          </div>
          <div>© 2020起 SCHOLAT+LAB</div>
        </div>
        <div style=" display:table-cell;">
          <img src="http://39.108.169.193:2333/public/images/index/QR.png" style="height: 50px">
        </div>
        </div>

<!--      <div style="height: 100%;-->
<!--      width:100%;display: flex;-->
<!--      justify-content: space-between;margin: 0 20px;">-->
<!--        <div style="display: flex;align-items: center;width: 550px;flex-wrap: wrap;">-->
<!--          &lt;!&ndash;<div style="color: #eee;display: block">联系我们: 华南师范大学计算机学院232实验室</div>-->
<!--          <div style="color: #eee;display: block">邮箱: help@scholat.com</div>&ndash;&gt;-->
<!--          <div style="color: #eee;display: block">-->
<!--            <a href="http://www.scholat.com/" target="_blank">© 2020 SCHOLAT + LAB</a>&nbsp;&nbsp;-->
<!--            <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备16019897号</a>-->
<!--          </div>-->

<!--        </div>-->
<!--        <div style="display: flex;align-items:center;height: 100%;margin-left: 16px">-->
<!--          <img src="http://39.108.169.193:2333/public/images/index/QR.png" style="height: 50px">-->
<!--        </div>-->

<!--      </div>-->
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
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  footer {

    float: left;
    margin-top: 40px;
    margin-bottom: 20px;
    text-align: center;
    height: 80px;
    width: 100%;
    bottom: 0;
    .Info{
      display:inline;
      color: #464646;
      font-family: "PingFangSC-Regular";
      font-size: 22px;
      font-weight: 400;
      line-height: 28px;
      text-align: center;
      letter-spacing: 2.2px;
    }
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
    .nav_2{
      display: none;
      color: #595959;font-size: 22px;
    }
  }

  .nav-inner-login {
    display: flex;
    align-content: center;
  }
  .nav-inner-login2{
    display: none;
  }

  .shuffling-img {
    height: 77%;
    width: 100%;
    display: flex;
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
    background-size: 100% 100%;
  }
  .page1{
    margin: 0 auto;
    width: 1024px;
    height: 720px;
    /*background-image: url("../../assets/index/index_bg1.png");*/
    /*background-repeat:no-repeat;*/
    /*background-position:center;*/
    background:
      url("../../assets/index/DeskTop/tM1.svg") left 60px top 75px no-repeat,
      url("../../assets/index/DeskTop/tM2.svg") left 750px top 20px no-repeat,
      url("../../assets/index/DeskTop/tM3.svg") left 820px top 150px no-repeat,
      url("../../assets/index/DeskTop/aM1.svg") left 10px bottom no-repeat,
      url("../../assets/index/DeskTop/aM2.svg") left 101px bottom no-repeat,
      url("../../assets/index/DeskTop/aM3.svg") left 246px bottom no-repeat,
      url("../../assets/index/DeskTop/aM4.svg") left 374px bottom no-repeat,
      url("../../assets/index/DeskTop/aM5.svg") left 460px bottom no-repeat,
      url("../../assets/index/DeskTop/aM6.svg") left 545px bottom no-repeat,
      url("../../assets/index/DeskTop/aM7.svg") left 667px bottom no-repeat,
      url("../../assets/index/DeskTop/aM8.svg") left 760px bottom no-repeat,
      url("../../assets/index/DeskTop/aM9.svg") left 883px bottom no-repeat;
  }
  .title_1{
    color: #000000;
    font-size: 36px;
   padding-top: 100px;
    line-height: 46px;
    letter-spacing:1.8px;
  }
  .title_2{
    margin-top: 30px;
    font-size:24px;
    line-height: 30px;
    letter-spacing:2.4px;
  }
  .button_1{
    cursor: pointer;
    margin:30px auto;
      width: 126px;
      height: 32px;
      border-radius: 2px;
      background: #1890ff;
    .b_name{
      color: #ffffff;
      font-family: "PingFangSC-Regular";
      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
      padding: 5px 16px;
    }
  }
  .page2{
    margin: 100px auto;
    height: 360px;
    width: 1024px;
    .page2_left1{
     float: left;
      height: 360px;
      width: 40%;
      background-image: url("../../assets/index/index_bg2.png");
      background-repeat:no-repeat;
    }
    .page2_left2{
      padding-right: 20px;
      text-align: left;
      color: #464646;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 2.4px;
      float: left;
      height: 360px;
      width:60%;
      .page2_left2_1{
        padding-top:50px;
      }
    }
  }
  .page3{
    margin: 60px auto;
    width: 1024px;
    background-image: url("../../assets/index/index_bg3.png");
    background-repeat:no-repeat;
    height:400px;
      text-align: left;
      color: #464646;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 2.4px;
    /*  float: left;*/
    .page3_left1{
      width: 620px;
     }

  }
  .page4{
    width: 100%;
    float: left;
    margin-top: 40px;
    .page4_title{
      color: #464646;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
      text-align: center;
      letter-spacing: 2.4px;
    }
    .page4_school{
      margin-top: 40px;
      display: flex;
      color: #6d7278;
      font-family: "PingFangSC-Medium";
      font-size: 20px;
      font-weight: 400;
      line-height: 30px;
      text-align: center;
      letter-spacing: 2.4px;
      .school{
        flex: 1;
        img{
          width: 100px;
          cursor: pointer;
        }
        .unit{
          cursor: pointer;
        }
        .school_name{
          cursor: pointer;
        }
      }
    }
    .more_school{
      margin-top: 40px;
      color: #3f7ab1;
      font-family: "PingFangSC-Medium";
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
      text-align: center;
      letter-spacing: 2.4px;
    }
  }
  .title{
    color: #595959;
    font-size: 18px;
    letter-spacing: 2px;
    cursor: pointer;
    margin-right: 24px;margin-top: 10px;
    height: 30px;
    display: table-cell;
    vertical-align:middle
  }
  .title2{
    color: #595959;
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
  .page3_sub{
    display: none;
  }
  .page2_sub{
    display: none;
  }
  .page4_school_sub{
    display: none;
  }

  @media screen and (min-width: 1400px) {
    .page3_sub {
      display: none;
    }
    .page2_sub{
      display: none;
    }
    .nav-inner{
      margin: 0 180px;

    }
    .page1{
      text-align: center;
      width: 1349px;
      height: 790px;
      /*background-image: url("../../assets/index/index_bg_max1.png");*/
      /*background-repeat:no-repeat;*/
      /*background-position:center;*/
      background:
        url("../../assets/index/t1.svg") left 115px top 75px no-repeat,
        url("../../assets/index/t2.svg") left 985px top no-repeat,
        url("../../assets/index/t3.svg") left 1085px top 150px no-repeat,
        url("../../assets/index/a1.svg") left 10px bottom no-repeat,
      url("../../assets/index/a2.svg") left 149px bottom no-repeat,
      url("../../assets/index/a3.svg") left 334px bottom no-repeat,
      url("../../assets/index/a4.svg") left 509px bottom no-repeat,
      url("../../assets/index/a5.svg") left 629px bottom no-repeat,
      url("../../assets/index/a6.svg") left 747px bottom no-repeat,
      url("../../assets/index/a7.svg") left 914px bottom no-repeat,
      url("../../assets/index/a8.svg") left 1042px bottom no-repeat,
      url("../../assets/index/a9.svg") left 1191px bottom no-repeat;
    }
    .page3{
      margin: 0 auto;
    }
    .page4_school_sub{
      display: none;
    }

  }
  @media screen and (min-width: 1024px)and (max-width: 1400px){
    .page3_sub{
      display: none;
    }
    .page2_sub{
        display: none;
    }
    .page1{
      text-align: center;
    }

    .page3{
      padding-left: 20px;
      margin: 0 auto;
    }
    .page4_school_sub{
      display: none;
    }
  }
  @media only screen and (min-width: 768px) and (max-width: 1023px){
    .page3_sub{
      display: none;
    }
    .page2_sub{
      display: none;
    }
    .nav_1_1{
      display: none;
    }
    .nav_2{
      display: inline !important;
      .nav_2_1{
        float: left;
      }
  }
    .nav-inner-login{
      display: none;
    }
    .nav-inner-login2{
      margin-right: 20px;
      display: flex;
    }
    .title_1{
      font-size: 24px;
      font-weight: 400;
      line-height: 30px;
      letter-spacing: 1.2px;
    }
    .title_2{
      font-size: 18px;
      font-weight: 400;
      line-height: 23px;
      text-align: center;
      letter-spacing: 1.8px;
    }
    .page1{
      margin: 0 auto;
      width: 768px;
      height: 678px;
      /*background-image: url("../../assets/index/index_bgPad1.png");*/
      /*background-repeat:no-repeat;*/
      /*background-position:center;*/
      background:
        url("../../assets/index/ipad/tM1.svg") left 40px top 60px no-repeat,
        url("../../assets/index/ipad/tM2.svg") left 560px top 20px no-repeat,
        url("../../assets/index/ipad/tM3.svg") left 600px top 150px no-repeat,
        url("../../assets/index/ipad/aM1.svg") left bottom no-repeat,
        url("../../assets/index/ipad/aM2.svg") left 68px bottom no-repeat,
        url("../../assets/index/ipad/aM3.svg") left 173px bottom no-repeat,
        url("../../assets/index/ipad/aM4.svg") left 272px bottom no-repeat,
        url("../../assets/index/ipad/aM5.svg") left 339px bottom no-repeat,
        url("../../assets/index/ipad/aM6.svg") left 406px bottom no-repeat,
        url("../../assets/index/ipad/aM7.svg") left 500px bottom no-repeat,
        url("../../assets/index/ipad/aM8.svg") left 572px bottom no-repeat,
        url("../../assets/index/ipad/aM9.svg") left 667px bottom no-repeat;

    }
    .page2{
      width: 768px;
      margin: 100px auto;
      .page2_left1{
        background-image: url("../../assets/index/index_bgPad2.png");
      }
      .page2_left2{
        .page2_left2_1{
          padding-top:0;
        }
      }
    }
    .page3{
      width: 768px;
      margin: 60px auto;
      background-image: url("../../assets/index/index_bgPad3.png");
      .page3_left1{
        padding-left: 20px;
        width: 470px;
      }
    }
    .page4{
      margin-top: -100px;
      .page4_school{
        font-size: 18px;
        .school{
          img{
            width: 90px;
          }
        }
      }
    }
    .page4_school_sub{
      display: none;
    }
  }
  @media only screen and (max-width: 767px){
    .nav_1{
      height: 50px;
      .nav_1_1{
        display: none;
      }
    }
    .nav_2{
      margin-right: 10px;
      font-size: 18px!important;
      line-height: 23px !important;
      display: inline !important;
      text-align: center;
    }
    .nav-inner-login{
      display: none;
    }
    .nav-inner-login2{
      margin-right: 20px;
      display: flex;
    }
    .page1{
      margin: 0 auto;
      width: 320px;
      height: 442px;
      /*background-image: url("../../assets/index/index_bgMin1.png");*/
      background:
        url("../../assets/index/mobile/tM1.svg") left 10px top 60px no-repeat,
        url("../../assets/index/mobile/tM2.svg") left 260px top 40px no-repeat,
        url("../../assets/index/mobile/tM3.svg") left 240px top 120px no-repeat,
        url("../../assets/index/mobile/aM1.svg") left 5px bottom no-repeat,
        url("../../assets/index/mobile/aM2.svg") left 35px bottom no-repeat,
        url("../../assets/index/mobile/aM3.svg") left 75px bottom no-repeat,
        url("../../assets/index/mobile/aM4.svg") left 113px bottom no-repeat,
        url("../../assets/index/mobile/aM5.svg") left 140px bottom no-repeat,
        url("../../assets/index/mobile/aM6.svg") left 170px bottom no-repeat,
        url("../../assets/index/mobile/aM7.svg") left 207px bottom no-repeat,
        url("../../assets/index/mobile/aM8.svg") left 235px bottom no-repeat,
        url("../../assets/index/mobile/aM9.svg") left 275px bottom no-repeat;
      .title_1{
        padding: 40px 20px;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.8px;
      }
      .title_2{
        transform: translateY(-40px);
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        letter-spacing: 1.4px;
      }
    }
    .button_1 {
      transform: translateY(-40px);
    }
    .page2 {
      width: 320px;
      height: 200px;
      margin:0 auto;
      background-image: url("../../assets/index/index_bgMin2.png");
      background-repeat: no-repeat;
      background-position: center;
      .page2_left1{
       display: none;

      }
      .page2_left2{
        display: none;
      }
    }
    .page2_sub{
      display: inherit;
      padding: 0 20px;
      text-align: left;
      color: #464646;
      font-family: "PingFangSC-Medium";
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 1.4px;
    }
    .page3{
      margin: 0 auto;
      width: 320px;
      height: 200px;
      background-image: url("../../assets/index/index_bgMin3.png");
      background-repeat: no-repeat;
      background-position: center;
      .page3_left1{
        display: none;
      }
    }
    .page3_sub{
      display: inherit;
      padding: 0 20px;
      text-align: left;
      color: #464646;
      font-family: "PingFangSC-Medium";
      font-size: 14px;
      font-weight: 400;
      line-height: 18px;
      letter-spacing: 1.4px;
    }
    .page4{

      .page4_title{
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 1.4px;
      }
      .more_school{
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        letter-spacing: 1.4px;
      }
    }
    footer{
      .Info{
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-align: center;
        letter-spacing: 1.4px;
      }
      img{
        height:35px !important;
        transform: translateY(-10px);
      }
    }
    .page4_school_sub{

      margin-top: 20px;
      display: flex;
      font-family: "PingFangSC-Medium";
      .school{

        font-size: 14px;
        flex: 1;
        img{
          width: 80px;
        }
      }
    }
    .page4_school{
      display: none!important;
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
  }
</style>
