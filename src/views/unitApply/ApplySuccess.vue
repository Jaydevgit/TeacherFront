<template>
  <div>
    <top-header></top-header>
    <div class="apply-container">

        <div class="apply-title">申请成功</div>

    </div>
  </div>
</template>

<script>
  import TopHeader from '@/components/Nav/TopHeader'
  export default {
    name: "applySuccess",
    data() {

      return {
        cerLogo: 'this.src="../src/assets/default_cer.png"',
        defaultLogo: 'this.src="https://faculty.scholat.com/mainSite/images/uni_logo/nologo.png"',
      }
    },
    components: {
      'top-header': TopHeader
    },
    mounted() {

    },
    methods: {

    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "../../styles/mixin";

  $bg: #2d3a4b;
  $dark_gray: #666666;
  $light_gray: #eee;
  $blue: #003f88;

  .apply-container {
    @include relative;
    /*height: 100vh;*/
    background-color: $light_gray;
    padding-top: 30px;
    padding-bottom: 30px;

    input {
      background-color: #F4F4F4;
      border-radius: 5px;
      border: none;
      font-size: 16px;
      padding-left: 10px;
      margin-bottom: 30px;
      outline: none;
      color: #333;
    }

    .apply-title {
      display: flex;
      align-items: center;
      width: 70px;
      font-size: 32px;
      font-weight: 800;
      color: #666666;
      margin: 40px auto;
    }
  }
</style>
