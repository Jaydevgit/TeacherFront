<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="updatePaper"  type="success" style="margin-left: 20px;">提交更新</el-button>
    </div>
  </div>
</template>

<script>
  import ModifyPage from './components/modifyPaperPage'

  export default {
    name: "updatePaper",
    components: {
      modifyPage:ModifyPage
    },
    created() {
      console.log("@@@@@@@@@@修改论文界面@@@@@@@@@@@@@")
      console.log(this.hasPerm('teacher:list') + "...论文id.." + this.$route.params.id)
    },
    data() {
      return {}
    },
    methods: {
      updatePaper(){
        this.$refs.modifyPage.updatePaper();
      }
    }
  }
</script>

<style scoped>
</style>
