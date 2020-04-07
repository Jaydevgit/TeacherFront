<template>
    <div>
      <!-- 分布图 -->
      <h1 style="color: #339999" >粉丝用户工作单位分布</h1>
      <el-card class="box-card">
        <fans-work-distribution :fans="fans" v-if="fans.length!=0"></fans-work-distribution>
      </el-card>
      <h1 style="color: #339999" >关注用户工作单位分布</h1>
      <el-card class="box-card">
        <watchs-work-distribution :watchs="watchs" v-if="watchs.length!=0"></watchs-work-distribution>
      </el-card>
      <h1 style="color: #339999" >互相关注用户工作单位分布</h1>
      <el-card class="box-card">

        <friends-work-distribution :friends="friends" v-if="friends.length!=0"></friends-work-distribution>
      </el-card>
    </div>
</template>

<script>
    import friendsWorkDistribution from './friends/friends_workDistribution'
    import fansWorkDistribution from './friends/fans_workDistribution'
    import watchsWorkDistribution from './friends/watchs_workDistribution'
    export default {
        name: "statistics",
        props: ['fans','friends','watchs'],
        components: {
            'friendsWorkDistribution': friendsWorkDistribution,
            'fansWorkDistribution': fansWorkDistribution,
            'watchsWorkDistribution': watchsWorkDistribution,
        },
    }
</script>

<style scoped>

</style>
