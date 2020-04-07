<template>
  <div class="paper-out">

    <h1>好友关系详情</h1>
    <el-row :gutter="0">
      <el-col :span="24">
        <el-tabs type="border-card">
          <el-tab-pane label="学者网互相关注(信任度等信息)排行" style="height: 600px;overflow: auto;">
            <div>好友数量共计(互相关注): {{friends.length}}</div>
            <div class="friends-list">
              <el-table :data="friends"
                        border fit
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
                <el-table-column align="center" label="学者网推荐得分排行" width="200" sortable sort-by="res_score">
                  <template slot-scope="scope">
                    <span>{{scope.row.res_score}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="信任度" width="130" sortable sort-by="trust">
                  <template slot-scope="scope">
                    <span>{{scope.row.trust}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="共同团队数量" width="160" sortable sort-by="team_cnt">
                  <template slot-scope="scope">
                    <span>{{scope.row.team_cnt}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="相似度(0.5论文+0.5简介)" width="240" sortable sort-by="lda_sim">
                  <template slot-scope="scope">
                    <span>{{scope.row.lda_sim}}</span>
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
          </el-tab-pane>
          <el-tab-pane label="学者网粉丝(信任度等信息)排行" style="height: 600px;overflow: auto;">
            <div>单纯粉丝数量共计: {{fans.length}}</div>
            <div class="friends-list">
              <el-table :data="fans"
                         border fit
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
                <el-table-column align="center" label="学者网推荐得分排行" width="200" sortable sort-by="res_score">
                  <template slot-scope="scope">
                    <span>{{scope.row.res_score}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="信任度" width="130" sortable sort-by="trust">
                  <template slot-scope="scope">
                    <span>{{scope.row.trust}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="共同团队数量" width="160" sortable sort-by="team_cnt">
                  <template slot-scope="scope">
                    <span>{{scope.row.team_cnt}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="相似度(0.5论文+0.5简介)" width="240" sortable sort-by="lda_sim">
                  <template slot-scope="scope">
                    <span>{{scope.row.lda_sim}}</span>
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
          </el-tab-pane>
          <el-tab-pane label="学者网关注(信任度等信息)排行" style="height: 600px;overflow: auto;">
            <div>单纯关注数量共计: {{friends.length}}</div>
            <div class="friends-list">
              <el-table :data="watchs"
                        border fit
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
                <el-table-column align="center" label="学者网推荐得分排行" width="200" sortable sort-by="res_score">
                  <template slot-scope="scope">
                    <span>{{scope.row.res_score}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="信任度" width="130" sortable sort-by="trust">
                  <template slot-scope="scope">
                    <span>{{scope.row.trust}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="共同团队数量" width="160" sortable sort-by="team_cnt">
                  <template slot-scope="scope">
                    <span>{{scope.row.team_cnt}}</span>
                    <span></span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="相似度(0.5论文+0.5简介)" width="240" sortable sort-by="lda_sim">
                  <template slot-scope="scope">
                    <span>{{scope.row.lda_sim}}</span>
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
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
    <h1>论文详情</h1>
    <div class="paper-list">
      <el-table :data="papers"
                v-loading.body="listLoading_papers" element-loading-text="拼命加载中" border fit
                highlight-current-row>
        <el-table-column align="center" label="序号" width="60">
          <template slot-scope="scope">
            <span v-text="scope.$index"> </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="论文" width="180">
          <template slot-scope="scope">
            <span>{{scope.row.title}}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="作者" width="180">
          <template slot-scope="scope">
            <span>
              {{scope.row.authors}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="来源" width="180">
          <template slot-scope="scope">
            <span>
              {{scope.row.source}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="论文类型" width="180">
          <template slot-scope="scope">
            <span>
              {{scope.row.type}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="引用" width="180">
          <template slot-scope="scope">
            <span>
              {{scope.row.citation}}
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="时间" width="180">
          <template slot-scope="scope">
            <span>
              {{scope.row.date}}
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <!-- 好友详情 -->

</template>

<script>

    export default {
        name: "paper",
        data(){
            return{
                listLoading_friends: true,//数据加载等待动画
                listLoading_fans: true,//数据加载等待动画
                listLoading_watchs: true,//数据加载等待动画
                listLoading_papers:true,
                papers:[],
                scholat_username:'',
            }
        },
        props: ['local_profile', 'profile','fans','friends','watchs'],
        created() {
            let username = this.$route.path.split('/')[2];
            this.scholat_username = username;
            let paper = this.getPaper(username);
            console.log(paper);
        },
        methods: {
            getPaper(username) {
                this.api({
                    url: '/teacher/persona/getScholatPaper/' + username,
                    methods: "get"
                }).then(data => {
                    this.papers = data.paper;
                    this.listLoading_papers = false;
                    return data;
                }).catch(e => {

                })
            },
        }
    }
</script>

<style scoped>
  .paper-list{
    width:100%;
    max-height: 500px;
    overflow-y: scroll;
  }
  .paper-out{
    padding: 4px;
    background: antiquewhite;
  }
</style>
