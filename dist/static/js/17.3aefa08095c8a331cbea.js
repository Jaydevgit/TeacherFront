webpackJsonp([17],{Dd1k:function(t,e,a){var i=a("tcOX");"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);a("rjj0")("bbeb8e46",i,!0)},K9y8:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});a("IcnI");var i={name:"applyBlack",data:function(){return{search:"",totalCount:0,list:[],listLoading:!1,listQuery:{pageNum:1,pageRow:10,state:-1},applyUnit:{id:"",avatar:"",school_name:"",unit_name:"",chinese_name:"",email:"",phone:"",state:"",update_time:""}}},created:function(){this.getList()},methods:{cancelBlackApply:function(t){var e=this,a=this;this.$confirm("确定从黑名单中移除?","提示",{confirmButtonText:"确定",showCancelButton:!1,type:"success"}).then(function(){e.$message.warning("申请的id是:"+t),a.api({url:"/scholat/apply/cancelBlackApply",method:"post",data:{apply_id:t}}).then(function(t){e.$message.success("从黑名单中移除成功"),e.getList()}).catch(function(t){e.$message.error("从黑名单中移除失败")})})},getImgUrl:function(t,e){return"front"==t?"http://47.106.132.95:2333/images/certificate_front/"+e:"back"==t?"http://47.106.132.95:2333/images/certificate_back/"+e:"working"==t?"http://47.106.132.95:2333/images/certificate_working/"+e:"http://ww2.sinaimg.cn/large/006tNc79gy1g4i53qvv3kj30kn0eaacq.jpg"},getList:function(){var t=this;this.hasScholatPerm("unit:list")?(this.listLoading=!0,this.api({url:"/scholat/apply/getInfo",method:"get",params:this.listQuery}).then(function(e){t.listLoading=!1,t.list=e.list,t.totalCount=e.totalCount,t.totalUpdate=e.totalUpdate}).catch(function(t){})):this.$message.error("没有list权限")},handleSizeChange:function(t){this.listQuery.pageRow=t,this.handleFilter()},handleCurrentChange:function(t){this.listQuery.pageNum=t,this.getList()},getIndex:function(t){return(this.listQuery.pageNum-1)*this.listQuery.pageRow+t+1}}},n=a("XyMi");var r=function(t){a("Dd1k")},s=Object(n.a)(i,function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",[a("el-form-item",[a("el-input",{staticStyle:{width:"250px"},attrs:{size:"mini",placeholder:"输入关键字搜索"},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:t.search}},[t._v("搜索")]),t._v(" "),a("div",{staticStyle:{clear:"both"}})],1)],1)],1),t._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.body",value:t.listLoading,expression:"listLoading",modifiers:{body:!0}}],attrs:{data:t.list,"element-loading-text":"拼命加载中",border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{align:"center",label:"序号",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{domProps:{textContent:t._s(t.getIndex(e.$index))}})]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",label:"申请单位",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticClass:"label-describe"},[t._v("申请学校")]),a("span",[t._v(t._s(e.row.school_name))])]),t._v(" "),a("div",[a("span",{staticClass:"label-describe"},[t._v("申请单位")]),a("span",[t._v(t._s(e.row.unit_name))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"left",label:"申请人",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticClass:"label-describe"},[t._v("姓名")]),a("span",[t._v(t._s(e.row.chinese_name))])]),t._v(" "),a("div",[a("span",{staticClass:"label-describe"},[t._v("电话")]),a("span",[t._v(t._s(e.row.phone))])]),t._v(" "),a("div",[a("span",{staticClass:"label-describe"},[t._v("邮箱")]),a("span",[t._v(t._s(e.row.email))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"身份证",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticClass:"label-describe"},[t._v("身份证正面")]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-popover",{attrs:{placement:"left",title:"",trigger:"hover"}},[a("img",{attrs:{src:t.getImgUrl("front",e.row.certificate_front),alt:t.getImgUrl("front",e.row.certificate_front)}}),t._v(" "),e.row.certificate_front?a("img",{staticClass:"certificate-img",attrs:{slot:"reference",src:t.getImgUrl("front",e.row.certificate_front)},slot:"reference"}):t._e()])],1)]),t._v(" "),a("div",[a("span",{staticClass:"label-describe"},[t._v("身份证反面")]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-popover",{attrs:{placement:"left",title:"",trigger:"hover"}},[a("img",{attrs:{src:t.getImgUrl("back",e.row.certificate_back),alt:t.getImgUrl("back",e.row.certificate_back)}}),t._v(" "),e.row.certificate_back?a("img",{staticClass:"certificate-img",attrs:{slot:"reference",src:t.getImgUrl("back",e.row.certificate_back)},slot:"reference"}):t._e()])],1)])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"在职证明",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",[a("span",{staticClass:"label-describe"},[t._v("在职证明")]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("el-popover",{attrs:{placement:"left",title:"",trigger:"hover"}},[a("img",{attrs:{src:t.getImgUrl("working",e.row.certificate_working),alt:t.getImgUrl("working",e.row.certificate_working)}}),t._v(" "),e.row.certificate_working?a("img",{staticClass:"certificate-img",attrs:{slot:"reference",src:t.getImgUrl("working",e.row.certificate_working)},slot:"reference"}):t._e()])],1)])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"申请时间",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.update_time))])]}}])}),t._v(" "),a("el-table-column",{attrs:{align:"center",label:"token",width:"130"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.token))])]}}])}),t._v(" "),t.hasScholatPerm("unit:update")?a("el-table-column",{attrs:{fixed:"right",align:"center",label:"管理"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{type:"success",size:"small"},on:{click:function(a){t.cancelBlackApply(e.row.id)}}},[t._v("从黑名单中移除")])]}}])}):t._e()],1),t._v(" "),a("el-pagination",{attrs:{"current-page":t.listQuery.pageNum,"page-size":t.listQuery.pageRow,total:t.totalCount,"page-sizes":[10,20,50,100],layout:"total, sizes, prev, pager, next, jumper"},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}})],1)},[],!1,r,"data-v-5f222fd2",null);e.default=s.exports},tcOX:function(t,e,a){(t.exports=a("FZ+f")(!0)).push([t.i,"\n.label-describe[data-v-5f222fd2] {\n  font-size: 16px;\n  font-weight: 400;\n  background: #eaeaea;\n  padding: 2px 12px;\n  border-radius: 19px;\n  color: #818181;\n}\n.certificate-img[data-v-5f222fd2] {\n  width: 130px;\n  margin: 8px;\n  border-radius: 14px;\n  -webkit-box-shadow: 0 0 14px 6px antiquewhite;\n          box-shadow: 0 0 14px 6px antiquewhite;\n}\n","",{version:3,sources:["/Users/achunorigin/project/A_Postgraduate/persona-teacher/persona-teacherHome-front/src/views/scholat/apply/black.vue"],names:[],mappings:";AACA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,eAAe;CAChB;AACD;EACE,aAAa;EACb,YAAY;EACZ,oBAAoB;EACpB,8CAA8C;UACtC,sCAAsC;CAC/C",file:"black.vue",sourcesContent:["\n.label-describe[data-v-5f222fd2] {\n  font-size: 16px;\n  font-weight: 400;\n  background: #eaeaea;\n  padding: 2px 12px;\n  border-radius: 19px;\n  color: #818181;\n}\n.certificate-img[data-v-5f222fd2] {\n  width: 130px;\n  margin: 8px;\n  border-radius: 14px;\n  -webkit-box-shadow: 0 0 14px 6px antiquewhite;\n          box-shadow: 0 0 14px 6px antiquewhite;\n}\n"],sourceRoot:""}])}});