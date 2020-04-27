<template>
  <header class="top-container">

    <!--两种模式：模式 1 -->
    <div class="background" v-if="unit.state == 0 && dataDone">
      <div @click="goToCollege" style="display: inline-block;height: 90%;width: auto;min-width: 93px">
        <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo"
             style="height: 100%;width: auto;bottom: 0;"/>
      </div>
      <div @click="goToCollege"
           style="height: 100%;max-width: 900px;display: flex;justify-content: center;align-items: center;
           margin: 0 18px;cursor: pointer">
       <div style="color: steelblue">
         <a class="university" style="white-space: nowrap;font-weight: bold;">{{unit.schoolName}}</a>
         <span class="unitName" style="color:steelblue;font-weight: bold;white-space:nowrap;">{{unit.unitName}}</span>
       </div>
      </div>
      <div class="font-jsgrzy" style="display: inline-block;min-width: 180px;">
        教师个人主页
      </div>


      <div class="search bar6">
        <div class="formDiv" style="min-width:200px;float: right">
          <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                 style="color: gray;background-color: white;">
          <button @click="keySend"></button>
        </div>
      </div>
    </div>

    <!--两种模式：模式 2 自定义模式-->

    <div v-else class="background2">
      <!--<div @click="goToCollege" style="display: inline-block;height: 90%;width: auto;">
        <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo" style="height:100%;width:auto;bottom: 0;"/>
      </div>-->

      <div class="apply-nav" v-if="$route.path.indexOf('unitApply')!=-1">
        <div style="color: steelblue;white-space: nowrap;font-weight: bold;font-size: 22px;">
          SCHOLAT+学院师资管理平台 申请程序
        </div>
        <div style="font-size: 22px">
          <span><svg-icon icon-class="S"/></span>
          <a href="http://www.scholat.com/" style="color: #399;text-overflow: ellipsis;white-space: nowrap;">
            学者网
          </a>
        </div>
      </div>

      <div v-if="titleFlag"></div>
      <div v-else-if="$route.path.indexOf('login')!=-1">
        <span style="padding-left: 0" class="font-jsgrzy">
          SCHOLAT+ 学院师资信息管理平台
          </span>
      </div>
      <div v-else style="display: flex;align-items: center;height: 100%;width: 100%" @click="goToCollege">
        <!--如果有背景图，则显示学院背景图片+文字-->
        <template v-if="unit.backgroundUrl">
          <div @click="goToCollege" style="height: 100%;padding-left: 15px">
            <img :src="'http://47.106.132.95:2333/images/background/' + unit.backgroundUrl"
                 style="height: 100%"
                 :onerror="defaultBack"/>
          </div>
          <span style="" class="font-jsgrzy">
            师资队伍
          </span>
        </template>
        <!--如果没有背景图，则显示学校LOGO+xx学院+文字-->
        <template v-else>
          <div @click="goToCollege" style="height: 90%;width: auto;bottom: 0;cursor: pointer">
            <img :src="'http://www.scholat.com/images/uni_logo/'+this.unit.schoolName+'.png'" :onerror="defaultLogo" style="height: 55px;width:auto;"/>
          </div>
          <span style="" class="font-jsgrzy">
          {{unit.unitName}}师资队伍
          </span>
        </template>
      </div>

      <div class="search bar6" v-if="dataDone && this.$route.path.indexOf('teacher')===-1">
        <div class="formDiv" style="min-width:200px;float: right;">
          <input @keyup.enter="keySend" type="text" v-model="searchKey" placeholder="请输入您要搜索的教师" name="cname"
                 style="color: gray;background-color: white;">
          <button @click="keySend"></button>
        </div>
      </div>

        <div style="font-size: 22px;display: flex;width: 100%;justify-content: flex-end"
             v-if="$route.path.indexOf('login')!=-1">
          <span><svg-icon icon-class="S"/></span>
          <a href="http://www.scholat.com/" style="color: #399;margin-left: 4px ;
          text-overflow: ellipsis;white-space: nowrap;">
            学者网
          </a>
        </div>
    </div>

  </header>
</template>

<script>
    import Img from '@/assets/img/home.png'
    import bus from '@/utils/eventBus'

    export default {
        data() {
            return {
                defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
                img: Img,
                searchKey: '',
                unitQuery: {unitId: '',domainName:''},
                defaultBack: 'this.src="http://47.106.132.95:2333/images/background/1569738575202258.png"',
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
            }
        },
      props:{
        titleFlag:'',
      },
        created() {
            this.getUnitInfo();
        },
        ready() {
        },
        methods: {
            routerToAdmin() {
                console.log("=========================================")
                this.$router.push({
                    name: 'managerTeacher'
                })
            },
            getUnitInfo() {
                //如果是教師的頁面
                if (window.location.href.indexOf('teacher') != -1) {
                    var teacherId = this.GetUrlRelativePath_id();
                    console.log("head教师id为:........" + teacherId);
                    this.api({
                        url: "/unit/getUnitBytId",
                        method: "get",
                        params: {id: teacherId}
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

                }
                //是主頁
                else {
                 // console.log("bbbb"+this.$route.params.domainName+"this.$route.params.unitId"+this.$route.params.unitId);
                  this.unitQuery.domainName=this.$route.params.domainName;
                    this.unitQuery.unitId = this.$route.params.unitId
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
                var url = document.location.toString();
                var arrUrl = url.split("//");

                var start = arrUrl[1].indexOf("teacher/");
                var relUrl_id = arrUrl[1].substring(start + 8);//stop省略，截取从start开始到结尾的所有字符

                if (relUrl_id.indexOf("?") != -1) {
                    relUrl_id = relUrl_id.split("?")[0];
                }
                return relUrl_id;
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
                            unitId: this.$store.state.user.unitId,
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
                console.log("send++++" + this.searchKey)
                bus.$emit("key", this.searchKey);
            },
        },
        computed: {
            /*getPic() {
                if (this.unit.logoUrl) {
                    if (this.unit.logoUrl.indexOf('scholat') == -1) {
                        /!*return 'http://47.106.132.95:2333/images/unit_logo/' + this.unit.logoUrl*!/
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

  .background {
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
    width: 100%;
    height: 100%;
    background-color: #f1f2f6;
    max-width: 1000px;
    text-align: center;
    margin: auto;
    display: flex;
    align-items: center;
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

  div.search {
    width: 100%;
  }

  .formDiv {
    position: relative;
    width: 300px;
    margin: 0 auto;
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

  .bar6 input {
    border: 2px solid white;
    border-radius: 46px;
    background: transparent;
    top: 0;
    right: 0;
  }

  .bar6 button {
    background: white;
    border-radius: 0 46px 46px 0;
    width: 60px;
    top: 0;
    right: 0;
  }

  .bar6 button:before {
    content: "搜索";
    font-size: 13px;
    font-weight: bold;
    color: #3399CC;
  }

  li {
    display: inline
  }

  .top-container {
    width: 100%;
    height: 60px;
    background: #f1f2f6;
    min-width: 980px;
    background-color: #f1f2f6;
    /*background: url('../../assets/img/home.png') no-repeat;*/
    /*background-size: cover;*/
  }

  .font-jsgrzy {
    font-family: '等线 Light';
    font-weight: bold;
    letter-spacing: 3.5px;
    line-height: 60px;
    font-size: 22px;
    color: steelblue;
    white-space: nowrap;
    margin-left: 14px;
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
</style>
