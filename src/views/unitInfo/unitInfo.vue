<template>
  <div class="container" style="padding-top: 30px;">

    <el-form ref="applyForm" :model="applyForm"
             :rules="applyRules"
             label-width="150px">
      <el-form-item label="学校名称：">
        <el-input v-model="applyForm.schoolName" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学校英文名称：">
        <el-input v-model="applyForm.schoolEng" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学校域名：">
        <el-input v-model="applyForm.domainName" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学院名称：">
        <el-input v-model="applyForm.unitName" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学院英文名称：">
        <el-input v-model="applyForm.unitEng" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学院链接：" prop="collegeUrl">
        <el-input v-model="applyForm.collegeUrl" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学院图标：">
        <div style="margin-left: 15px;">
          <!--提交完后显示这个-->
          <img :src="showLogo"
               :onerror="defaultLogo" style="width: 120px;"/>
        </div>
        <div style="color: red">提示：如上方显示的不是贵校的图标，可点击下方按钮自行上传图标</div>
        <div>
          <el-button @click="uploadImage('unit')" size="mini" type="primary" style="margin-top:7px;float: left">上传学校LOGO</el-button>
          <el-button @click="restoreImage(1)" size="mini"  style="margin-left: 35px;">恢复系统默认</el-button>
        </div>
      </el-form-item>

      <el-form-item label="背景模式" >
        <el-radio-group v-model="applyForm.state" >
          <el-radio :label="0">默认模式</el-radio>
          <el-radio :label="1">自定义背景</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item v-if="applyForm.state == 1" label="自定义背景："  >
        <div style="margin-left: 15px;">
          <!--提交完后显示这个-->
          <img :src="showBack"
               :onerror="defaultBack" style="width: 420px; height: 72px;"/>
        </div>
        <div style="color: red">提示：点击下方按钮自行上传背景图片</div>
        <div>
          <el-button @click="uploadImage('background')" size="mini" type="primary" style="margin-top:7px;float: left">上传背景图片</el-button>
          <el-button @click="restoreImage(0)" size="mini"  style="margin-left: 35px;">恢复系统默认</el-button>
        </div>
      </el-form-item>

      <crop-image ref="cropImage" @crop-url-callback="cropImageCallback"></crop-image>
      <el-form-item label="操作：">
        <el-button type="success" size="mini" class="finish-button"  @click="handleApply('applyForm')">
          确定提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import cropImage from '../unitApply/utils/cropImage'
  export default {
    data () {
      return {
        defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
        defaultBack: 'this.src="http://47.106.132.95:2333/images/background/1569738575202258.png"',
        applyForm : {
          schoolName:'',
          unitName:'',
          schoolEng:'',
          unitEng:'',
          collegeUrl: '',
          logoUrl:'1',
          unitId : '',
          state : '',
          backgroundUrl:'',
          domainName:''
          },
        showLogo : '',
        showBack : '',
        applyRules: {
          collegeUrl: [{required : true , message: "学院主页链接不能为空"}], //學院連接
          collegeLogo: [{required : true , message: "学院图标不能为空" ,trigger: 'change'}],   //學院图标
          backSelect : [{required : true , message: "背景模式不能为空" ,trigger: 'change'}]    //背景模式
        },
      }
    },
    created () {
      this.getUnitInfo()
    },
    ready(){
    }
    ,
    computed: {


    },
    methods: {
      getUnitInfo() {
        this.api({
          url: "/unit/getUnitInfo",
          method: "get",
          params: {unitId: this.$store.getters.unitId}
        }).then(data => {
          console.log(JSON.stringify(data))
          this.applyForm = data
          if (data.logoUrl != null && data.logoUrl.indexOf('scholat') == -1)
            this.showLogo = 'http://47.106.132.95:2333/images/unit_logo/' + data.logoUrl
          else
            this.showLogo = data.logoUrl;
          this.showBack = 'http://47.106.132.95:2333/images/background/' + data.backgroundUrl;
        }).catch(error => {
          console.log("QAQ........没有找到学院信息")
        })
      },
      cropImageCallback(imageName, msg) {
        this.$message.success("上传" + imageName + "成功")
        console.log('上传图片成功,并返回图片文件名:' + imageName)
        console.log("上传完图片后返回的msg为：" + msg)
        if (msg.indexOf('unit') != -1) {
          this.showLogo = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showLogo)
          this.applyForm.logoUrl = imageName
        }
        if (msg.indexOf('background') != -1) {
          this.showBack = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showBack)
          this.applyForm.backgroundUrl = imageName
        }
      },
      uploadImage(type) {
        //this.$message.success("准备上传的是: "+type)
        this.$refs.cropImage.transportMessage(type)
        this.$refs.cropImage.dialogVisible = true
      },
      restoreImage(type){
        if (type == 1) {
          this.applyForm.logoUrl = 'http://www.scholat.com/images/uni_logo/' + this.applyForm.schoolName + '.png'
          this.showLogo = 'http://www.scholat.com/images/uni_logo/' + this.applyForm.schoolName + '.png'
        }
        else {
          this.applyForm.backgroundUrl = 'http://47.106.132.95:2333/images/background/1569738575202258.png'
          this.showBack = 'http://47.106.132.95:2333/images/background/1569738575202258.png'
        }
        },
      handleApply(applyForm) {
        this.$confirm('确定修改学院信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$refs['applyForm'].validate((valid) => {
            if (valid) {
              this.submitForm()
            }
            else{
              this.$message.error("提交失败，请检查填写信息");
              return false;
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });
      },
      submitForm(){
        this.applyForm.unitId = this.$store.getters.unitId
        console.log(this.applyForm)
        this.api({
          url: '/unit/updateUnitInfo',
          method: 'post',
          data: this.applyForm
        }).then(data => {
          this.$message.success("提交成功");
        }).catch(e => {
          this.$message.error("提交失败");
        })
      }
    },


    components: {
      cropImage
    }
  }
</script>




<style rel="stylesheet/scss" lang="scss" scoped>

  .container {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }


</style>
