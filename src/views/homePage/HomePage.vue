<template>
  <div id="app" class="homePage-body" >
    <div class="middle-container">
      <div class="left">
        <left-nav :unitId="unitId" @toList="toList"></left-nav>
      </div>
      <!--<router-view name="homepage" class="middle"></router-view>-->
      <div class="middle">
        <div class="middle-nav">
          <el-breadcrumb separator-class="el-icon-arrow-right" id="middle-nav">
            <el-breadcrumb-item>教师列表</el-breadcrumb-item>
            <el-breadcrumb-item v-if="">师资队伍</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-if="showLetter" class="centerLetter"><strong>{{letter}}</strong></div>
          <div style="margin-top: -4px;" v-if="showLetterList">
            <a class="letterList" v-for="letter in Letters"   @click="jumper(letter)"><span>{{letter}}</span></a>
          </div>
          <div class="list-style" style="margin-top: -4px;" v-if="detailShow!=3">
<!--            <el-button @click="defaultSort" type="info" round style="padding: inherit;margin-right: -5px;width: 70px">-->
<!--              默认排序-->
<!--            </el-button>-->
<!--            <el-button @click="showSort" type="info" round style="padding: inherit;margin-right: 5px;width: 70px">-->
<!--              姓名排序-->
<!--            </el-button>-->
            <i @click="simpleList" class="el-icon-menu" style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>
            <i @click="detailList" class="el-icon-tickets" style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>

          </div>
        </div>
        <component :is="componentName" @toInfo="changeToTeacherInfo" class="dynamic-page"
                   :teacherProfile="teacherProfile" :msgLetter="letter" :showList="showSortList" :detail="detailShow"
                   ref="teacherList1"></component>
      </div>

      <!--      <right-nav class="right"></right-nav>-->
    </div>
  </div>
</template>

<script>
    import TopHeader from '@/components/Nav/TopHeader'
    import TeacherList from './components/teacherList'
    import LeftNav from './components/leftNav'
    import RightNav from './components/RightNav/index'
    import TeacherInfo from '../teacher/components/BaseInfo'


    export default {

        data() {
            return {
                componentName: 'teacherList',
                teacherProfile: {},//教师数据
                Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                showLetter: false,
                letter: 'A',
                showLetterList: false,
                showSortList: false,
                detailShow:3,
              NavName:'师资队伍'
            }
        },
        ready() {
        },

        computed: {
            unitId: function () {

                //console.log(this.$route.params.unitId + '  aa'+this.$route.params.domainName);
                return this.$store.state.user.unitId;
            },
        },
      mounted(){
          // if(this.unitId){
          //   this.changeToTeacherInfo()
          //
          // }
      },
        methods: {
            changeToTeacherInfo(id) {
                console.log("### 开始查询教师的个人信息")
                this.api({
                    url: "/teacher/" + id,
                    method: "get"
                }).then(data => {
                    console.log("查询教师信息为:" + data.username)
                    console.log(data)
                    console.log("================================")
                    this.teacherProfile = JSON.parse(JSON.stringify(data));
                    let node = document.getElementsByClassName('middle-nav')[0];
                    node.style.display = "none";
                    this.componentName = 'teacherInfo';
                }).catch(error => {
                    console.log("QAQ........没有找到教师信息")
                })
            },
            toList(name,modelId) {
              console.log("qqqq"+name+this.detailShow);
              this.detailShow=modelId;
              console.log("detailShow"+this.detailShow);
              this.componentName = "teacherList";
                document.getElementsByClassName('middle-nav')[0].style.display = "flex";
                let node = document.getElementById('middle-nav');
                node.children[1].children[0].innerText = name;
            },
            defaultSort() {

                this.showList = false;
                this.showSortList = false;
                this.showLetterList = false;
                this.$refs.teacherList1.getLetter(0);//发送0过去，则恢复默认
            },
            showSort() {
                this.showLetterList = !this.showLetterList;
                this.showSortList = !this.showSortList;

            },
            jumper(letter) {
                this.showSortList = true;
                this.letter = letter;
                this.$refs.teacherList1.getLetter(letter);
            },
            simpleList(){
                this.detailShow=2;
                this.showList = false;
                this.showSortList = false;
                this.showLetterList = false;
                this.$refs.teacherList1.getLetter(0);//发送0过去，则恢复默认
            },
            detailList(){
                this.detailShow=1;
            }

        },
        components: {
            'top-header': TopHeader,
            'leftNav': LeftNav,
            'teacherList': TeacherList,
            'rightNav': RightNav,
            'teacherInfo': TeacherInfo
        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../assets/css/base.css';

  .middle-container {
    max-width: 960px;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
  }

  .left {
    width: 21%;
  }

  .middle {
    margin: 32px 0px 16px 12px;
    width: 100%;
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
  .letterList{
  font-size: 16px;letter-spacing: 7px;margin-top: -4px;
  }
  @media screen and (max-width: 1024px) {
    .letterList {
      font-size: 14px;letter-spacing: 4px;

    }
  }


  @media screen and (max-width: 1200px) {
    .middle-container {
      max-width: 980px;
    }
  }


  .dynamic-page {
    border-radius: 0 0 8px 8px;
  }

  .homePage-body {
    background-color: #1f2d3d;
    background: url("../../assets/img/bg.png");
    width: 100%;
    min-width: 980px;
    height: 100%;
    min-height: calc(100vh - 60px);
  }
  @media screen and (max-width: 768px) {
    .homePage-body{
     min-height: 1220px;
    }
  }



</style>
