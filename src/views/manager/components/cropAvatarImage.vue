<!--
裁剪头像组件,
返回上传头像的文件名
可以通过: http://47.106.132.95:2333/images/avatar/ 访问
-->
<template>
  <div class="crop-avatar-image">
    <div class="footerBtn">
      <img id="avatar-id" v-if="attach.laterUrl" :src="attach.laterUrl" class="preview"
           style="width:100px;height:100px"/>
      <!-- 弹出层-裁剪 -->
      <el-dialog
        title="编辑头像"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
            <span>
                <el-row>
                    <input
                      type="file"
                      id="uploads"
                      accept="image/png, image/jpeg, image/gif, image/jpg"
                      @change="uploadImg($event,1)"
                      class="el-button"
                      style="margin-bottom:15px"
                    >
                </el-row>
                <el-row>
                    <el-col :span="16">
                        <!-- 裁剪 -->
                            <vueCropper
                              style="width:100%;height:400px"
                              ref="cropper"
                              :img="attach.customaryUrl"
                              :autoCrop="options.autoCrop"
                              :fixedBox="options.fixedBox"
                              :canMoveBox="options.canMoveBox"
                              :autoCropWidth="options.autoCropWidth"
                              :autoCropHeight="options.autoCropHeight"
                              :centerBox="options.centerBox"
                              @realTime="realTime"
                            >

                            </vueCropper>
                    </el-col>
                    <el-col :span="8">
                        <h2 align="center">头像预览</h2>
                            <div class="show-preview">
                                <div :style="previews.div" class="preview">
                                    <img :src="previews.url" :style="previews.img">
                                </div>
                            </div>
                    </el-col>
                </el-row>
                <el-row class="footerBtn" align="center">
                    <el-button type="primary" size="small" round="" @click="cut('blob')">确认</el-button>
                    <el-button type="primary" size="small" round="" @click="handleClose">取消</el-button>
                </el-row>
            </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import logo from '@/assets/defaultLogo.png'

  export default {
    name: "cropAvatarImage",
    created() {
      console.log("this.logo="+this.logo+"scholatAvatar="+this.scholatAvatar);
      if(this.scholatAvatar){
        if (this.scholatAvatar.indexOf("resources") != -1) {
          this.attach.laterUrl = "http://www.scholat.com/" + this.scholatAvatar;
        } else {
          console.log("this.logo="+this.logo+"scholatAvatar="+this.scholatAvatar);
          this.attach.laterUrl = "http://47.106.132.95:2333/images/avatar/" + this.scholatAvatar;
        }
      }else{

        this.attach.laterUrl = this.logo
      }

    },
    props:['scholatAvatar'],
    data() {
      return {
        logo,
        dialogVisible: false,
        options: {
          autoCrop: true,  //默认生成截图框
          fixedBox: true,  //固定截图框大小
          canMoveBox: false,    //截图框不能拖动
          autoCropWidth: 200,  //截图框宽度
          autoCropHeight: 200, //截图框高度
          centerBox: false,    //截图框被限制在图片里面
        },
        previews: {}, //实时预览图数据
        attach: { //后端附件表
          id: '',
          userId: '',
          customaryUrl: '', //原图片路径
          laterUrl: '',//裁剪后图片路径  /static/logo.png
          attachType: 'photo',//附件类型
        },
        fileName: '',//本机文件地址
        uploadImgRelaPath: '',//上传后图片地址
        msg:'',
        name:'',//原文件存储名
      }
    },
    methods: {
      transportMessage(msg,name) {
        console.log(msg + "==========" + name)
        this.msg = msg
        this.name = name
      },
      //控制弹出层关闭
      handleClose() {
        this.dialogVisible = false
      },
      //实时预览
      realTime(data) {
        this.previews = data
      },
      //加载头像信息
      find() {
        this.userId = sessionStorage.getItem('userId');
        this.$axios.post('/api/attach/find', this.attach).then(res => {
          console.log(res);
        });
      },
      //选择本地图片
      uploadImg(e, num) {
        var file = e.target.files[0];
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种');
          return false;
        }
        console.log(e.target.result);
        //fileReader 接口，用于异步读取文件数据
        var reader = new FileReader();
        reader.readAsDataURL(file); //重要 以dataURL形式读取文件
        reader.onload = e => {

          // data = window.URL.createObjectURL(new Blob([e.target.result])) 转化为blob格式

          let data = e.target.result

          this.attach.customaryUrl = data
          // 转化为base64
          // reader.readAsDataURL(file)
          // 转化为blob
        }
      },
      //确认截图,上传
      cut(type) {
      //  上传头像前先删除原有头像
        console.log(this.msg + "========this.name==" + this.name)
        if(this.name!==null&&this.name!==''&&this.name!=='default.png'){
          this.api({
            url: "/attach/delete/" +this.msg+"/"+this.name,
            method: "get"
          }).then(res => {
            console.log("删除头像成功")
          }).catch(error => {
            console.log("哎呀.....删除头像失败")
          })
          this.name=''
        }
        var formData = new FormData();

        this.$refs.cropper.getCropBlob(res => {
          //res是裁剪后图片的bolb对象
          var uploadName = 'avatar.png';
          formData.append("file", res, uploadName);
          var src = window.URL.createObjectURL(res);

          console.log("头像路径为: " + src);
          this.attach.laterUrl = src;
          this.axios.put('/api/attach/upload', formData,
            {contentType: false, processData: false, headers: {'Content-Type': 'multipart/form-data'}}
          ).then(res => {
            console.log("上传头像成功")
            // this.$message({
            //   message: '头像上传成功',
            //   type: 'success'
            // });
            console.log(".........头像文件名为: " + res.data)
            // 给父组件传递返回的图片文件名
            this.$emit('crop-avatar',res.data)

            this.dialogVisible = false
          }).catch(error => {
            console.log("哎呀.....上传头像失败")
          })
        })
      },
/*      handleAvatarSuccess(res, file) {
        this.ruleForm.avatar = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }*/
    }
  }
</script>

<style scoped>
  /* 弹性布局 水平居中 */
  .show-preview {
    display: flex;
    justify-content: center;
  }

  .preview {
    border-radius: 5%;
    overflow: hidden;
    border: 1px solid #cccccc;
    background: #cccccc;
    margin-bottom: 10px;
  }

  .footerBtn {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
</style>
