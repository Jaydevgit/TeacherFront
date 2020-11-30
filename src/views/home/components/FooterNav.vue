<template>
  <div class="footerNav-container">
    <div class="footerNav-content">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <div class="foot-header">
            <span class="foot-header-cn">校内单位</span>
            <span class="foot-header-en">/SCHOOL UNIT</span>
          </div>
          <div class="foot-content" v-for="o in unitList">
            <div class="foot-div-item"><span class="foot-item">
              <a :href="'/homepage/'+schoolDomain+'/'+o.domain_name" class="text">
                {{o.unit_name}}
              </a>
            </span></div>
          </div>
          <!--<div class="foot-content">
            <div class="foot-div-item"><span class="foot-item">学科方向</span></div>
          </div>
          <div class="foot-content">
            <div class="foot-div-item"><span class="foot-item">博士生导师</span></div>
          </div>
          <div class="foot-content">
            <div class="foot-div-item"><span class="foot-item">两院院士
</span></div>
          </div>-->
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <div class="foot-header">
            <span class="foot-header-cn">帮助中心</span>
            <span class="foot-header-en">/HELP</span>
          </div>
          <div class="foot-content">
            <div class="foot-div-item"><span class="foot-item">帮助中心</span></div>
          </div>
          <div class="foot-content">
            <div class="foot-div-item"><span class="foot-item">
              <a target="_blank" href="https://www.yuque.com/vd7ii9/dvybyk/na3nsf">教师个人主页使用说明</a>
            </span></div>
          </div>
        </div></el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  export default {
    name: "FooterNav",
      data(){
        return{

        }
    },
    props: ['unitList','schoolDomain'],
  }
</script>

<style scoped>
.footerNav-container{
  position: relative;
  flex-flow: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 400px;
  margin: 0 auto;
  width: 100%;
  /*background: #f5f4f4;*/
  background: #002d54;
  color: white;
  padding-top: 20px;
}
.footerNav-content{
  max-width: 960px;
  margin: 0 auto;
}
.foot-header{
  width: 400px;
  border-bottom:2px solid white;
  height: 50px;
}
.foot-header-cn{
  font-size: 24px;
}
.foot-header-en{
  font-size: 12px;
  color: lightgrey;
}
.foot-div-item{
  margin-top: 20px;
}
.foot-item{
  width: auto;
}
.foot-item:hover{
  cursor: pointer;
  width: auto;
  border-bottom:1px solid black;
}
</style>
