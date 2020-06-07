<template>
  <div class="content">
    <span class="r-title" v-if="searchFlag===false">相关教师</span>
    <span class="r-title" v-else>搜索结果</span>
    <div class="r-box">
      <relate-teacher v-for="(item, teacherId) in teachers"  :key="teacherId" :msg="item">
      </relate-teacher>
    </div>
  </div>
</template>

<script>
    import relateTeacher from './relateTeacher'
    import bus from '../../../../utils/eventBus'

    export default {
        name: "index",
        data() {
            return {
                teachers: [],
                totalCount: 0,
                listLoading: false,//数据加载等待动画
                listQuery: {
                    pageNum: 1,//页码
                    pageRow: 8,//每页条数
                    tDomainName: '',
                  key:'',
                  unitId:''
                },
              searchFlag:false,
            }
        },
        created() {
            this._getAllTeachers();
            this.listQuery.tDomainName = this.$route.path.split('/')[3];
        },
        watch: {
          $route() {
            this._getAllTeachers();
            this.listQuery.tDomainName = this.$route.path.split('/')[3];
          },
        },
      mounted(){
        let _self = this;
        bus.$on("changePageList2", function (searchKey) {
          _self._changeSearchTeacher(searchKey)
        })
      },
        components: {
            relateTeacher
        },
      computed: {
        unitId: function () {
          console.log(this.$store.state.user.unitId + 'bb');
          return this.$store.state.user.unitId;
        }
      },
        methods: {
            _getAllTeachers() {
              this.searchFlag=false
                console.log("_getAllTeachers ()~~~ 开始查询教师成员列表")
                this.api({
                    url: "/homepage/listTeacherRecommend",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + data.totalUpdate)
                    this.listLoading = false;
                    this.teachers = data.list.slice(0,8);
                    this.totalCount = data.totalCount;
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })
            },
          _changeSearchTeacher(searchKey) {
              this.searchFlag=true
            this.listQuery.unitId =  this.$store.state.user.unitId
            this.listQuery.key = searchKey
            this.api({
              url: "/teacher/searchTeacher",
              method: "get",
              params: this.listQuery
            }).then(data => {
              console.log("查询教师信息为---:" + JSON.stringify(data.list))
              this.teachers = data.list
              this.totalCount = data.totalCount;
            }).catch(error => {
              console.log("QAQ........获取教师失败")
            })
          },

        }

    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .content {
    width: 22%;
    box-shadow: 0px 2px 10px 0px rgba(0, 81, 193, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
    background-color: #fff;
    box-sizing: border-box;
    overflow: hidden;

    .r-title {
      display: inline-block;
      width: 100%;
      text-align: center;
      padding-top: 15px;
      font-size: 20px;
      color: #333333;
    }

    .r-box {
      width: 100%;
      text-align: center;
      display: flex;
      flex-wrap: wrap;
      padding-top: 10px;

      > div {
        /*float: left;*/
        border-radius: 5px;
        margin: 10px;
      }
    }
  }
</style>
