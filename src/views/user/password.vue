<template>
    <div class="password">
      <div style="font-family: 'Helvetica Neue';font-size: 20px"><span>修改密码</span></div>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--        <el-form-item label="原始密码" prop="passOld">-->
<!--          <el-input type="password" v-model="ruleForm.passOld" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "password",
      data() {
        // var validatePassOld = (rule, value, callback) => {
        //   if (value === '') {
        //     callback(new Error('请输入密码'));
        //   } else {
        //     if (this.ruleForm.checkPass !== '') {
        //       this.$refs.ruleForm.validateField('checkPass');
        //     }
        //     callback();
        //   }
        // };
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          ruleForm: {
          //  passOld:'',
            password: '',
            checkPass: '',
          },
          rules: {
            // passOld: [
            //   { validator: validatePassOld, trigger: 'blur' }
            // ],
            password: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      created(){
         console.log("user="+this.$store.state.user.userId  )
    },
      methods: {
        submitForm(formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.ruleForm.userId=this.$store.state.user.userId
              console.log("加密后的密码为："+this.md5(this.ruleForm.password+this.salt));
              this.ruleForm.password= this.md5(this.ruleForm.password+this.salt);
              this.api({
                url: "/user/updateSelfPass",
                method: "post",
                data: this.ruleForm
              }).then(() => {
                this.$message({
                  message: "修改成功",
                  type: 'success',
                })
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        }
      }

    }
</script>

<style scoped>
  .password{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 50%;
    margin: 50px 50px 50px 50px;
    padding: 20px 50px 50px 20px;
  }
  .demo-ruleForm{
    padding-top: 20px;
  }
</style>
