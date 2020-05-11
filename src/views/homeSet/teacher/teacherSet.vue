<template>
    <div class="teacherSet">
      <div style="margin-bottom: 20px;font-family: 'Helvetica Neue';font-size: 20px">
        <span>教师主页显示字段设置</span>
        <el-button type="primary" style="float: right" @click="submit">保存设置</el-button>
      </div>

      <div style="height: 1px;width: 100%;background-color: black"></div>
      <div style="margin-top: 20px">
          <el-checkbox v-for="tag in checkedCities" :checked="tag.checked" :key="tag.value" :disabled="tag.disabled" @change="tag.checked=!tag.checked" border style="margin-top: 20px">
            {{tag.label}}</el-checkbox>
      </div>
    </div>
</template>

<script>
  const cityOptions = [
    {
      label:'照片',
      value:'a',
    },
    {
      label:'姓名',
      value:'b',
    },
    {
      label:'职务',
      value:'c',
    },
    {
      label:'职称',
      value:'d',
    },
    {
      label:'头衔',
      value:'e',
    },
    /*{
      label:'最后学历',
      value:'f',
    },
    {
      label:'最高学位',
      value:'g',
    },*/
    {
      label:'学历学位',
      value: 'f'
    },
    {
      label:'毕业学校',
      value:'h',
    },
    {
      label:'学科专业',
      value:'i',
    },
    {
      label:'研究方向',
      value:'j',
    }, {
      label:'所在部门',
      value:'k',
    },
    {
      label:'办公地点',
      value:'l',
    },
    {
      label:'办公电话',
      value:'m',
    },
    {
      label:'办公邮箱',
      value:'n',
    },
    {
      label:'学术主页',
      value:'o',
    }];//各字母对应字段
    export default {
      name: "teacherSet",
      data() {
        return {
          checkAll: false,
          checkedCities: [],
          checkedCitiesItem: {label: '', value: '',checked:'',disabled:''},
          cities: cityOptions,
          isIndeterminate: true,
          tagState: [],
          finalTag:'',
          applyForm : {
            tagState:'',
            unitId : '',
          }
        };
      },
      created() {
        this.getUnitInfo()
      },
      methods: {
        submit(){
          this.finalTag=''
          for(let i=0;i<this.checkedCities.length;i++){
            if(this.checkedCities[i].checked===true){
              this.checkedCities[i].value=this.checkedCities[i].value.toLocaleLowerCase();
            }else{
              this.checkedCities[i].value=this.checkedCities[i].value.toLocaleUpperCase();
            }
            this.finalTag=this.finalTag+this.checkedCities[i].value
          }
          console.log(" this.finalTag="+ this.finalTag);
          this.applyForm.unitId = this.$store.getters.unitId
          this.applyForm.tagState=this.finalTag
          this.api({
            url: '/unit/updateUnitInfo',
            method: 'post',
            data: this.applyForm
          }).then(data => {
            this.$message.success("提交成功");
          }).catch(e => {
            this.$message.error("提交失败");
          })
        },
        //判断是否为不可修改字段
        tagIf(val){
          let str='abejno'
          if(str.indexOf(val)===-1){
            return false;
          }else{
            return true;
          }
        },
        // 英文是否大写
         upperCase(num) {
          var reg = /^[a-z]+$/;
          return reg.test(num)
        },
        getUnitInfo() {
          this.api({
            url: "/unit/getUnitInfo",
            method: "get",
            params: {unitId: this.$store.getters.unitId}
          }).then(data => {
            // console.log(JSON.stringify(data))
            var a = data.tagState;
            this.tagState = a.split('');
            console.log("this.tagState==" + this.tagState);
            /*console.log("this.compareState=="+ this.compareState)*/
            return new Promise(this.compareState);
          }).catch(error => {
            console.log("QAQ........没有找到学院信息")
          })
        },

        compareState() {
          console.log("======a=======");
          for (var i = 0; i <= this.cities.length; i++) {
         //   console.log("this.cities" + this.cities[i].value + "?" + this.tagState[i]);
            this.checkedCitiesItem = Object.assign({}, this.checkedCitiesItem, {
              label: this.cities[i].label,
              value: this.tagState[i],
              checked: this.upperCase(this.tagState[i]),
              disabled: this.tagIf(this.tagState[i])
            });
            this.checkedCities.push(this.checkedCitiesItem)
          }

        },

      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.teacherSet{
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  margin: 50px 50px 50px 50px;
  padding: 50px 50px 50px 50px;
}
</style>
