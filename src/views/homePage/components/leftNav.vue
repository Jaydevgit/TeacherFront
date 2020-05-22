<template>
  <div class="left-container">
    <div style="padding-top: 32px;width: 100%;min-width: 184px;">
      <el-row style="width: 100%;float: left;border-radius: 10px;">
        <el-col>
          <el-menu
            :default-active="catalogueId"
            class="el-menu-vertical-demo"
            background-color="#ffffff"
            style="overflow: hidden">
            <el-menu-item index="0" @click="cIdSend(0)">
              <i class="el-icon-menu"></i>
              <span slot="title" class="parentCatalogue">教师名录</span>
            </el-menu-item>
            <!--假如有子列表-->
            <el-submenu style="background-color: white;" v-for="(item, flag) in catalogueList"
                        v-if="Object.keys(item.subCatalogueList).length!=0"
                        :key="'cId'+item.id" :index="item.id+''">

              <div slot="title"  >
                <i class="el-icon-menu"></i>
                <span class="parentCatalogue">{{item.name}}</span>
              </div>

              <el-menu-item-group style="margin-top: -14px;">
                <el-menu-item
                  v-for="(sub, index) in item.subCatalogueList" :key="'subId'+sub.id" :index="sub.id+''"
                  @click="cIdSend(sub.id,sub.name)" style="padding: 0;padding-left: 12px">
                  <span class="subcatalogueName">{{sub.name}}</span>
                </el-menu-item>

              </el-menu-item-group>

            </el-submenu>
            <!--假如没有子列表-->
            <el-menu-item v-else :key="'cId'+item.id" :index="item.id+''">
              <div slot="title" @click="cIdSend(item.id,item.name)" >
                <i class="el-icon-menu"></i>
                <span class="parentCatalogue">{{item.name}}</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
    import bus from '../../../utils/eventBus'

    export default {
        data() {
            return {
                //变量
                isActive: '',
                currentCat: 0,
                listLoading: false,//数据加载等待动画
                catalogueList: [],
              catalogueId:0,
              unitQuery: {unitId: '',domainName:''},
            }
        },
        props: ['unitId','sendName','sendSubName'],
      watch:{
        unitId:function (newValue) {
          console.log(newValue+"4564654");
          this.getCatalogues()
          this.cIdSend()

        },
        // 'unitQuery.unitId':function(){
        //   this.getCatalogues()
        // },
        $route(){
          if(this.$route.params.cId!=undefined){
            this.catalogueId = this.$route.params.cId
            console.log("this.catalogueId="+this.catalogueId);
          }else {
            this.catalogueId =0
            console.log("this.catalogueId="+this.catalogueId);
          }


        },
      },
        created() {
          this.init();
        },
        mounted() {
          if(this.unitQuery.unitId&&this.unitQuery.domainName){
            this.cIdSend()
          }
        },
        computed: {
            currentUnitId: function () {
                return this.unitQuery.unitId;
            }
        },
        methods: {
          init(){
            this.$store.state.user.domainName=this.$route.path.split('/')[2];
            this.unitQuery.domainName=this.$route.path.split('/')[2];
            this.api({
              url: "/homepage/getUnitInfo2",
              method: "get",
              params: this.unitQuery
            }).then(data => {
              console.log("查询学院信息为:" + JSON.stringify(data))
              console.log("================================")
              this.listLoading = false;
              this.unit = data;
              //   console.log("cccc"+JSON.stringify(data));
              this.unitQuery.unitId=data.unitId
              this.$store.state.user.tagState=data.tagState
            //  console.log("dddddd"+this.unitQuery.unitId+"vvvthis.unitQuery.unitIdthis.unitQuery.unitId");
           //   console.log("学校图标是："+"http://www.scholat.com/images/uni_logo/"+data.schoolName+".png");
              this.unitQuery.unitId=data.unitId
             // this.getCatalogues()
             // this.cIdSend()
           //   this.dataDone = true;
            }).catch(error => {
              console.log("QAQ........没有找到学院信息")
            })
          },
            getCatalogues() {
              console.log("this.$route.params.unitId is isisisis" + this.unitId);
                this.api({
                    url: "/catalogue/getCatalogues",
                    method: "get",
                    params: {unitId: this.unitId}
                }).then(data => {
                    console.log(JSON.stringify(data));
                    this.catalogueList = data.list;

                }).catch(error => {
                    console.log("QAQ........没有找到栏目信息")
                })
            },
            cIdSend: function (cId=0, name,modelId) {
              this.currentCat=cId;
                console.log("send++++" + this.currentCat+modelId);
                if (cId == 0) {
                  name = "教师名录";
                  modelId=3;
                }
                else{
                  modelId=2;
                }
                this.$emit("toList", name,modelId,cId);
                console.log("leftNav的ModelId="+modelId);
                //bus.$emit("cId", this.currentCat);
                console.log("leftNav的cId="+cId);
        //       { name:'homepage',path: '/homepage/'+this.$store.state.user.domainName+'/'+cId,
        //         params: { domainName:domainName,
        //         unitId:unitId}})
        // }
          //    if(((this.$route.path.split('/')).length-1)===3) {
          //    console.log("this.$store.state.user.domainName="+this.$store.state.user.domainName+this.$store.state.user.unitId);
                if (cId == 0) {
                 // bus.$emit('getList_All')
                    this.$router.push({
                        path: '/homepage',
                        name: 'homepage',
                        params: {
                            domainName: this.unitQuery.domainName,
                            unitId: this.unitQuery.unitId,
                            modelId: modelId,
                            cId: cId
                        }
                    })
                }else{
                    this.$router.push({
                        path: '/homepage',
                        name: 'catalogue',
                        params: {
                          domainName: this.unitQuery.domainName,
                          unitId: this.unitQuery.unitId,
                            modelId: modelId,
                            cId: cId
                        }
                    })
                }

              }
          //  }
        },
        components: {}
    }
</script>


<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../../styles/catalogueVariables.scss';

  .el-menu {
    box-shadow: 0px 2px 10px 0px rgba(0, 81, 193, 0.3), 0px 1px 0px 0px rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    border-right: none !important;
  }

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
    padding: 10px 30px 5px 5px;
    height: 224px;
  }

  .bigText {
    font-size: 24px;
    font-weight: bold;
    padding: 5px 10px 5px 0px;
  }

  .smallText {
    color: #8590a6;
  }

  .left-container {
    display: flex;
    align-items: center;
    width: 100%;
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
    letter-spacing: 3px;
  }


</style>
