<template>
  <div class="app-container">
    <modify-page></modify-page>
    <!--<div slot="footer" class="dialog-footer">
      <el-button @click="createTeacher" type="success" style="margin-left: 20px;">创建</el-button>
    </div>-->
  </div>
</template>

<script>
  import {filterXSS} from 'xss'
  import ModifyPage from './components/modifyTeacherPage'

  export default {
    name: "addTeacher",
    components: {
      modifyPage:ModifyPage
    },
    data() {
      return {}
    },
    methods:{
      // createTeacher(){
      //   this.$refs.modifyPage.createTeacher();
      // }
    }
  }
</script>

<style scoped>

</style>
