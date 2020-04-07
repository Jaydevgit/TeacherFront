<template>
  <div id="page">
    <div id="watchsWorkDistribution_echarts" style="height: calc(100% - 45px);width: 100%;">
      <h1 style="color: #339999" v-if="loadingEchartsFlag">正在处理关系数据...</h1>
    </div>
  </div>
</template>

<script>
    import echarts from "echarts";

    const canvas = document.createElement('canvas');
    const contex = canvas.getContext('2d');
    export default {
        name: "watchs_workDistribution.vue",
        data() {
            return {
                work_unit_map: undefined,
                loadingEchartsFlag: true,
                data_name: [],
                data_val: [],
            }
        },
        created() {
        },
        mounted() {
            // 统计分布
            this.work_unit_map = new Map();
            Array.from(this.watchs).forEach((v, k) => {
                let work_unit = v.work_unit
                if (this.work_unit_map.has(work_unit)) {
                    let cnt = this.work_unit_map.get(work_unit)
                    this.work_unit_map.set(work_unit, ++cnt)
                } else {
                    this.work_unit_map.set(work_unit, 1)
                }
            });
            this.work_unit_map.forEach((v, k) => {
                this.data_name.push(k)
                let o = {
                    value: v, name: k
                }
                this.data_val.push(o)
            });
            this.initECharts()
        },
        props: ['watchs'],
        methods: {
            initECharts() {
                var dom = document.getElementById("watchsWorkDistribution_echarts");
                var watchsChart = echarts.init(dom);
                var app = {};
                watchsChart.showLoading();
                watchsChart.hideLoading();
                echarts.dataTool = require("echarts/extension-src/dataTool/gexf")
                const init_map = async () => {
                    const option = {
                        tooltip: {
                            trigger: 'item',
                            formatter: "{a} <br/>{b}: {c} ({d}%)"
                        },
                        series: [
                            {
                                name: '访问来源',
                                type: 'pie',
                                radius: ['0%', '55%'],
                                label: {
                                    normal: {
                                        // position: 'inner',
                                        // show : false
                                    }
                                },
                                data: this.data_val
                            }
                        ]
                    };
                    watchsChart.setOption(option);
                };
                init_map();
            }
        }
    }
</script>

<style scoped lang="scss">
  .g6-tooltip {
    border: 1px solid #e2e2e2;
    border-radius: 4px;
    font-size: 12px;
    color: #545454;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px 8px;
    box-shadow: rgb(174, 174, 174) 0px 0px 10px;
  }

  #page {
    width: 100%;
    height: 600px;
  }
</style>
