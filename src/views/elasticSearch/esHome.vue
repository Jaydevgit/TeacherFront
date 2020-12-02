<template>
    <div id="app" style="width: 100%;">
      <div class="header">

      </div>

      <div class="search">
        <div  style="text-align: center"><img src="../../assets/defaultLogo.png" height="88px"></div>
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
    </div>
</template>

<script>
  export default {
    name: "esHome",
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
      }
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    border-bottom:1px solid #EBEBEB;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .search{
    margin-top:108px;
    width: 50%;
    margin-left: 25%;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
</style>
