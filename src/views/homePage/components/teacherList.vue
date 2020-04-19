<template>
  <!--两种模式：模式1 详细显示 -->
  <div v-if="detail===1" class="teacherList-container">
    <div style="float: left;position: relative;width: 100%;padding: 0px 5px;height: 100%;">
      <ul class="ul-page" style="width: 100%;">
        <li v-for="teacher in teacherList" :key="teacher.tId" class="teacherLi">
          <el-row :gutter="10" style="height: 60px;padding-top: 15px;min-width: 758px">
            <el-col :span="6">
              <div class="grid-content bg-purple" @click="routerTo(teacher.tId)"
                   style="cursor: pointer; overflow: hidden;text-overflow: ellipsis;padding-left: 10px;">
                <!--<img :src="getImgUrl(teacher.tAvatar)" :onerror="defaultImage" class="list-img" style="float: left;width: 80px;height: 80px">-->
                <div style="padding-top: 10px;display: flex">
                  <div style="width: 75px;font-size: 16px;font-weight: bold;padding: 0px 0px 10px 0px;">
                    {{teacher.tName}}
                  </div>
                  <div class="smallText" style="font-size: small">{{teacher.tPost}}</div>
                </div>
              </div>
            </el-col>

            <el-col :span="4">
              <div class="grid-content bg-purple" style="font-size:medium;height: 60px;margin-left: 2px">
                <div v-if="!!teacher.tDegree" style="margin: 12px 0 12px 0">{{teacher.tDegree}}</div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple"
                   style="font-size: small;overflow: hidden;text-overflow: ellipsis;height: 60px;min-width: 180px">
                <div v-if="!!teacher.tEmail" style="margin: 12px 0 12px 0">{{teacher.tEmail}}</div>
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple"
                   style="font-size:large;height: 60px;overflow: hidden;text-overflow: ellipsis;">
                <div style="margin-top: 10px;font-size: small" v-if="teacher.tScholat_username">
                  <!--<span><svg-icon icon-class="S"/></span>-->
                  <a target="_blank" :href="'http://www.scholat.com/'+teacher.tScholat_username" style="color: #399;">
                    http://www.scholat.com/{{teacher.tScholat_username}}
                  </a>
                </div>

              </div>
            </el-col>
            <el-col :span="3">

            </el-col>
          </el-row>
        </li>
      </ul>
      <div v-if="totalCount >21"
           style="clear: both;text-align:center;width: 100%;margin-bottom: 18px;padding-top:10px;position:relative;bottom: 0;">
        <el-pagination style=""
                       @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNum"
                       :page-size="listQuery.pageRow"
                       :total="totalCount"
                       layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>

  <!--两种模式：模式2 简易显示 -->
  <div v-else-if="detail===2" class="teacherList-container2">
    <div style="float: left;position: relative;width: 100%;padding: 14px 5px;height: 100%;">
      <ul class="ul-page2" style="display: flex;justify-content: space-between;flex-wrap: wrap">
        <li v-for="teacher in teacherList" :key="teacher.tId" class="teacherLi2"
            @click="routerTo(teacher.tId)" style="cursor: pointer">
          <img style="cursor: pointer" :src="getImgUrl(teacher.tAvatar)" :onerror="imgErrorFun()" class="list-img">
          <div style="width: 120px;text-align: center;padding-top: 40px">
            <div style="font-size: 16px;font-weight: bold;padding: 0px 0px 10px 0px;">
              {{teacher.tName}}
            </div>
            <div class="smallText">{{teacher.tPost}}</div>
          </div>
        </li>
      </ul>
      <div v-if="totalCount >12"
           style="clear: both;text-align:center;width: 100%;margin-bottom: 18px;position: absolute;bottom: 0;">
        <el-pagination style=""
                       @current-change="handleCurrentChange"
                       :current-page="listQuery.pageNum"
                       :page-size="listQuery.pageRow"
                       :total="totalCount"
                       layout="total, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>


  </div>
  <!--    师资只显示姓名模式-->
  <div v-else-if="detail===3" class="teacherList-container3">
    <div style="float: left;position: relative;width: 100%;padding: 14px 5px;height: 100%;">
      <ul class="ul-page3">
        <li v-for="teacher in teacherListAll" :key="teacher.tId"
            @click="routerTo(teacher.tId)"
            style="cursor: pointer;float: left;margin: 15px;width: 95px;padding-left: 30px">
            <span style="font-size: 16px;color: #0099CC;letter-spacing: 3px" class="teacherLi3">
              {{teacher.tName}}
            </span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
    import bus from '../../../utils/eventBus'

    export default {
        data() {
            return {
                //变量
                defaultImage: 'http://47.106.132.95:2333/images/avatar/default.png',
                isActive: '',
                sourceUrl: 'http://47.106.132.95:2333/images/avatar/',
                listName: '最新更新',
                totalCount: 0, //分页组件--数据总条数
                currentCat: '',
                listLoading: false,//数据加载等待动画
                flag: 0,// 0：默认显示目录，1：字母显示目录
                listQuery: {
                    pageNum: 1,//页码
                    pageRow: 12,//每页条数
                    unitId: '',
                    cId: '',
                    key: '',
                    letter: ''
                },
                searchKey: '',
                teacherList: [],
                teacherListAll: [],
                catalogueList: [],
                teacherProfile: {},//教师数据
                detailModel: '',
                isSendSuccessful: false
            }
        },
        watch: {
            detail: function (newVal, oldVal) {
                this.detailModel = newVal;  //newVal即是chartData
                console.log("teacherList的watch检测到detail变化")
            },
            cId: function (newVal, oldVal) {
                let msg = newVal;
                let self = this;
                self.currentCat = msg;
                //主目录
                if (self.currentCat != 0)
                    self.getTeacherByCatalogue(self.currentCat)
                //cId为0,指师资队伍
                else
                    self.getListAll()
            },
            unitId: function (newVal, oldVal) {
                let msg = newVal;
                let self = this;
                //主目录
                if (self.currentCat != 0)
                    self.getTeacherByCatalogue(self.currentCat)
                //cId为0,指师资队伍
                else
                    self.getListAll()
            }

        },
        props: ['msgLetter', 'detail', 'cId','unitId'],
        mounted() {
            let self = this;
           /* bus.$on("cId", function (msg) {
                console.log("recieve++++" + msg)
                self.currentCat = msg;
                //主目录
                if (self.currentCat != 0)
                    self.getTeacherByCatalogue(self.currentCat)
                //cId为0,指师资队伍
                else
                    self.getListAll()
            });*/
            bus.$on("key", function (msg) {
                self.searchKey = msg;
                console.log("key++++" + msg);
                self.searchTeacher();
            })
        },
        created() {
            // this.getList();
            if(this.unitId!=null && this.cId!=null){
                if (this.cId != 0)
                    this.getTeacherByCatalogue(this.cId);
                //cId为0,指师资队伍
                else
                    this.getListAll()
            }
        },
        ready() {
        }
        ,
        computed: {},
        methods: {
            getLetter(letter) {
                //letter为0 即恢复到默认
                if (letter == 0) {
                    // 如果为"师资队伍"
                    if (this.currentCat == 0) {
                        this.listQuery.letter = 'A';
                        this.flag = 0;
                        this.getList();
                    }
                    // 为子目录
                    else {
                        this.listQuery.letter = 'A';
                        this.flag = 0;
                        this.getTeacherByCatalogue(this.currentCat);
                        console.log("--------执行了methons内的getLetter的getTeacherByCatalogue方法------------");
                    }
                }
                //letter不为0 跳到字母
                else {
                    if (this.currentCat == 0) {
                        this.listQuery.letter = letter;
                        this.flag = 1;
                        this.getAllByLetter()
                    } else {
                        this.listQuery.letter = letter;
                        this.flag = 1;
                        this.getTeacherByLetter(this.currentCat)
                    }
                }
            },
            handleCurrentChange(val) {
                //改变页码 0：师资队伍 -1：搜索  else：目录
                this.listQuery.pageNum = val
                if (this.currentCat == 0) {
                    if (this.flag == 0)
                        this.changeList()
                    if (this.flag == 1)
                        this.changeAllByLetter()

                } else if (this.currentCat == -1)
                    this.changeSearchTeacher()
                else {
                    if (this.flag == 0)
                        this.changeTeacherByCatalogue(this.currentCat)
                    if (this.flag == 1)
                        this.changeTeacherByLetter(this.currentCat)
                }
            },
            routerTo(tId) {
                /*        this.$router.push({
                          name:'teacherPersonlHomePage',
                          params:{
                            id:tId
                          }
                        })*/
                this.$emit("toInfo", tId)
            },
            getImgUrl(imgName) {
                return 'http://www.scholat.com/' + imgName;
            },
            imgErrorFun() {
                let img = event.srcElement;
                img.onerror = null;
                console.log("执行了imgErrorFun函数，onerror=" + img.onerror + "，img.src=" + img.src);
                return 'this.src="http://47.106.132.95:2333/images/avatar/default.png"';
            },
            getListAll() {
                this.currentCat = 0
                this.listQuery.unitId = this.unitId
                this.listLoading = true;
                this.api({
                    url: "/homepage/listTeacherAll",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询所有教师信息为:" + data.totalUpdate)
                    console.log("=================getListAll===============")
                    console.log(data.list)
                    console.log(this.listQuery)
                    // this.listLoading = false;
                    this.teacherListAll = data.list;
                    //console.log(this.teacherListAll);
                    this.totalCount = data.totalCount;
                    //this.$emit("detailShow", 3);
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })
            },
            //此方法与下一个方法changeXXX的区别是，让页码变为1。 区别：change方法可以在任意页码跳转，下面的方法也一样
            getList() {
                this.listQuery.pageNum = 1
                this.changeList()
            },
            changeList() {
                this.currentCat = 0
                this.listQuery.unitId = this.unitId
                this.listLoading = true;
                console.log("### 开始查询教师成员列表")

                this.api({
                    url: "/homepage/listTeacher",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + data.totalUpdate)
                    console.log("==================getList方法==============")
                    this.listLoading = false;
                    this.teacherList = data.list;
                    // console.log(this.teacherList);
                    this.totalCount = data.totalCount;
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })


            },
            getAllByLetter() {
                this.listQuery.pageNum = 1;
                this.changeAllByLetter()
            },
            changeAllByLetter() {
                this.currentCat = 0
                this.listQuery.unitId = this.unitId
                this.listLoading = true;
                console.log("### 开始查询教师成员列表")
                this.api({
                    url: "/homepage/letterTeacher",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + data.totalUpdate)
                    console.log("================getAllByLetter方法================")
                    this.listLoading = false;
                    this.teacherList = data.list;
                    this.totalCount = data.totalCount;
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })
            },
            //此方法与下一个方法changeXXX的区别是，让页码变为1。 区别：change方法可以在任意页码跳转，下面的方法也一样
            getTeacherByCatalogue(cId) {
                this.listQuery.pageNum = 1
                this.changeTeacherByCatalogue(cId);
                console.log("===============getTeacherByCatalogue=================")
            },
            changeTeacherByCatalogue(cId) {
                this.currentCat = cId;
                this.listQuery.cId = cId;
                this.listLoading = true;
                console.log("### 开始查询教师成员列表");
                this.api({
                    url: "/catalogue/getTeacherByCatalogueAndPage",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + JSON.stringify(data))
                    console.log("===============changeTeacherByCatalogue=================")
                    this.listLoading = false;
                    this.teacherList = data.list;
                    this.totalCount = data.totalCount;
                    this.isSendSuccessful = true;
                    this.$emit("detailShow", 2);
                    console.log("emit***********************");
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                });
            },
            //此方法与下一个方法changeXXX的区别是，让页码变为1。 区别：change方法可以在任意页码跳转，下面的方法也一样
            getTeacherByLetter(cId) {

                this.listQuery.pageNum = 1
                this.changeTeacherByLetter(cId)
            },
            changeTeacherByLetter(cId) {
                this.currentCat = cId
                this.listQuery.cId = cId
                this.listLoading = true;
                console.log("### 开始查询教师成员列表")
                this.api({
                    url: "/catalogue/getByCatalogueAndLetterAndPage",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log("查询教师信息为:" + JSON.stringify(data))
                    console.log("================getTeacherByLetter================")
                    this.listLoading = false;
                    this.teacherList = data.list;
                    this.totalCount = data.totalCount;
                }).catch(error => {
                    console.log("QAQ........没有找到教师列表")
                })
            },
            //此方法与下一个方法changeXXX的区别是，让页码变为1。 区别：change方法可以在任意页码跳转，下面的方法也一样
            searchTeacher() {
                this.listQuery.pageNum = 1
                this.changeSearchTeacher()
            },
            changeSearchTeacher() {
                this.currentCat = -1
                this.listQuery.unitId = this.unitId
                this.listQuery.key = this.searchKey
                this.api({
                    url: "/teacher/searchTeacher",
                    method: "get",
                    params: this.listQuery
                }).then(data => {

                    this.teacherListAll=data.list

                    this.teacherList = data.list



                    this.totalCount = data.totalCount;
                }).catch(error => {
                    console.log("QAQ........获取教师失败")
                })
            },


        },
        components: {},
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/catalogueVariables.scss';

  el-menu-item {
    background-color: white;
  }

  el-menu-item:hover {
    background-color: white;
  }

  .newsLi {
    height: 76px;
    padding: 5px 5px 5px 0px;
  }

  .is-active {
    background-color: #0099cc !important;
    color: white;
  }

  .is-active > span {
    color: white;
  }

  .teacherLi {
    float: left;
    padding: 5px 5px 0px 5px;
    height: 60px;
    min-width: calc(100% - 36px);
    border-bottom: thin solid #EAEAEA;
  }

  .teacherLi2 {
    float: left;
    padding: 10px 5px 5px 5px;
    height: 150px; /*224*/
    width: 220px;
    display: flex;
    margin: 0 10px 10px 10px;
    flex-direction: row;
  }

  .teacherLi2:hover {
    float: left;


    padding: 10px 5px 5px 5px;
    height: 150px; /*224*/
    display: flex;
    margin: 0 10px 10px 10px;
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    transition: box-shadow 0.5s;
    background-color: #F7F7F7;
  }

  .teacherLi3:hover {
    padding-bottom: 2px;
    border-bottom: 2px solid #0099CC;
  }

  .bigText {
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText {
    color: #8590a6;
  }

  .teacherList-container {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 36px);
    min-height: 736px;
    margin: 0 auto;
    width: 100%;
    background: #fff;
  }

  .teacherList-container2 {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 36px);
    min-height: 736px;
    margin: 0 auto;
    width: 100%;
    background: #fff;
  }

  .teacherList-container3 {
    position: relative;
    flex-flow: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: center;
    height: calc(100% - 36px);
    min-height: 520px;
    margin: 0 auto;
    width: 100%;
    background: #fff;
  }


  .header-navs {
    position: relative;
    border: 2px solid #3399CC;
  }

  .navs {
    height: 50px;
    line-height: 50px;
  }


  .nav {
    float: left;
    width: 120px;
    text-align: center;
    border-right: 2px solid #3399CC;
  }

  .nav-item {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #3399CC;
  }

  .nav-item:hover {
    color: white;
    background-color: #3399CC;

  }

  .nav2 {
    display: inline-block;
    width: 30px;
    text-align: center;
  }

  .nav-item2 {
    display: block;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    text-decoration: none;
    color: #3399CC;
  }

  .nav-item2:hover {
    color: white;
    background-color: #3399CC;
  }

  .nav-item-active {
    color: white;
    background: #3399CC;
  }


  .subcatalogueName {
    padding-left: 15px;
    color: #8590a6;
  }

  .parentCatalogue {
    font-size: 16px;
  }

  .list-img {
    display: block;
    margin: auto;
    border-radius: 50%;
    width: 100px;
    height: 100px;
    border: 3px solid #efefef;
    background-color: #f5f5f5;
  }

  .ul-page {
    width: inherit;
  }

</style>
