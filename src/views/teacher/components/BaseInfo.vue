<template>
  <div style="height:100%; " class="baseInfo-body">
    <div class="personal-info">
      <div v-if="teacherProfile!=undefined " style="position:relative;">

        <el-card class="box-card" >
          <!--<div style="position:absolute;left:530px;top:20px;z-index:2;">-->
            <img :src="bgLogo" width="250" height="250" style="opacity: 0.1;position:absolute;left:530px;top:15px;z-index:2; "/>
          <!--</div>-->
          <div style="display: inline-block;margin-left: 20px;vertical-align: top;margin-top: 20px">
            <img :src="getImgUrl(teacherProfile.avatar)" :onerror="imgErrorFun(this)" width="140" height="140"/>
          </div>
          <div class="right">
            <div class="name-top">
              <!--              <div class="name-left">-->

              <!--                &lt;!&ndash;                <div style="margin: 20px 0;">-->
              <!--                                  <span class="personal-describe">{{teacherProfile.post}}</span>-->
              <!--                                </div>&ndash;&gt;-->
              <!--              </div>-->

              <div class="name-right">

                <!--显示二维码-->
                <!--<div style="margin: 10px 0 0 10px">
                  <img :src="'http://www.scholat.com/'+teacherProfile.qrcode" width="100" height="100"
                       v-if="teacherProfile.qrcode" :onerror="defaultQrImg" style="border-radius: 5px;">
                  &lt;!&ndash;                  <div>
                                      <span><svg-icon icon-class="subject"/></span>
                                      <label class="font-one">学科</label>{{personal.subject}}
                                    </div>
                                    <div>
                                      <span><svg-icon icon-class="unit"/></span>
                                      <label class="font-one">单位</label>{{teacherProfile.department_name}}
                                    </div>&ndash;&gt;
                </div>-->
                <!--显示二维码结束-->

              </div>
            </div>
            <div class="name">
              {{teacherProfile.username}}
              <span class="prodile-second" style="margin-left: 14px;" v-if="teacherProfile.post&&tagFlag[3]==='d'">{{teacherProfile.post}}</span>
              <span class="prodile-second" style="" v-if="teacherProfile.duty&&tagFlag[2]==='c'">
                <span v-if="teacherProfile.post&&teacherProfile.duty">、</span>
                {{teacherProfile.duty}}
              </span>
              <!--                  <span class="prodile-second" v-if="teacherProfile.degree">/&nbsp{{teacherProfile.degree}}</span>-->
            </div>
            <!--头衔-->
            <div v-if="teacherProfile.label&&tagFlag[4]==='e'" style="margin-bottom: 10px;margin-left: 20px">
              <span class="personal-describe">{{teacherProfile.label}}</span>

            </div>
            <div v-else style="margin-bottom: 10px;margin-top: 31px">
            </div>
            <div class="name-right-bg" style="float: right;height:210px;margin-top: -90px"></div>
            <div style="display: flex">
              <div class="name-bottom" style="color: black">



                <div class="name-bottom-item" style="margin-bottom: 10px;"
                     v-if="tagFlag[9]==='j'">
                  <!--<span><svg-icon icon-class="department"/></span>-->
                  <label class="font-one">部门：</label><div class="detail-msg">{{personal.unit}}{{teacherProfile.department_name}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;" v-if="tagFlag[10]==='k'">
                  <!--<span><svg-icon icon-class="maps-and-flags"/></span>-->
                  <label class="font-one">地址：</label>
                  <div class="detail-msg">{{teacherProfile.work_place}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;" v-if="tagFlag[11]==='l'">
                  <!--<span><svg-icon icon-class="mobile-phone"/></span>-->
                  <label class="font-one">电话：</label><div class="detail-msg">{{teacherProfile.phone}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;">
                  <!--<span><svg-icon icon-class="email"/></span>-->
                  <label class="font-one">邮箱：</label><div class="detail-msg">{{teacherProfile.email}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;" >
                  <!--<span><svg-icon icon-class="S"/></span>-->
                  <label class="font-one">主页：</label><div class="detail-msg">
                  <a :href="'http://www.scholat.com/'+teacherProfile.scholat_username" v-if="teacherProfile.scholat_username"
                     style="color: #399;display:block;overflow:hidden;word-break:keep-all;white-space:nowrap;text-overflow:ellipsis;width:210px;">
                    scholat.com/{{teacherProfile.scholat_username}}
                  </a></div>
                </div>


           <!--                   <div class="show-persona" v-if="teacherProfile.scholat_username">
                              <a @click="routeTo()">查看学者画像</a>
                            </div>-->
              </div>
              <div class="name-bottom-right">
                <div style="margin-bottom: 10px;" v-if="tagFlag[5]==='f'" class="name-bottom-item">
                  <!--
                                   <span ><svg-icon icon-class="degree" /></span>
                  -->
                  <label class="font-one">学历学位：</label><div class="detail-msg">{{teacherProfile.degree}}</div>
                </div>
                <!--<div style="margin-bottom: 10px;" v-if="tagFlag[5]==='f'"
                     class="name-bottom-item">
                  &lt;!&ndash;
                                   <span><svg-icon icon-class="degree"/></span>
                  &ndash;&gt;
                  <label class="font-one">最高学位：</label><div class="detail-msg">{{teacherProfile.degreeMax}}</div>
                </div>-->
                <div class="name-bottom-item" style="margin-bottom: 10px;"
                     v-if="tagFlag[6]==='g'">
                  <!--
                                   <span><svg-icon icon-class="department"/></span>
                  -->
                  <label class="font-one">毕业学校：</label><div class="detail-msg">{{teacherProfile.graduateFrom}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;"
                     v-if="tagFlag[7]==='h'">
                  <!--<span><svg-icon icon-class="department"/></span>-->
                  <label class="font-one">学科专业：</label><div class="detail-msg">{{teacherProfile.subject}}</div>
                </div>
                <div class="name-bottom-item" style="margin-bottom: 10px;flex-direction: column" v-if="">
                  <!--<span><svg-icon icon-class="rearch-direction"/></span>-->
                  <label class="font-one">研究方向：</label>
                  <div class="detail-msg" style="margin-top: 7px;line-height: 25px;width: 270px">{{teacherProfile.research_direction}}</div>
                </div>
              </div>
            </div>

          </div>
        </el-card>
      </div>
      <div class="box-card-two" v-if="!!teacherProfile.intro && teacherProfile.intro!='<p><br></p>'">
        <el-card style="overflow: auto;margin-bottom: 17px;">
          <div style="color: steelblue;
font-size: 16px;
font-weight: bold;
padding: 12px 20px 6px 27px">个人简介</div>
          <hr style="margin: 4px">
          <div v-html="teacherProfile.intro" style="padding: 20px 20px 39px"></div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
    import logo from '@/assets/defaultLogo.png'
    import bgLogo from '@/assets/logobluegray.png'
    import defaultAvatar from '@/assets/default.png'

    export default {
        name: "BaseInfo",
        created() {
          this.getUnitInfo();
            console.log("********开始执行BaseInfo的create生命周期函数********")
            this.personal.avatar = this.logo;
          console.log("teacherProfile.intro="+this.teacherProfile.intro);
          /*  this.teacherProfile.intro = this.teacherProfile.intro.replace("个人简介","");*/
          console.log("this.$store.state.user.tagState.split('')="+this.$store.state.user.tagState.split(''));
            this.tagFlag = this.$store.state.user.tagState.split('')
          console.log("this.$store.state.user.tagState="+this.tagFlag);
            console.log("（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（（" +
              "（（（（（（（（（（（（（（（（（（（（（（（（ this.tagFlag=" + this.tagFlag);

        },
      mounted() {
        console.log("********开始执行BaseInfo的mounted生命周期函数*********")
      },
      watch: {
        $route() {
          this.cId = this.$route.params.cId
          console.log("this.cId=" + this.cId);
          this.$emit('rInfo')
        },
      },
        data() {
            return {
                logo,
              bgLogo:bgLogo,
                // defaultQrImg:'this.src="' + require('../../../assets/img/logo.png') + '"',
                defaultQrImg: 'this.style="display:none"',
                defaultAvatar:defaultAvatar,
                personal: {
                    name: "汤庸",
                    avatar: 'http://localhost:8080/avatar/' + this.teacherProfile.avatar,
                    title: "教授",
                    position: "博士生导师",
                    subject: "计算机科学与技术",
                    unit: "",
                    email: "ytang4@qq.com",
                    research: [],
                    introduction: "",
                    matrixCode: ""
                },
                tagFlag: ''
            }
        },
        props: ['teacherProfile'],
        methods: {
            getUnitInfo(){
              console.log("teacherProfile="+JSON.stringify(this.teacherProfile))
              console.log("teacherProfile.domain_name="+this.teacherProfile.tDomain_name)
              this.api({
                url: "/unit/getUnitBytDomain_name",
                method: "get",
                params: {tDomain_name: this.teacherProfile.domain_name}
              }).then(data => {
                console.log("学院名:" + JSON.stringify(data))
                this.personal.unit=data.unitName;
              }).catch(error => {
                console.log("没有找到学院unit")
              })
            },
            handleCommand() {
                // const that = this;
                // that.$router.push({path: "/register",query:{alert:"页面跳转成功"}})
                this.$router.push({path: '/login'});
            },
            getImgUrl(imgName) {
              if (imgName == null) {
                return this.defaultAvatar;
              } else if(imgName=="default.png"){
                return this.defaultAvatar
              } else if (imgName.indexOf("resources") != "-1") {
                return "http://www.scholat.com/" + imgName;
              } else {
                return "http://47.106.132.95:2333/images/avatar/" + imgName;
              }
            },
            imgErrorFun(e) {
                /*let img = e;
                img.onerror = null;
                console.log("执行了imgErrorFun函数，onerror=" + img.onerror + "，img.src=" + img.src);
                return 'this.src="http://47.106.132.95:2333/images/avatar/default.png"';*/
              return 'this.src="defaultAvatar"';
            },
            routeTo() {
                this.$router.push({
                    name: 'persona',
                    params: {
                        scholat_username: this.teacherProfile.scholat_username,
                        user_id: this.teacherProfile.id
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .baseInfo-body {
    $bg: #003f88;

    .prodile-second {
      font-size: 22px;
      color: gray;
    }

    .personal-info {
      position: relative;
      width: 784px;
      height: auto;
      /*min-width: 767px;*/
      .left {

        display: flex;
        flex-direction: row;
        /*justify-content: space-around;*/
        margin-top: 20px;
        margin-left: 20px;
        align-items: center;
        width: 18%;
        float: left;
        height: inherit
        /*background-color: burlywood;*/
      }

      .right {
        display: inline-block;
        max-width: 600px;
        height: 100%;
        /*background-color: aquamarine;*/
      }

      .info-right {

        display: flex;
        /*flex-flow: row nowrap;*/
        /*justify-content: flex-start;*/
        /*margin: 0;*/
        /*padding: 0;*/
        /*list-style: none;*/
        background-color: #99a9bf;

        .right-item {

          width: 200px;
          height: 400px;
          margin-left: 15px;
        }
      }

      .box-card {
        //   background:url('../../../assets/img/bg8.png');
        background-repeat: no-repeat;
        background-size: auto 100%;
        min-height: 300px;
        width: 100%;
        margin-bottom: 20px;
        padding-bottom: 17px;
      }


      .box-card-two {
        width: 100%;

        .el-tabs {
          /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
            color: #0051c1;
            font-weight: 800;
            font-size: 16px;
            background-color: #fff;
            border-right-color: #dcdfe6;
            border-left-color: #dcdfe6;
          }

          /deep/ .el-tabs--border-card > .el-tabs__content {
            min-height: 350px;
            /*margin-bottom: 30px;*/
          }
        }


        .describe-content {
          width: 100%;

          background: #fff;
          padding: 22px 50px 39px;
          overflow: hidden;
        }
      }

      .name-top {
        /*height: 60px;*/
        /*!*border-bottom: 1px solid #e8e8e8;*!*/
        /*overflow: hidden;*/
      }

      .name-left {

        height: 50%;
        /*background-color: antiquewhite;*/
        margin-top: 10px;
      }

      .name-right {
        position: absolute;
        right: 30px;
        top: 20px;
        vertical-align: top;
      }

      .name-qr {
        width: 70px;
        height: 70px;
        margin-left: 750px;
        box-shadow: 1px 1px 5px #eaeaea;
      }

      .name {
        margin-top: 15px;
        margin-left: 25px;
        font-size: 34px;
        font-weight: 800;
        color: $bg;

      }

      .name-bottom {
        /*padding: 15px 0px 0px;*/
        /*display: flex;*/
        flex-wrap: wrap;
        display: inline-block;
        vertical-align: top;
        width: 275px;
        margin-left: 25px;
      }
      .name-bottom-right{
        /*padding: 15px 0px 0px;*/
        /*display: flex;*/
        flex-wrap: wrap;
        display: inline-block;
        vertical-align: top;
        border-left:2px solid #4682b4;
        width: 275px;
        padding-left: 25px;
        margin-left: 10px;
      }

      .name-bottom-item {
        /*width: 305px;*/
        display: flex;
      }

      .font-one {
        line-height: 25px;
        font-weight: bold;

        color: #4682b4;
        /*min-width: 50px;*/
        width: auto;
        white-space:nowrap;

      }

      .detail-msg{
        width: 220px;
        display:block;word-break: break-all;word-wrap: break-word;
      }
      .personal-describe {
        display: inline;
        font-size: 16px;
        font-weight: 400;
        background: #eaeaea;
        padding: 2px 12px;
        border-radius: 19px;
        color: #818181;
      }
    }

    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
      background-color: #99a9bf;
      background-image: none;
      color: #000;
    }

    .show-persona {
      position: absolute;
      bottom: 0;
      right: 0;
      border: 1px solid gray;
      padding: 4px 0 4px 24px;
      border-radius: 28px 0 0 0;
      box-shadow: inset 0 0 4px grey;
    }
  }


</style>
