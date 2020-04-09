<template>
  <div>
    <top-header :titleFlag="titleFlag"></top-header>
    <div class="apply-container">
      <el-form
        autoComplete="on"
        :model="applyForm"
        :rules="applyRules"
        ref="applyForm"
        label-position="left"
        label-width="150px"

        class="card-box apply-form">
        <div class="apply-title">学院管理员申请</div>
        <el-steps :active="active" align-center>
          <el-step title="步骤1" description="填写机构信息"></el-step>
          <el-step title="步骤2" description="填写管理员信息"></el-step>
          <el-step title="步骤3" description="注册成功"></el-step>
        </el-steps>
        <div v-show="active===0">
          <div class="top-title">机构信息</div>
          <div class="top">
            <el-form-item prop="school_name" label="学校名称：">
              <el-input class="apply-input" v-model="applyForm.school_name" auto-complete="off" placeholder="请输入学校名称"/>
            </el-form-item>

            <el-form-item prop="school_eng" label="学校英文名称：">
              <el-input class="apply-input" v-model="applyForm.school_eng" auto-complete="off" placeholder="请输入学校英文名称"/>
            </el-form-item>

            <el-form-item prop="school_name" label="学院名称：">
              <el-input class="apply-input" v-model="applyForm.unit_name" auto-complete="off" placeholder="请输入学院名称"/>
            </el-form-item>

            <el-form-item prop="unit_eng" label="学院英文名称：">
              <el-input class="apply-input" v-model="applyForm.unit_eng" auto-complete="off" placeholder="请输入学院英文名称"/>
            </el-form-item>

            <el-form-item label="学校图标：">
              <div>
                <!--如果logo链接不为空，则从学者网拉取图标-->
                <img v-if="certificate_logo_url != ''"
                     :src="certificate_logo_url"
                     :onerror="defaultLogo"/>
                <!--提交完后显示这个-->
                <img v-else :src="'http://www.scholat.com/images/uni_logo/'+applyForm.school_name+'.png'"
                     :onerror="defaultLogo"/>
                <div class="upload-btn">
                  <el-button @click="uploadImage('logo')" size="small" type="primary">上传学校LOGO</el-button>
                </div>
                <div style="position: absolute;left: 150px;top: 78px;color: red">提示：如输入学校名称后找不到学校图标，可点击下方按钮自行上传图标</div>
              </div>

            </el-form-item>
            <el-button type="success" style="position: absolute;top: -180px;right: 0;" @click="next()">下一步</el-button>
          </div>
        </div>
        <div v-show="active===1">
          <div class="top-title">管理员信息</div>
          <div class="top">
            <el-button type="success" v-if="!modifyBtnFlag" @click="handleApply('applyForm')"
            style="position: absolute;right: 0;top: -180px;">提交申请</el-button>
            <el-button type="warning" style="position: absolute;right: 110px;top: -180px" @click="previous">上一步</el-button>
            <el-form-item prop="username" label="用户名：">
              <el-input class="apply-input" v-model="applyForm.username" auto-complete="off"
                        placeholder="请输入您的用户名（全英文）"/>
            </el-form-item>

            <el-form-item prop="chinese_name" label="管理员姓名：">
              <el-input class="apply-input" v-model="applyForm.chinese_name" auto-complete="off"
                        placeholder="请输入您的姓名"/>
            </el-form-item>

            <el-form-item prop="email" label="管理员邮箱：">
              <el-input class="apply-input" v-model="applyForm.email" auto-complete="off" placeholder="请输入您的邮箱"/>
            </el-form-item>

            <el-form-item prop="phone" label="管理员电话：">
              <el-input class="apply-input" v-model="applyForm.phone" auto-complete="off" placeholder="请输入您的电话"/>
            </el-form-item>

            <el-form-item prop="password" label="密码：">
              <el-input class="apply-input" type="password" v-model="applyForm.password" auto-complete="off"
                        placeholder="大写字母（不少于一位）+小写字母+数字，8-20位"/>
            </el-form-item>

            <el-form-item prop="repassword" label="确认密码：">
              <el-input class="apply-input" type="password" v-model="applyForm.repassword" auto-complete="off"
                        placeholder="请再次输入密码"/>
            </el-form-item>
            <el-row style="width: 80%;">
              <el-col :span="10">
                <el-form-item prop="certificate_front" label="身份证明：">
                  <input type="hidden" v-model="applyForm.certificate_front"/>
                  <div>
                    <img :src="certificate_front_url" :onerror="cerLogo" class="certificate-img"/>

                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="10">
                <el-form-item prop="certificate_back">
                  <input type="hidden" v-model="applyForm.certificate_back"/>
                  <div>
                    <img :src="certificate_back_url" :onerror="cerLogo" style="margin-left: -45px" class="certificate-img"/>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                  <el-button @click="uploadImage('front')" size="small" type="primary" style="position: absolute;
    top: 15px;
    right: -65px;">上传正面身份证</el-button>
                  <el-button @click="uploadImage('back')" size="small" type="primary" style="position: absolute;
    top: 60px;
    right: -65px;">上传背面身份证</el-button>
              </el-col>
            </el-row>




            <el-form-item prop="certificate_working" label="在职证明：">
              <input type="hidden" v-model="applyForm.certificate_working"/>
              <div>
                <img :src="certificate_working_url" :onerror="cerLogo" class="certificate-img"/>
                <div class="upload-btn">
                  <el-button @click="uploadImage('working')" size="small" type="primary"
                  style="position: absolute;left: 86px;top: -21px;">上传在职证明</el-button>
                </div>
              </div>

            </el-form-item>

            <crop-image ref="cropImage" @crop-url-callback="cropImageCallback"></crop-image>

          </div>


        </div>
        <el-button type="warning" class="finish-button" v-if="modifyBtnFlag"
                   :loading="loading" @click.native.prevent="handleApply">
          提交修改
        </el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {isPhone, isEmail, isEnglish, passwordStyle} from '@/utils/validator.js'
    import TopHeader from '@/components/Nav/TopHeader'
    import cropImage from './utils/cropImage'

    export default {
        name: "UnitApply",
        data() {
            var validateUserName = (rule, value, callback) => {
                console.log("申请表.......进入到验证信息部分, 输入部分为:" + rule.field + " 输入值为: " + value)
                this.axios.post('/api/scholat/apply/validate', {
                    username: this.applyForm.username,
                }).then(res => {
                    console.log(res)
                    if (res.data.info.exist == null) {
                        // 说明没有找到同名的username
                        callback()
                    } else {
                        callback(new Error("该用户名已存在,请重新输入")) // 不填入信息的话表示正确返回
                    }
                }).catch(err => {
                    console.log(err)
                    //this.$message.error(err.message)
                    callback(new Error("该用户名已存在,请重新输入")) // 不填入信息的话表示正确返回
                })
            };

            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    return callback(new Error("请再次输入密码"));
                } else if (value != this.applyForm.password) {
                    return callback(new Error("两次输入密码不一致，请重新输入"))
                }
                return callback();
            };

            return {
                active: 0,
                cerLogo: 'this.src="http://47.106.132.95:2333/images/default/default_cer.png"',
                defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
                modifyBtnFlag: false,
                certificate_front_url: '',
                certificate_back_url: '',
                certificate_working_url: '',
                certificate_logo_url: '',
                applyForm: {
                    chinese_name: '',
                    username: '', // 用户名字，英文
                    password: '',// 密码加盐处理
                    repassword: '',
                    school_name: '',
                    unit_name: '',
                    school_eng: '',
                    unit_eng: '',
                    certificate_front: '',//身份证明正面
                    certificate_back: '',//身份证明反面
                    certificate_working: '',//在职证明
                    certificate_logo: '',//申请学院logo
                    phone: '',
                    email: '',
                },
                applyRules: {
                    username: [
                        {validator: isEnglish, trigger: 'blur'},
                        {required: true, min: 1, max: 25, message: '请输入用户名', trigger: 'blur'}
                    ],
                    chinese_name: [{required: true, trigger: 'blur', message: "姓名不能为空"}, {
                        max: 30,
                        message: "长度小于30字符"
                    }],
                    password: [
                        {required: true, trigger: 'blur', message: "密码不能为空"},
                        {min: 6, max: 20, message: "长度在 6 到 20个字符"},
                        // {pattern: /[a-zA-Z](?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{7,19}/, message: "姓名不能为空"},
                        // {validator: passwordStyle, trigger: 'blur'}
                    ],
                    repassword: [
                        {validator: validatePassword, trigger: 'blur'}
                    ],
                    school_name: [{required: true, trigger: 'blur', message: "学校名称不能为空"}, {
                        max: 30,
                        message: "长度小于30字符"
                    }],
                    unit_name: [{required: true, trigger: 'blur', message: "学院名称不能为空"}, {max: 30, message: "长度小于30字符"}],
                    school_eng: [
                        {required: true, trigger: 'blur', message: "学校英文名称不能为空"},
                        {max: 50, message: "长度小于50字符"},
                        {validator: isEnglish, trigger: 'blur'}
                    ],
                    unit_eng: [
                        {required: true, trigger: 'blur', message: "学院英文名称不能为空"},
                        {max: 50, message: "长度小于50字符"},
                        {validator: isEnglish, trigger: 'blur'}
                    ],
                    certificate_front: {required: true, message: "身份证证明不能为空"},//身份证明正面
                    certificate_back: {required: true, message: "身份证证明不能为空"},//身份证明反面
                    certificate_working: {required: true, message: "在职证明不能为空"},//在职证明
                    phone: [
                        {required: true, trigger: 'blur', message: "电话号码不能为空"},
                        {max: 30, message: "长度小于30字符"},
                        {validator: isPhone, trigger: 'blur'}
                    ],
                    email: [
                        {required: true, trigger: 'blur', message: "邮箱不能为空"},
                        {validator: isEmail, trigger: 'blur'}
                    ],
                },
                loading: false,
              titleFlag:true,
            }
        },
        components: {
            cropImage,
            'top-header': TopHeader
        },
        mounted() {

            this.testSetForm();
        },
        created() {
            this.reminder();
            var token = this.$route.params.token;
            console.log(token)
            if (token != undefined && token != "") {
                // 说明是个修改的申请表
                this.modifyBtnFlag = true;
                this.$message.success(token)
                this.api({
                    url: '/register/getApplyInfo',
                    method: 'post',
                    data: {
                        "token": token
                    }
                }).then(data => {
                    console.log('根据token找的申请信息表信息如下')
                    console.log(data)
                    // 把找到的信息填入表中
                    this.setForm(data)
                }).catch(e => {
                    console.log("虽然有token,但是这个token找不到对应的申请表")
                })
            } else {
                this.modifyBtnFlag = false
            }


        },
        methods: {
            setForm(data) {
                this.applyForm.username = data.username,
                    this.applyForm.chinese_name = data.chinese_name,
                    this.applyForm.password = '',
                    this.applyForm.repassword = '',
                    this.applyForm.school_name = data.school_name,
                    this.applyForm.unit_name = data.unit_name,
                    this.applyForm.certificate_front = data.certificate_front,//身份证明正面
                    this.applyForm.certificate_back = data.certificate_back,//身份证明反面
                    this.applyForm.certificate_working = data.certificate_working,//在职证明
                    this.applyForm.phone = data.phone,
                    this.applyForm.email = data.email
            },
            cropImageCallback(imageName, msg) {
                this.$message.success("上传" + imageName + "成功")
                console.log('上传图片成功,并返回图片文件名:' + imageName)
                console.log("上传完图片后返回的msg为：" + msg)
                if (msg.indexOf('front') != -1) {
                    this.certificate_front_url = this.$refs.cropImage.attach.laterUrl;
                    console.log("显示的图片路径为：" + this.certificate_front_url)
                    this.applyForm.certificate_front = imageName
                } else if (msg.indexOf('back') != -1) {
                    this.certificate_back_url = this.$refs.cropImage.attach.laterUrl;
                    console.log("显示的图片路径为：" + this.certificate_back_url)
                    this.applyForm.certificate_back = imageName
                } else if (msg.indexOf('working') != -1) {
                    this.certificate_working_url = this.$refs.cropImage.attach.laterUrl;
                    console.log("显示的图片路径为：" + this.certificate_working_url)
                    this.applyForm.certificate_working = imageName
                } else if (msg.indexOf('logo') != -1) {
                    this.certificate_logo_url = this.$refs.cropImage.attach.laterUrl;
                    console.log("显示的图片路径为：" + this.certificate_logo_url)
                    this.applyForm.certificate_logo = imageName
                }
            },
            uploadImage(type) {
                //this.$message.success("准备上传的是: "+type)
                this.$refs.cropImage.transportMessage(type)
                this.$refs.cropImage.dialogVisible = true
            },
            testSetForm() {
                /*this.applyForm.username = 'lsc',
                this.applyForm.chinese_name = '连善淳',
                this.applyForm.password = '123456',
                this.applyForm.repassword = '123456',
                this.applyForm.school_name = 'scnu',
                this.applyForm.unit_name = 'computer science',
                this.applyForm.certificate_front = '',//身份证明正面
                this.applyForm.certificate_back = '',//身份证明反面
                this.applyForm.certificate_working = '',//在职证明
                this.applyForm.phone = '13003922029',
                this.applyForm.email = '489572627@qq.com'*/
            },
            handleApply(applyForm) {
                this.$refs['applyForm'].validate((valid) => {
                    if (valid) {
                        this.submitForm();
                        this.next();
                    } else {
                        this.$message.error("提交失败，请检查填写信息");
                        return false;
                    }
                });
            },
            submitForm() {
                console.log("通过了验证")
                console.log("加密后的密码为：" + this.md5(this.applyForm.password + this.salt));
                this.applyForm.password = this.md5(this.applyForm.password + this.salt);
                this.api({
                    url: '/register/apply',
                    method: 'post',
                    data: this.applyForm
                }).then(data => {
                    if (data.exist == null) {
                        this.$message.success("提交成功");
                        this.applyForm.password = ""
                        this.applyForm.repassword = ""
                    } else {
                        this.$message.error("该学院已发起过申请");
                        this.applyForm.password = ""
                        this.applyForm.repassword = ""
                    }
                }).catch(e => {
                    this.$message.error("提交失败");
                })
            },
            next() {
                if (this.applyForm.school_name.length != 0 & this.applyForm.school_eng.length != 0 & this.applyForm.unit_name.length != 0 & this.applyForm.unit_eng.length != 0) {
                    if (this.active++ > 2) this.active = 0;
                    console.log(this.applyForm.school_name)
                } else {
                    this.$message.error("请将信息填入完整方可进行下一步")
                }


            },
            previous() {
                this.active--;
            },

          //上传所需文件提示框
            reminder() {
            this.$alert('<span><strong>1:身份证正反面照片</strong></span><br/><span><strong>2:在职证明文件照片</strong></span>', '注册所需准备文件', {
              dangerouslyUseHTMLString: true,
              confirmButtonText: '确定',
              callback: action => {
                this.$message({
                  type: 'info',
                  message: `action: ${ action }`
                });
              }
            });
          },
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";

  $bg: #2d3a4b;
  $dark_gray: #666666;
  $light_gray: #eee;
  $blue: #003f88;

  .apply-container {
    @include relative;
    /*height: 100vh;*/
    background-color: $light_gray;
    padding-top: 30px;
    min-height: calc(100vh - 98px);
    padding-bottom: 30px;
    background: url(../../assets/img/bg.png);
    background-size: cover;

    input {
      background-color: #F4F4F4;
      border-radius: 5px;
      border: none;
      font-size: 16px;
      padding-left: 10px;
      margin-bottom: 30px;
      outline: none;
      color: #333;
    }

    .apply-input {
      display: inline-block;
      width: 80%;
      height: 45px;
    }

    .apply-form {
      height: auto;
      width: 1000px;
      background-color: #ffffff;
      margin: 0 auto;
      border-radius: 5px;
      padding: 15px;
      border: 2px solid #d0cccc;
      box-shadow: 0 0 4px 1px #b7b5b5;

      .apply-title {

        align-items: center;
        text-align: center;
        font-size: 32px;
        font-weight: 800;
        color: #666666;
        margin: 0px 0 30px 0;
      }

      .top {
        margin-top: 30px;
        position: relative;
        margin-left: 112px;
      }

      .top-title {
        position: absolute;
        top: 41px;
        background: #399;
        color: white;
        padding: 15px;
        border-radius: 16% 29% 31% 16%;
      }

      label {
        color: #666666;
        font-size: 16px;
        text-align: right;
        width: 140px;
        display: inline-block;
        margin-right: 25px;
        float: left;
      }

    }

    .finish-button {
      width: 200px;
      display: block;
      margin: 20px auto;
      color: white;
      font-size: 20px;
      margin-bottom: 45px !important;
    }

    .line {
      width: 960px;
      height: 1px;
      margin: 30px auto;
      background: #EEEEEE;
      display: block;
    }

    .apply-upload {
      display: inline-block;
      width: 70%;
      height: 45px;
    }

    .certificate-img {
      width: 214px;
      height: 135px;
      margin: 8px;
      border-radius: 14px;
    }

    .upload-btn {
      width: 120px;
      height: 40px;
      position: absolute;
      left: 150px;
      top: 32px;
    }
  }

  .apply-container::after {
    content: "";
    background: gray;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
</style>
