<template>
  <div id="app" style="width: 100%;">
    <div style="width: 80%;height: 100%" class="center">
      <el-row :gutter="10" class="scholar_info">
        <el-col :span="16" class="scholar_info_col">
          <div class="scholar_info_main">
            <div class="scholar_info_main_left">
              <el-image
                src="https://avatarcdn.aminer.cn/upload/avatar/1387/343/295/53f4ba75dabfaed83977b7db_0.jpg!160"
                fit="cover"></el-image>
            </div>
            <div class="scholar_info_main_right">
              <div class="name">
                Yoshua Bengio
              </div>
              <div class="scholar_info_elem">
                职称: professer
              </div>
              <div class="scholar_info_elem">
                研究兴趣: 机器学习
              </div>
              <div class="scholar_info_elem">
                所在部门: 人工智能系
              </div>
              <div class="scholar_info_elem">
                办公地址: 华南师范大学计算机学院
              </div>
              <div class="scholar_info_elem">
                邮箱: 123456123@qq.com
              </div>
              <div class="scholar_info_elem">
                个人主页: schloat.com/yoshua
              </div>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="scholar_info_col">
          <el-tabs class="label-fade-enter">
            <el-tab-pane label="网络关系">用户管理

           </el-tab-pane>
            <el-tab-pane label="D-core">配置管理</el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="height: 40%">
        <el-col :span="16">
          <div class="maintabhead">
            研究兴趣
          </div>
          <div class="maintabbody">

          </div>
        </el-col>
        <el-col :span="8" class="scholar_info_col">
          <div class="tabhead">
            科研统计
            <div><RaddarChart/> </div>
          </div>
          <div class="tabbody">

          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10" style="height: 50%">
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8" class="scholar_info_col">
          <div class="tabhead">
            相似作者
          </div>
          <div class="tabbody">

          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import RaddarChart from './components/RaddarChart'

export default {
name: "teacherPersonInfoPage",
  components: {
    RaddarChart,
  },


}

//设置宽度
function screen_height() {
  console.log(window.screen.availHeight)
  document.getElementById('app').style.height = window.screen.availHeight
}

screen_height()
</script>

<style>
/*my style*/
/*div对齐*/
.center {
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

}

/*scholar对齐*/
.scholar_info {
  height: 40%;
}

.scholar_info_col {
  height: 100%;
  padding: 12px 12px 0;
  border: 1px solid #eee;
}

.scholar_info_main {
  height: 90%;
  display: flex;

}

.scholar_info_main_left {
  display: flex;
  flex-direction: column;
  width: 140px;
  padding: 4px;
}

.scholar_info_main_right {
  color: #99a9bf;
  text-align: left;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;

}

.scholar_info_elem {
  width: 100%;
  color: dimgrey;
  resize: none;
  border: none;
  height: 30px;
  padding: 0;
  cursor: auto;

}

.name {
  font-size: 26px;
  font-family: "Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Helvetica Neue", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: 300;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eee;
  margin-bottom: 10px;
}

.tabhead{
  width: 100%;
  text-align: left;
  height: 15%;


}
.tabbody{
  width: 100%;
  height: 100%;
}
.maintabhead{
  height: 40px;
  background: #f5f5f5;
  padding-left: 20px;
  padding-right: 10px;
  font-size: 16px;
  line-height: 40px;
  font-weight: 700;
  display: flex;
  justify-content: space-between;

}
.maintabbody{
  width: 100%;
  height: 100%;
}

</style>
<style scoped>
.el-row {
  margin-bottom: 20px;
}
.last-child {
  margin-bottom: 0;
  }

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
