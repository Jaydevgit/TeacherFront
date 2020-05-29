<template>
  <div>
      <el-row>
        <el-col :span="12"><div class="password"> <div style="font-family: 'Helvetica Neue';font-size: 20px;"><span>基本信息</span></div>
          <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <!--        <el-form-item label="原始密码" prop="passOld">-->
            <!--          <el-input type="password" v-model="ruleForm.passOld" autocomplete="off"></el-input>-->
            <!--        </el-form-item>-->
            <el-form-item label="姓名" prop="chinese_name">
              <el-input type="chinese_name" v-model="ruleForm1.chinese_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="phone">
              <el-input type="phone" v-model="ruleForm1.phone" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input type="email" v-model="ruleForm1.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm1()">提交修改</el-button>
            </el-form-item>
          </el-form>
        </div>
        </el-col>
        <el-col :span="12">
          <div class="password"> <div style="font-family: 'Helvetica Neue';font-size: 20px;"><span>密码修改</span></div>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

              <el-form-item label="新密码" prop="password">
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
        </el-col>
      </el-row>
    </div>
</template>

<script>
  import {isPhone, isEmail} from '@/utils/validator.js'
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
          ruleForm1:{
            chinese_name: '',
            phone: '',
            email: '',
          },
          rules: {
            chinese_name: [{required: true, trigger: 'blur', message: "姓名不能为空"}, {
              max: 30,
              message: "长度小于30字符"
            }],
            phone: [
              {required: true, trigger: 'blur', message: "电话号码不能为空"},
              {max: 30, message: "长度小于30字符"},
              {validator: isPhone, trigger: 'blur'}
            ],
            email: [
              {required: true, trigger: 'blur', message: "邮箱不能为空"},
              {min: 3, message: "长度大于3字符"},
              {validator: isEmail, trigger: 'blur'}
            ],
            // passOld: [
            //   { validator: validatePassOld, trigger: 'blur' }
            // ],
            password: [
              { validator: validatePass, trigger: 'blur' },
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
      created(){
          this.getUserInfo();
         console.log("user="+this.$store.state.user.userId  )
    },
      methods: {
        getUserInfo(){
          this.ruleForm.userId=this.$store.state.user.userId
          this.api({
            url: "/user/getInfo",
            method: "post",
            data: this.ruleForm
          }).then((res) => {
            this.ruleForm1.chinese_name=res.nickname;
            this.ruleForm1.phone=res.phone;
            this.ruleForm1.email=res.email;
          })
        },
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
        submitForm1(){
          this.ruleForm1.userId=this.$store.state.user.userId
          this.api({
            url: "/user/updateInfo",
            method: "post",
            data: this.ruleForm1
          }).then((res) => {
            this.$message({
              message: "修改成功",
              type: 'success',
            })
          }).catch((e)=>{
            console.log('error submit!!');
          })
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
    width: 90%;
    margin: 50px 50px 50px 50px;
    padding: 20px 50px 50px 20px;
  }
  .demo-ruleForm{
    padding-top: 20px;
  }
</style>
