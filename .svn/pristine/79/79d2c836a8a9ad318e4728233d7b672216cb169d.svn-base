<template>
  <div>
    <div class="nav">
      <div class="mine-border">
        <el-button type="success" @click="show_firend_list">展示好友列表</el-button>
        <el-button type="primary" @click="componentName = 'friends_distribution'">信息分布图</el-button>
        <el-button type="primary" @click="componentName = 'friends_relation'">学者关系</el-button>
        <el-button type="primary">学者推荐</el-button>
      </div>
      <div class="relation-list mine-border" v-if="friend_list_flag">
        <div class="friends" v-if="friends">
          <div style="height: 30px;background: antiquewhite">
            <span>好友列表</span>
            <span>数量:{{friends.length}}</span>
          </div>
          <div class="friends-list">
            <el-table :data="friends"
                      v-loading.body="listLoading_friends" element-loading-text="拼命加载中" border fit
                      highlight-current-row>
              <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">
                  <span v-text="scope.$index"> </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="姓名" width="130">
                <template slot-scope="scope">
                  <a :href="'http://www.scholat.com/'+scope.row.scholat_username" style="color: deepskyblue">
                    {{scope.row.chinese_name}}
                  </a>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="学历" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.degree}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工作单位" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.work_unit}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="地址" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.address}}</span>
                  <span></span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>

        <!-- 粉丝列表 -->
        <div class="friends" v-if="fans">
          <div style="height: 30px;background: antiquewhite">
            <span>粉丝列表</span>
            <span>数量:{{fans.length}}</span>
          </div>
          <div class="friends-list">
            <el-table :data="fans"
                      v-loading.body="listLoading_fans" element-loading-text="拼命加载中" border fit
                      highlight-current-row>
              <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">
                  <span v-text="scope.$index"> </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="姓名" width="130">
                <template slot-scope="scope">
                  <a :href="'http://www.scholat.com/'+scope.row.scholat_username" style="color: deepskyblue">
                    {{scope.row.chinese_name}}
                  </a>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="学历" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.degree}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工作单位" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.work_unit}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="地址" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.address}}</span>
                  <span></span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!-- 关注列表 -->
        <div class="friends" v-if="watchs">
          <div style="height: 30px;background: antiquewhite">
            <span>关注列表</span>
            <span>数量:{{watchs.length}}</span>
          </div>
          <div class="friends-list">
            <el-table :data="watchs"
                      v-loading.body="listLoading_watchs" element-loading-text="拼命加载中" border fit
                      highlight-current-row>
              <el-table-column align="center" label="序号" width="60">
                <template slot-scope="scope">
                  <span v-text="scope.$index"> </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="姓名" width="130">
                <template slot-scope="scope">
                  <a :href="'http://www.scholat.com/'+scope.row.scholat_username" style="color: deepskyblue">
                    {{scope.row.chinese_name}}
                  </a>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="学历" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.degree}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="工作单位" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.work_unit}}</span>
                  <span></span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="地址" width="130">
                <template slot-scope="scope">
                  <span>{{scope.row.address}}</span>
                  <span></span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <component :is="componentName"></component>
    </div>
    <div style="clear: both"></div>
    <friends-graph :friends="friends" v-if="friends.length!=0" :local_profile="local_profile"></friends-graph>
  </div>
</template>

<script>
    import friends_distribution from './friends/friends_distribution'
    import friends_relation from './friends/friends_relation'
    import friendsGraph from './friends/friends_graph'
    //调用百度地图ip定位接口
    // let myCity = new BMap.LocalCity();
    export default {
        name: "friend",
        components: {
            'friends_distribution': friends_distribution,
            'friends_relation': friends_relation,
            'friendsGraph': friendsGraph,
        },
        props: ['local_profile'],
        data() {
            return {
                friend_list_flag: false,
                componentName: 'friends_distribution',
                listLoading_friends: true,//数据加载等待动画
                listLoading_fans: true,//数据加载等待动画
                listLoading_watchs: true,//数据加载等待动画
                fans: [],
                friends: [],
                watchs: [],
            }
        },
        mounted() {
        },
        created() {
            let username = this.$route.path.split('/')[2];
            let relation = this.getRelation(username);
            console.log(relation);
        },
        methods: {
            show_firend_list() {
                this.friend_list_flag = !this.friend_list_flag;
            },
            getRelation(username) {
                this.api({
                    url: '/teacher/persona/getRelation/' + username,
                    methods: "get"
                }).then(data => {
                    this.friends = data.friends;
                    this.fans = data.fans;
                    this.watchs = data.watchs;
                    this.listLoading_friends = false;
                    this.listLoading_fans = false;
                    this.listLoading_watchs = false;
                    return data;
                }).catch(e => {
                    alert("获取好友关系错误")
                })
            },
        }
    }
</script>

<style scoped>
  .relation-list {
    background: #399;
    display: flex;
  }

  .mine-border {
    padding: 8px;
    margin: 8px;
    border: 1px solid gray;
    box-shadow: 0 0 8px 0px grey;
    box-sizing: border-box;
  }

  .friends {
    width: 50%;
    background: #339999;
    padding: 4px;
    max-height: 600px;
    overflow-y: scroll;
  }

  .friends-list {
    overflow-y: scroll;
    overflow-x: scroll;
    width: calc(100% - 8px);
    height: calc(100% - 30px);
    margin: 4px;
    border: 1px solid gray;
    box-shadow: 0 0 8px 0px grey;
    border-radius: 8px;
  }
</style>
