<template>
    <div id="app" style="width: 100%;">
      <div class="header">

      </div>

      <div class="search">
        <div  style="text-align: center"><img src="../../assets/defaultLogo.png" height="88px"></div>
        <div>
          <el-input placeholder="请输入检索关键字" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </div>
      <div class="result">
        <div  v-for="teacher in teacherList" :key="teacher.id" style="display: flex">
         <div style="width: 120px;">
           <img class="imgAvatar" :src="getImgUrl(teacher.avatar)" :onerror="imgErrorFun(this)"/>
         </div>
          <div style="margin: 12px 0 0 10px">
            <div class="name">
              {{teacher.username}} <span v-if="teacher.graduatefrom!==null"> {{teacher.graduatefrom}}</span>
            </div>
            <div class="research" v-html="teacher.research_direction">
            </div>
            <div class="intro">
              {{teacher.intro | escapeHTML}}
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import defaultAvatar from '@/assets/default1.png'
  export default {
    name: "esHome",
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        defaultAvatar:defaultAvatar,
        teacherList:[]
      }
    },
    filters:{
      escapeHTML(untrusted) {
        // Escape untrusted input so that it can safely be used in a HTML response
        // in HTML and in HTML attributes.
        return untrusted
          .replace(/<[^>]+>/g, '')
          .replace(/[ ]|[&nbsp;]/g, '');
      }
    },
    created() {
      this.esTeacher()
    },
    methods:{
      esTeacher(){
        this.api({
          url: "/elasticsearch/esTeacher",
          method: "post",
          data: {
            "scholat_username":1,
          }
        }).then(data => {
          this.teacherList=data.teacherList;
          console.log(this.teacherList);
        })
      },
      getImgUrl(imgName) {
        if (imgName == null) {
          return this.defaultAvatar;
        } else if(imgName=="default.png"){
          return this.defaultAvatar
        } else if (imgName.indexOf("resources") != "-1") {
          return "http://www.scholat.com/" + imgName;
        } else {
          return "http://faculty.scholat.com:2333/public/images/avatar/" + imgName;
        }
      },
      imgErrorFun(e) {
        /*let img = e;
        img.onerror = null;
        console.log("执行了imgErrorFun函数，onerror=" + img.onerror + "，img.src=" + img.src);
        return 'this.src="http://faculty.scholat.com:2333/public/images/avatar/default.png"';*/
        return 'this.src="defaultAvatar"';
      },
    }
  }
</script>

<style scoped>
  .header {
    position: fixed;
    border-bottom:1px solid #EBEBEB;
    width: 100%;
    height: 50px;
    top: 0;
    left: 0;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }
  .search{

    margin-top:108px;
    margin-left: calc(50vw - 310px);
    max-width: 620px;

  }
  .result{
    width: 960px;
    margin-left: calc(50vw - 480px);
    margin-top: 50px;
    border-top:1px solid #EBEBEB ;
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .name{
    margin-top: 10px;

    width: 82%;
  }
  .research{
    margin-top: 3px;
    max-width: 800px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1;
  }

  .intro{
    max-width: 800px;
    margin-top: 5px;
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
  }
  .imgAvatar{
    display: inline-block;margin-left: 20px;vertical-align: top;margin-top: 20px;width: 100px;height: 100px;
    padding:7px;
    border-radius:50%;
    border:1px solid #cfd9df ;
    -webkit-box-shadow:3px 3px 4px #cfd9df ;
    box-shadow:3px 3px 4px #cfd9df ;
    background:#fff;
    filter:progid:DXImageTransform.Microsoft.Shadow(Strength=4,Direction=135,Color='#000000');
  }

</style>
