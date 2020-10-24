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

      <el-table-column align="center" label="图标" width="140" >
        <template slot-scope="scope" >
          <img :src="getPic(scope.row.certificate_logo)" :onerror="defaultLogo" height="86"
          />
        </template>
      </el-table-column>

      <el-table-column align="left" label="单位" width="180">
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

      <el-table-column align="left" label="申请人" width="200">
        <template slot-scope="scope">
          <div>
            <span class="label-describe">姓名</span><span>{{scope.row.chinese_name}}</span>
          </div>
          <div>
            <span class="label-describe">电话</span><span>{{scope.row.phone}}</span>
          </div>
          <div>
            <span class="label-describe">邮箱</span><span>{{scope.row.email}}</span>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="身份证" width="160">
        <template slot-scope="scope">
          <div>
            <span class="label-describe">身份证正面</span>
            <div style="text-align: center;">
              <el-popover
                placement="left"
                title=""
                trigger="hover">
                  <img :src="getImgUrl('front',scope.row.certificate_front)"
                       :alt="getImgUrl('front',scope.row.certificate_front)"></img>
                  <img v-if="scope.row.certificate_front" class="certificate-img"
                     slot="reference"
                     :src="getImgUrl('front',scope.row.certificate_front)"></img>
              </el-popover>
            </div>
          </div>
          <div>
            <span class="label-describe">身份证反面</span>
            <div style="text-align: center;">
              <el-popover
                placement="left"
                title=""
                trigger="hover">
                <img :src="getImgUrl('back',scope.row.certificate_back)"
                     :alt="getImgUrl('back',scope.row.certificate_back)"></img>
                <img v-if="scope.row.certificate_back" class="certificate-img"
                     slot="reference"
                     :src="getImgUrl('back',scope.row.certificate_back)"></img>
              </el-popover>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="在职证明" width="160">
        <template slot-scope="scope">
          <div>
            <span class="label-describe">在职证明</span>
            <div style="text-align: center;">
              <el-popover
                placement="left"
                title=""
                trigger="hover">
                <img :src="getImgUrl('working',scope.row.certificate_working)"
                     :alt="getImgUrl('working',scope.row.certificate_working)"></img>
                <img v-if="scope.row.certificate_working" class="certificate-img"
                     slot="reference"
                     :src="getImgUrl('working',scope.row.certificate_working)"></img>
              </el-popover>
            </div>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="申请时间" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.update_time}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" label="token" width="130">
        <template slot-scope="scope">
          <span>{{scope.row.token}}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" align="center" label="管理" v-if="hasScholatPerm('unit:update')">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="allowApply(scope.row.id)">通过</el-button>
          <el-button type="warning" size="small" @click="rejectApply(scope.row.id)">拒绝</el-button>
          <el-button type="danger" size="small" @click="blackApply(scope.row.id)">加入黑名单</el-button>
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
  import store from '../../../store'

  export default {
    name: "wait",
    data() {
      return {
        defaultLogo: 'this.src="https://faculty.scholat.com/mainSite/images/uni_logo/nologo.png"',
        search: '',
        totalCount: 0, //分页组件--数据总条数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          state: 1 // 1代表申请列表,-1代表黑名单，0代表已经通过，2代表需要修改,3代表全部学院
        },
        applyUnit: {
          id: "",
          avatar: '',
          school_name: "",
          unit_name: "",
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
          return "https://faculty.scholat.com:2333/public/images/certificate_front/" + imageName;
        } else if (msg == 'back') {
          return "https://faculty.scholat.com:2333/public/images/certificate_back/" + imageName;
        } else if (msg == 'working') {
          return "https://faculty.scholat.com:2333/public/images/certificate_working/" + imageName;
        }else {
          return "http://ww2.sinaimg.cn/large/006tNc79gy1g4i53qvv3kj30kn0eaacq.jpg"
        }
      },
      //获取学院LOGO
      getPic(logoUrl){

        let s=JSON.stringify(logoUrl)
        if(s!=null){
          s=s.substring(1,2)
        }
     //   console.log("logo..." +  JSON.stringify(logoUrl) + "schoolName" +schoolName)
         if (s==='h' ){
           console.log("true");
           return logoUrl;
         }else{
           console.log("false");
           return 'https://faculty.scholat.com:2333/public/images/certificate_logo/' + logoUrl
         }
        // {
        //   return logoUrl;
        // }else{
        //   return schoolName;
        // }
        //   return 'https://faculty.scholat.com:2333/public/images/certificate_logo/' + logoUrl
        // return "https://faculty.scholat.com/mainSite/images/uni_logo/" + schoolName + ".png";
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
        console.log("### 开始查询申请列表")
        this.api({
          url: "/scholat/apply/getInfo",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询申请成员信息为:")
          console.log(data)
          this.listLoading = false;
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("查询申请列表失败")
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
      allowApply(id){
        var _vue = this;
        this.$confirm('确定?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
      //    this.$message.warning("申请的id是:" + id)
            _vue.api({
              url: "/scholat/apply/allowApply",
              method: "post",
              data: {
                "apply_id":id
              }
            }).then((data) => {
              this.$message.success("通过申请请求成功")
              this.getList();
            }).catch(e => {
              this.$message.error("通过申请请求失败.")
            })
        })
      },
      blackApply(id){
        var _vue = this;
        this.$confirm('确定加入黑名单?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'danger'
        }).then(() => {
          this.$message.warning("申请的id是:" + id)
            _vue.api({
              url: "/scholat/apply/blackApply",
              method: "post",
              data: {
                "apply_id":id
              }
            }).then((data) => {
              this.$message.success("加入黑名单成功")
              this.getList();
            }).catch(e => {
              this.$message.error("加入黑名单失败")
            })
        })
      },
      rejectApply(id){
        var _vue = this;
        this.$confirm('确定拒绝其申请?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'danger'
        }).then(() => {
          this.$message.warning("申请的id是:" + id)
            _vue.api({
              url: "/scholat/apply/rejectApply",
              method: "post",
              data: {
                "apply_id":id
              }
            }).then((data) => {
              this.$message.success("拒绝申请成功")
              this.getList();
            }).catch(e => {
              this.$message.error("拒绝申请失败.")
            })
        })
      },
      showDetail(id) {
        var _vue = this;
        this.$confirm('确定加入黑名单?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'danger'
        }).then(() => {
          this.$message.warning("申请的id是:" + id)
          _vue.api({
            url: "/scholat/apply/blackApply",
            method: "post",
            data: {
              "apply_id":id
            }
          }).then((data) => {
            this.$message.success("加入黑名单成功")
            this.getList();
          }).catch(e => {
            this.$message.error("加入黑名单失败")
          })
        })
      }
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
