<template>
  <div class="app-container">
    <modify-page ref="modifyPage"></modify-page>
    <div slot="footer" class="dialog-footer">
      <el-button @click="updateTeacherFunction"  type="success" style="margin-left: 20px;">提交更新</el-button>
    </div>
  </div>
</template>

<script>
  import ModifyPage from './components/modifyTeacherPage'

  export default {
    name: "updateTeacher",
    components: {
      modifyPage:ModifyPage
    },
    created() {
      console.log("@@@@@@@@@@修改教师界面@@@@@@@@@@@@@")
      console.log(this.hasPerm('teacher:list') + "...教师id.." + this.$route.params.id)
    },
    data() {
      return {}
    },
    methods: {
      updateTeacherFunction(){
        this.$refs.modifyPage.updateTeacher();
      }
    }
  }
</script>

<style scoped>
</style>
