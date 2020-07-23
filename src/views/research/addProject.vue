<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createProject" type="success" style="margin-left: 20px;">创建</el-button>
    </div>
  </div>
</template>

<script>
  import {filterXSS} from 'xss'
  import modifyPage from './components/modifyProjectPage'

  export default {
    name: "addProject",
    components: {
      modifyPage
    },
    methods:{
      createProject(){
        this.$refs.modifyPage.createProject();
      }
    }
  }
</script>

<style scoped>

</style>
