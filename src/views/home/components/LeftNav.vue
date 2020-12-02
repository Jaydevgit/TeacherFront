<template>
  <div class="left-container">
    <div class="left-content">
      <div class="wp">
        <div class="wp-left">
          <div class="wp-left-img" v-if="this.unitList[0]">
            <img :src="'http://www.scholat.com/images/uni_logo/'+this.unitList[0].school_name+'.png'"
                 :onerror="defaultLogo"
                 height="100px"/>
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
              background-color="#002d5400"
              text-color="#fff"
              active-text-color="#fff"
              class="el-menu-vertical-demo"
              :mode="displayMode"
              style="overflow: hidden">
              <el-menu-item style="" active- index="0" @click="getAllTeacher()">
                <span slot="title" class="parentCatalogue">学校首页</span>
              </el-menu-item>
              <!--<el-submenu index="1">
                <div slot="title">
                  <span class="parentCatalogue">校内单位</span>
                </div>
                <el-menu-item-group>
                  <el-menu-item
                    v-for="(sub, index) in unitList" :key="'subId'+sub.id" :index="sub.id+''"
                    @click="uIdSend(sub.id,sub.domain_name)">
                    <span class="subcatalogueName">{{sub.unit_name}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <div slot="title">
                  <span class="parentCatalogue">学科方向</span>
                </div>
                &lt;!&ndash;<el-menu-item-group>
                  <el-menu-item
                    v-for="(sub, index) in unitList" :key="'subId'+sub.id" :index="sub.id+''"
                    @click="uIdSend(sub.id,sub.domain_name)">
                    <span class="subcatalogueName">{{sub.unit_name}}</span>
                  </el-menu-item>
                </el-menu-item-group>&ndash;&gt;
              </el-submenu>-->
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
  z-index: 1000;
  top: 0;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 200px;
  margin: 0 auto;
  width: 100%;
  background-color:rgba(0,45,84,0.7);
  color: white;
  padding-top: 5px;
}
.left-content{
  max-width: 960px;
  margin: 0 auto;
}
.wp{
  height: 120px;
  /*border-bottom: 1px solid gray;*/
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
.line{
  background:#E7E7E7;/*背景色为浅灰色*/
  width:0.6px;/*设置宽高*/
  height:40px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 40px;
}

.ul-nav{

}
.el-menu--horizontal>.el-menu-item {
  float: left;
  height: 60px;
  line-height: 60px;
  margin: 0;
  border-bottom: 0px solid transparent;
  border-top: 2px solid gray;

}
.el-menu-item:hover {
  background-color: #002d5400 !important;
  text-decoration: underline;
  border-top: 3px solid #CC9966;
}
.is-active {
  background-color: #002d5400 !important;
  color: white;
  text-decoration: underline  ;
  border-top: 3px solid #CC9966;
}
</style>

