<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="8" style="height: 300px">
        <el-tabs type="border-card">
          <el-tab-pane label="学院数据信息">
            <el-row>
              <el-col :span="8">
                <div style="margin-right: 8px">
                  <img :src="local_profile.avatar" :onerror="defaultImg" style="border-radius: 8px;width: 100%;max-width: 140px;">
                </div>
                <div>
                  <img :src="local_profile.qrcode" :onerror="defaultQR" style="width: 80%;max-width: 120px;">
                </div>
              </el-col>
              <el-col :span="16" style="height: 300px;overflow-y: scroll;">
                <div style="font-size: 34px;font-weight: 800;">{{local_profile.username}}</div>
                <div class="personal-describe">{{local_profile.label}}</div>
                <!--                <div>{{local_profile.create_time}}</div>-->
                <div>
                  <label class="font-one">学历学位：</label><span class="describe">{{local_profile.degree}}</span></div>
                <div>
                  <label class="font-one">所在部门：</label><span class="describe">{{local_profile.department_name}}</span>
                </div>
                <div><label class="font-one">邮箱：</label><span class="describe">{{local_profile.email}}</span></div>
                <div><label class="font-one">毕业学校：</label><span class="describe">{{local_profile.graduateFrom}}</span>
                </div>
                <div><label class="font-one">职位：</label><span class="describe">{{local_profile.post}}</span></div>
                <div><label class="font-one">研究方向：</label><span
                  class="describe">{{local_profile.research_direction}}</span></div>
                <div><label class="font-one">学者网用户名：</label><span
                  class="describe">{{local_profile.scholat_username}}</span></div>
                <div><label class="font-one">性别：</label><span class="describe">{{local_profile.sex}}</span></div>
                <div><label class="font-one">状态：</label><span class="describe">{{local_profile.state}}</span></div>
                <div>
                  <label class="font-one">学科：</label>{{local_profile.subject}}
                </div>
                <label class="font-one">简介：</label>
                <div v-html="local_profile.intro"></div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="学者网历史数据信息">
            <el-row v-if="profile">
              <el-col :span="8">
                <div style="margin-right: 8px">
                  <img :src="profile.picture_url" :onerror="defaultImg"
                       style="border-radius: 8px;width: 100%;max-width: 140px;">
                </div>
                <div>
                  <img :src="profile.qrcodeUrl" :onerror="defaultQR" style="width: 80%;max-width: 120px;">
                </div>
              </el-col>
              <el-col :span="16" style="height: 300px;overflow: scroll;">
                <div style="font-size: 34px;font-weight: 800;">{{profile.chinese_name}}</div>
                <div><label class="font-one">学历：</label><span class="describe">{{profile.degree}}</span></div>
                <div><label class="font-one">地址：</label><span class="describe">{{profile.address}}</span></div>
                <div><label class="font-one">研究领域：</label><span class="describe">{{profile.scholar_field}}</span></div>
                <div><label class="font-one">头衔：</label><span class="describe">{{profile.scholar_title}}</span></div>
                <div><label class="font-one">工作部门：</label><span class="describe">{{profile.work_department}}</span>
                </div>
                <div><label class="font-one">工作邮箱：</label><span class="describe">{{profile.work_email}}</span></div>
                <div><label class="font-one">工作单位：</label><span class="describe">{{profile.work_unit}}</span></div>
                <label class="font-one">简历：</label>
                <div v-html="profile.introduction" style="width: 100%;"></div>
              </el-col>
            </el-row>
          </el-tab-pane>

        </el-tabs>
      </el-col>
      <el-col :span="16">
        <!--  词云 -->
        <el-tabs type="border-card">
          <el-tab-pane label="学院本地教师信息关键词词云">
            <div style="width: 100%;height: 100%;display: flex;justify-content: space-between;">
              <word-cloud-chart
                id="echarts07"
                :title="localCloudTitle"
                :data="local_keywords"
                :width="width"
                :height="height"
                ref="localCloud"
                v-if="local_keywords.length!=0"
              />
            </div>

          </el-tab-pane>
          <el-tab-pane label="学者网学者论文信息关键词词云">
            <word-cloud-chart
              id="echarts05"
              :title="paperCloudTitle"
              :data="paper_keywords"
              :width="width"
              :height="height"
              ref="paperCloud"
              v-if="paper_keywords.length!=0"
            />
          </el-tab-pane>
          <el-tab-pane label="学者网学者基础信息关键词词云">
            <word-cloud-chart
              id="echarts06"
              :title="introCloudTitle"
              :data="intro_keywords"
              :width="width"
              :height="height"
              ref="introCloud"
              v-if="intro_keywords.length!=0"
            />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>



    <!--  推荐信息 -->
    <el-tabs type="border-card">
<!--      <el-tab-pane label="学术社交网络的学院教师推荐">-->
<!--        <div class="recommend">-->
<!--          <template v-for="item in recommend_union_users">-->
<!--            <div>-->
<!--              <img :src="getImage(item.avatar)" style="width: 70px;height: 80px;border-radius: 50%">-->
<!--              <div class="rmd-name">{{item.username}}</div>-->
<!--            </div>-->
<!--          </template>-->
<!--        </div>-->
<!--      </el-tab-pane>-->
      <el-tab-pane label="融合学术社交网络的学者个性化推荐">
        <div class="recommend">
          <template v-for="item in recommend_scholat_users">
            <div>
              <img :src="'http://www.scholat.com/'+item.picture_url" :onerror="defaultImg"
                   style="width: 70px;height: 80px;border-radius: 50%">
              <div class="rmd-name">{{item.chinese_name}}</div>
            </div>
          </template>
        </div>
      </el-tab-pane>
      <el-tab-pane label="学院本地教师推荐">
        <div class="recommend">
          <template v-for="item in recommend_local_users">
            <div>
              <img :src="getImage(item.avatar)" style="width: 70px;height: 80px;border-radius: 50%">
              <div class="rmd-name">{{item.username}}</div>
            </div>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>




  </div>
</template>

<script>
    import WordCloudChart from './base_info/WordCloudChart'


    export default {
        name: "base_info",
        components: {
            'WordCloudChart': WordCloudChart,
        },
        props: ['local_profile', 'profile', 'intro_keywords', 'paper_keywords', 'local_keywords','fans','friends','watchs'],
        data() {
            return {
                defaultImg: 'this.src="http://faculty.scholat.com:2333/public/images/avatar/default.png"',
                defaultQR: 'this.src="http://faculty.scholat.com:2333/public/images/avatar/defaultQR.png"',
                width: '600px',
                height: '300px',
                recommend_scholat_users: [],
                recommend_local_users: [],
                recommend_union_users: [],
                componentName: 'WordCloudChart',
                paperCloudTitle: '学者网学者论文信息关键词词云',
                introCloudTitle: '学者网学者基础信息关键词词云',
                localCloudTitle: '学院本地教师信息关键词词云',
            }
        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            console.log(this.$route.path)
            let username = this.$route.path.split('/')[2];
            // 获取只有学者网用户的推荐
            this.axios.post('/api/teacher/persona/getScholatRecommendUsers', {
                username: username
            }).then(data => {
                this.recommend_scholat_users = data.data
            }).catch(e => {
                alert("error")
            })
            // 获取只有本地网用户的推荐
            let local_id = this.$route.path.split('/')[3];
            this.axios.post('/api/teacher/persona/getLoacalRecommendUsers', {
                local_id: local_id
            }).then(data => {
                this.recommend_local_users = data.data
                console.log(this.recommend_local_users)
            }).catch(e => {
                alert("本地网用户的推荐error")
            })
            // 获取综合的推荐用户
            this.axios.post('/api/teacher/persona/getUnionRecommendUsers', {
                local_id: local_id
            }).then(data => {
                this.recommend_union_users = data.data
            }).catch(e => {
                alert("获取综合的推荐用户error")
            })
            console.clear()
        },
        methods: {
            getImage(avatar) {
                if (avatar.indexOf('resources') != -1)
                    return 'http://www.scholat.com/' + avatar
                else
                    return "http://faculty.scholat.com:2333/public/images/avatar/" + avatar
            },

        }
    }
</script>

<style lang="scss" scoped>
  .rmd-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .recommend {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .cloud {
    background: antiquewhite;
    min-height: 300px;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left {
      background: antiquewhite;
      width: 50%;
    }

    .right {
      background: yellow;
      width: 50%;
    }
  }

  .scholat {
    display: flex;
  }

  .yinyong {
    height: 300px;
    width: 50%;
    background: rgb(245, 247, 250) none repeat scroll 0% 0%;
    border-color: currentcolor rgb(143, 200, 200);
    border-style: none solid;
    border-width: 0px 0px 0px 7px;
    border-image: none 100% / 1 / 0 stretch;
    color: gray;
    font-weight: bold;
    padding: 14px;
  }

  .describe {
    text-overflow: ellipsis;
    overflow: hidden
  }

  .font-one {
    font-weight: bold;
    color: #9fa3ac;
    line-height: 24px;
  }

  .ch {
    width: 50%;
    background: beige;
  }

  .en {
    width: 50%;
    background: #85f5bf;
  }

  .personal-describe {
    display: inline-block;
    font-size: 16px;
    margin: 5px 0;
    font-weight: 400;
    background: #eaeaea;
    padding: 2px 12px;
    border-radius: 19px;
    color: #818181;
  }

  .introduction_out {
    display: flex;
    justify-content: space-around;
  }


  .border {
    background-color: #fff;
    padding: 8px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }

  .friends-list {
    width: max-content;
    overflow-y: scroll;
    overflow-x: scroll;
  }
</style>
