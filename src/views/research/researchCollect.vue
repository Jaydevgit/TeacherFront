<template>
  <div class="app-container">
    <div class="filter-container">
  <el-table :data="list"
            v-loading.body="listLoading" element-loading-text="拼命加载中" border fit
            highlight-current-row
            @sort-change='sortChange'>
    <el-table-column align="center" label="序号" width="60">
      <template slot-scope="scope">
        <span v-text="getIndex(scope.$index)"> </span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="头像" style="text-overflow: clip">

      <template slot-scope="scope">
        <template v-if="scope.row.scholat_update_time > scope.row.update_time">
          <el-badge is-dot aria-setsize="14px" class="item" style="margin-top: 10px;">
            <img class="preview" @click="routerTo(scope.row)" :src="getImgUrl(scope.row.avatar)"
                 :onerror="imgErrorFun()" style="width:60px;height:60px;cursor:pointer;"/>
          </el-badge>
        </template>
        <template v-else>
          <img class="preview" @click="routerTo(scope.row)" :src="getImgUrl(scope.row.avatar)" :onerror="imgErrorFun(this)"
               style="width:60px;height:60px;cursor:pointer;"/>
        </template>
      </template>

    </el-table-column>
    <el-table-column align="center" label="姓名"  sortable='custom' prop="pinyin">
      <template slot-scope="scope">
        <span class="teacher-homepage" @click="routerTo(scope.row)" style="cursor:pointer;">{{scope.row.name}}</span>
        <span></span>
      </template>
    </el-table-column>
    <el-table-column align="center" label="网址"  prop="pinyin">
      <template slot-scope="scope">
          <span class="teacher-homepage" style="cursor:pointer;">
            <a :href="'http://faculty.scholat.com/teacher/'+scope.row.school_unit_domainName+'/'+scope.row.domainName">
              {{scope.row.domainName}}
            </a>
          </span>
        <span></span>
      </template>
    </el-table-column>
    <!--<el-table-column align="center" label="学历" >
      <template slot-scope="scope">
        <span>{{scope.row.degree}}</span>
      </template>
    </el-table-column>-->
    <!--      <el-table-column align="center" label="状态" width="100">-->
    <!--        <template slot-scope="scope">-->
    <!--          <el-tag-->
    <!--            :type="scope.row.state === '在岗' ? 'primary' : 'success'"-->
    <!--            disable-transitions>-->
    <!--            <span v-text='getState(scope.row.state)'></span>-->
    <!--          </el-tag>-->
    <!--        </template>-->
    <!--      </el-table-column>-->
    <!--<el-table-column align="center" label="职称" >
      <template slot-scope="scope">
        <span>{{scope.row.post}}</span>
      </template>
    </el-table-column>-->
    <el-table-column align="center" label="更新时间"  min-width="160" sortable='custom' prop="update_time">
      <template slot-scope="scope">
        <span>{{scope.row.update_time}}</span>
        <div style="margin-top: 7px;"><el-tag v-if="scope.row.editName" type="success" effect="plain" >编辑者:{{ scope.row.editName }} </el-tag></div>
      </template>
    </el-table-column>


    <el-table-column fixed="right" align="center" label="学术档案" width="90">
      <template slot-scope="scope">
        <el-button v-if="scope.row.scholat_username!==''" type="success" icon="el-icon-info" circle @click="showAcademic(scope.row.scholat_username)"></el-button>
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
  </div>
</template>

<script>
  import teacherPersonalHomePage from '../teacher/teacherPersonalHomePage'
import defaultAvatar from '@/assets/default1.png'

  export default {
    name: "researchCollect",
    data() {
      return {
        defaultImage: 'http://39.108.169.193:2333/public/images/avatar/default.png',
        defaultAvatar:defaultAvatar,
        searchKey: '',
        totalCount: 0, //分页组件--数据总条数
        totalUpdate: 0,// 学者网更新总数
        list: [],//表格的数据
        listLoading: false,//数据加载等待动画
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          unitId: '',
          key: '',//排序关键字
          sort:'', //升降序标记
          state:1 ,//在岗状态
          scholatUsernameFlag:true,
        },
        currentSearch: 'false',
        dialogStatus: 'create',
        dialogFormVisible: false,
        textMap: {
          update: '编辑',
          create: '添加新成员'
        },
        tempTeacher: {
          id: "",
          name: "",
          sex: 0,
          avatar: '',
          department: '',
          post: '',
          state: 1,
          intro: '',
          update_time: '',
          email: '',
          phone: ''
        },
        showMask: false,
        showRoleAssigment: false,
        roleId: '',//角色分配id
        teacherState:'1',//教师是否在岗
        flagScholat:true, //是否关联学者网
        unitQuery:{
          domainName:'',
          unitId:''
        },
        dialogTableVisible: false,
        dialogImportVisible: false,
        fileList:[],
      }
    },
    created() {
      console.log("--------------------开始查询教师权限")
      this.getList();
      this.unitID=this.$store.state.unitId
      // this.countTeacherUpdate();太慢
    },
    computed:{
      pdfData:function () {
        return{
          unitId:  this.$store.state.user.unitId,
          editName:this.$store.state.user.nickname
        }
      },
    },
    methods: {
      updateFromScholat() {
        this.$message.error("正在写")

      },
      searchTeahcer() {
        this.listQuery.pageNum = 1;
        this.listQuery.unitId = this.$store.state.user.unitId
        this.listQuery.key = this.searchKey
        if (this.searchKey != null && this.searchKey != "") {
          this.api({
            url: "/manager/searchTeacher",
            method: "get",
            params: this.listQuery
          }).then(data => {
            this.list = data.list;
            console.log(" this.list" + JSON.stringify(this.list));
            this.totalCount = data.totalCount;
            this.totalUpdate = data.totalUpdate;
            this.currentSearch = true;
          }).catch(error => {
            console.log("QAQ........获取教师失败")
          })
        }
      },
      changeTeahcer() {
        this.listQuery.unitId = this.$store.state.user.unitId
        this.listQuery.key = this.searchKey
        this.api({
          url: "/manager/searchTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("QAQ........获取教师失败")
        })
      },


      getImgUrl(imgName) {
        if (imgName == null) {
          return this.defaultAvatar;
        } else if (imgName == "default.png") {
          return this.defaultAvatar
        } else if (imgName.indexOf("resources") != "-1") {
          return "http://www.scholat.com/" + imgName;
        } else {
          return "http://39.108.169.193:2333/public/images/avatar/" + imgName;
        }
        /*return 'http://39.108.169.193:2333/public/images/avatar/'+imgName;*/

      },
      imgErrorFun(e) {
        return 'this.src="defaultAvatar"';
      },
      routerTo(teacher) {
        console.log("=========================================")
        console.log("点击跳转........" + teacher.domainName);
        let routeData = this.$router.push({
          name: 'teacherPersonlHomePage',
          params: {
            // facultyDomainName:this.$store.state.user.domainName,
            schoolDomain: this.$store.state.user.schoolDomain,
            teacherDomainName: teacher.domainName,
            id: teacher.id
          }
        });
        window.open(routeData.href, '_blank');
        /*  this.$router.push({
                  name: 'teacherPersonlHomePage',
                  params: {
                      id: teacher.id
                  }
              })*/
      },
      getList() {

        //查询列表
        if (!this.hasPerm('teacher:list')) {
          return
        }
        this.listQuery.pageNum = 1;
        // this.listQuery.key="update_time";
        // this.listQuery.sort="desc";
        this.listQuery.unitId = this.$store.state.user.unitId;
        console.log('unitId==' + JSON.stringify(this.listQuery));
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/manager/listTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询教师信息为:")
          console.log("=================展示教师列表信息===============")
          this.listLoading = false;
          this.list = data.list;
          console.log(data);
          this.list.forEach((v, k) => {
            let t = v.update_time.replace(/\./g, '-').slice(0, 16);
            v.update_time = t;
          });
          this.totalCount = data.totalCount;

          this.currentSearch = false
          console.log(this.totalCount + "  " + this.totalUpdate + " " + this.listQuery.pageNum);
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })

      },

      changeList() {
        //查询列表
        if (!this.hasPerm('teacher:list')) {
          return
        }
        this.listQuery.unitId = this.$store.state.user.unitId;
        console.log('unitId==' + this.listQuery.unitId);
        this.listLoading = true;
        console.log("### 开始查询教师成员列表")
        this.api({
          url: "/manager/listTeacher",
          method: "get",
          params: this.listQuery
        }).then(data => {
          console.log("查询教师信息为:" + data.totalUpdate)
          console.log("================================")
          this.listLoading = false;
          this.list = data.list;
          this.totalCount = data.totalCount;
          this.totalUpdate = data.totalUpdate;
        }).catch(error => {
          console.log("QAQ........没有找到教师列表")
        })
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleFilter() {
        //查询事件
        this.listQuery.pageNum = 1
        this.getList()
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        if (!this.currentSearch)
          this.changeList()
        else
          this.changeTeahcer()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },

      openQuery() {
        this.showMask = true;
      },


      //姓名排序
      sortChange(column) {
        this.listQuery.key = column.prop;
        if (column.order === 'descending') {
          this.listQuery.sort = 'desc';
        } else {
          this.listQuery.sort = '';
        }
        console.log(this.listQuery.key + " " + this.listQuery.sort);
        this.getList();
        //console.log(JSON.stringify(column) + '-' + column.prop + '-' + column.order)
      },

      showAcademic(scholat_username) {
        this.$router.push({
          name: 'personAcademic',
          params: {
            scholat_username: scholat_username
          }
        })
      },
    }
  }
</script>

<style scoped>

</style>
