<template>
  <div class="container" style="padding-top: 30px;">

    <el-form ref="applyForm" :model="applyForm"
             :rules="applyRules"
             label-width="150px">
      <el-form-item label="学校名称：">
        <el-input v-model="applyForm.schoolName" disabled="" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学校英文名称：">
        <el-input v-model="applyForm.schoolEng" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="学校链接：" placeholder="注意链接形式以'http'开头" prop="schoolUrl">
        <el-input v-model="applyForm.schoolUrl" style="width: 50%"></el-input>
      </el-form-item>
      <el-form-item label="主页背景设置：">
        <div style="" v-if="showBack.indexOf('http://faculty.scholat.com:2333/public/images/schoolBackground/')!=-1">
          <!--提交完后显示这个-->
          <img :src="showBack"
               :onerror="SchoolBg" style="width: 420px; height: 72px;"/>
        </div>
        <div style="color: red">提示：点击下方按钮自行上传背景图片</div>
        <div>
          <el-button @click="uploadImage('schoolBackground',1)" size="mini" type="primary" style="margin-top:7px;float: left">
            上传
          </el-button>
          <el-button @click="restoreImage(0)" size="mini" style="margin-left: 35px;">取消</el-button>
        </div>
      </el-form-item>
      <crop-image ref="cropImage" @crop-url-callback="cropImageCallback"></crop-image>
      <el-form-item label="操作：">
        <el-button type="success" size="mini" class="finish-button" @click="handleApply('applyForm')">
          确定提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

  import cropImage from '../unitApply/utils/cropImage'
  import SchoolBg from '@/assets/img/schoolBg2.jpg'

  export default {
    data() {
      return {
        defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
        //  defaultBack: 'this.src="http://faculty.scholat.com:2333/public/images/background/1569738575202258.png"',
        defaultBack: '',
        defaultBackHome:'',
        applyForm: {
          schoolName: '',
          unitName: '',
          schoolEng: '',
          schoolUrl:'',
          logoUrl: '1',
          schoolId: '',
          unitId: '',
          state: '',
          backgroundUrl: '',
          backgroundHome: '',
          schoolDomain:'',
          domainName: '',
          schoolBackground:'',
        },
        showLogo: '',
        showBack: '',
        showBackHome: '',
        applyRules: {
          schoolUrl: [
            {required: true, message: "学校主页链接不能为空"},
            {required: true, message: "注意：学校链接以‘http’或‘https’开头", pattern: /(http|https):\/\/([\w.]+\/?)\S*/　}
          ], //学校連接
          collegeLogo: [{required: true, message: "学院图标不能为空", trigger: 'change'}],   //學院图标
          backSelect: [{required: true, message: "背景模式不能为空", trigger: 'change'}]    //背景模式
        },
        fileList: [],
        SchoolBg:SchoolBg,
      }
    },
    created() {
      this.applyForm.state = 1;
      this.getSchoolInfo();
    },
    ready() {
    }
    ,
    computed: {},
    methods: {
      uploadFun(param){
        var data = new FormData(); //创建form对象
        data.append('file',param.file);
        //data.append('fileName',param.name);//我想要修改name属性，发现改成自定义上传后，html上的name不起作用了，想要在这         设置不起作用(name,fileName都试过，不起作用)，导致接口调不通，最终放弃
        this.axios.put('/api/attach/upload/certificate', data,
          {contentType: false, processData: false, headers: {'Content-Type': 'multipart/form-data'}}
        ).then(res => {
          console.log(".........图片文件名为: " + res.data+JSON.stringify(res))
          this.applyForm.backgroundHome=res.data
          this.applyForm.unitId = this.$store.getters.unitId
          // 给父组件传递返回的图片文件名
          this.api({
            url: '/unit/updateUnitInfo',
            method: 'post',
            data: this.applyForm
          }).then(data => {
            this.$message.success("上传成功")
            location.reload();
          }).catch(e => {
            this.$message.error("上传失败");
          })
        }).catch(error => {
          this.$message.error("哎呀.....上传图片失败")
        })

      },
      handleUpload(file){
        var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)
        console.log("testmsg="+testmsg);
        if ([ 'png', 'jpg','gif','bmp','jpeg'].indexOf(testmsg.toLowerCase())===-1) {
          this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 0.6     //这里做文件大小限制
        if(!isLt2M) {
          this.$message({
            message: '上传文件大小不能超过 600kB!',
            type: 'warning'
          });
          return false;
        }

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file.name);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，请先删除默认文件再进行上传`);
      },
      beforeRemove(file, fileList) {
        var path='backgroundHome'
        //上传背景前先删除原有背景
        if((this.applyForm.backgroundHome!==null&&this.applyForm.backgroundHome!=='')){
          this.api({
            url: "/attach/delete/" +path+"/"+this.applyForm.backgroundHome,
            method: "get"
          }).then(res => {
            this.applyForm.backgroundHome=undefined
            console.log("this.applyForm.backgroundHome="+this.applyForm.backgroundHome);
            this.applyForm.unitId = this.$store.getters.unitId
            // 给父组件传递返回的图片文件名
            this.api({
              url: '/unit/updateUnitInfo',
              method: 'post',
              data: this.applyForm
            }).then(data => {
              // this.$message.success("删除背景成功")
              location.reload();
            }).catch(e => {
              this.$message.error("删除背景失败");
            })
            console.log("删除背景成功")
          }).catch(error => {
            console.log("哎呀.....删除背景失败")
          })
          this.name=''
        }
      },
      getSchoolInfo() {
        this.api({
          url: "/school/getSchoolInfo",
          method: "get",
          params: {schoolId: this.$store.getters.schoolId}
        }).then(data => {
          console.log(JSON.stringify(data))
          this.applyForm = data
          if (data.logoUrl != null && data.logoUrl.indexOf('scholat') === -1)
            this.showLogo = 'http://faculty.scholat.com:2333/public/images/unit_logo/' + data.logoUrl
          else
            this.showLogo = data.logoUrl;
          if (data.backgroundUrl != undefined
            &&data.backgroundUrl != ''
            && data.backgroundUrl != null) {
            this.showBack = 'http://faculty.scholat.com:2333/public/images/schoolBackground/' + data.backgroundUrl;
          } else {
            this.showBack = ''
          }
          /*if (data.backgroundUrl != undefined &&
            data.backgroundUrl != ''
            && data.backgroundUrl != null) {
            this.showBack = 'http://faculty.scholat.com:2333/public/images/background/' + data.backgroundUrl;
          } else {
            this.showBack = ''
          }
          if (data.backgroundHome != undefined &&
            data.backgroundHome != ''
            && data.backgroundHome != null) {
            this.showBackHome = 'http://faculty.scholat.com:2333/public/images/background/' + data.backgroundHome;
            this.fileList.url='http://faculty.scholat.com:2333/public/images/background/' + data.backgroundHome;
            this.fileList.push({'name': 'default.png','url':this.fileList.url})
            console.log("this.fileList.url="+this.fileList.url);
          } else {
            this.showBackHome = ''
          }*/
        }).catch(error => {
          console.log("QAQ........没有找到学院信息")
        })
      },
      cropImageCallback(imageName, msg) {
        this.$message.success("上传" + imageName + "成功")
        console.log('上传图片成功,并返回图片文件名:' + imageName)
        console.log("上传完图片后返回的msg为：" + msg)
        if (msg.indexOf('unit') !== -1) {
          this.showLogo = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showLogo)
          this.applyForm.logoUrl = imageName
        }
        if (msg.indexOf('background') !== -1&&msg.indexOf('backgroundHome') === -1) {
          this.showBack = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showBack)
          this.applyForm.backgroundUrl = imageName
        }
        if (msg.indexOf('backgroundHome') !== -1) {
          this.showBackHome = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showBackHome)
          this.applyForm.backgroundHome = imageName
        }
        if (msg.indexOf('schoolBackground') !== -1) {
          this.showBackHome = this.$refs.cropImage.attach.laterUrl;
          console.log("显示的图片路径为：" + this.showBackHome)
          this.applyForm.schoolBackground = imageName
        }
        this.applyForm.state = 1;
        this.applyForm.unitId = this.$store.getters.unitId
        console.log(this.applyForm)
        this.api({
          url: '/school/updateSchoolInfo',
          method: 'post',
          data: this.applyForm
        }).then(data => {
          this.$message.success("提交成功");
          location.reload();
        }).catch(e => {
          this.$message.error("提交失败");
        })
      },
      uploadImage(type,n) {
        var name=''
        if(n===1){
          console.log("this.applyForm.backgroundUrl="+this.applyForm.backgroundUrl);
          name=this.applyForm.backgroundUrl
        }else{
          console.log("this.applyForm.backgroundHome="+this.applyForm.backgroundHome);
          name=this.applyForm.backgroundHome
        }
        //this.$message.success("准备上传的是: "+type)
        this.$refs.cropImage.transportMessage(type,name)
        this.$refs.cropImage.dialogVisible = true

      },
      restoreImage(type) {
        if (type == 1) {
          this.applyForm.logoUrl = 'http://www.scholat.com/images/uni_logo/' + this.applyForm.schoolName + '.png'
          this.showLogo = 'http://www.scholat.com/images/uni_logo/' + this.applyForm.schoolName + '.png'
          console.log(" this.showLogo=" + this.showLogo);
        } else {
          this.applyForm.backgroundUrl = ''
          this.showBack = ''
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
            } else {
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
      submitForm() {
        /*this.applyForm.state = 1;*/
        this.applyForm.schoolId = this.$store.getters.schoolId
        console.log("this.applyForm="+JSON.stringify(this.applyForm))
        this.api({
          url: '/school/updateSchoolInfo',
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
