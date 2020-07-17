<!--
编辑科研成果信息的页面
-->
<template>
  <div class="modify-page">
    <el-button type="primary" icon="plus" @click="backToManager">返回</el-button>
    <el-alert
      style="width:300px;float: right"
      title="注意: "
      description="所有修改只在提交后生效"
      type="error">
    </el-alert>

    <div style="clear: both;"></div>

    <el-form :model="ruleForm" label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="100px"
             class="demo-ruleForm">

      <el-row type="flex" class="row-bg first-card" justify="center">

        <el-col :span="24">
          <div class="grid-content">
            <el-form-item label="专利标题" prop="title">

              <el-input v-model="ruleForm.title" ></el-input>

            </el-form-item>

            <el-form-item class="font-one" label="作者" prop="authors">
              <el-input v-model="ruleForm.authors"
                        placeholder="请输入作者"></el-input>
            </el-form-item>

            <div v-if="modifyState == 0 ">
<!--              <el-form-item label="关联成员">-->
<!--                注：确认添加论文后再关联成员-->
<!--              </el-form-item>-->
            </div>
            <div v-if="modifyState == 1">
<!--              <el-form-item>-->
<!--                <el-button type="success" @click="identifyTeacher(ruleForm.authors)">识别科研成员</el-button>-->
<!--                <el-button type="primary" @click="showListTeahcer">添加成员-->
<!--                </el-button>-->
<!--              </el-form-item>-->
<!--            <el-form-item label="关联成员">-->
<!--              <el-table :data="teacherList">-->
<!--                <el-table-column-->
<!--                  label="头像"-->
<!--                  width="100" align="center">-->
<!--                  <template slot-scope="scope">-->
<!--                    <img @click="routerTo(scope.row.tId)"-->
<!--                         :src="getImgUrl(scope.row.tAvatar)" :onerror="defaultImage"-->
<!--                         style="width:60px;height:60px;cursor:pointer;">-->

<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column align="center" label="姓名" width="130">-->
<!--                  <template slot-scope="scope">-->
<!--            <span class="teacher-homepage" @click="routerTo(scope.row.tId)"-->
<!--                  style="cursor:pointer;">{{scope.row.tName}}</span>-->
<!--                    <span></span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column align="center" label="英文名" width="130">-->
<!--                  <template slot-scope="scope">-->
<!--            <span class="teacher-homepage" @click="routerTo(scope.row.tId)"-->
<!--                  style="cursor:pointer;">{{scope.row.englishName}}</span>-->
<!--                    <span></span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column align="center" label="职称" width="180">-->
<!--                  <template slot-scope="scope">-->
<!--                    <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.tPost}}</span>-->
<!--                    <span></span>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--                <el-table-column align="center" label="操作">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button type="danger" @click="showDelete(scope.row.ptId)">移除</el-button>-->
<!--                  </template>-->
<!--                </el-table-column>-->
<!--              </el-table>-->
<!--            </el-form-item>-->
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg first-card" justify="center">
        <el-col :span="24">
          <el-form-item label="课题名称" >
            <el-input v-model="ruleForm.research"></el-input>
          </el-form-item>
          <el-form-item label="专利类型" prop="patentType">
            <el-input v-model="ruleForm.patentType"></el-input>
          </el-form-item>
          <el-form-item label="专利编号" prop="patentNumber">
            <el-input v-model="ruleForm.patentNumber"
                      placeholder="请输入专利编号"></el-input>
          </el-form-item>
            <el-form-item label="发表时间" prop="datetime">
              <el-date-picker
                v-model="ruleForm.datetime"
                value-format="yyyy-MM-dd"
                type="month"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          <el-form-item label="概述" prop="summary">
            <el-input v-model="ruleForm.summary"
                      type="textarea" :rows="5" ></el-input>
          </el-form-item>
<!--            <el-form-item label="上传附件">-->
<!--              <el-upload-->
<!--                class="upload-demo"-->
<!--                accept=".pdf"-->
<!--                :show-file-list="true"-->
<!--                multiple-->
<!--                action="#"-->
<!--                :http-request="imageUpload">-->
<!--                <el-button slot="trigger" size="small"  class="uploadImgBtn" >上传附件</el-button>-->
<!--                <span slot="tip">(只能上传pdf格式)</span>-->
<!--              </el-upload>-->

<!--            </el-form-item>-->
<!--            <el-form-item v-if="ruleForm.folderPath" label="下载附件">-->
<!--              <a target="_blank" :href="'http://222.201.80.72:2333/images/other/'+ ruleForm.folderPath"-->
<!--                 :download="ruleForm.title+'.pdf'" style="color: red"> {{ruleForm.folderPath}}  </a>-->
<!--            </el-form-item>-->
        </el-col>
      </el-row>
    </el-form>

    <el-dialog  title="请勾选添加成员" :visible.sync="dialogFormVisible" style="margin-bottom: 18px;">
      <div style="margin-bottom: 14px;display: flex;justify-content: space-between;">
        <el-button type="success" @click="addPatentTeacher">确 定</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
      </div>
      <el-table :data="searchList" @selection-change="changeFun">

        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          label="头像"
          width="100" align="center">
          <template slot-scope="scope">
            <img @click="routerTo(scope.row.tId)"
                 :src="getImgUrl(scope.row.tAvatar)" :onerror="defaultImage"
                 style="width:60px;height:60px;cursor:pointer;">

          </template>
        </el-table-column>
        <el-table-column align="center" label="姓名" width="130">
          <template slot-scope="scope">
            <span class="teacher-homepage" @click="routerTo(scope.row.tId)"
                  style="cursor:pointer;">{{scope.row.tName}}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="英文名" width="130">
          <template slot-scope="scope">
            <span class="teacher-homepage" @click="routerTo(scope.row.tId)"
                  style="cursor:pointer;">{{scope.row.englishName}}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="职称" width="180">
          <template slot-scope="scope">
            <span class="teacher-homepage" style="cursor:pointer;">{{scope.row.tPost}}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <span v-if="checkTeacherList(scope.row.tId)== true"
                  size="mini" type="success" style="color: green">可添加
            </span>
            <span v-else
                  size="mini">已存在
            </span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  </div>
</template>

<script>
    import cropAvatarImage from './cropAvatarImage'
    import Editor from 'wangeditor'
    import {filterXSS} from 'xss'

    export default {
        name: "modifyPatentPage",

        components: {
            cropAvatarImage
        },
        created() {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@");
            console.log(this.hasPerm('teacher:list'));
            console.log(this.$store.state.user.userId);
            console.log(this.$store.state.user.nickname);
            console.log("@@@@@@@@@@@@@@@@@@@@@@@");

          //获取论文id

            /*      this.ruleForm.username = '邮箱唯一性测试'
                  this.ruleForm.email = 'ytang@qq.com'
                  this.ruleForm.degree = '0'
                  this.ruleForm.post = '教授'*/
        },
        mounted() {
          if(this.$route.params.id !=null){
            this.getPatentInfoById(this.$route.params.id)
            this.modifyState = 1;
          }
        },
        data() {
            return {
              modifyState : 0,
              dialogFormVisible :false,
                ruleForm: {
                  id:'',
                  title:'',
                  authors:'',
                  datetime:'',
                  patentType:'',
                  patentNumber:'',
                  unitId:'',
                  updateTime:'',
                  folderPath:'',
                  summary:'',
                  research:'',
                  tIds:[]
                },
                teacherList:[],
                multipleSelection: [],
                searchList:[],
                rules: {
                    title: [
                        {required: true, message: '请输入项目标题', trigger: 'change'}
                    ],
                    patentType: [
                        {required: true, message: '请输入项目类型', trigger: 'change'}
                    ],
                    patentNumber: [
                        {required: true, message: '请输入项目编号', trigger: ['blur', 'change']}
                    ],
                    datetime: [
                        {required: true, message: '请选择时间', trigger: 'blur'}
                    ],
                    authors:[
                        {required: true, message: '请输入作者', trigger: ['blur', 'change']}
                    ]
                }
            }
        },
        methods: {
          showDelete(ptId) {
            this.$confirm('', '确定取消关联该教师？', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {

                this.api({
                  url: "/academic/deletePatentTeacher",
                  method: "post",
                  data: {"id": ptId}
                }).then(data => {
                  console.log("删除成功")
                  let index = 0;
                  for (let i = 0;i < this.teacherList.length;i++){
                    if (this.teacherList[i].ptId == ptId)
                      index = i;
                  }
                  this.teacherList.splice(index,1)
                }).catch(error => {
                  console.log("QAQ........删除失败")
                })
              }
            ).catch(() => {
              this.$message({
                type: 'info',
                message: '取消操作'
              });
            });
          },
          identifyTeacher(authors){
            this.api({
              url: "/academic/identifyTeacher",
              method: "get",
              params:{authors : authors , unitId : this.$store.state.user.unitId}
            }).then(data => {
              this.searchList = data.list;
              this.dialogFormVisible = true;

            }).catch(error => {
              this.$message.success("QAQ........没有找到教师信息")
            })
          },
          showListTeahcer() {
            this.api({
              url: "/catalogue/listTeacherAll",
              method: "get",
              params: {unitId: this.$store.getters.unitId}
            }).then(data => {
              console.log(JSON.stringify(data.list))
              this.searchList = data.list;
              this.dialogFormVisible = true;
            }).catch(error => {
              console.log("QAQ........添加学科失败")
            })
          },
          routeTo(id){
            console.log("----------id-------"+id)
            let routeData = this.$router.resolve({
              name: 'patentInfo',
              params: {
                id: id
              }
            });
            window.open(routeData.href, '_blank');
          },
          changeFun(val) {
            this.multipleSelection = val // 返回的是选中的列的数组集合
            console.log(JSON.stringify(this.multipleSelection))
          },
          checkTeacherList(value) {
            for (let a = 0; a < this.teacherList.length; a++) {
              if (this.teacherList[a].tId == value) {
                return false
              }

            }
            return true
          },
          addPatentTeacher(){
            for(let i = 0;i < this.multipleSelection.length;i++){
              if (this.checkTeacherList(this.multipleSelection[i].tId)){
                this.ruleForm.tIds.push(this.multipleSelection[i].tId)
              }
              else{
                this.$message({
                  type: 'warning',
                  message: '该成员已经存在，请重新选择！'
                });
              return false;
              }
            }
            this.api({
              url: "/academic/addPatentTeacher",
              method: "post",
              data: this.ruleForm
            }).then((res) => {
              this.teacherList= this.teacherList.concat(this.multipleSelection)
              this.$message.success("关联成员成功")
            }).catch(e => {

            })
            this.dialogFormVisible = false;
          },
          getImgUrl(imgName) {
            if (imgName == null) {
              return ""
            } else if (imgName.indexOf("resources") != "-1") {
              return "http://www.scholat.com/" + imgName;
            } else {
              return "http://222.201.80.72:2333/images/avatar/" + imgName;
            }
          },
          imageUpload:function(param) {
            let that = this;
            // 参数
            const _file = param.file;
            let params = new FormData();
            params.append('questionImages', _file);
            that.axios({
              url: "/api/attach/uploadQusImages",
              method: "post",
              data: params,
              headers: {
                "Content-Type": "multipart/form-data"
              }
            }).then(function(res) {
              let url = res.data
              let arr = url.split("/")
              let string = arr[arr.length-1]
              console.log(string)
              that.ruleForm.folderPath = string
            }).catch(error => {
              this.$message.success("QAQ........上传附件失败")
            })
          },

            backToManager() {
                this.$router.push({
                    path: '/research/patent'
                })
            },
            // 本页面最开始的会调用的函数,获取论文信息
            getPatentInfoById(patentId) {
            if (patentId != null) {
              this.api({
                url: "/academic/patentInfo/" + patentId,
                method: "get"
              }).then(data => {
                console.log("根据id查询论文信息为:" + JSON.stringify(data))
                let datetime = data.datetime
                let arr = datetime.split('\\.')
                let string = arr[0] + "-"
                if (arr[1] != "-") {
                  string += arr[1] + "-01"
                }
                else
                  string += "-01-01"
                data.datetime = string
                this.setPatentInfo(data);
              }).catch(error => {
                //this.$message.success("QAQ........没有找到教师信息")
              })
              }
            },
            createPatent() {
                this.ruleForm.unitId = this.$store.state.user.unitId;
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                      this.api({
                        url: "/academic/addPatent",
                        method: "post",
                        data: this.ruleForm
                      }).then((res) => {
                        this.$message.success("添加成果信息成功")
                        this.$router.push({
                          path: '/research/patent'
                        })
                      }).catch(e => {

                      })
                    } else {
                        console.log("验证表单信息失败")
                        return false;
                    }
                });

            },
            setPatentInfo(data){
              this.ruleForm.id = data.id
              this.ruleForm.title = data.title
              this.ruleForm.authors = data.authors
              this.ruleForm.patentType = data.patentType
              this.ruleForm.patentNumber = data.patentNumber
              this.ruleForm.datetime = data.datetime
              this.ruleForm.folderPath = data.folderPath
              this.ruleForm.research =data.research
              this.ruleForm.summary = data.summary
              this.teacherList = data.teacherList
            },
            // 更新论文成员信息
            updatePatent() {
              this.ruleForm.unitId = this.$store.state.user.unitId;
              this.ruleForm.id = this.$route.params.id
              this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                  console.log("验证表单信息成功")
                } else {
                  console.log("验证表单信息失败")
                  return false;
                }
              });

              console.log(this.ruleForm);

              this.api({
                url: "/academic/updatePatent",
                method: "post",
                data: this.ruleForm
              }).then((res) => {
                this.$message.success("添加成果信息成功")
                this.$router.push({
                  path: '/research/patent'
                })
              }).catch(e => {

              })
            },
        }
    }
</script>

<style lang="scss">
  .modify-page{
    padding: 20px;
    .toolbar {
      border: 1px solid #ccc;
    }

    .text {
      border: 1px solid #ccc;
      height: 400px;
    }

    .transition-box {
      border-radius: 4px;
      text-align: center;
      color: #fff;
      box-sizing: border-box;
    }

    $bg: #003f88;
    .personal-info {
      position: relative;
      width: 100%;
      min-width: 1000px;
      height: auto;
      margin: 0 auto;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 200px;
        /*background-color: burlywood;*/
      }

      .right {
        height: 100%;
        margin-left: 200px;
        /*background-color: aquamarine;*/
      }

      .info-right {
        display: flex;
        /*flex-flow: row nowrap;*/
        /*justify-content: flex-start;*/
        /*margin: 0;*/
        /*padding: 0;*/
        /*list-style: none;*/
        background-color: #99a9bf;

        .right-item {
          width: 200px;
          height: 400px;
          margin-left: 15px;
        }
      }

      .box-card {
        width: 100%;
        min-width: 960px;
        /*margin: 30px 80px 0 80px;*/
      }

      .box-card-two {
        width: 100%;
        min-width: 960px;
        height: 360px;
        margin-top: 30px;

        .el-tabs {
          /deep/ .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
            color: #0051c1;
            font-weight: 800;
            font-size: 16px;
            background-color: #fff;
            border-right-color: #dcdfe6;
            border-left-color: #dcdfe6;
          }
        }

        .describe-content {
          width: 100%;
          background: #fff;
          padding: 22px 50px 39px;
          overflow: hidden;
        }
      }

      .persional-image {
        /*width: 30%;*/
        /*height: 100%;*/
        /*align-items: center;*/
        /*height: 162px;*/

      }

      .name-top {
        height: 90px;
        /*border-bottom: 1px solid #e8e8e8;*/
        overflow: hidden;
      }

      .name-left {
        width: 300px;
        /*margin-left: 10px;*/
        /*border-right: 1px solid #e8e8e8;*/
        /*float: left;*/
        float: left;
        height: 50%;
        /*background-color: antiquewhite;*/
        margin-top: 30px;
      }

      .name-right {

        height: 100px;
        margin-left: 320px;
        padding-top: 30px;
        /*background-color: #45caff;*/
      }

      .name-qr {
        width: 70px;
        height: 70px;
        margin-left: 750px;
        box-shadow: 1px 1px 5px #eaeaea;
      }

      .name {
        font-size: 34px;
        font-weight: 800;
        color: $bg;
      }

      .name-bottom {
        padding: 15px 0px 0px;
      }

      .font-one {
        line-height: 25px;
        padding-right: 15px;
      }

      .personal-describe {
        font-size: 16px;
        font-weight: 400;
        background: #eaeaea;
        padding: 2px 12px;
        border-radius: 19px;
        color: #818181;
      }
    }

    input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
      background-color: #99a9bf;
      background-image: none;
      color: #000;
    }

    .el-row {
      &:last-child {
        margin-bottom: 0;
      }
    }

    .el-col {
      border-radius: 4px;
    }

    .bg-purple-dark {
      background: #99a9bf;
    }

    .bg-purple {
      /*background: #d3dce6;*/
    }

    .bg-purple-light {
      background: #e5e9f2;
    }

    .grid-content {
      border-radius: 4px;
      padding: 6px;
      min-height: 36px;
    }

    .row-bg {
      padding: 10px 0;
      background-color: #f9fafc;
      padding: 14px;
      border-radius: 14px;
      margin: 16px 0;
      box-shadow: 0 0 14px 14px #d4d1d1;
    }

    .scholat-card {
      border-radius: 14px;
      margin: 16px 0;
      box-shadow: 0 0 14px 14px #d4d1d1;
    }

    .el-card__body {
      padding: 0px;
    }

    .change-input-background input.el-input__inner {
      background-color: antiquewhite !important;
    }

    .update-crop-avatar.crop-avatar-image /deep/ .preview {
      box-shadow: 0 0 14px 14px antiquewhite;
    }

    .update-avatar {
      width: 100px;
      height: 100px;
      display: block;
      float: left;
      border-radius: 50%;
      border: 2px solid white;
    }

    .scholat_span {
      display: inline-block;
      margin-top: 4px;
      font-weight: bolder;
      color: darkgray;
    }
  }
</style>
