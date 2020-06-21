<template>
  <div class="dialog" v-show="showMask">
    <div class="dialog-container">
      <div class="dialog-title">教师分配</div>

<!--        <el-transfer :titles="['未分配', '已分配']" v-model="value2" :data="data"></el-transfer>-->
        <div style="overflow:auto;  height: 200px;">
        <div v-for="(item, flag) in catalogueList_t" :key="'cId'+item.id" style="margin-bottom: 10px;text-align: center;">
        <el-select v-if="Object.keys(item.subCatalogueList).length!=0"  v-model="values[flag]"  :placeholder='item.name' >
          <el-option
            v-for="sub in item.subCatalogueList"
            :key="sub.name"
            :label="sub.label"
            :value="sub.name"
            :disabled="sub.disabled"
           @click.native="getTeacherByCatalogueId(RoleId,sub.id),checkCataloguerList(sub.id,flag)">
          </el-option>
<!--          :disabled="sub.cCatalogue_id"-->
        </el-select>
          <el-select v-if="Object.keys(item.subCatalogueList).length===0" v-model="values[flag]"  :placeholder='item.name'  :disabled="item.disabled" >
            <el-option
              :key="item.name"
              :label="item.label"
              :value="item.name"

              @click.native="getTeacherByCatalogueId(RoleId,item.id),checkCataloguerList(item.id,flag)">
            </el-option>
          </el-select>
<!--        <el-button type="primary" style="margin-left: 40px" @click="addCatalogueTeacher" :disabled="isAble[flag]">确认分配</el-button>-->
        </div>
        </div>

      <div class="btns">
        <div v-if="type !== 'confirm'" class="default-btn" @click="closeBtn">
          {{cancelText}}
        </div>
        <div  class="confirm-btn" @click="confirmBtn" style="margin-left: 20px">
          {{confirmText}}
        </div>
      </div>
      <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
    </div>

  </div>
</template>
<script>
    export default {
        name:'roleAssignment',
        props: {
            value: {},
            // 类型包括 defalut 默认， danger 危险， confirm 确认，
            type:{
                type: String,
                default: 'default'
            },
            content: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: '教师分配'
            },
            cancelText: {
                type: String,
                default: '取消分配'
            },
            confirmText: {
                type: String,
                default: '完成分配'
            },
            RoleId:'',
        },
        data(){
            // const generateData = _ => {
            //     const data = [];
            //     const cList =this.catalogueList;
            //     cList.forEach((subCatalogueList, index) => {
            //         data.push({
            //             label: subCatalogueList.name,
            //             key: index,
            //            });
            //         });
            //     return data;
            // };
            return{
                fff:false,
                isAble:[false],
                showMask: false,
                listQuery: {
                    unitId: '',
                    catalogue: ''
                },
                catalogueList: [],
                catalogueList_t:[],
                values:[],
                teacherList:[],
                CataloguesIds:[],
                selectedAllCatalogueIds:[],
                catalogueRoleId:'',
                catalogueId:'',
                selectedOptions: [],
                // data: generateData(),
                // value2: [1, 4]
            };

        },
      // watch:{
      //   'catalogueList_t':{
      //     handler:function(newValue,oldValue){
      //       this.catalogueList_t=newValue
      //       console.log("newValue"+JSON.stringify(newValue))
      //     },
      //     deep:true,
      //   }
      // },
        methods:{
            closeMask(){
              for (let i = 0; i < this.catalogueList_t.length; i++) {
                this.catalogueList_t[i].disabled=false;
                for (let j = 0; j <this.catalogueList_t[i].subCatalogueList.length; j++) {
                  this.catalogueList_t[i].subCatalogueList[j].disabled=false
                }
              }
              for (let i = 0; i <  this.selectedAllCatalogueIds.length; i++) {
                this.selectedAllCatalogueIds[i]=null
              }
                this.showMask = false;
              console.log("catalogueList_tttt="+JSON.stringify(this.catalogueList_t));
              console.log("selectedAllCatalogueIds="+JSON.stringify(this.selectedAllCatalogueIds));
            },
            closeBtn(){

                this.$emit('cancel');
               // this.selectedAllCatalogueIds="";
                for(let i=0;i<(this.values).length;i++)
                {
                    this.values[i]=null;
                }
                // this.$nextTick(()=>{
                //     this.$refs['form'].resetFields();
                // });

                this.closeMask();
            },
            confirmBtn(){

                this.addAllCatalogueTeacher();
              //  this.selectedAllCatalogueIds="";
                for(let i=0;i<(this.values).length;i++)
                {
                    this.values[i]=null;
                }

               // this.values=null;
                // this.$nextTick(()=>{
                //     this.$refs.form.resetFields();
                // });
                this.$emit('confirm');
                console.log(this.selectedAllCatalogueIds)
                this.closeMask();
            },
            getTeacherAllCatalogues(tId) {
                console.log("获取该教师存在所有栏目检测启动...");
                this.api({
                    url: "/catalogue/getTeacherAllCatalogues",
                    method: "get",
                    params: {tId:tId}
                }).then(data => {
                    // console.log("CatalogueTeachers+++++" + JSON.stringify(data));
                    this.CataloguesIds = data.list;
                    console.log(this.CataloguesIds);
                    this.catalogueList_t = this.catalogueList;
                    console.log("catalogueList_t="+JSON.stringify(this.catalogueList_t));

                    for(let cID in this.CataloguesIds){
                        let t_id = this.CataloguesIds[cID].cCatalogue_id
                      for(let item in this.catalogueList){
                          if(this.catalogueList[item].id!=t_id){
                              // 查看是否有子栏目
                              let sub = this.catalogueList[item].subCatalogueList
                              if(sub.length!=0){
                                  for(let sub_index in sub){
                                   // this.catalogueList_t[item].subCatalogueList[sub_index].disabled=false
                                      if(sub[sub_index].id==t_id){
                                          // 暂时移除该子栏目
                                         // this.catalogueList_t[item].subCatalogueList.splice(sub_index,1)
                                        this.catalogueList_t[item].subCatalogueList[sub_index].disabled=true
                                        //console.log("disabled="+JSON.stringify(this.catalogueList_t));
                                      }
                                  }
                              }
                          }else{
                              //  暂时移除该栏目的展示
                             // this.catalogueList_t.splice(item,1);
                            this.catalogueList_t[item].disabled=true
                            console.log("disabled="+JSON.stringify(this.catalogueList_t));
                          }
                      }
                    }
                  console.log("catalogueList_t="+JSON.stringify(this.catalogueList_t));
                  this.$forceUpdate();
                    console.log(JSON.parse(this.catalogueList))


                }).catch(error => {
                    console.log("QAQ........没有找到教师")
                })
            },
            getTeacherByCatalogueId(tId,cId) {
                console.log("获取关联ID启动。。。");
                this.api({
                    url: "/catalogue/getTeacherByCatalogueId",
                    method: "get",
                    params: {tId:tId, cId:cId}
                }).then(data => {
                    // console.log("找到了 他就是:" + JSON.stringify(data));
                    this.catalogueRoleId = data.list[0];
                    this.catalogueId=cId;
                    // console.log(this.catalogueRoleId);
                    // console.log(this.catalogueId);
                }).catch(error => {
                    console.log("QAQ........没有找到教师")
                })
            },
            checkCataloguerList(value,flag) {
                console.log("教师是否存在该栏目检测启动...");
                this.selectedAllCatalogueIds[flag]=value;
                for (let a = 0; a < this.CataloguesIds.length; a++) {
                    this.isAble[flag]=false;
                    if (this.CataloguesIds[a].cCatalogue_id == value) {
                        this.$message({
                            type: 'warning',
                            message: '该教师已经存在在此栏目，请重新选择！'
                        });

                        this.isAble[flag]=true;
                        return false;
                    }
                }
                return true
            },
            addCatalogueTeacher() {
                console.log("教师分配进入分栏启动。。。");
                // console.log("tIds===++++" +this.catalogueId);
                this.api({
                    url: "/catalogue/addCatalogueTeacher",
                    method: "post",
                    data: {"tIds": this.RoleId, "cId": this.catalogueId}
                }).then(data => {
                    this.$message.success('添加成功');
                }).catch(error => {
                    console.log("QAQ........添加失败");
                    this.$message.warning('请勾选要分配的教师栏目');
                })
            },
            addAllCatalogueTeacher() {
                let cIds = [];
              for (let i = 0; i < cIds.length; i++) {
                cIds[i]=null
              }
              console.log("cIds===++++" + cIds);
                //检查已选择教师的ID
                console.log("检查已选择教师的ID"+JSON.stringify(this.selectedAllCatalogueIds))
                //检查教师是否已经加入该栏目
                for (let i = 0; i < this.selectedAllCatalogueIds.length; i++) {

                    if (!this.checkCataloguerList(this.selectedAllCatalogueIds[i])) {
                        // this.$message({
                        //     type: 'error',
                        //     message: '分配失败,请重新选择！'
                        // });
                        // return false;

                    } else {
                        if((this.selectedAllCatalogueIds[i])!=null)
                        {
                            cIds.push(this.selectedAllCatalogueIds[i]);
                        }

                    }
                }
                console.log("cIds===++++" + cIds);
                this.api({
                    url: "/catalogue/addCatalogueTeacher",
                    method: "post",
                    data: {"tIds": this.RoleId, "cId":cIds}
                }).then(data => {
                    this.$message.success('添加成功');
                }).catch(error => {
                    console.log("QAQ........添加失败");
                    this.$message.warning('请重新分配的教师');
                })

            },
            getCatalogues() {
                this.listQuery.unitId = this.$store.state.user.unitId
                this.api({
                    url: "/catalogue/getCatalogues",
                    method: "get",
                    params: this.listQuery
                }).then(data => {
                    console.log(JSON.stringify(data))
                    this.catalogueList = data.list;
                    // this.subcatalogueList=data.list[0].subCatalogueList;
                }).catch(error => {
                    console.log("QAQ........没有找到栏目信息")
                })

            },
            updateCatalogues(cId,ctId){
                console.log("ccc"+cId);
                this.api({
                    url: "/catalogue/updateCatalogueTeacher",
                    method: "post",
                    data: {
                        ctId: ctId,
                        cId: cId
                    }
                }).then((data) => {
                    // this.getTeacherByCatalogue(this.currentCat);
                    this.$message.success("更改教师角色分配成功")
                }).catch(e => {
                    this.$message.error("QAQ.....")
                })

            },

        },
        created() {
            this.getCatalogues();
            this.getTeacherByCatalogueId();
        },
        mounted(){
            this.showMask = this.value;
        },
        watch:{
            value(newVal, oldVal){
                this.showMask = newVal;
            },
            showMask(val) {
                this.$emit('input', val);
            },

        },
    }
</script>
<style lang="scss" scoped>
  .dialog{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2000;
    .dialog-container{
      width: 500px;
      height: 350px;
      background: #ffffff;
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 8px;
      position: relative;

      .dialog-title{
        width: 100%;
        height: 60px;
        font-size: 18px;
        color: #696969;
        font-weight: 600;
        padding: 16px 50px 0 20px;
        box-sizing: border-box;


      }
      .content{
        color: #797979;
        line-height: 26px;
        padding: 0 20px;
        box-sizing: border-box;
      }
      .inp{
        margin: 10px 0 0 20px;
        width: 200px;
        height: 40px;
        padding-left: 4px;
        border-radius: 4px;
        border: none;
        background: #efefef;
        outline: none;
        &:focus{
          border: 1px solid #509EE3;
        }
      }
      .btns{
        width: 100%;
        height: 60px;
        // line-height: 60px;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        padding: 0 16px;
        box-sizing: border-box;
        & > div{
          display: inline-block;
          height: 40px;
          line-height: 40px;
          padding: 0 14px;
          color: #ffffff;
          background: #f1f1f1;
          border-radius: 8px;
          margin-right: 12px;
          cursor: pointer;
        }
        .default-btn{
          color: #787878;
          &:hover{
            color: #509EE3;
          }
        }
        .danger-btn{
          background: #EF8C8C;
          &:hover{
            background: rgb(224, 135, 135);
          }
          &:active{
            background: #EF8C8C;
          }
        }
        .confirm-btn{
          color: #ffffff;
          background: #509EE3;
          &:hover{
            background: #6FB0EB;
          }
        }
      }
      .close-btn{
        position: absolute;
        top: 16px;
        right: 16px;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 18px;
        cursor: pointer;
        &:hover{
          font-weight: 600;
        }
      }
    }
  }
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
