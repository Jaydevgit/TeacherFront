<!--
编辑教师信息的页面
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

    <el-form :model="ruleForm" label-position="left" status-icon :rules="rules" ref="ruleForm" label-width="80px"
             class="demo-ruleForm">

      <el-row type="flex" class="row-bg first-card" justify="center" :gutter="20">
        <el-col :span="5">
          <div class="grid-content bg-purple" style="text-align: center">

            <!--显示更新提示-->
            <el-tooltip placement="top" v-if="showUpdateInfo.avatarScholat">
              <div slot="content" style="font-size: 16px">
                <img :src="showUpdateInfo.avatarScholat" class="update-avatar"
                     style="margin-left: 10px;border-radius: 15px;"/>
                <div style="width: 80px;float: left;margininvitation-left: 10px">
                  <el-button size="small" type="success" @click="updateAvatar()"
                             style="display:block;margin-top: 15px;">替换头像
                  </el-button>
                  <el-button size="small" type="warning" @click="cancelUpdateAvatar()"
                             style="display:block;margin-left: 0;margin-top: 8px;">取消替换
                  </el-button>
                </div>

              </div>
              <crop-avatar-image ref="cropAvatarImage" class="update-crop-avatar" :scholatAvatar="ruleForm.avatar"
                                 @crop-avatar="cropAvatarImageName"></crop-avatar-image>
            </el-tooltip>
            <crop-avatar-image ref="cropAvatarImage"
                               v-if="!showUpdateInfo.avatarScholat"
                               @crop-avatar="cropAvatarImageName"></crop-avatar-image>

            <el-button @click="uploadAvatar()" type="primary" style="margin-top: 23px;">
              上传头像
            </el-button>
            <div style="margin-top: 38px;" v-if="ruleForm.qrcode">
              <img :src="'http://www.scholat.com/'+ruleForm.qrcode" style="width: 120px;height: 120px;">
            </div>


          </div>

        </el-col>
        <el-col :span="7">
          <!--          <div class="grid-content bg-purple-light">-->
          <el-form-item label="姓名" prop="username" class="redItem">

            <!--显示更新提示-->
            <el-tooltip placement="top" v-if="showUpdateInfo.usernameScholat">
              <div slot="content" style="font-size: 16px">
                <span v-html="showUpdateInfo.username"></span>
                &nbsp;➡️&nbsp;
                <span v-html="showUpdateInfo.usernameScholat"></span>
              </div>
              <el-input v-model="ruleForm.username" class="change-input-background"></el-input>
            </el-tooltip>
            <el-input v-model="ruleForm.username" v-if="!showUpdateInfo.usernameScholat"></el-input>

          </el-form-item>
          <el-form-item label="性别" prop="sex" class="redItem">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="0">男</el-radio>
              <el-radio label="1">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--            <el-form-item class="font-one" label="邮箱" prop="email">-->
          <!--              &lt;!&ndash;显示更新提示&ndash;&gt;-->
          <!--              <el-tooltip placement="top" v-if="showUpdateInfo.emailScholat">-->
          <!--                <div slot="content" style="font-size: 16px">-->
          <!--                  <span v-html="showUpdateInfo.email"></span>-->
          <!--                  &nbsp;➡️&nbsp;-->
          <!--                  <span v-html="showUpdateInfo.emailScholat"></span>-->
          <!--                </div>-->
          <!--                <el-input v-model="ruleForm.email" class="change-input-background"></el-input>-->
          <!--              </el-tooltip>-->
          <!--              <el-input v-model="ruleForm.email" v-if="!showUpdateInfo.emailScholat"-->
          <!--                        placeholder="请输入邮箱地址"></el-input>-->
          <!--            </el-form-item>-->
          <el-form-item label="职务" prop="duty">
            <!--显示更新提示-->
            <!--              <el-tooltip placement="top" v-if="showUpdateInfo.postScholat">-->
            <!--                <div slot="content" style="font-size: 16px">-->
            <!--                  <span v-html="showUpdateInfo.post"></span>-->
            <!--                  &nbsp;➡️&nbsp;-->
            <!--                  <span v-html="showUpdateInfo.postScholat"></span>-->
            <!--                </div>-->
            <!--                <el-input v-model="ruleForm.post" class="change-input-background"-->
            <!--                          placeholder="例如：博士生导师、硕士生导师等"></el-input>-->
            <!--              </el-tooltip>-->
            <el-input v-model="ruleForm.duty"
                      placeholder="例如：院长、书记、老师、辅导员等"></el-input>
          </el-form-item>
          <el-form-item label="头衔" prop="label">
            <el-input v-model="ruleForm.label" placeholder="例如：国务院特殊津贴专家等头衔"></el-input>
          </el-form-item>

          <el-form-item label="最后学历" prop="degree">
            <!-- <el-select v-model="ruleForm.degree">
               <el-option label="博士研究生" value="博士研究生"></el-option>
               <el-option label="硕士研究生" value="硕士研究生"></el-option>
               <el-option label="本科" value="本科"></el-option>
               <el-option label="专科" value="专科"></el-option>
             </el-select>-->
            <el-input v-model="ruleForm.degree"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="学科专业" prop="subject">
            <el-input v-model="ruleForm.subject" placeholder="例如：软件工程"></el-input>
          </el-form-item>
          <el-form-item label="所在部门" prop="department_name">
            <el-input v-model="ruleForm.department_name" placeholder="例如：网络工程系"></el-input>
          </el-form-item>
          <el-form-item label="办公邮箱" prop="email" class="redItem">
            <el-input v-model="ruleForm.email" placeholder="建议输入办公邮箱地址"></el-input>
          </el-form-item>


          <el-form-item label="状态" prop="state" required class="redItem">
            <el-select v-model="ruleForm.state" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <!--              <el-radio-group v-model="ruleForm.state">-->
            <!--                <el-radio label="1">在岗</el-radio>-->
            <!--                <el-radio label="0">调出</el-radio>-->
            <!--                <el-radio label="-1">退休</el-radio>-->
            <!--              </el-radio-group>-->
          </el-form-item>
          <div class="grid-content bg-purple">


          </div>
          <!--          </div>-->
        </el-col>
        <el-col :span="6">
          <el-form-item label="域名" prop="domain_name">
            <el-input v-model="ruleForm.domain_name" disabled></el-input>
          </el-form-item>
          <el-form-item label="职称" prop="post" style="margin-top:85px">
            <!--显示更新提示-->
            <el-tooltip placement="top" v-if="showUpdateInfo.postScholat">
              <div slot="content" style="font-size: 16px">
                <span v-html="showUpdateInfo.post"></span>
                &nbsp;➡️&nbsp;
                <span v-html="showUpdateInfo.postScholat"></span>
              </div>
              <el-input v-model="ruleForm.post" class="change-input-background"
                        placeholder="例如：博士生导师、硕士生导师等"></el-input>
            </el-tooltip>
            <el-input v-model="ruleForm.post" v-if="!showUpdateInfo.postScholat"
                      placeholder="例如：博士生导师、硕士生导师等"></el-input>
          </el-form-item>
          <el-form-item label="最高学位" prop="degree_max" style="margin-top: 85px">

            <el-input v-model="ruleForm.degree_max"
                      placeholder="博士、硕士、学士"></el-input>
          </el-form-item>
          <el-form-item label="研究方向" prop="research_direction">
            <el-input v-model="ruleForm.research_direction" placeholder="例如：数据挖掘、知识图谱、图像识别等"></el-input>
          </el-form-item>
          <el-form-item label="办公电话" prop="phone" style="margin-top: 85px">
            <el-input v-model="ruleForm.phone" placeholder="建议输入办公固定电话，可以用'-'分隔"></el-input>
          </el-form-item>
          <!--          <el-form-item v-if="!flagAssignment"label="教师分配" prop="label">-->
          <!--&lt;!&ndash;            <el-tag v-if="flagAssignment" style="width: 100%;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">添加教师完成后方可进行教师分配</el-tag>&ndash;&gt;-->
          <!--            <el-button  type="primary" size="small" @click="openAssignment">选择分配</el-button>-->
          <!--          </el-form-item>-->
        </el-col>
        <el-col :span="6">
          <el-form-item label="毕业学校" prop="graduateFrom" style="margin-top: 250px">
            <el-input v-model="ruleForm.graduateFrom"
                      placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="办公地点" style="margin-top: 150px">
            <el-input v-model="ruleForm.work_place" placeholder=""></el-input>
          </el-form-item>
          <el-form-item style="display: flex;justify-content: flex-end;">
            <el-button @click="createTeacher_one" type="success" v-if="$route.path.indexOf('addTeacher')!=-1">保存</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>

      </el-row>

      <!-- 当已绑定学者网时 -->
      <template v-if="secondPage || $route.path.indexOf('modifyTeacher')!=-1">
<!--      <template>-->
        <el-card class="box-card scholat-card" v-if="ruleForm.scholat_username">
          <div slot="header" style="display: flex;justify-content: space-between;">
            <div style="display: flex;align-items: center">
              <img  class="preview" :src="getImgUrl(scholatProfile.avatar)"
                    style="width:70px;height:70px;border-radius: 50%;"/>
              <el-button size="small" style="margin-left: 8px" @click="chooseScholatAvatar()">选择该头像</el-button>
            </div>
            <div style="display: flex;align-items: center">已绑定学者网账号:{{ruleForm.scholat_username}}</div>
            <div class="teacher-homepage" style="display: flex;align-items: center">{{scholatProfile.username}}</div>
            <span class="teacher-homepage" style="display: flex;align-items: center">{{scholatProfile.email}}</span>
           <!-- <span class="teacher-homepage" >{{scholatProfile.unit_name}}</span>
            <span class="teacher-homepage" >{{scholatProfile.department_name}}</span>
            <span class="teacher-homepage">{{scholatProfile.post}}</span>
            <span class="teacher-homepage">{{scholatProfile.degree}}</span>-->
<!--            <span>{{scholatProfile.update_time}}</span>-->
          <div style="display: flex;align-items: center">
            <el-button @click="viewScholat(scholatProfile)" type="warning" size="small"
                       style="margin-left:10px;width: 60px;height:30px;">查看
            </el-button>
            <el-button type="danger" @click="unlockScholat()" size="small"
                       style="margin-left:10px;width: 80px;height:30px;">解除绑定
            </el-button>
          </div>

          </div>
        </el-card>

        <el-card class="box-card scholat-card" v-if="!ruleForm.scholat_username">
          <div slot="header" class="clearfix">
            <img src="@/assets/defaultLogo.png" style="width: 25px;height: 25px;float: left">
            <el-input v-model="scholat_emailORname" placeholder="建议输入学者网邮箱或姓名进行学者网账号查询"
                      @keyup.enter.native="scholatInfoSearch" size="small"
                      style="margin-left:10px;width: 320px;float: left;"></el-input>
            <el-button type="primary" size="small" style="margin-left:10px;" @click="scholatInfoSearch">查询</el-button>
            <!--          <span class="scholat_span"-->
            <!--                style="margin-left: 14px;">输入邮箱或姓名后开始查询</span>-->
            <span v-if="list.length" class="scholat_span"
                  style="float: right;margin-left: 14px;">搜索到{{this.list.length}}位学者网用户</span>
            <span v-if="ruleForm.scholat_username" class="scholat_span"
                  style="float: right;">已绑定学者网账号&nbsp{{ruleForm.scholat_username}}</span>
            <el-button type="success" @click="inviteToScholat(ruleForm)" style="float: right; padding: 3px 3px"
                       v-if="!ruleForm.scholat_username">邀请该用户加入学者网
            </el-button>
          </div>
          <el-row type="flex" justify="center" v-if="list.length!=0">
            <el-col :span="24">
              <el-row>
                <transition name="el-fade-in-linear">
                  <div v-show="showScholatDiv" class="transition-box  bg-purple-light">
                    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border
                              fit
                              highlight-current-row>
                      <el-table-column fixed align="center" label="学者网用户" width="140">
                        <template slot-scope="scope">
                          <img id="avatar-id" class="preview" :src="getImgUrl(scope.row.avatar)"
                               style="width:70px;height:70px;border-radius: 50%;"/>
                          <div class="teacher-homepage" @click="routerTo(scope.row)">{{scope.row.username}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="邮箱" width="160">
                        <template slot-scope="scope">
                          <span class="teacher-homepage" @click="routerTo(scope.row)">{{scope.row.email}}</span>
                          <span></span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="工作单位">
                        <template slot-scope="scope">
                          <span class="teacher-homepage" @click="routerTo(scope.row)">{{scope.row.unit_name}}</span>
                          <br/>
                          <span class="teacher-homepage" @click="routerTo(scope.row)">{{scope.row.department_name}}</span>
                          <span></span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="职位" width="160">
                        <template slot-scope="scope">
                          <span class="teacher-homepage">{{scope.row.post}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="学历" width="80">
                        <template slot-scope="scope">
                          <span class="teacher-homepage">{{scope.row.degree}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" label="更新时间" width="160">
                        <template slot-scope="scope">
                          <span>{{scope.row.update_time}}</span>
                          <!--                        <template v-if="(scope.row.scholat_username === ruleForm.scholat_username)&&scholatHasUpdate!=null">-->
                          <!--                        <template v-if="scope.row.update_time > ruleForm.update_time">-->
                          <!--                          <el-button type="success" @click="showDifferent(scope.row)" size="small"-->
                          <!--                                     style="margin-left: 0;margin-bottom: 4px;">对比更新-->
                          <!--                          </el-button>-->
                          <!--                        </template>-->
                          <el-button type="success" @click="showDifferent(scope.row)" size="small"
                                     style="margin-left: 0;margin-bottom: 4px;">信息对比
                          </el-button>
                        </template>
                      </el-table-column>
                      <el-table-column
                        fixed="right"
                        label="操作"
                        width="170">
                        <template slot-scope="scope">
                          <el-button @click="viewScholat(scope.row)" type="warning" size="small"
                                     style="width: 60%;margin-left: 0;margin-bottom:4px;">查看
                          </el-button>
                          <template v-if="scope.row.scholat_username === ruleForm.scholat_username">
                            <el-button type="danger" @click="unlockScholat(scope.row)" size="small"
                                       style="width: 60%;margin-left: 0;">解除绑定
                            </el-button>
                          </template>
                          <template v-else>
                            <el-button v-if="routePage == 'modify' || !scope.row.email_exist" type="success"
                                       @click="importFromScholat(scope.row)" size="small"
                                       style="width: 60%;margin-left: 0;">一键关联
                            </el-button>
                            <div v-if="routePage == 'add' && scope.row.email_exist"
                                 style="color: gray;font-weight: bold;">已存在该教师
                            </div>
                          </template>
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
                </transition>
              </el-row>
            </el-col>
          </el-row>

        </el-card>


        <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="24">
            <div class="grid-content">
              <div id="div1" class="toolbar"></div>
              <!--<div id="editor" class="editor" v-model="ruleForm.intro"></div>-->

              <el-row style="border-radius: 5px;">
                <el-col :span="compareArea">
                  <div style="padding: 5px 0; color: #ccc" v-if="compareArea">初始文字区域</div>
                  <div class="grid-content" style="">
                    <div id="editor2" class="editor"
                         style="height: 270px;background-color: rgb(236, 245, 255);overflow-y: scroll;"
                         v-html="showUpdateInfo.updateTeacherInfo"></div>
                  </div>
                </el-col>
                <el-col :span="compareArea">
                  <div style="padding: 5px 0; color: #ccc">文字更新区域</div>
                  <div class="grid-content ">
                    <div v-html="showUpdateInfo.updateScholatInfo"
                         style="height: 270px;overflow: auto;background-color: antiquewhite"></div>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <div class="grid-content" style="">
                    <div style="display: flex;justify-content: space-between;padding: 4px 0">
                      <div style="color: rgb(245, 108, 108);font-weight: 800;">▶ 编辑区域</div>
                      <div style="color: rgb(245, 108, 108);font-weight: 800;cursor: pointer" @click="clearIntro()">清空简介
                      </div>
                    </div>
                    <div id="editor" class="editor" style="height: 360px;background-color: #e5e9f2;padding-top: 10px;"
                         v-model="ruleForm.intro"></div>
                  </div>
                </el-col>
              </el-row>

            </div>
          </el-col>
        </el-row>

        <el-button v-if="$route.path.indexOf('modifyTeacher')==-1"
          @click="createTeacher" type="success" style="margin-left: 20px;">创建</el-button>
      </template>


    </el-form>
    <v-role-assignment-bar v-model="showRoleAssigment" :RoleId="roleId" ref="childRole"
                           title="教师分配"></v-role-assignment-bar>
  </div>
</template>

<script>
    import cropAvatarImage from './cropAvatarImage'
    import Editor from 'wangeditor'
    import {filterXSS} from 'xss'
    import Pinyin from '@/utils/pinyin'
    import roleAssignmentBar from ".//roleAssignment";

    export default {
        name: "modifyTeacherPage",

        components: {
            cropAvatarImage,
            'v-role-assignment-bar': roleAssignmentBar
        },
        created() {
            console.log("@@@@@@@@@@@@@@@@@@@@@@@");
            console.log(this.hasPerm('teacher:list'));
            console.log(this.$store.state.user.userId);
            console.log(this.$store.state.user.nickname);
            if (this.$route.path.split('/')[2] == 'addTeacher') {
                this.flagAssignment = true;
                this.routePage = 'add';
            } else {
                this.flagAssignment = false;
                this.routePage = 'modify';
            }
        },
        watch: {
            'ruleForm.username': function (newVal, oldVal) {
                if (newVal !== oldVal) {
                    this.ruleForm.domain_name = Pinyin.chineseToPinYin(newVal);
                    console.log(">>>>" + this.ruleForm.domain_name);
                }

            }

        },
        mounted() {
            var teacherid = this.GetUrlRelativePath_id()
            console.log("教師id為:" + teacherid)
            this.ruleForm.id=teacherid
            this.editor = new Editor('#div1', '#editor');
            // 关闭粘贴内容中的样式
            this.editor.customConfig.pasteFilterStyle = false
            // 忽略粘贴内容中的图片
            this.editor.customConfig.pasteIgnoreImg = true
            // 使用 base64 保存图片
            //editor.customConfig.uploadImgShowBase64 = true

            // 上传图片到服务器
            this.editor.customConfig.showLinkImg = false;
            this.editor.customConfig.uploadFileName = 'myFile'; //设置文件上传的参数名称
            this.editor.customConfig.uploadImgServer = '/api/attach/uploadImage'; //设置上传文件的服务器路径
            this.editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024; // 将图片大小限制为 3M
            this.editor.customConfig.zIndex = 0
            //自定义上传图片事件
            this.editor.customConfig.uploadImgHooks = {
                before: function (xhr, editor, files) {

                },
                success: function (xhr, editor, result) {
                    this.$message.success("上传图片成功")
                    console.log("上传成功");
                },
                fail: function (xhr, editor, result) {
                    this.$message.error("上传图片失败: " + result)
                    console.log("上传失败,原因是" + result);
                },
                error: function (xhr, editor) {
                    this.$message.error("上传出错")
                    console.log("上传出错");
                },
                timeout: function (xhr, editor) {
                    this.$message.error("上传超时")
                    console.log("上传超时");
                }
            }
            // 創建一个富文本编辑器
            this.editor.customConfig.menus = [
                'head',  // 标题
                'bold',  // 粗体
                'italic',  // 斜体
                'underline',  // 下划线
                'strikeThrough',  // 删除线
                'link',  // 插入链接
                'justify',  // 对齐方式
                'undo',  // 撤销
                'redo'  // 重复
            ]
            this.editor.create();
            this.getTeacherInfoById(teacherid)
        },
        data() {
            var validateName = (rule, value, callback) => {
                console.log(".......进入到验证信息部分, 输入部分为:" + rule.field + " 输入值为: " + value)
                this.scholat.name = value
                this.axios.post('/api/manager/validate', {
                    username: this.ruleForm.scholat_username,
                    key: rule.field,
                    name: value,
                    email: this.scholat.email,
                    pageRow: this.scholat.pageRow
                }).then(res => {
                    console.log("res.data.info.list:")
                    console.log(res.data.info.list)

                    this.list = res.data.info.list
                    if (this.list != "" && this.list != null) {
                        this.showScholatDiv = true
                    } else {
                        this.showScholatDiv = false
                    }
                    callback(!res || undefined)

                }).catch(err => {
                    console.log("突然报错，没有找到res来返回")
                    if (this.list != "" && this.list != null) {
                        this.showScholatDiv = true
                    } else {
                        this.showScholatDiv = false
                    }
                    //this.$message.error(err.message)
                    callback() // 不填入信息的话表示正确返回
                })
            };
            var validateEmail = (rule, value, callback) => {
                console.log(".......进入到验证信息部分, 输入部分为:" + rule.field + " 输入值为: " + value)
                this.scholat.email = value
                this.axios.post('/api/manager/validate', {
                    username: this.ruleForm.scholat_username,
                    key: rule.field,
                    name: this.scholat.name,
                    email: value,
                    pageRow: this.scholat.pageRow
                }).then(res => {
                    console.log("验证邮箱有成功的返回结果:" + res.data.err)
                    console.log(res.data.info.list)
                    if (res.data.err !== undefined) {
                        if (this.$route.path.indexOf("modifyTeacher")) {
                            this.list = res.data.info.list;
                            console.log("-------------根据邮箱获取到的学者网数据------------------")
                            console.log(this.list);
                            if (this.list != "" && this.list != null) {
                                this.showScholatDiv = true
                            } else {
                                this.showScholatDiv = false
                                return callback(new Error("该邮箱已存在"))
                            }
                            callback()
                        } else {
                            return callback(new Error("该邮箱已存在"))
                        }
                        //callback(new Error("该邮箱已存在"))
                    } else {
                        console.log("暂时该邮箱还没有被使用")
                        this.emailHasvalidated = true;
                        this.list = res.data.info.list
                        if (this.list != "" && this.list != null) {
                            this.showScholatDiv = true
                        } else {
                            this.showScholatDiv = false
                        }
                        callback()
                    }

                }).catch(err => {
                    if (this.list != "" && this.list != null) {
                        this.showScholatDiv = true
                    } else {
                        this.showScholatDiv = false
                    }
                    //this.$message.error(err.message)
                    callback(new Error("该邮箱已被使用"))
                })

            };
            var validatedomainName = (rule, value, callback) => {
                console.log(".......进入到验证信息部分, 输入部分为:" + rule.field + " 输入值为: " + value)
                this.axios.post('/api/manager/judgeDomainExist', {
                    domain_name: value
                }).then(res => {
                    console.log(res);
                    this.domainCount = res.data[0].count;
                    console.log("this.domainCount=" + this.domainCount);

                    console.log(res.data[0].id + "====" + this.GetUrlRelativePath_id() + "this.domainCount=" + this.domainCount);
                    if ((res.data[0].flag === 1 && res.data[0].id === parseInt(this.GetUrlRelativePath_id())) || res.data[0].flag === 0) {
                        callback()
                    } else {
                        this.ruleForm.domain_name = value + this.domainCount;
                        console.log("this.ruleForm.domain_name=" + this.ruleForm.domain_name);
                        //  return callback(new Error("该域名已存在"))
                    }
                }).catch(err => {
                    callback(new Error("网络请求有误"))
                })

            }
            var checkPhone = (rule, value, callback) => {
                const reg = /^\d+-*\d+$/g;
                if (value == '') {
                } else {
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的办公电话'));
                    }
                }
            };
            return {
                scholatProfile:'',
                secondPage:false,
                routePage: '',
                editorArea: 24, // 真实的编辑区域宽度
                compareArea: 0,// 对比的编辑区域宽度
                showUpdateInfo: {
                    updateTeacherInfo: "",
                    updateScholatInfo: "",
                    usernameScholat: '',
                    username: '',
                    department_nameScholat: '',
                    department_name: '',
                    avatarScholat: '',
                    avatar: '',
                    emailScholat: '',
                    email: '',
                    update_timeScholat: '',
                    update_time: '',
                    degreeScholat: '',
                    degree: '',
                    postScholat: '',
                    post: ''
                },
                showScholatDiv: false,
                emailHasvalidated: false,
                totalCount: 0, //分页组件--数据总条数
                list: [],//表格的数据
                scholatHasUpdate: this.$route.params.scholatUpdate, // 如果学者网有更新信息就传递过来学者网id名
                listLoading: false,//数据加载等待动画
                listQuery: {
                    pageNum: 1,//页码
                    pageRow: 10,//每页条数
                    unitId: 0,
                    name: ''
                },
                editor: '',
                scholat: {
                    name: '',
                    email: '',
                    pageRow: 10,
                    upcreate_time: ''
                },
                flagAssignment: '',
                scholat_emailORname: "",//学者网关联邮箱
                options: [
                    {
                        value: '1',
                        label: '全职'
                    }, {
                        value: '2',
                        label: '兼职'
                    }, {
                        value: '-1',
                        label: '退休'
                    }, {
                        value: '0',
                        label: '调离'
                    }
                ],
                ruleForm: {
                    id: '',
                    username: '', // 姓名
                    sex: '0', // 性别
                    avatar: 'default.png', // 头像
                    state: '1', // 状态
                    degree: '', // 学历
                    post: '', // 职位
                    //title: '', // 头衔
                    label: '', // 标签
                    email: '', // 邮箱
                    phone: '', // 办公电话
                    intro: '', // 简介
                    create_time: '', // 创建时间
                    graduateFrom: '',// 毕业学校
                    subject: '', // 学科
                    research_direction: '', // 研究方向
                    work_place: '', // 办公地点
                    qrcode: '', // 二维码
                    department_id: '', // 部门id
                    department_name: '', // 部门名称
                    update_time: '', // 更新时间
                    views: '0', // 访问量
                    scholat_username: '', // 学者网用户名
                    scholat_update_time: '', // 学者网更新日期
                    unit_id: '',// 单位编号
                    domain_name: '',//域名
                    edit_name: '',//编辑用户名
                    degree_max: '',//最高学位
                    duty: '',//职务

                },

                rules: {
                    username: [
                        {validator: validateName, trigger: 'blur'},
                        {required: true, min: 1, max: 25, message: '请输入教师姓名', trigger: ['blur', 'change']}
                    ],
                    sex: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    email: [
                        {validator: validateEmail, required: true, message: '该邮箱已存在', trigger: 'blur'},
                        {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    domain_name: [
                        {validator: validatedomainName, required: true, message: '该域名已存在', trigger: ['change']},
                        {required: true, message: '请输入正确的域名地址', trigger: ['blur', 'change',]}
                    ],
                    phone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ],
                    // post: [
                    //     {required: true, message: '请输入职位', trigger: 'blur'},
                    //     {min: 1, max: 30, message: '长度在 1 到 30 个字符', trigger: ['blur', 'change']}
                    // ],
                    // degree: [
                    //     {required: true, message: '请输入学历', trigger: ['blur', 'change']}
                    // ],
                    /*create_time: [
                        {required: true, message: '请选择加入日期', trigger: 'change'}
                    ]*/
                },
                showRoleAssigment: false,
                roleId: '',//角色分配id
                domainCount: '',//相同域名个数
            }
        },
        methods: {
            chooseScholatAvatar(){
                this.$refs.cropAvatarImage.attach.laterUrl = 'http://www.scholat.com/'+this.scholatProfile.avatar;
                this.ruleForm.avatar = this.scholatProfile.avatar;
            },
            //学者关联信息查询
            scholatInfoSearch() {
                let email = '';
                let name = '';
                if (this.scholat_emailORname.indexOf('@') != -1) {
                    email = this.scholat_emailORname
                    console.log("email" + email);
                } else {
                    name = this.scholat_emailORname
                    console.log("name" + name);
                }
                this.axios.post('/api/manager/validate', {
                    //   username: this.scholat_email,
                    //  key: rule.field,
                    name: name,
                    email: email,
                    pageRow: this.scholat.pageRow
                }).then(res => {
                    console.log("验证邮箱有成功的返回结果:" + res.data.err)
                    console.log(res.data.info.list)
                    if (res.data.err !== undefined) {
                        if (this.$route.path.indexOf("modifyTeacher")) {
                            this.list = res.data.info.list;
                            console.log("-------------根据邮箱获取到的学者网数据------------------")
                            console.log(this.list);
                            if (this.list != "" && this.list != null) {
                                this.showScholatDiv = true
                                this.$message({
                                    message: '查询学者网账号成功，但该邮箱已存在',
                                    type: 'warning'
                                });
                            } else {
                                this.showScholatDiv = false
                                this.$message({
                                    message: '查询学者网账号失败',
                                    type: 'error'
                                });
                            }
                        } else {
                            this.list = res.data.info.list;
                            console.log("-------------根据邮箱获取到的学者网数据------------------")
                            console.log(this.list);
                            if (this.list != "" && this.list != null) {
                                this.showScholatDiv = true
                                this.$message({
                                    message: '查询学者网账号成功',
                                    type: 'success'
                                });
                            } else {
                                this.showScholatDiv = false
                                this.$message({
                                    message: '查询学者网账号失败',
                                    type: 'error'
                                });
                            }
                        }
                    } else {
                        this.list = res.data.info.list;
                        console.log("-------------根据邮箱获取到的学者网数据------------------")
                        console.log(this.list);
                        if (this.list != "" && this.list != null) {
                            this.showScholatDiv = true
                            this.$message({
                                message: '查询学者网账号成功',
                                type: 'success'
                            });
                        } else {
                            this.showScholatDiv = false
                            this.$message({
                                message: '查询学者网账号失败',
                                type: 'error'
                            });
                        }
                    }
                }).catch(err => {
                    this.$message({
                        message: '查询学者网账号失败',
                        type: 'error'
                    });
                })
            },
            // 邀请加入学者网
            inviteToScholat(Form) {
                this.api({
                    url: '/scholat/invite',
                    method: 'post',
                    data: {
                        "form": Form
                    }
                }).then((data) => {
                    this.$message.success("邀请成功")
                }).catch(e => {
                    this.$message.error("邀请失败，请检查信息是否填写完整")
                })
            },
            // 更新头像
            updateAvatar() {
                this.$refs.cropAvatarImage.attach.laterUrl = this.showUpdateInfo.avatarScholat;
                this.ruleForm.avatar = this.showUpdateInfo.avatarScholat.split('http://www.scholat.com/')[1];

            },
            // 取消更新头像
            cancelUpdateAvatar() {
                this.$refs.cropAvatarImage.attach.laterUrl = this.showUpdateInfo.avatar;
                this.ruleForm.avatar = this.showUpdateInfo.avatar;
            },
            // 上传头像
            uploadAvatar() {
                this.$refs.cropAvatarImage.dialogVisible = true
            },
            // 设置学者网用户信息
            setScholat(scholat) {
                scholat.scholat_username = filterXSS(scholat.scholat_username);
                scholat.username = filterXSS(scholat.username);
                scholat.unit_name = filterXSS(scholat.unit_name);
                scholat.department_name = filterXSS(scholat.department_name);
                scholat.avatar = filterXSS(scholat.avatar);
                scholat.email = filterXSS(scholat.email);
                scholat.update_time = filterXSS(scholat.update_time);
                scholat.intro = filterXSS(scholat.intro);
                scholat.degree = filterXSS(scholat.degree);
                scholat.post = filterXSS(scholat.post);
                scholat.qrcode = filterXSS(scholat.qrcode);
            },
            // 获取学者网更新的信息
            getScholatUpdateInfo(data) {
                this.ruleForm.qrcode = data.scholat.qrcode + '.png';
                // 个人简历
                console.log(data.teacher.intro);
                console.log(data.scholat.intro);
                this.showUpdateInfo.updateTeacherInfo = data.teacher.intro;
                //this.editor.txt.html(this.showUpdateInfo.updateTeacherInfo)
                this.showUpdateInfo.updateScholatInfo = data.scholat.intro;
                this.showUpdateInfo.updateTeacherInfo = data.teacher.intro;
                // 中文名
                this.showUpdateInfo.username = data.teacher.username;
                this.showUpdateInfo.usernameScholat = data.scholat.username;
                // 学者网用户名
                this.showUpdateInfo.scholat_username = data.teacher.scholat_username;
                this.showUpdateInfo.scholat_usernameScholat = data.scholat.scholat_username;
                // 部门名
                this.showUpdateInfo.department_name = data.teacher.department_name;
                this.showUpdateInfo.department_nameScholat = data.scholat.department_name;
                // 头像地址
                this.showUpdateInfo.avatar = data.teacher.avatar;
                this.showUpdateInfo.avatarScholat = data.scholat.avatar;
                if (this.showUpdateInfo.avatarScholat.indexOf("resources") != -1) {
                    this.showUpdateInfo.avatarScholat = "http://www.scholat.com/" + this.showUpdateInfo.avatarScholat;
                } else {
                    this.showUpdateInfo.avatarScholat = "http://47.106.132.95:2333/images/avatar/" + this.showUpdateInfo.avatarScholat;
                }
                if (this.showUpdateInfo.avatar.indexOf("resources") != -1) {
                    this.showUpdateInfo.avatar = "http://www.scholat.com/" + this.showUpdateInfo.avatar;
                } else {
                    this.showUpdateInfo.avatar = "http://47.106.132.95:2333/images/avatar/" + this.showUpdateInfo.avatar;
                }
                // email
                // this.showUpdateInfo.email = data.teacher.email;
                // this.showUpdateInfo.emailScholat = data.scholat.email;
                // update_time
                this.showUpdateInfo.update_time = data.teacher.update_time;
                this.showUpdateInfo.update_timeScholat = data.scholat.update_time;
                // 学历
                this.showUpdateInfo.degree = data.teacher.degree;
                this.showUpdateInfo.degreeScholat = data.scholat.degree;
                // 职位
                // this.showUpdateInfo.post = data.teacher.post;
                // this.showUpdateInfo.postScholat = data.scholat.post;
            },
            // 根据传入的数据比较不同
            showDifferent(scholat) {
                this.$message.success("查找更新成功，黄色区域表示更新区域")
                this.setScholat(scholat)
                this.api({
                    url: "/manager/compare",
                    method: 'post',
                    data: {
                        teacher: this.ruleForm,
                        scholat: scholat
                    }
                }).then(data => {
                    console.log('----------对比更新后的数据---------');
                    console.log(data);
                    // 设置获取到的更新信息
                    this.getScholatUpdateInfo(data);
                    // 设置编辑区域宽度显示
                    this.editorArea = 12;
                    this.compareArea = 12;

                }).catch(e => {
                    this.$message.error("hey ")
                })
            },
            // 设置教师信息
            setTeacherInfo(data) {
                this.ruleForm.username = filterXSS(data.username); // 姓名
                this.ruleForm.sex = filterXSS(data.sex.toString()); // 性别
                this.ruleForm.avatar = filterXSS(data.avatar); // 头像
                this.ruleForm.state = filterXSS(data.state.toString());// 状态
                this.ruleForm.degree = filterXSS(data.degree); // 学历
                this.ruleForm.graduateFrom = filterXSS(data.graduateFrom); // 学历
                this.ruleForm.post = filterXSS(data.post); // 职位
                // this.ruleForm.title = filterXSS(data.title); // 头衔
                this.ruleForm.work_place = filterXSS(data.work_place); // 头衔
                this.ruleForm.label = filterXSS(data.label);// 标签
                this.ruleForm.email = filterXSS(data.email); // 邮箱
                this.ruleForm.phone = filterXSS(data.phone); // 手机号
                this.ruleForm.qrcode = filterXSS(data.qrcode); // qrcode
                this.ruleForm.intro = filterXSS(data.intro); // 简介
                /* var html = this.editor.txt.html();
                 var filterHtml = filterXSS(html);
                 this.ruleForm.intro = filterHtml;*/
                if (this.ruleForm.create_time == null || this.ruleForm.create_time == "") {
                    let day = new Date();
                    this.ruleForm.create_time = filterXSS(day.format('yyyy-MM-dd h:m:s')); // 创建时间
                }
                this.ruleForm.subject = filterXSS(data.subject); // 学科
                this.ruleForm.research_direction = filterXSS(data.research_direction); // 研究方向
                this.ruleForm.department_id = filterXSS(this.$store.state.user.userId); // 部门id
                this.ruleForm.department_name = filterXSS(data.department_name); // 部门名称
                this.ruleForm.update_time = filterXSS(data.update_time); // 更新时间
                this.ruleForm.views = filterXSS(data.views); // 访问量
                if (this.ruleForm.views === '') this.ruleForm.views = '0';
                this.ruleForm.scholat_username = filterXSS(data.scholat_username); // 学者网用户名
                this.ruleForm.scholat_update_time = filterXSS(data.scholat_update_time); // 学者网更新日期
                this.ruleForm.unit_id = filterXSS(this.$store.state.user.unitId);// 单位编号
                this.ruleForm.domain_name = filterXSS(data.domain_name); // 域名
                this.ruleForm.edit_name = filterXSS(this.$store.state.user.nickname); // 姓名
                this.ruleForm.duty = filterXSS(data.duty); // 职务
                this.ruleForm.degree_max = filterXSS(data.degree_max); // 最高学位
            },
            // 通过用户名查询学者网用户信息
            getScholatProfileByUserName(username){
                this.axios.post('/api/manager/getScholatProfileByUserName', {
                    username: username,
                }).then(res => {
                    this.scholatProfile = res.data.info
                }).catch(err => {
                })
            },
            // 本页面最开始的会调用的函数,获取教师信息
            getTeacherInfoById(teacherId) {
                if (teacherId !== null) {
                    this.api({
                        url: "/teacher/" + teacherId,
                        method: "get"
                    }).then(data => {
                        console.log("根据id查询教师信息为:" + data.username)
                        console.log("===============再看看有没有" + data.scholat_username + "学者网关联=================");
                        let t = new Date(data.update_time).format("yyyy-MM-dd h:m:s");
                        data.update_time = t;
                        this.setTeacherInfo(data);
                        // 如果学者网信息不为空, 代表已经关联了, 所以要显示关联的信息
                        if (this.ruleForm.scholat_username !== "" || this.ruleForm.scholat_username !== null) {
                            this.getScholatProfileByUserName(this.ruleForm.scholat_username)
                            // 去根据学者username查询学者信息
                            this.axios.post('/api/manager/validate', {
                                username: this.ruleForm.scholat_username,
                                name: '',
                                email: '',
                                pageRow: this.scholat.pageRow
                            }).then(res => {
                                console.log(res.data.info.list)
                                this.list = res.data.info.list
                                if (res.data.info.list != "") {
                                    this.$message.success("该教师已关联" + this.ruleForm.scholat_username + "学者网")
                                }
                                // 显示浮动窗口
                                if (this.list != "" && this.list != null) {
                                    this.showScholatDiv = true
                                } else {
                                    this.showScholatDiv = false
                                }
                                //callback(!res || undefined)
                            }).catch(err => {
                                //callback(false)
                            })

                        }
                        if (this.ruleForm.avatar.indexOf("resources") != -1) {
                            this.$refs.cropAvatarImage.attach.laterUrl = "http://www.scholat.com/" + this.ruleForm.avatar;
                        } else {
                            this.$refs.cropAvatarImage.attach.laterUrl = "http://47.106.132.95:2333/images/avatar/" + this.ruleForm.avatar;
                        }
                        var filterHtml = filterXSS(this.ruleForm.intro)
                        this.editor.txt.html(filterHtml)
                        console.log(this.ruleForm)
                    }).catch(error => {
                        //this.$message.success("QAQ........没有找到教师信息")
                    })
                }
            },
            unlockScholat() {
                this.$confirm('此操作将解除绑定该学者网用户, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.ruleForm.scholat_username = '';
                    this.ruleForm.scholat_update_time = '';
                    this.axios.post('/api/manager/bindScholat', {
                        id: this.ruleForm.id,
                        state:'unlock',
                        scholat_username:'',
                    }).then(res => {
                        this.$message.success("取消绑定成功")
                    }).catch(err => {
                        this.$message.error("取消绑定失败")
                    });
                    // 去根据学者username查询学者信息
                    /* this.axios.post('/api/manager/validate', {
                         username: this.ruleForm.scholat_username,
                         name: '',
                         email: '',
                         pageRow: this.scholat.pageRow
                     }).then(res => {
                         this.$message.success("该教师已关联" + this.ruleForm.scholat_username + "学者网")
                         this.list = res.data.info.list
                         callback(!res || undefined)
                     }).catch(err => {
                         callback(false)
                     })*/
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消解除绑定'
                    });
                });
                this.list=[];
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
            getImgUrl(imgName) {
                return "http://www.scholat.com/" + imgName
            },
            viewScholat(scholat) {
                var url = "http://www.scholat.com/" + scholat.scholat_username;
                window.open(url, '_blank');
            },
            importFromScholat(scholat) {
                /*    this.$confirm('此操作将覆盖写入信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        if (this.ruleForm.avatar === '') {
                            if (scholat.avatar.indexOf('/images/default.png') != -1) {
                                this.ruleForm.avatar = 'default.png';
                            } else {
                                this.ruleForm.avatar = filterXSS(scholat.avatar);
                            }
                        }

                        if (this.ruleForm.avatar.indexOf("resources") != -1) {
                            this.$refs.cropAvatarImage.attach.laterUrl = "http://www.scholat.com/" + this.ruleForm.avatar;
                        } else {
                            this.$refs.cropAvatarImage.attach.laterUrl = "http://47.106.132.95:2333/images/avatar/" + this.ruleForm.avatar;
                        }
                        if (this.ruleForm.scholat_username === '') {
                            this.ruleForm.scholat_username = filterXSS(scholat.scholat_username);
                        } // 关联为学者网账号
                        this.ruleForm.scholat_update_time = filterXSS(scholat.update_time);
                        if (this.ruleForm.username === '') {
                            this.ruleForm.username = filterXSS(scholat.username);
                        }
                        if (this.ruleForm.email === '') {
                            this.ruleForm.email = filterXSS(scholat.email);
                        }
                        if (this.ruleForm.intro === '') {
                            this.ruleForm.intro = filterXSS(scholat.intro);
                        }
                        if (this.ruleForm.post === '') {
                            this.ruleForm.post = filterXSS(scholat.post);
                        }
                        this.ruleForm.qrcode = filterXSS(scholat.qrcode + '.png');
                        this.editor.txt.html(this.ruleForm.intro);
                        // 学历
                        if (this.ruleForm.degree === '') {
                            var str = scholat.degree;
                            if (str.indexOf("博士") || str.indexOf("doctor")) {
                                this.ruleForm.degree = "博士研究生"
                            } else if (str.indexOf("硕士")) {
                                this.ruleForm.degree = "硕士研究生"
                            } else if (str.indexOf("学士")) {
                                this.ruleForm.degree = "本科"
                            }
                        }

                        this.$message.success("关联学者网成功, 部分信息已自动填入")
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消关联'
                        });
                    });*/

                if (this.ruleForm.scholat_username === '') {
                    this.ruleForm.scholat_username = filterXSS(scholat.scholat_username);
                }
                if (this.ruleForm.intro === '') {
                    this.ruleForm.intro = filterXSS(scholat.intro);
                }
                this.axios.post('/api/manager/bindScholat', {
                    id: this.ruleForm.id,
                    state:'lock',
                    scholat_username: this.ruleForm.scholat_username,
                }).then(res => {
                    this.getScholatProfileByUserName(this.ruleForm.scholat_username);
                    this.$message.success("关联学者网成功")
                }).catch(err => {
                    this.$message.error("关联学者网失败")
                });

            },
            cropAvatarImageName(imageName) {
                this.$message.success("上传" + imageName + "头像成功")
                this.ruleForm.avatar = imageName
            },
            // 获取教师id
            GetUrlRelativePath_id() {
                var url = document.location.toString();
                if (url.indexOf("modifyTeacher") != -1) {
                    var arrUrl = url.split("//");

                    var start = arrUrl[1].indexOf("modifyTeacher/");
                    var relUrl_id = arrUrl[1].substring(start + 14);//stop省略，截取从start开始到结尾的所有字符

                    if (relUrl_id.indexOf("?") != -1) {
                        relUrl_id = relUrl_id.split("?")[0];
                    }
                    return relUrl_id;
                }
                return null
            },
            btn1() {
                var html = this.editor.txt.html()
                var filterHtml = filterXSS(html)
                this.$message.success(filterHtml)
            },
            btn2() {
                this.$message.success(this.editor.txt.text())
            },
            backToManager() {
                this.$router.push({
                    path: '/manager/teacher'
                })
            },
            resetForm(ruleForm) {
                this.$refs[ruleForm].resetFields();
            },
            // 创建教师新成员
            createTeacher() {
                // 进行xss攻击处理
                /*  console.log(this.ruleForm.avatar)
                  if(this.ruleForm.email==''||
                    this.ruleForm.username==''
                    ){
                    this.$message.error("请先填入必填字段")
                    return
                  }*/
                var html = this.editor.txt.html()
                var filterHtml = filterXSS(html)
                this.ruleForm.intro = filterHtml
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        console.log("验证表单信息成功")
                    } else {
                        console.log("验证表单信息失败")
                        return false;
                    }
                });
                if (this.ruleForm.avatar == null || this.ruleForm.avatar == '') {
                    this.$message.error("请先上传头像")
                    return
                }
                console.log(this.ruleForm);
                this.setTeacherInfo(this.ruleForm);
                console.log("提交----------------------表单信息为: " + JSON.stringify(this.ruleForm) + ">>>>>>>>>>")
                console.log(this.ruleForm)
                // 待做 : 实现scholat关联
                // 创建新教师成员
                this.api({
                    url: "/manager/addTeacher",
                    method: "post",
                    data: this.ruleForm
                }).then((res) => {
                    this.$message.success("添加教师信息成功")
                    this.$router.push({
                        path: '/manager/teacher'
                    })
                }).catch(e => {

                })

            },
            // 清空简介
            clearIntro() {
                this.$confirm('此操作将会清除简介信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'danger'
                }).then(() => {
                    this.ruleForm.intro = '';
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消清除'
                    });
                });
            },
            validateBaseInfo(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        console.log("验证表单信息成功")
                    } else {
                        console.log("验证表单信息失败")
                        return false;
                    }
                });
                if (this.ruleForm.avatar == null || this.ruleForm.avatar == '') {
                    this.$message.error("请先上传头像")
                    return
                }
            },
            // 更新教师成员信息
            createTeacher_one() {
                var html = this.editor.txt.html()
                var filterHtml = filterXSS(html)
                this.ruleForm.intro = filterHtml
                this.setTeacherInfo(this.ruleForm);
                this.validateBaseInfo();
                this.api({
                    url: "/manager/addTeacher",
                    method: "post",
                    data: this.ruleForm
                }).then((res) => {
                    this.$message.success("添加教师信息成功");
                    this.ruleForm.id = res.teacher_id;
                    this.secondPage = true;
                }).catch(e => {
                })
            },
            updateTeacher() {
                var html = this.editor.txt.html()
                var filterHtml = filterXSS(html)
                this.ruleForm.intro = filterHtml
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        console.log("验证表单信息成功")
                    } else {
                        console.log("验证表单信息失败")
                        return false;
                    }
                });
                if (this.ruleForm.avatar == null || this.ruleForm.avatar == '') {
                    this.$message.error("请先上传头像")
                    return
                }
                // 进行xss攻击处理
                this.setTeacherInfo(this.ruleForm);
                this.ruleForm.id = this.$route.params.id;
                /* console.log("``````` " + this.ruleForm.create_time)
                 var str = this.ruleForm.create_time;
                 var time = str.slice(0, 10) + " " + str.slice(11, 19);*/
                let time = new Date();
                this.ruleForm.create_time = time.format('yyyy-MM-dd h:m:s');
                // this.ruleForm.domain_name=Pinyin.chineseToPinYin(this.ruleForm.username)
                console.log("................................." + JSON.stringify(this.ruleForm) + ">>>>>>>>>>" + this.ruleForm.edit_name)
                // 创建新教师成员
                this.api({
                    url: "/manager/updateTeacher",
                    method: "post",
                    data: this.ruleForm
                }).then((res) => {
                    this.$message.success("修改教师信息成功");
                    console.log("------------------------");
                    console.log(this.ruleForm);
                    this.$router.push({
                        path: '/manager/teacher'
                    })
                }).catch(e => {

                })
            },
            // 教师分配
            openAssignment() {

                this.showRoleAssigment = true;
                this.roleId = this.GetUrlRelativePath_id();
                // console.log("id==="+id);
                // console.log("当前分栏目标教师Id:" + id)
                this.$notify({
                    title: '提示',
                    message: '本页面教师分配只展示未分配栏目。若需要管理教师已分配栏目，请到教师分配页面进行管理。',
                    type: 'info',
                    position: 'bottom-left'
                });
                this.$refs.childRole.getTeacherAllCatalogues(this.roleId);
            },
        }
    }
</script>

<style lang="scss">
  .modify-page {
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

  .el-table__body-wrapper {
    height: 100%;
  }

  .redItem .el-form-item__label {
    color: red
  }
</style>
