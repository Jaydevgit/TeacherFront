<template>
  <div class="persona-scholat">
    <div class="main">
      <div style="width: 100%;height:100%;overflow-y: scroll;" v-if="ifScholatExist==0">
        <h1>连接正常，正在查询数据...</h1>
      </div>
      <div style="width: 100%;height:100%;overflow-y: scroll;" v-if="ifScholatExist==2">
        <h1>很抱歉，历史数据未更新至此教师。历史数据更新周期为一周</h1>
      </div>
      <div style="width: 100%;height:100%;overflow-y: scroll;" v-if="ifScholatExist==1">
        <div class="top border">
          <div class="nav border">
            <div>
              <el-button type="primary" plain @click="componentName = 'baseInfo'">学者网信息</el-button>
              <!--          <el-button type="primary" plain @click="componentName = 'friend'">好友关系</el-button>-->
              <h3 style="color: #339999;display: inline;margin-left: 4px" v-if="loadingEchartsFlag" >正在处理关系数据...</h3>
              <el-button type="primary" plain @click="componentName = 'relation'" v-if="!loadingEchartsFlag">好友关系</el-button>
              <el-button type="primary" plain @click="componentName = 'paper'" v-if="!loadingEchartsFlag">数据信息</el-button>
              <!--          <el-button type="primary" plain @click="componentName = 'tree'">学术谱系</el-button>-->
              <el-button type="primary" plain @click="componentName = 'statistics'" v-if="!loadingEchartsFlag">统计信息</el-button>
            </div>
            <div style="font-size: 14px;
    color: gray;
    font-weight: bold;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 10px;">
              数据来源:学者网大数据---数据日期: 2019-09-03
            </div>
          </div>
        </div>

        <component :is="componentName"
                   :local_profile="local_profile"
                   :profile="profile"
                   :intro_keywords="intro_keywords"
                   :paper_keywords="paper_keywords"
                   :local_keywords="local_keywords"
                   :fans="fans"
                   :watchs="watchs"
                   :friends="friends"
                   class="main-body"></component>
      </div>
    </div>
  </div>
</template>

<script>
    import baseInfo from './components/base_info'
    import paper from './components/paper'
    import statistics from './components/statistics'
    // import tree from './components/tree'
    // import friend from './components/friend'
    import relation from './components/relation'


    export default {
        name: "persona",
        components: {
            'baseInfo': baseInfo,
            'paper': paper,
            'statistics': statistics,
            // 'tree': tree,
            // 'friend': friend,
            'relation': relation,
        },
        data() {
            return {
                componentName: 'baseInfo',
                intro_keywords: [],
                paper_keywords: [],
                local_keywords: [],
                profile: {}, // 学者网信息
                local_profile: {}, // 本地教师信息
                fans: [],
                friends: [],
                watchs: [],
                loadingEchartsFlag:true,
                ifScholatExist:0, // 0开始查询, 1有结果, 2没有学者网结果
            }
        },
        created() {
        },
        mounted() {
            // 获取学者网账号
            let username = this.$route.path.split('/')[2];
            this.getRelation(username);
            let user_id = this.$route.path.split('/')[3];

            // 检查该ID是否已经绑定学者网信息
            this.profile = this.getScholatUsername(username, user_id);
        },
        methods: {
            getRelation(username) {
                this.api({
                    url: '/teacher/persona/getRelation/' + username,
                    methods: "get"
                }).then(data => {
                    this.friends = data.friends;
                    this.fans = data.fans;
                    this.watchs = data.watchs;
                    this.friends.sort((a, b) => {
                        a = parseFloat(a.trust);
                        b = parseFloat(b.trust);
                        if (a < b) return 1
                        else if (a > b) return -1
                        else return 0
                    });
                    this.fans.sort((a, b) => {
                        a = parseFloat(a.trust);
                        b = parseFloat(b.trust);
                        if (a < b) return 1
                        else if (a > b) return -1
                        else return 0
                    });
                    this.watchs.sort((a, b) => {
                        a = parseFloat(a.trust);
                        b = parseFloat(b.trust);
                        if (a < b) return 1
                        else if (a > b) return -1
                        else return 0
                    });
                    this.listLoading_friends = false;
                    this.listLoading_fans = false;
                    this.listLoading_watchs = false;
                    this.loadingEchartsFlag=false;
                    return data;
                }).catch(e => {

                })
            },
            getScholatUsername(username, user_id) {
                this.api({
                    url: "/teacher/getPersonaProfile",
                    method: "get",
                    params: {user_id: user_id, username: username}
                }).then(data => {
                    // 判断是否存在学者网信息
                    if(data.scholat_profile.length!=0){
                        this.profile = data.scholat_profile;
                        this.profile.picture_url='http://www.scholat.com/'+this.profile.picture_url
                        this.profile.qrcodeUrl='http://www.scholat.com/'+this.profile.qrcodeUrl
                        this.ifScholatExist = 1;
                    }else{
                        // 没有找到学者网历史信息,原因:在线有信息,但是历史没更新就没有信息
                        this.ifScholatExist = 2;
                    }
                    // ------------------------------ 关键词数据处理
                    let paper_keywords_list = data.paper_keywords.split('\n');
                    let len = paper_keywords_list.length;
                    for (let i = 0; i < len - 1; i++) {
                        let o = {};
                        let str = paper_keywords_list[i].split('\t');
                        o.name = str[0];
                        o.value = ~~(parseFloat(str[1]) * 100000);
                        this.paper_keywords.push(o)
                    }
                    let intro_keywords_list = data.intro_keywords.split('\n');
                    len = intro_keywords_list.length;
                    for (let i = 0; i < len - 1; i++) {
                        let o = {};
                        let str = intro_keywords_list[i].split('\t');
                        o.name = str[0];
                        o.value = ~~(parseFloat(str[1]) * 100000);
                        this.intro_keywords.push(o)
                    }
                    let local_keywords_list = data.local_profile_keywords.split('\n');
                    len = local_keywords_list.length;
                    for (let i = 0; i < len - 1; i++) {
                        let o = {};
                        let str = local_keywords_list[i].split('\t');
                        o.name = str[0];
                        o.value = ~~(parseFloat(str[1]) * 100000);
                        this.local_keywords.push(o)
                    }
                    // ------------------------------

                    if (data.local_profile.avatar.indexOf('resources') != -1) {
                        data.local_profile.avatar = "http://www.scholat.com/" + data.local_profile.avatar;
                    } else {
                        data.local_profile.avatar = "http://faculty.scholat.com:2333/public/images/avatar/" + data.local_profile.avatar;
                    }
                    data.local_profile.sex=data.local_profile.sex==0?'男':'女';
                    data.local_profile.state=data.local_profile.state=='1'?'在岗':'退休/临调';
                    data.local_profile.qrcode = "http://www.scholat.com/" + data.local_profile.qrcode;
                    this.local_profile = data.local_profile;
                    return data.scholat_profile;
                }).catch(e => {
                    alert('查询失败')
                    return false;
                })
            }

        }
    }
</script>

<style lang="scss" scoped>
  .persona-scholat {
    min-height: 100vh;
    height: fit-content;
    background: url("../../assets/img/bg.png");
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all .5s;
  }
  .main{
    width: 1200px;
    height: 1080px;
    background: #fff;
    border-radius: 10px;
    background-image: url(../../assets/transparent_rect.png);
    padding: 12px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  }

  .top {
    display: flex;
  }

  .basic {
    width: 150px;
    margin: 0 10px 0 0;
    background: #cce7ff;
    border-radius: 8px;
    overflow: hidden;
  }

  .border {
    padding: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, .2);
    box-sizing: border-box;

  }

  .main-body {
    background-color: #fff;
    padding: 10px;
    background-image: url(../../assets/transparent_rect.png);
  }

  .nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background-color: #cce7ff;
    position: relative;
    white-space: nowrap;
    background-image: url(../../assets/transparent_rect.png);
  }
</style>

