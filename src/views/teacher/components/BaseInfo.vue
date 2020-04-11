<template>
  <div style="height:100%; " class="baseInfo-body">
    <div class="personal-info" >
      <div  v-if="teacherProfile!=undefined " style="position:relative;">
        <el-card class="box-card" >

          <div class="left" >
            <img :src="getImgUrl(teacherProfile.avatar)" width="200" height="200"
                 style="border-radius: 12%; overflow: hidden; border: 3px solid #efefef;">
          </div>
          <div class="right" >

            <div class="name-top">
              <div class="name-left">
                <div class="name">
                  {{teacherProfile.username}}
                  <span class="prodile-second" style="margin-left: 14px;" v-if="teacherProfile.post">{{teacherProfile.post}}</span>
                  <!--                  <span class="prodile-second" v-if="teacherProfile.degree">/&nbsp{{teacherProfile.degree}}</span>-->
                </div>
                <!--                <div style="margin: 20px 0;">
                                  <span class="personal-describe">{{teacherProfile.post}}</span>
                                </div>-->
              </div>

              <div class="name-right" >
                <div >
                  <img :src="'http://www.scholat.com/'+teacherProfile.qrcode" width="100" height="100"
                       v-if="teacherProfile.qrcode" :onerror="defaultQrImg" style="border-radius: 5px;">
                  <!--                  <div>
                                      <span><svg-icon icon-class="subject"/></span>
                                      <label class="font-one">学科</label>{{personal.subject}}
                                    </div>
                                    <div>
                                      <span><svg-icon icon-class="unit"/></span>
                                      <label class="font-one">单位</label>{{teacherProfile.department_name}}
                                    </div>-->
                </div>
              </div>
            </div>
            <div class="name-right-bg" style="float: right;height:310px;margin-top: -90px"></div>
            <div class="name-bottom">
              <div v-if="teacherProfile.label" style="margin-bottom: 10px;">
                <span class="personal-describe">{{teacherProfile.label}}</span>
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.degree">
                <span><svg-icon icon-class="degree"/></span>
                <label class="font-one">学历学位：</label>{{teacherProfile.degree}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.department_name">
                <span><svg-icon icon-class="department"/></span>
                <label class="font-one">所在部门：</label>{{teacherProfile.department_name}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.work_place">
                <span><svg-icon icon-class="maps-and-flags"/></span>
                <label class="font-one">办公地点：</label>{{teacherProfile.work_place}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.phone">
                <span><svg-icon icon-class="mobile-phone"/></span>
                <label class="font-one">办公电话：</label>{{teacherProfile.phone}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.subject">
                <span><svg-icon icon-class="subject"/></span>
                <label class="font-one">学科：</label>{{teacherProfile.subject}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.research_direction">
                <span><svg-icon icon-class="rearch-direction"/></span>
                <label class="font-one">研究方向：</label>{{teacherProfile.research_diection}}
              </div>
              <div style="margin-bottom: 10px;">
                <span><svg-icon icon-class="email"/></span>
                <label class="font-one">邮箱：</label>{{teacherProfile.email}}
              </div>
              <div style="margin-bottom: 10px;" v-if="teacherProfile.scholat_username">
                <span><svg-icon icon-class="S"/></span>
                <label class="font-one">学者网：</label>
                <a :href="'http://www.scholat.com/'+teacherProfile.scholat_username" style="color: #399;">
                  http://www.scholat.com/{{teacherProfile.scholat_username}}
                </a>
              </div>
<!--              <div class="show-persona" v-if="teacherProfile.scholat_username">-->
<!--              <a @click="routeTo()">查看学者画像</a>-->
<!--            </div>-->
            </div>
          </div>
        </el-card>
      </div>
      <div class="box-card-two" v-if="!!teacherProfile.intro && teacherProfile.intro!='<p><br></p>'">
        <el-card  style="overflow: auto;margin-bottom: 17px;">
          <div v-html="teacherProfile.intro" style="padding: 36px 32px 39px"></div>
        </el-card>
      </div>
    </div>

  </div>
</template>

<script>
    import logo from '@/assets/defaultLogo.png'
    export default {
        name: "BaseInfo",
        created() {
            this.personal.avatar = this.logo;
            console.log(this.teacherProfile);
        },
        data() {
            return {
                logo,
                // defaultQrImg:'this.src="' + require('../../../assets/img/logo.png') + '"',
                defaultQrImg:'this.style="display:none"',
                personal: {
                    name: "汤庸",
                    avatar: 'http://localhost:8080/avatar/' + this.teacherProfile.avatar,
                    title: "教授",
                    position: "博士生导师",
                    subject: "计算机科学与技术",
                    unit: "计算机学院",
                    email: "ytang4@qq.com",
                    research: [],
                    introduction: "",
                    matrixCode: ""
                }
            }
        },
        props: ['teacherProfile'],
        methods: {
            handleCommand() {
                // const that = this;
                // that.$router.push({path: "/register",query:{alert:"页面跳转成功"}})
                this.$router.push({path: '/login'});
            },
            getImgUrl(imgName) {
                if (imgName == null) {
                    return ""
                } else if (imgName.indexOf("resources") != "-1") {
                    return "http://www.scholat.com/" + imgName;
                } else {
                    return "http://47.106.132.95:2333/images/avatar/" + imgName;
                }
            },
            routeTo(){
                this.$router.push({
                    name: 'persona',
                    params: {
                        scholat_username: this.teacherProfile.scholat_username,
                        user_id:this.teacherProfile.id
                    }
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss">
  .baseInfo-body{
    $bg: #003f88;
    .prodile-second{
      font-size: 22px;
      color:gray;
    }

    .personal-info {
      position: relative;
      width: 100%;
      height: auto;
      /*min-width: 767px;*/
      .left {

        display: flex;
        flex-direction: column;
        /*justify-content: space-around;*/
        margin-top: 30px;
        align-items: center;
        width: 250px;
        float: left;
        min-height: 220px;
        height: inherit
        /*background-color: burlywood;*/
      }

      .right {

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
        background:url('../../../assets/img/bg8.png');
        background-repeat:no-repeat;
        background-size: auto 100%;
        height: 308px;
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
        height: 90px;
        /*border-bottom: 1px solid #e8e8e8;*/
        overflow: hidden;
      }

      .name-left {

        height: 50%;
        /*background-color: antiquewhite;*/
        margin-top: 30px;
      }

      .name-right
      {
        position: absolute;
        right: 30px;
        top: 30px;

      }
      .name-qr {
        width: 70px;
        height: 70px;
        margin-left: 750px;
        box-shadow: 1px 1px 5px #eaeaea;
      }

      .name {
        font-size: 34px;
        font-weight: 800;
        color: $bg;
      }

      .name-bottom {
        /*padding: 15px 0px 0px;*/
        margin-left: 250px;
      }

      .font-one {
        line-height: 25px;
        padding-right: 15px;
        margin-left: 7px;
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
    .show-persona{
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
