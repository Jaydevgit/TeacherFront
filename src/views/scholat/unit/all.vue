<template>
  <div class="app-container">
    <!--************************* 添加搜索栏 ***************************-->
    <div class="filter-container">
      <el-form>
        <el-form-item>
          <el-input
            v-model="search"
            size="mini"
            style="width:250px"
            placeholder="输入关键字搜索"/>
          <el-button type="primary" icon="plus" @click="search" >搜索</el-button>
          <div style="clear: both;"></div>
        </el-form-item>
      </el-form>
    </div>
    <!--****************************************************-->
    <!--************************** 具体的查询表 **************************-->
    <el-table :data="list"
              v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
              highlight-current-row>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          <span v-text="getIndex(scope.$index)"> </span>
        </template>
      </el-table-column>

      <!--<el-table-column align="center" label="头像" width="150">
        <template slot-scope="scope">
            <img class="preview"  :src="getImgUrl(scope.row.avatar)"
                 style="width:60px;height:60px;cursor:pointer;"/>
        </template>
      </el-table-column>-->

      <el-table-column align="center" label="图标" width="140" >
        <template slot-scope="scope" >
          <img :src="getPic(scope.row.logo_url , scope.row.school_name)" :onerror="defaultLogo" height="86"
               />
        </template>
      </el-table-column>

      <el-table-column align="left" label="单位" width="320">
        <template slot-scope="scope">
          <div>
            <span class="label-describe">学校</span><span>{{scope.row.school_name}}</span>
          </div>
          <div>
            <span class="label-describe">学院</span><span>{{scope.row.unit_name}}</span>
          </div>
          <div>
            <span class="label-describe">school</span><span>{{scope.row.school_eng}}</span>
          </div>
          <div>
            <span class="label-describe">unit</span><span>{{scope.row.unit_eng}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="left" label="官网" width="200">
        <template slot-scope="scope">
          <div>
            <a style="color: deepskyblue;" :href="scope.row.college_url">{{scope.row.college_url}}</a>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="left" label="高级管理员信息" width="180">
        <template slot-scope="scope">
          <div>
            <span class="label-describe">用户名</span><span>{{scope.row.username}}</span>
          </div>
          <div>
            <span class="label-describe">昵称</span><span>{{scope.row.nickname}}</span>
          </div>
          <div>
            <span class="label-describe">角色</span><span>{{scope.row.roleName}}</span>
          </div>
          <div>
            <span class="label-describe">状态</span><span>{{scope.row.state}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请时间" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="管理" v-if="hasScholatPerm('unit:update')">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" @click="showDetail(scope.row.id)">设置有效期</el-button>
          <el-button type="danger" size="mini" @click="showDetail(scope.row.id)">加入黑名单</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="listQuery.pageNum"
      :page-size="listQuery.pageRow"
      :total="totalCount"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>

  </div>
</template>

<script>
  import store from '../../../store/index'

  export default {
    name: "all",
    data() {
      return {
        defaultLogo: 'this.src="http://www.scholat.com/images/uni_logo/nologo.png"',
        search: '',
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          state: 3 //1代表申请列表,-1代表黑名单，0代表已经通过，2代表需要修改,3代表全部学院
        },
        applyUnit: {
          id: "",
          avatar: '',
          school_name: "",
          unit_name: "",
          college_url: "",
          chinese_name: "",
          email: "",
          phone: "",
          state: "",
          update_time: ''
        }
      }
    },
    created() {
      console.log("进入到了wait_____开始查询管理员权限和列表信息")
      this.getList();
    },
    methods: {
      getImgUrl(msg, imageName) {
        if (msg == 'front') {
          return "http://47.106.132.95:2333/images/certificate_front/" + imageName;
        } else if (msg == 'back') {
          return "http://47.106.132.95:2333/images/certificate_back/" + imageName;
        } else if (msg == 'working') {
          return "http://47.106.132.95:2333/images/certificate_working/" + imageName;
        }else {
          return "http://ww2.sinaimg.cn/large/006tNc79gy1g4i53qvv3kj30kn0eaacq.jpg"
        }
      },
      //获取学院LOGO
      getPic(logoUrl,schoolName){

        console.log("logo..." +  JSON.stringify(logoUrl) + "schoolName" +schoolName)
        if (logoUrl !== null && logoUrl !== '' )
          return 'http://47.106.132.95:2333/images/unit_logo/' + logoUrl
        return "http://www.scholat.com/images/uni_logo/" + schoolName + ".png";
      },

      /* ---------------------------------------
      * 获取教师信息
      * =======================
      * */
      getList() {
        //查询列表
        if (!this.hasScholatPerm('unit:list')) {
          this.$message.error("没有list权限")
          return
        }
        this.listLoading = true;
        console.log("### 开始查询全部的学院")
        this.api({
          url: "/scholat/apply/getInfo",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询全部学院的信息为:")
          console.log(data.list)
          this.listLoading = false;
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("查询学院信息列表失败")
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      // ---------------------------------------------------
      /*
      * 获取表内的信息处理
      * */
      showDetail(id) {
        var _vue = this;
        this.$confirm('确定?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          this.$message.warning("id是:" + id + " ...但是还没写哦，需要等等QAQ")
          /*  _vue.api({
              url: "/manager/deleteTeacher",
              method: "post",
              data: {
                "teacherId":teacherId
              }
            }).then((data) => {
              this.$message.success("删除该教师成功")
              this.getList();
            }).catch(e => {
              this.$message.error("QAQ.....")
            })*/
        })
      }
    },
    computed :{

    }
  }
</script>

<style scoped>
  .label-describe {
    font-size: 16px;
    font-weight: 400;
    background: #eaeaea;
    padding: 2px 12px;
    border-radius: 19px;
    color: #818181;
  }
  .certificate-img {
    width: 130px;
    margin: 8px;
    border-radius: 14px;
    box-shadow: 0 0 14px 6px antiquewhite;
  }
</style>
