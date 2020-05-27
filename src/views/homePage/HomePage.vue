<template>
  <div  id="app" class="homePage-body" :style="(backgroundHome!==undefined)?'background-image:' +'url('+'http://47.106.132.95:2333/images/background/'+backgroundHome+')':
'background-image:' +'url('+'http://47.106.132.95:2333/images/background/'+backgroundHomeDefault+')'" >
    <div class="middle-container">
      <div class="left">
        <left-nav :unitId="unitId" @toList="toList"  ref="info"></left-nav>
      </div>
      <!--<router-view name="homepage" class="middle"></router-view>-->
      <div class="middle">
        <div class="middle-nav">
          <el-breadcrumb separator-class="el-icon-arrow-right" id="middle-nav">
            <el-breadcrumb-item>师资队伍</el-breadcrumb-item>
            <el-breadcrumb-item>教师名录</el-breadcrumb-item>
          </el-breadcrumb>
          <div v-if="showLetter" class="centerLetter"><strong>{{letter}}</strong></div>
          <div style="margin-top: -4px;" v-if="showLetterList&&detailShow===3">
            <span style="margin-right: 5px;font-size: 14px;cursor:pointer" @click="allTeacher" :class="{'letterRed':letterFlag==='All'}">All</span>
            <a class="letterList" v-for="letter in Letters" @click="jumper(letter)" :class="{'letterRed':letterFlag===letter}">
              <span>{{letter}}</span>
            </a>
          </div>
          <div class="list-style" style="margin-top: -4px;" v-if="detailShow!==3" @detailShow="detailShowChange">
            <!--            <el-button @click="defaultSort" type="info" round style="padding: inherit;margin-right: -5px;width: 70px">-->
            <!--              默认排序-->
            <!--            </el-button>-->
            <!--            <el-button @click="showSort" type="info" round style="padding: inherit;margin-right: 5px;width: 70px">-->
            <!--              姓名排序-->
            <!--            </el-button>-->
            <i @click="simpleList" class="el-icon-menu"
               style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>
            <i @click="detailList" class="el-icon-tickets"
               style="font-size:20px;margin-right: 10px;opacity: 0.7;cursor: pointer"></i>

          </div>
        </div>
        <component :is="componentName" @toInfo="changeToTeacherInfo" class="dynamic-page" @rInfo="rInfo"
                   :teacherProfile="teacherProfile" :msgLetter="letter"
                   :showList="showSortList" :detail="detailShow"
                   :search-key="searchKey"
                   :search-count="searchCount"
                   :cId='cId'
                   :unitId="unitId"
                   @detailShow="detailShowChange"
                   ref="teacherList1"
                   v-if="hackReset"></component>
      </div>
      <!--      <right-nav class="right"></right-nav>-->
    </div>
    <!--底部栏-->
    <footer style="display: flex;justify-content: center;align-items: center">
      <div style="height: 100%;
      width:100%;display: flex;
      justify-content: space-between;margin: 0 20px;">
        <div style="display: flex;align-items: center;width: 350px;flex-wrap: wrap;">
          <div style="color: #eee;display: block;font-family: initial;font-size: 14px">
            <a href="http://www.scholat.com/" target="_blank">© 2020 SCHOLAT + LAB</a>&nbsp;&nbsp;
            <a href="http://www.beian.miit.gov.cn" target="_blank">粤ICP备16019897号</a>
          </div>
        </div>

      </div>
      <div class="nav-inner-login">
        <a href="/login" class="title" style="flex: 1;min-width: 70px;font-size: 12px">管理员登录</a>
        <a href="http://www.scholat.com/"  class="title" style="flex: 1;min-width: 45px;font-size: 12px">
          学者网
        </a>
      </div>


    </footer>
  </div>
</template>

<script>
    import TopHeader from '@/components/Nav/TopHeader'
    import TeacherList from './components/teacherList'
    import LeftNav from './components/leftNav'
    import RightNav from './components/RightNav/index'
    import TeacherInfo from '../teacher/components/BaseInfo'
    import bus from '../../utils/eventBus'

    export default {

        data() {
            return {
                componentName: 'teacherList',
                teacherProfile: {},//教师数据,
              unitQuery: {unitId: '',domainName:''},
                cId: '0',
                Letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
                showLetter: false,
                letter: 'A',
                showLetterList: true,
                showSortList: false,
                detailShow: 3,
                NavName: '师资队伍',
                searchKey:'',
                searchCount:0,
                catalogueName:'',
              unitId2:'',
              letterFlag:'',
              backgroundHome:'',
              backgroundHomeDefault:'backgroundHomeDefault.png',
              hackReset:true,
            }
        },
        ready() {
        },
      watch:{
        $route(){
          this.cId = this.$route.params.cId
          console.log("this.cId="+this.cId);
          if (this.cId===0||this.cId===undefined){
            this.cId===0
            let node = document.getElementById('middle-nav');
            node.children[1].children[0].innerText ="教师名录"
            if(this.$route.path.indexOf('search')===-1){
              this.$refs.info.cIdSend(this.cId);
            }
          }else {
            //根据cId获取分类名称
            this.api({
              url: "/catalogue/getCatalogueNameByCatalogueId",
              method: "get",
              params: {id: this.cId}
            }).then(data => {
              console.log(JSON.stringify(data));
              this.catalogueName=data[0].catalogue_name;
              console.log("this.catalogueName is " +this.catalogueName);
              let node = document.getElementById('middle-nav');
              node.children[1].children[0].innerText =this.catalogueName
              console.log("breadcrumbName=",this.catalogueName)
            }).catch(error => {
              console.log("QAQ........没有找到catalogueName")
            })
          }
        },
        'unitId':function (n,o) {
          console.log("unitIdunitIdunitIdunitIdunitIdunitId="+n)
        }
      },
        created(){
          this.init();
        },
        computed: {
            unitId: function () {
                return this.unitId2;
            },
       },
        mounted() {
          console.log("++++++++++++++++++++mounted");
            let _self = this;
            bus.$on("changePageList", function (searchKey) {
                _self.detailShow = 3;
                _self.componentName = "teacherList";
                _self.searchKey = searchKey;
                _self.searchCount++;
                document.getElementsByClassName('middle-nav')[0].style.display = "flex";
                let node = document.getElementById('middle-nav');
                node.children[1].children[0].innerText = "教师名录";
                console.log("node.children[1].children[0].innerText ="+"教师名录");
                _self.$router.push({
                    path: '/homepage',
                    name: 'search',
                    params: {
                        domainName: _self.unitQuery.domainName,
                        unitId: _self.unitId2,
                        modelId: 3,
                        searchKey:searchKey,
                        cId: 0
                    }
                })
            })
        },
      methods: {
        init(){
         // this.$store.state.user.domainName=this.$route.path.split('/')[2];
          this.unitQuery.domainName=this.$route.path.split('/')[2];
          this.api({
            url: "/homepage/getUnitInfo2",
            method: "get",
            params: this.unitQuery
          }).then(data => {
            console.log("查询学院信息为:" + JSON.stringify(data))
            console.log("================================")
            this.listLoading = false;
              console.log("cccc"+JSON.stringify(data));
            this.unitId2=data.unitId
            this.backgroundHome=data.backgroundHome
               console.log("  this.unitId  this.unitId  this.unitId  this.unitId"+  this.unitId);
            //   this.dataDone = true;
          }).catch(error => {
            console.log("QAQ........没有找到学院信息")
          })
        },
        allTeacher(){
          this.letterFlag='All';
          bus.$emit('getList_All')
        },
          rInfo(){
            console.log("info");
            this.$refs.info.cIdSend(this.cId);
          },
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
              this.$router.push({name:'teacher',
                params: { domainName:this.unitQuery.domainName,
                  unitId:this.unitId2,
                  modelId:this.detailShow,
                  cId:this.cId,
                tId:id}})
            },
            toList(name, modelId, cId) {
              this.cId = cId;
              if (cId == 0) {
                this.detailShow = 3;
                this.hackReset = false
                this.$nextTick(() => {
                  this.hackReset = true
                })
              } else {
                  this.detailShow = 2;
              }
              this.componentName = "teacherList";
              document.getElementsByClassName('middle-nav')[0].style.display = "flex";
              console.log("node.children[1].children[0].modeId ="+modelId);
              console.log("node.children[1].children[0].cId ="+cId);
            },
            detailShowChange(num) {
                this.detailShow = num;
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
                this.letterFlag=letter;
                this.showSortList = true;
                this.letter = letter;
                this.$refs.teacherList1.getLetter(letter);
            },
            simpleList() {
                this.detailShow = 2;
                this.showList = false;
                this.showSortList = false;
                this.showLetterList = false;
                this.$refs.teacherList1.getLetter(0);//发送0过去，则恢复默认
            },
            detailList() {
                this.detailShow = 1;
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
    margin-top: -4px;
  }
  .letterRed{
    color: red;
  }

  @media screen and (max-width: 1024px) {
    .letterList {
      font-size: 14px;
      letter-spacing: 4px;

    }
  }


  .dynamic-page {
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

  @media screen and (max-width: 768px) {
    .homePage-body {
      min-height: 1220px;
    }
  }

  /*底部栏样式*/
  footer {
    background-color: #555555;
    height: 60px;
    width: 100%;
    margin-top: 30px;
    /*position: absolute;
    bottom: 0;*/
    /*position:fixed;
    bottom:0;
    left:0;*/
  }
  .nav-inner-login {
    display: flex;
    align-content: center;
    font-size: 14px
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
  /*底部栏样式结束*/

</style>
