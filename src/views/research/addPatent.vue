<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createPatent" type="success" style="margin-left: 20px;">创建</el-button>
    </div>
  </div>
</template>

<script>
  import {filterXSS} from 'xss'
  import modifyPage from './components/modifyPatentPage'

  export default {
    name: "addPatent",
    components: {
      modifyPage
    },
    methods:{
      createPatent(){
        this.$refs.modifyPage.createPatent();
      }
    }
  }
</script>

<style scoped>

</style>
