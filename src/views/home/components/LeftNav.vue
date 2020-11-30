<template>
  <div class="left-container">
    <div class="left-content">
      <div class="wp">
        <div class="wp-left">
          <div class="wp-left-img" v-if="this.unitList[0]">
            <img :src="'http://www.scholat.com/images/uni_logo/'+this.unitList[0].school_name+'.png'"
                 :onerror="defaultLogo"
                  height="100px"
                  style="margin-top: 10px"/>
          </div>
          <div class="wp-left-content">
            <div v-if="this.unitList[0]">
              <span>{{this.unitList[0].school_name}}</span>
            </div>
            <div class="line"></div>
            <div>
              教师个人主页
            </div>
          </div>
        </div>
        <div class="wp-right"></div>
      </div>
      <div class="ul-nav">
        <el-row>
          <el-col>
            <el-menu
              background-color="#002d54"
              text-color="#fff"
              active-text-color="#ffd04b"
              class="el-menu-vertical-demo"
              :mode="displayMode"
              style="overflow: hidden">
              <el-menu-item index="0" @click="getAllTeacher()">
                <span slot="title" class="parentCatalogue">所有教师</span>
              </el-menu-item>
              <el-menu-item v-for="(item, flag) in unitList" :key="'cId'+item.id" :index="item.id+''" @click="uIdSend(item.id,item.domain_name)">

                <div slot="title" >
                  <!--<i class="el-icon-menu"></i>-->
                  <span class="parentCatalogue">{{item.unit_name}}</span>
                </div>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>

<script>
    export default {
      name: "LeftNav",
      data(){
        return{
          displayMode:'horizontal',
          unitList:[],
          listLoading: false,//数据加载等待动画
          schoolDomain:'',
          currentCat:'',
          defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
        }
      },
      created() {
        this.init();
      },
      mounted() {

      },
      computed: {

      },
      methods: {
        init(){
          this.$store.state.user.schoolDomain=this.$route.path.split('/')[2];
          this.schoolDomain=this.$route.path.split('/')[2];
          console.log("schoolDomain="+this.schoolDomain)
          this.api({
            url: "/home/"+this.schoolDomain,
            method: "get",
          }).then(data => {
            console.log("查询学校信息为:" + JSON.stringify(data))
            console.log("================================")
            this.listLoading = false;
            this.unitList = data;
          }).catch(error => {
            console.log("QAQ........没有找到学校信息")
          })
        },
        getAllTeacher(){
          this.$router.push(
            { name:'home',
              params: {
                schoolDomain:this.schoolDomain
          }})
        },
        uIdSend: function (uId,unitDomain) {
          this.currentCat=uId;
          console.log("send++++" + this.currentCat);

          this.$emit("toList", uId);
          console.log("leftNav的uId="+uId);

          this.$router.push({
            path: '/home',
            name: 'unit',
            params: {
              domainName: unitDomain,
              schoolDomain:this.schoolDomain,
            }
          })
        }


      },
    }
</script>

<style scoped>
  @import '../../../styles/catalogueVariables.scss';

  .el-row{
    /*height: 80px;*/
    padding: 0;
    margin-bottom: 0;
  }

  @media screen and (min-width: 1025px){
    .parentCatalogue {
      font-size: 16px;
      letter-spacing: 3px;
    }

    .el-menu {
      background-color:rgba(0,45,84,0.5);
    }

    .el-menu-item {
      /*background-color: white;
      height: 50px;
      line-height: 50px;*/
    }
  }
  .left-container {
    /*display: flex;
    align-items: center;
    width: 100%;*/
    position: fixed;
    top: 0;
    z-index: 1000;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 180px;
    margin: 0 auto;
    width: 100%;
    background-color:rgba(0,45,84,0.8);
    color: white;
    padding-top: 5px;
  }
  .left-content{
    max-width: 960px;
    margin: 0 auto;
  }
  .wp{
    height: 100px;
    /*border-bottom: 1px solid rgb(0,45,84);*/
    line-height: 120px;

  }
  .wp-left{
    display: flex;
  }
  .wp-left-content{
    display: flex;
    font-size: 34px;
    margin-left: 20px;
    font-family: 楷体;
  }
  。wp-left-img{

  }
  .line{
    background:#e2e2e2b5;/*背景色为浅灰色*/
    width:1px;/*设置宽高*/
    height:40px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 40px;
  }

  .ul-nav{
    transform: translateY(15px);
  }


</style>
