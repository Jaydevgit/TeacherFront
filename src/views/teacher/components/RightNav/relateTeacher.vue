<template>
  <div class="teacher-item">
    <div class="teacher-img">
      <a @click="openTeacher(msg.tDomainName)">
        <img :src="getImgUrl(msg.tAvatar)" :onerror="imgErrorFun" :alt="msg.username" :key="msg.teacherId">
      </a>
    </div>
    <div class="teacher-title">
      <a @click="openTeacher(msg.tDomainName)">
        <div class="smallText">{{msg.tName}}</div>
      </a>
      <!--<div class="smallText">{{msg.tPost}}</div>-->
    </div>
  </div>
</template>

<script>
  import defaultAvatar from '@/assets/default1.png'
    export default {
        name: "relateTeacher",
        data() {
            return {
                defaultImage: 'this.src="http://47.106.132.95:2333/images/avatar/default.png"',
              defaultAvatar:defaultAvatar,
            }
        },
        props: {
            msg: {}
        },
        methods: {
            openTeacher(tDomainName) {
                // console.log("tid!" + tId);
                let facultyDomainName = this.$route.path.split('/')[2];
                this.$router.push({
                    name: 'teacherPersonlHomePage',
                    params: {
                        facultyDomainName: facultyDomainName,
                        teacherDomainName: tDomainName,
                        id: this.msg.tId,
                    }
                });
                window.location.reload()
                // window.open(routeData.href, '_blank');
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
                return "http://47.106.132.95:2333/images/avatar/" + imgName;
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
    width: calc(50% - 20px);
    margin: 0 auto;
    transition: all .5s;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 5px 3px 5px 3px;

    &:hover {
      transform: translateY(-3px);
      box-shadow: 1px 1px 10px #999;
      /*width: 75px;*/
    }

    .teacher-img {
      a {
        display: inline-block;
      }

      img {
        width: 75px;
        height: 75px;
        border-radius: 5px;
        display: block;
      }
    }

    .teacher-title {
      line-height: 1;
      text-align: center;
      font-size: 16px;
      color: #424242;
      margin: 0 auto;
      padding: 0;
      overflow: hidden;
      cursor: pointer;
      width: 75px;
    }
  }
</style>
