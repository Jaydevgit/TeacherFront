<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive" style="width: 100%;height: 100%">
      <keep-alive>
        <top-header></top-header>
      </keep-alive>
      <router-view></router-view>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
    import TopHeader from './components/Nav/TopHeader'

    export default {
        name: 'app',
        components: {'top-header': TopHeader},
        data() {
            return {}
        },
        mounted() {
        },
        created() {

        },
    }
</script>

<style lang="scss">
  @import '~normalize.css/normalize.css';
  // normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  .content {
    margin: 0 auto;
  }


</style>
