<template>
  <div class="left-container">
    <div style="padding-top: 32px;width: 100%;min-width: 184px;">
      <el-row style="width: 100%;float: left;border-radius: 10px;">
        <el-col>
          <el-menu
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            class="el-menu-vertical-demo"
            :mode="displayMode"
            style="overflow: hidden">
            <el-menu-item index="0" >
              <span slot="title" @click="getAllTeacher()" class="parentCatalogue">所有教师</span>
            </el-menu-item>
            <el-menu-item v-for="(item, flag) in unitList" :key="'cId'+item.id" :index="item.id+''">

              <div slot="title" @click="uIdSend(item.id,item.domain_name)">
                <!--<i class="el-icon-menu"></i>-->
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
          displayMode:'horizontal',
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

  @media screen and (min-width: 1025px){
    .parentCatalogue {
      font-size: 16px;
      letter-spacing: 3px;
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
  }
  .left-container {
    display: flex;
    align-items: center;

  }



</style>
