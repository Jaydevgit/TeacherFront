<template>
    <div class="teacher-item">
      <div class="teacher-img">
        <a @click="openTeacher(msg.tId)">
          <img :src="getImgUrl(msg.tAvatar)" :onerror="imgErrorFun" :alt="msg.username" :key="msg.teacherId">
        </a>
      </div>
      <div class="teacher-title" >
        <a @click="openTeacher(msg.tId)">
          <div class="smallText">{{msg.tName}}</div>
        </a>
        <!--<div class="smallText">{{msg.tPost}}</div>-->
      </div>
    </div>
</template>

<script>
  import defaultAvatar from '@/assets/default.png'
    export default {
      name: "relateTeacher",
      data (){
          return {
            defaultImage: 'this.src=defaultAvatar',
            defaultAvatar:defaultAvatar,
          }
      },
      props: {
        msg: {
        }
      },
      methods: {
        openTeacher (tId) {
          console.log("tid!" + tId);
          this.$router.push({
            name: 'teacherPersonlHomePage',
            params: {
              id: tId,
            }
          })
        },
        getImgUrl(imgName) {
          console.log("imgName="+imgName);
          if (imgName == null) {
            return this.defaultAvatar;
          } else if(imgName=="default.png"){
            return this.defaultAvatar
          } else if (imgName.indexOf("resources") != "-1") {
            return "http://www.scholat.com/" + imgName;
          } else {
            return "http://39.108.169.193:2333/public/images/avatar/" + imgName;
          }
        },
        imgErrorFun(e) {
          return 'this.src="defaultAvatar"';
        },
      }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .teacher-item {
    background: #fff;
    width: 100px;
    transition: all .5s;
    height: 100px;
    margin-bottom: 20px;
    box-sizing: border-box;
    border-radius: 5px;
    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 10px #999;
      width: 100px;
    }
    .teacher-img {
      a{
        display: inline-block;
      }
      img {
        width: 75px;
        border-radius: 5px;
        display: block;
      }
    }
    .teacher-title {
      line-height: 1.2;
      text-align: center;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0 14px;
      overflow: hidden;
      cursor: pointer;
      width: 50px;
    }
  }
</style>
