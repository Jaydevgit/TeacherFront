<template>
  <div class="left-container">
    <div style="padding-top: 32px;width: 100%;min-width: 184px;">
      <el-row style="width: 100%;float: left;border-radius: 10px;">
        <el-col>
          <el-menu

            class="el-menu-vertical-demo"
            background-color="#ffffff"
            :mode="displayMode"
            style="overflow: hidden">
            <el-menu-item index="0" >
              <span slot="title" class="parentCatalogue">推荐教师</span>
            </el-menu-item>
            <el-menu-item v-for="(item, flag) in unitList" :key="'cId'+item.id" :index="item.id+''">
              <div slot="title" @click="uIdSend(item.id,item.domain_name)">
                <i class="el-icon-menu"></i>
                <span class="parentCatalogue">{{item.unit_name}}</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
    export default {
      name: "LeftNav",
      data(){
        return{
          displayMode:'vertical',
          unitList:[],
          listLoading: false,//数据加载等待动画
          schoolDomain:'',
          currentCat:'',
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

  @media screen and (min-width: 1025px){
    .parentCatalogue {
      font-size: 16px;
      letter-spacing: 3px;
    }
    .subcatalogueName {
      padding-left: 15px;
      color: #8590a6;
    }
    .el-menu {
      box-shadow: 0px 2px 10px 0px rgba(0, 81, 193, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      border-right: none !important;
    }

    .el-menu-item {
      background-color: white;
      height: 50px;
      line-height: 50px;
    }

    .el-menu-item:hover {
      background-color: white;
    }
  }

  .newsLi {
    height: 76px;
    padding: 5px 5px 5px 0px;
  }

  .is-active {
    background-color: #0099cc !important;
    color: white;
  }

  .is-active > span {
    color: white;
  }

  .teacherLi {
    float: left;
    padding: 10px 30px 5px 5px;
    height: 224px;
  }

  .bigText {
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText {
    color: #8590a6;
  }

  .left-container {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .header-navs {
    position: relative;
    border: 2px solid #3399CC;
  }

  .navs {
    height: 50px;
    line-height: 50px;
  }


  .nav {
    float: left;
    width: 120px;
    text-align: center;
    border-right: 2px solid #3399CC;
  }

  .nav-item {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #3399CC;
  }

  .nav-item:hover {
    color: white;
    background-color: #3399CC;

  }

  .nav2 {
    display: inline-block;
    width: 30px;
    text-align: center;
  }

  .nav-item2 {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-decoration: none;
    color: #3399CC;
  }

  .nav-item2:hover {
    color: white;
    background-color: #3399CC;
  }

  .nav-item-active {
    color: white;
    background: #3399CC;
  }

</style>
