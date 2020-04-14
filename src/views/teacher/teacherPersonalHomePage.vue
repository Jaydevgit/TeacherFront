<template>
  <div class="app-container" style="padding: 0;min-height: calc(100vh - 60px);height: 100%">
    <div class="container" style="padding-top: 26px">
      <base-info :teacherProfile="teacherProfile" class="left" style="width: 78%"></base-info>
      <rightNav class="right"></rightNav>
    </div>
  </div>
</template>

<script>
    import BaseInfo from "./components/BaseInfo";
    import RightNav from "./components/RightNav/index"

    export default {
        name: "teacherPersonalHomePage",
        components: {
            'base-info': BaseInfo,
            'rightNav': RightNav
        },
        data() {
            return {
                /*          teacherProfile:this.$route.params.t,
                          teacherProfile_id:this.$route.params.t.id*/
                teacherProfile: {},//教师数据
                listLoading: false,//数据加载等待动画
                teacherName: ''
            }
        },
        created() {
            // console.log("当前url中教师id为:........"+this.GetUrlRelativePath_id());
            // var teacherId = this.GetUrlRelativePath_id();
            this.tDomainName = this.$route.path.split('/')[3];
            this.getTeacherInfoByDomainName(this.tDomainName);
            // var teacherId =;
            // this.getInfo(teacherId);
        },
        mounted() {

        },
        computed: {
            unitId: function () {
                console.log(this.$store.state.user.unitId + 'bb');
                return this.$store.state.user.unitId;
            }
        },
        methods: {
/*            getInfo(teacherId) {
                console.log("### 开始查询教师的个人信息")
                this.api({
                    url: "/teacher/" + teacherId,
                    method: "get"
                }).then(data => {
                    console.log("查询教师信息为:" + data.userName)
                    console.log("================================")
                    this.teacherProfile = data;

                }).catch(error => {
                    console.log("QAQ........没有找到教师信息")
                })
            },*/
            getTeacherInfoByDomainName(tDomainName) {
                console.log("### 开始通过域名查询教师的个人信息")
                this.api({
                    url: "/teacher/getTeacherInfoByDomainName/" + tDomainName,
                    method: "get"
                }).then(data => {
                    console.log("查询教师信息为:" + data.userName)
                    console.log("================================")
                    this.teacherProfile = data;
                }).catch(error => {
                    console.log("QAQ........没有找到教师信息")
                })
            },
/*            GetUrlRelativePath_id() {
                var url = document.location.toString();
                var arrUrl = url.split("//");
                var domainUrl = this.$store.state.user.domainName
                var start = arrUrl[1].indexOf(domainUrl + "/");
                // console.log("&&&&-----&&&&"+start+"==="+arrUrl[1]);
                var relUrl_id = arrUrl[1].substring(start + 5);//stop省略，截取从start开始到结尾的所有字符
                //  console.log("&&&&-----"+relUrl_id);
                if (relUrl_id.indexOf("?") != -1) {
                    relUrl_id = relUrl_id.split("?")[0];
                }
                return relUrl_id;
            }*/
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .container {
    max-width: 960px;
    margin: 0 auto;
    position: relative;
    min-width: 960px;
    height: 100%;
    display: flex;

    .left {
      max-width: 1140px;
      width: 78%;
      /*min-height: 180px;*/
    }

    .middle {
      position: absolute;
      max-width: 900px;
      box-sizing: border-box;
    }

    .right {
      max-height: 600px;
      border-radius: 8px;
      margin-left: 14px;
    }
  }

  .app-container {
    background: url("../../assets/img/bg.png");
  }


</style>

