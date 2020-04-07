<template>
  <div id="page">
    <div id="container" style="height: calc(100% - 45px);width: 100%;">
      <h1 style="color: #339999" v-if="loadingEchartsFlag">正在处理关系数据...</h1>
    </div>
  </div>
</template>

<script>
    import echarts from "echarts";

    const canvas = document.createElement('canvas');
    const contex = canvas.getContext('2d');
    export default {
        name: "friends_graph",
        data(){
          return{
              defaultImgDataUrl:'',
              friendsAvatarUrl:[],
              loadingEchartsFlag:true
          }
        },
        created(){
        },
        mounted() {
            console.log("-----------")
            this.initImgAvatar()
        },
        props: ['friends', 'local_profile','fans','watchs'],
        methods: {
            // 处理头像裁切为圆形
            initImgAvatar(){
              let run = async ()=>{
                  let defaultAvatarUrl = await this.getImgData("http://www.scholat.com//images/default.png");
                  let main_avatarUrl = await this.getImgData(this.local_profile.avatar);
                  let len = this.friends.length;
                  let fans_len = this.fans.length;
                  let watchs_len = this.watchs.length;
                  for(let i =0;i<len;i++){
                      let src = await this.getImgData("http://www.scholat.com/" + this.friends[i].picture_url)
                      this.friendsAvatarUrl.push(src)
                  }
                  for(let i =0;i<fans_len;i++){
                      let src = await this.getImgData("http://www.scholat.com/" + this.fans[i].picture_url)
                      this.friendsAvatarUrl.push(src)
                  }
                  for(let i =0;i<watchs_len;i++){
                      let src = await this.getImgData("http://www.scholat.com/" + this.watchs[i].picture_url)
                      this.friendsAvatarUrl.push(src)
                  }
                  this.loadingEchartsFlag = false;
                  // ---------- 可以开始初始化关系图
                  this.initECharts(main_avatarUrl,this.friendsAvatarUrl)
              };
              run();
            },
            getImgData(imgSrc) {
                var fun = function (resolve) {
                    const img = new Image();
                    img.crossOrigin = '';
                    img.onload = function () {
                        let center = {
                            x: img.width / 2,
                            y: img.height / 2
                        };
                        var diameter = img.width;
                        canvas.width = diameter || 80;
                        canvas.height = diameter || 80;
                        contex.clearRect(0, 0, diameter, diameter);
                        contex.save();
                        contex.beginPath();
                        let radius = img.width / 2;
                        contex.arc(radius, radius, radius, 0, 2 * Math.PI); //画出圆
                        contex.clip(); //裁剪上面的圆形
                        contex.drawImage(img, center.x - radius, center.y - radius, diameter, diameter, 0, 0,
                            diameter, diameter); // 在刚刚裁剪的园上画图
                        contex.restore(); // 还原状态
                        resolve(canvas.toDataURL('image/png', 1))
                    };
                    img.src = imgSrc;
                    img.onerror=()=>{
                        resolve('data:image/png;base64,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')
                    }
                };
                var promise = new Promise(fun);
                return promise
            },
            initECharts(avatar_self,avatar_friends_list) {
                var dom = document.getElementById("container");
                var myChart = echarts.init(dom);
                var app = {};
                myChart.showLoading();
                myChart.hideLoading();
                echarts.dataTool = require("echarts/extension-src/dataTool/gexf")
                var categories = [];
                categories[0] = {name: '本学者'};
                categories[1] = {name: '互相关注圈'};
                categories[2] = {name: '粉丝圈'};
                categories[3] = {name: '关注圈'};
                // ---------------------- 好友关系数据节点计算
                let friends_nodes = [];
                let len = this.friends.length;
                let fans_len = this.fans.length;
                let watchs_len = this.watchs.length;
                console.log("好友关系数量:" + len)
                // -------- 处理头像开始

                // -------- 处理头像结束
                const init_map = async ()=>{
                    let o = {
                        "id": 0,
                        "name": this.local_profile.username,
                        "itemStyle": {
                            "normal": {
                                "color": "rgb(235,81,72)"
                            }
                        },
                        "symbolSize": 100,
                        "url": "http://www.scholat.com/" + this.local_profile.scholat_username,
                        "symbol": "image://"+avatar_self,
                        "attributes": {
                            "modularity_class": 0
                        }
                    };
                    friends_nodes.push(o);
                    for (let i = 0; i < len; i++) {
                        let o = {
                            "id": i + 1,
                            "name": this.friends[i].chinese_name,
                            "itemStyle": {
                                "normal": {
                                    "color": "rgb(235,81,72)"
                                }
                            },
                            "symbolSize": this.friends[i].trust*100,
                            "url": "http://www.scholat.com/" + this.friends[i].scholat_username,
                            "symbol": "image://" + avatar_friends_list[i],
                            "attributes": {
                                "modularity_class": 1
                            }
                        };
                        friends_nodes.push(o)
                    }
                    for (let i = len; i < len+fans_len; i++) {
                        let o = {
                            "id": i + 1,
                            "name": this.fans[i-len].chinese_name,
                            "itemStyle": {
                                "normal": {
                                    "color": "rgb(235,81,72)"
                                }
                            },
                            "symbolSize": this.fans[i-len].trust*100,
                            "url": "http://www.scholat.com/" + this.fans[i-len].scholat_username,
                            "symbol": "image://" + avatar_friends_list[i],
                            "attributes": {
                                "modularity_class": 2
                            }
                        };
                        friends_nodes.push(o)
                    }
                    for (let i = len+fans_len; i < len+fans_len+watchs_len; i++) {
                        let o = {
                            "id": i + 1,
                            "name": this.watchs[i-len-fans_len].chinese_name,
                            "itemStyle": {
                                "normal": {
                                    "color": "rgb(235,81,72)"
                                }
                            },
                            "symbolSize": this.watchs[i-len-fans_len].trust*100,
                            "url": "http://www.scholat.com/" + this.watchs[i-len-fans_len].scholat_username,
                            "symbol": "image://" + avatar_friends_list[i],
                            "attributes": {
                                "modularity_class": 3
                            }
                        };
                        friends_nodes.push(o)
                    }
                    // ---------------------------- 结束:好友关系节点计算
                    // ---------------------------- 开始:好友关系边数据计算
                    let friends_edge = [];
                    for (let i = 0; i < len; i++) {
                        let o = {
                            "id": i,
                            "name": null,
                            "source": i + 1,
                            "target": "0",
                            "lineStyle": {
                                "normal": {}
                            }

                        };
                        friends_edge.push(o)
                    }
                    for (let i = len; i < len+fans_len; i++) {
                        let o = {
                            "id": i,
                            "name": null,
                            "source": i + 1,
                            "target": "0",
                            "lineStyle": {
                                "normal": {}
                            }

                        };
                        friends_edge.push(o)
                    }
                    for (let i = len+fans_len; i < len+fans_len+watchs_len; i++) {
                        let o = {
                            "id": i,
                            "name": null,
                            "source": i + 1,
                            "target": "0",
                            "lineStyle": {
                                "normal": {}
                            }

                        };
                        friends_edge.push(o)
                    }
                    var graph = {
                        "nodes": friends_nodes,
                        "links": friends_edge
                    };
                    // ---------------------------- 结束:好友关系边数据计算
                    graph.nodes.forEach(function (node) {
                        node.itemStyle = null;
                        node.value = node.symbolSize;
                        node.symbolSize /= 1;
                        node.label = {
                            normal: {
                                show: node.symbolSize > 30
                            }
                        };
                        node.category = node.attributes.modularity_class;
                    });
                    const option = {
                        title: {
                            text: '关系图(对方学者大小==信任度*100)',
                            subtext: 'Default layout',
                            top: 'bottom',
                            left: 'right'
                        },
                        tooltip: {},
                        toolbox: {//工具栏。内置有导出图片，数据视图，动态类型切换，数据区域缩放，重置五个工具。
                            show: true,
                            feature: {
                                restore: {show: true},//重置
                                dataView: {readOnly: false},
                            }
                        },
                        legend: [{
                            // selectedMode: 'single',
                            data: categories.map(function (a) {
                                return a.name;
                            })
                        }],
                        animationDuration: 1500,
                        animationEasingUpdate: 'quinticInOut',
                        series: [
                            {
                                name: '关系图',
                                type: 'graph', // 类型:关系图
                                layout: 'force', // 图的布局none,类型可以不设置,也可以设置类似force代表力导图,这样就不用设置xy坐标
                                data: graph.nodes, // 节点数据
                                links: graph.links, // 边节点数据
                                categories: categories,
                                roam: true, // 开启鼠标缩放,平移漫游
                                focusNodeAdjacency: true,
                                itemStyle: {
                                    normal: {
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                        shadowBlur: 10,
                                        shadowColor: 'rgba(0, 0, 0, 0.3)'
                                    }
                                },
                                label: {
                                    position: 'right',
                                    formatter: '{b}'
                                },
                                lineStyle: {
                                    color: 'source',
                                    curveness: 0.3
                                },
                                emphasis: {
                                    lineStyle: {
                                        width: 10
                                    }
                                },
                                cursor: 'pointer',
                                // gravity: 0.1,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
                                force: {
                                    repulsion: 1000,          //节点之间的斥力因子。120
                                    gravity: 0.01,            //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢  0.01
                                    edgeLength: 300,          //边的两个节点之间的距离，这个距离也会受 repulsion。 100
                                },
                            }

                        ]
                    };
                    myChart.setOption(option);
                    // 设置节点点击事件
                    var data = myChart._model.option.series[0].data;
                    myChart.on("click", function (chartParam) {
                        window.open(data[chartParam.dataIndex].url,'_blank');
                    });
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
    height: 860px;
  }
</style>
