<template>
    <div>
      <!--  好友关系 -->
      <div v-if="fans.length!=0">
        <el-row :gutter="0">
          <el-col :span="24">
            <el-tabs type="border-card">
              <el-tab-pane label="学者网好友关系图" style="height: calc(100% - 200px)">
                <friends-graph :friends="friends" :fans="fans" :watchs="watchs"
                               v-if="friends.length!=0 || fans.length!=0 || watchs.length!=0"
                               :local_profile="local_profile"></friends-graph>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>

    </div>
</template>

<script>
    import friendsGraph from './friends/friends_graph'

    export default {
        name: "relation",
        components: {
            'friendsGraph': friendsGraph,
        },
        props: ['local_profile', 'profile','fans','friends','watchs'],
        data() {
            return{


            }
        },
        mounted(){

        },
        methods:{
          showData(){
              this.showDataFlag = true
          }
        }
    }
</script>

<style scoped>

</style>
