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
          <el-button type="primary" icon="plus" @click="searchUnit" >搜索</el-button>
          <div style="clear: both;">
          </div>
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
          <img :src="getPic(scope.row.logo_url)" :onerror="defaultLogo" height="86"
          />
        </template>
      </el-table-column>

      <el-table-column align="left" label="单位" width="450">
        <template slot-scope="scope">

          <!--          <div>-->
          <!--            <span class="label-describe">school</span><span>{{scope.row.school_eng}}</span>-->
          <!--          </div>-->
          <!--          <div>-->
          <!--            <span class="label-describe">unit</span><span>{{scope.row.unit_eng}}</span>-->
          <!--          </div>-->
          <div>
            <span class="label-describe">学校</span><span>{{scope.row.school_name}}</span>
            <div style="display: inline-block;margin-left: 10px"><span >{{scope.row.school_eng}}</span></div>
          </div>
          <div>
            <span class="label-describe">学院</span><span>{{scope.row.unit_name}}</span>
            <div style="display: inline-block;margin-left: 10px"><span >{{scope.row.unit_eng}}</span></div>
          </div>
          <!--          <div>-->
          <!--          <span class="label-describe">域名</span><span>{{scope.row.domain_name}}</span>-->
          <!--        </div>-->
          <div>
            <span class="label-describe">官网</span><span><a style="color: deepskyblue;" :href="scope.row.college_url">{{scope.row.college_url}}</a></span>
          </div>
          <div>
            <span class="label-describe">师资主页</span><span><a style="color: deepskyblue;" :href="'http://faculty.scholat.com/homepage/'+scope.row.domain_name">http://faculty.scholat.com/homepage/{{scope.row.domain_name}}</a></span>
          </div>
        </template>
      </el-table-column>

      <!--      <el-table-column align="left" label="官网" width="200">-->
      <!--        <template slot-scope="scope">-->
      <!--          <div>-->
      <!--            <a style="color: deepskyblue;" :href="scope.row.college_url">{{scope.row.college_url}}</a>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->

      <!--      <el-table-column align="left" label="高级管理员信息" width="220">-->
      <!--        <template slot-scope="scope">-->
      <!--          <div>-->
      <!--            <span class="label-describe">用户名</span><span>{{scope.row.username}}</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <span class="label-describe">昵称</span><span>{{scope.row.nickname}}</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <span class="label-describe">角色</span><span>{{scope.row.roleName}}</span>-->
      <!--          </div>-->
      <!--          <div>-->
      <!--            <span class="label-describe">状态</span><span>{{scope.row.state}}</span>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column align="left" label="账号信息" width="230">
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
            <!--            <span class="label-describe">高级管理员</span><span>{{scope.row.username}}</span>-->
            <el-button  type="primary" size="mini" @click="subUser(scope.row.unitId)" plain>查看子账号</el-button>
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
          <el-button type="danger" size="small" @click="deleteU(scope.row.unitId,scope.row.domainName)">从黑名单移除</el-button>
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
    <div >

      <el-dialog title="该学院账号信息为" :visible.sync="dialogTableVisible">
        <el-table :data="allSubUnitName">
          <el-table-column property="userName" label="账号" width="160">
            <template slot-scope="scope">
              <div><span>{{scope.row.userName}}</span></div>
            </template>
          </el-table-column>
          <el-table-column property="nickName" label="昵称" width="220"></el-table-column>
          <el-table-column property="email" label="邮箱"></el-table-column>
        </el-table>
      </el-dialog>
  </div>
    <div>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <div  class="notice">
          {{Info}}</div>
        <div style="margin-bottom: 5px;margin-left: 10px">请输入 <span style="font-weight:900;text-decoration:underline">{{domainName}}</span> 确认删除</div>
        <el-row>
          <el-input type="text" v-model="deleteInfo" placeholder="输入上述带下划线域名进行删除">
          </el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">

    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteUnit">确 定</el-button>
  </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  import store from '../../../store/index'

  export default {
    name: "all",
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
          state: -2 ,//1代表申请列表,-1代表黑名单，0代表已经通过，2代表需要修改,3代表全部学院
          key: '',//排序关键字
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
        },
        allUnitId:{
          id:'',
        },
        allSubUnitName:[],
        dialogTableVisible:false,
        dialogVisible:false,
        deleteInfo:'',
        domainName:'',
        deleteId:'',
        Info:'删除学院会删除该学院全部信息(包括该学院全部教师信息,登录信息，权限信息等等)',
      }
    },
    created() {
      console.log("进入到了wait_____开始查询管理员权限和列表信息")
      this.getList();
    },
    methods: {

      deleteUnit(){

        if(this.deleteInfo===this.domainName){
          this.api({
            url: "/scholat/delete/" + this.deleteId,
            method: "get"
          }).then(res => {
            this.$message({
              message: "移除黑名单成功",
              type: 'success',
            })
            this.getList();
          }).catch(error => {
            console.log("哎呀.....移除黑名单失败")
          })
          console.log("this.deleteId+"+this.deleteId+this.domainName)
          this.dialogVisible = false
        }else{
          this.$message({
            message: "输入验证域名错误,请重新输入",
            type: 'error',
          })
          this.deleteInfo=''
        }
      },
      deleteU(id,domain){
        this.deleteId=id;
        this.domainName=domain
        this.dialogVisible= true;
      },
      subUser(id){
        this.dialogTableVisible = true;
        this.getListSubUser(id);
      },

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
      getPic(logoUrl,schoolName){
        let s=JSON.stringify(logoUrl)
        if(s!=null){
          s=s.substring(1,2)
        }
        // console.log("logo..." +  JSON.stringify(logoUrl) + "schoolName" +schoolName+s)
        if (s==='h' ){
          console.log("true");
          return logoUrl;
        }else{
          console.log("false");
          return 'https://faculty.scholat.com:2333/public/images/certificate_logo/' + logoUrl
        }
        // return 'https://faculty.scholat.com:2333/public/images/unit_logo/' + logoUrl
        // return "https://faculty.scholat.com/mainSite/images/uni_logo/" + schoolName + ".png";
      },
      /* ---------------------------------------
      * 获取该学院所有账号信息
      * =======================
      * */
      getListSubUser(id){
        this.allUnitId.id=id;
        console.log("++++++++allUnitId"+this.allUnitId);
        this.api({
          url: "/unit/getUnitInfoByUnitId",
          method: "get",
          params: this.allUnitId
        }).then(res => {
          console.log("++++++++getUnitInfoByUnitId"+JSON.stringify(res.listSubName));
          this.allSubUnitName=res.listSubName;
        }).catch(error => {
          console.log("查询账号信息列表失败")})
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
          console.log(data)
          this.listLoading = false;
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("查询学院信息列表失败")
        })
      },
      searchUnit() {
        //查询列表
        // if (!this.hasScholatPerm('unit:list')) {
        //   this.$message.error("没有list权限")
        //   return
        // }
        this.listLoading = true;
        console.log("### 开始查询关键学院")
        this.listQuery.key = this.search
        console.log(JSON.stringify(this.listQuery))
        if (this.search != null && this.search != "") {
          this.api({
            url: "/scholat/apply/search",
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
        } else {
          this.getList()
        }
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
  .notice{
    background-color: #FFFBDE;
    min-height: 60px;
    margin-bottom: 20px;padding: 5px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transform: translateY(-10px);
  }
</style>
