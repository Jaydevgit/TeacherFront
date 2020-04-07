<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createTeacher" type="success" style="margin-left: 20px;">创建</el-button>
    </div>
  </div>
</template>

<script>
  import {filterXSS} from 'xss'
  import modifyPage from './components/modifyTeacherPage'

  export default {
    name: "addTeacher",
    components: {
      modifyPage
    },
    methods:{
      createTeacher(){
        this.$refs.modifyPage.createTeacher();
      }
    }
  }
</script>

<style scoped>

</style>
