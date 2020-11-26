<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '../../research/components/mixins/resize'

const animationDuration = 3000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      countScholatPaper:0,
      countScholatPatent:0,
      countScholatProject:0,
      countScholatPublication:0
    }
  },
  created() {
    this.AcademicRaddar()
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.initChart()
  //   })
  // },
  watch: {
    countScholatPaper(val) {
      this.initChart()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    AcademicRaddar(){
      let scholatUsername = this.$route.params.scholatUsername
      this.api({
        url: "/academic/Raddar/" + scholatUsername,
        method: "get"
      }).then(data => {
        console.log("学术雷达值为:"+data.countScholatPaper)
         this.countScholatPaper = data.countScholatPaper;
        this.countScholatPatent = data.countScholatPatent;
        this.countScholatProject = data.countScholatProject;
        this.countScholatPublication = data.countScholatPublication;
        if(this.countScholatPaper>250){this.countScholatPaper=240}
        if(this.countScholatPatent>200){this.countScholatPatent=190}
        if(this.countScholatProject>200){this.countScholatProject=190}
        if(this.countScholatPublication>150){this.countScholatPublication=140}
      }).catch(error => {
        console.log("QAQ........没有找到教师信息")
      })
    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: 'Papers', max: 250 },
            { name: 'Patents', max: 200 },
            { name: 'Projects', max: 200 },
            { name: 'Publications', max: 150 },
            { name: 'Development', max: 50 },
            { name: 'Marketing', max: 50 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [this.countScholatPaper,this.countScholatPatent,this.countScholatProject,this.countScholatPublication,20,20],
              name: 'Academic Radar'
            },
            // {
            //   value: [4000, 9000, 15000, 15000, 13000, 11000],
            //   name: 'Expected Spending'
            // },
            // {
            //   value: [5500, 11000, 12000, 15000, 12000, 12000],
            //   name: 'Actual Spending'
            // }
          ],
          animationDuration: animationDuration
        }]
      })
    }
  }
}
</script>
