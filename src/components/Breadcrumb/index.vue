<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if="item.meta.title">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{item.meta.title}}</span>
        <router-link v-else :to="item.redirect||item.path">{{item.meta.title}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
    mounted(){
      // alert(this.unit)
        this.getBreadcrumb()
    },
  data() {
    return {
      levelList: null,
    }
  },
  props:['unit'],
  watch: {
      unit:function(oldVal,newVal){
          this.getBreadcrumb()
      },
    $route() {
      this.getBreadcrumb()
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0];
      // var util = require("util")
      // console.log("this.$route.matched="+util.inspect(this.$route.matched));
      console.log("///////////////////"+matched+"///////////////////////////////");
      if (first && first.name !== '/manager/teacher') {
        if (this.$route.path.indexOf("school")!=-1) {
          matched = [{ path: '/', meta: { title: this.unit.schoolName+'后台管理' }}].concat(matched)
        } else{
          matched = [{ path: '/', meta: { title: this.unit.schoolName+this.unit.unitName+'后台管理' }}].concat(matched)
        }
      }
        this.levelList = matched
        console.log(this.levelList);
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
