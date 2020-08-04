<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '320px'
    }
  },
  data() {
    return {
      chart: null,
      patentTotal:0,
      projectTotal:0,
      publicationTotal:0,
      paperTotal:0
    }
  },
  created(){
    this.getTotal()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart()
    // })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  watch: {
    patentTotal(val) {
     console.log("aaa")
      this.initChart()
    }
  },
  methods: {
    getTotal(){
      let unitId =  this.$store.state.user.unitId;
      this.api({
        url: "/statistic/getTotal/"+unitId,
        method: "get",
      }).then(data => {
        console.log("data="+data.paperTotal);
        this.paperTotal=data.paperTotal
        this.projectTotal=data.projectTotal
        this.patentTotal=data.patentTotal
        this.publicationTotal=data.publicationTotal
      })

    },
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['论文', '项目', '专利', '著作']
        },
        series: [
          {
            name: '学术成果统计',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: this.paperTotal, name: '论文' },
              { value: this.projectTotal, name: '项目' },
              { value: this.patentTotal, name: '专利' },
              { value: this.publicationTotal, name: '著作' },
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
