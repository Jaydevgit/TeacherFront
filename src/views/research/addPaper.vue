<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="createPaper" type="success" style="margin-left: 20px;">创建</el-button>
    </div>
  </div>
</template>

<script>
  import {filterXSS} from 'xss'
  import modifyPage from './components/modifyPaperPage'

  export default {
    name: "addPaper",
    components: {
      modifyPage
    },
    methods:{
      createPaper(){
        this.$refs.modifyPage.createPaper();
      }
    }
  }
</script>

<style scoped>

</style>
