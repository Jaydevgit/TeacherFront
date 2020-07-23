<template>
  <div class="modify-page">
    <el-button type="primary" icon="plus" @click="backToManager">返回</el-button>
    <el-alert
      style="width:300px;float: right"
      title="注意: "
      description="所有修改只在提交后生效"
      type="error">
    </el-alert>

    <div style="clear: both;"></div>

    <el-form :model="ruleForm" label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="100px"
             class="demo-ruleForm">

      <el-row type="flex" class="row-bg first-card" justify="center">

        <el-col :span="24">
          <div class="grid-content">
            <el-form-item label="专利标题" prop="title">

              <el-input v-model="ruleForm.title" ></el-input>

            </el-form-item>

            <el-form-item class="font-one" label="作者" prop="authors">
              <el-input v-model="ruleForm.authors"
                        placeholder="请输入作者"></el-input>
            </el-form-item>

          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg first-card" justify="center">
        <el-col :span="24">
          <el-form-item label="出版时间" prop="datetime">
            <el-date-picker
              v-model="ruleForm.datetime"
              value-format="yyyy-MM-dd"
              type="month"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="出版社" >
            <el-input v-model="ruleForm.press"></el-input>
          </el-form-item>
          <el-form-item label="作品简介" prop="summary">
            <el-input v-model="ruleForm.citation"
                      type="textarea" :rows="10" ></el-input>
          </el-form-item>

        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: "modifyPublicationPage",
    mounted() {
      if(this.$route.params.id !=null){
        this.getPublicationInfoById(this.$route.params.id)
        this.modifyState = 1;
      }
    },
    data() {
      return {
        defaultImage: 'this.src="../src/assets/img/defaultAvatar.png"',
        modifyState : 0,
        dialogFormVisible :false,
        ruleForm: {
          id: '',
          title:'',
          authors :'',
          citation:'',
          press:'',
          datetime:'',
        },
        teacherList:[],
        multipleSelection: [],
        searchList:[],
        rules: {
          title: [
            {required: true, message: '请输入项目标题', trigger: 'change'}
          ],
          authors:[
            {required: true, message: '请输入作者', trigger: 'change'}
          ],
          press: [
            {required: true, message: '请输入出版社', trigger: 'change'}
          ],
          // projectNumber: [
          //     {required: true, message: '请输入项目编号', trigger: ['blur', 'change']}
          // ],
          datetime: [
            {required: true, message: '请选择时间', trigger: 'blur'}
          ],
          citation:[
            {required: true, message: '请输入作品简介', trigger: ['blur', 'change']}
          ]
        }
      }
    },
    methods:{
      getPublicationInfoById(projectId) {
        if (projectId != null) {
          this.api({
            url: "/academic/publicationInfo/" + projectId,
            method: "get"
          }).then(data => {
            console.log("根据id查询论文信息为:" + JSON.stringify(data))
            let datetime = data.datetime
            let arr = datetime.split('\\.')
            let string = arr[0] + "-"
            if (arr[1] != "-") {
              string += arr[1] + "-01"
            }
            else
              string += "-01-01"
            data.datetime = string
            this.setPublicationInfo(data);
          }).catch(error => {
            //this.$message.success("QAQ........没有找到教师信息")
          })
        }
      },
      createPublication() {
        this.ruleForm.unitId = this.$store.state.user.unitId;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            console.log("验证表单信息成功")
          } else {
            console.log("验证表单信息失败")
            return false;
          }
        });

        console.log(this.ruleForm);

        this.api({
          url: "/academic/addProject",
          method: "post",
          data: this.ruleForm
        }).then((res) => {
          this.$message.success("添加成果信息成功")
          this.$router.push({
            path: '/research/project'
          })
        }).catch(e => {

        })

      },
      backToManager() {
        this.$router.push({
          path: '/academic/project'
        })
      },
      setPublicationInfo(data){
        this.ruleForm.id = data.id
        this.ruleForm.title = data.title
        this.ruleForm.authors = data.authors
        this.ruleForm.citation = data.citation
        this.ruleForm.press = data.press
        this.ruleForm.datetime = data.datetime
      },
      // 更新论文成员信息
      updatePublication() {
        this.ruleForm.unitId = this.$store.state.user.unitId;
        this.ruleForm.id = this.$route.params.id
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.api({
              url: "/academic/updatePublication",
              method: "post",
              data: this.ruleForm
            }).then((res) => {
              this.$message.success("添加成果信息成功")
              this.$router.push({
                path: '/research/publication'
              })
            }).catch(e => {

            })
          } else {
            console.log("验证表单信息失败")
            return false;
          }
        });
        console.log(this.ruleForm);
      },
    }
  }
</script>

<style scoped>

</style>
