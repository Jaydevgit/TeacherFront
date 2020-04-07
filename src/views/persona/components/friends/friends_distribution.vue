<template>
  <div id="friends_distribution">
    <div class="nav mine-border">
      <div class="nav-left">
        <el-button type="warning">好友数据</el-button>
        <el-button type="warning">粉丝数据</el-button>
        <el-button type="warning">关注数据</el-button>
      </div>
      <div class="nav-right">
        <div class="search">
          <input placeholder="搜索学者姓名">
        </div>
        <el-button type="primary" >搜索定位</el-button>
      </div>
    </div>
    <div class="map-div mine-border">
      <div id="hostmap"></div>
      <el-button type="primary" class="location">定位本学者</el-button>
    </div>
    <div class="scholar-msg mine-border">学者信息</div>
    <div class="satisfy mine-border">地域分布统计</div>
    <div class="satisfy mine-border">学历统计</div>
    <div class="satisfy mine-border">兴趣标签统计</div>
  </div>
</template>

<script>
    export default {
        name: "friends_distribution",
        data() {
            return {
                icon1: require('../../../../assets/1.png'),
                icon2: require('../../../../assets/2.png'),
                icon3: require('../../../../assets/3.png'),
                icon4: require('../../../../assets/4.png'),
                icon5: require('../../../../assets/5.jpg')
            }
        },

        mounted() {
            // 全局钩子
            var vueThis = this;
            var hostmap = document.getElementById('hostmap');
            // hostmap.style.width = window.innerWidth + 'px';
            // hostmap.style.height = ((window.innerHeight) * 0.9) + 'px';
            var myChart = echarts.init(hostmap);
            var geoCoordMap = {
                '新研大楼': [121.411147, 31.178764],
                '总部大楼': [121.409992, 31.178243],
                '虹钦园': [121.413475, 31.184491],
                '虹漕园': [121.414904, 31.182674],
                '国际商务中心': [121.410404, 31.16982],
                '科技绿洲一二期': [121.397616, 31.170258],
                '科技绿洲三期': [121.392763, 31.170833],
                '新园科技广场': [121.411539, 31.170511],
                '现代服务业园区': [121.404426, 31.170689],
                '现代服务业园区二期三期': [121.405324, 31.172052],
                '新银大厦': [121.409445, 31.177932],
                '科产楼': [121.408121, 31.17802],
                '新思大楼': [121.404895, 31.177335],
                '创新大楼': [121.407503, 31.176499],
                '光启园': [121.415518, 31.185707],
                '新汇园': [121.409942, 31.184367],
                '凤凰园': [121.402823, 31.16888],
                '宝石园': [121.401039, 31.170811],
                '新业园': [121.404866, 31.174181],
                '钦江园': [121.406347, 31.180214],
                '桂箐园': [121.411445, 31.180385],
                '田林园': [121.410629, 31.173165],
                '桂果园': [121.41026, 31.172969],
                '桂中园': [121.409064, 31.174439],
                '桂平园': [121.409271, 31.176429],
                '创业园': [121.409315, 31.179581],
                '智汇园': [121.406648, 31.182804],
                '华美达酒店': [121.412265, 31.169405],
                '能通加油站': [121.408324, 31.171377],

            };
            var Data = [
                [{name: '创新大楼'}, {name: '新研大楼', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '总部大楼', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '虹钦园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '虹漕园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '国际商务中心', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '科技绿洲一二期', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '科技绿洲三期', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '新园科技广场', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '现代服务业园区', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '现代服务业园区二期三期', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '新银大厦', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '科产楼', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '新思大楼', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '光启园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '新汇园', value: 35, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '凤凰园', value: 94, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '宝石园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '新业园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '钦江园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '桂箐园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '田林园', value: 63, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '桂果园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '桂中园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '桂平园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '创业园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '智汇园', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '华美达酒店', value: 90, color: '#03FED2'}],
                [{name: '创新大楼'}, {name: '能通加油站', value: 94, color: '#03FED2'}],


            ]
            var convertData = function (data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = geoCoordMap[dataItem[1].name];
                    var toCoord = geoCoordMap[dataItem[0].name];
                    if (fromCoord && toCoord) {
                        res.push({
                            fromName: dataItem[0].name,
                            toName: dataItem[1].name,
                            coords: [fromCoord, toCoord]
                        });
                    }
                }
                return res;
            };

            var series = [];
            [['创新大楼', Data]].forEach(function (item, i) {
                var color = '';
                item[1].map(function (dataItem) {
                    // console.log(dataItem[1].color);
                })
                series.push({
                        name: item[0],
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        zlevel: 1,
                        // 动线样式
                        effect: {
                            show: true,
                            period: 7,
                            trailLength: 0.8,
                            color: '#03FED2',
                            symbolSize: 2,
                        },
                        // 实线样式
                        lineStyle: {
                            normal: {
                                color: '#03FED2',
                                width: 0,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item[1])
                    },
                    {
                        name: item[0],
                        type: 'lines',
                        coordinateSystem: 'bmap',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 6,
                            trailLength: 0,

                        },
                        lineStyle: {
                            normal: {
                                color: '#03FED2',
                                width: 1,
                                opacity: 0.4,
                                curveness: 0.2
                            }
                        },
                        data: convertData(item[1])
                    },
                    {
                        name: '详细信息',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        zlevel: 2,
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: '{b}'
                            }
                        },
                        symbolSize: function (val) {
                            return val[2] / 5;
                        },
                        data: item[1].map(function (dataItem) {
                            return {
                                name: dataItem[1].name,
                                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                                itemStyle: {
                                    normal: {
                                        color: dataItem[1].color
                                    }
                                },
                            };
                        })
                    });
            });

            var option = {
                tooltip: {
                    trigger: 'item'
                },
                bmap: {
                    roam: true,
                    silent: true,
                    mapStyle: {
                        styleJson: [
                            {
                                'featureType': 'water',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#031628'
                                }
                            },
                            {
                                'featureType': 'land',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#000102'
                                }
                            },
                            {
                                'featureType': 'highway',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            },
                            {
                                'featureType': 'arterial',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'arterial',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#0b3d51'
                                }
                            },
                            {
                                'featureType': 'local',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'railway',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'railway',
                                'elementType': 'geometry.stroke',
                                'stylers': {
                                    'color': '#08304b'
                                }
                            },
                            {
                                'featureType': 'subway',
                                'elementType': 'geometry',
                                'stylers': {
                                    'lightness': -70
                                }
                            },
                            {
                                'featureType': 'building',
                                'elementType': 'geometry.fill',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'all',
                                'elementType': 'labels.text.fill',
                                'stylers': {
                                    'color': '#857f7f'
                                }
                            },
                            {
                                'featureType': 'all',
                                'elementType': 'labels.text.stroke',
                                'stylers': {
                                    'color': '#000000'
                                }
                            },
                            {
                                'featureType': 'building',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#022338'
                                }
                            },
                            {
                                'featureType': 'green',
                                'elementType': 'geometry',
                                'stylers': {
                                    'color': '#062032'
                                }
                            },
                            {
                                'featureType': 'boundary',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#465b6c'
                                }
                            },
                            {
                                'featureType': 'manmade',
                                'elementType': 'all',
                                'stylers': {
                                    'color': '#022338'
                                }
                            },
                            {
                                'featureType': 'label',
                                'elementType': 'all',
                                'stylers': {
                                    'visibility': 'off'
                                }
                            },
                            {
                                "featureType": "poi",
                                "elementType": "all",
                                "stylers": {
                                    "color": "#03FED2",
                                    "visibility": "off"
                                }
                            }

                        ]
                    }
                },
                series: series
            };

            myChart.setOption(option);
            var map = myChart.getModel().getComponent('bmap').getBMap();
            map.addControl(new BMap.NavigationControl());      // 启用放大缩小 尺
            map.enableScrollWheelZoom();
            // map.disableDoubleClickZoom();
            map.centerAndZoom(new BMap.Point(121.39908, 31.177505), 17);  // 初始化地图
            window.onresize = myChart.resize;//图表自适应

            // 添加标注
            var Thisvue = this;
            map.centerAndZoom(new BMap.Point(121.409992, 31.178243), 15);  // 初始化地图,设置中心点坐标和地图级别
            var points = [
                {'lng': 121.388495, 'lat': 31.171609, 'type': 1},
                {'lng': 121.459785, 'lat': 31.173834, 'type': 2},
                {'lng': 121.423853, 'lat': 31.167036, 'type': 3},
                {'lng': 121.426584, 'lat': 31.18335, 'type': 4},
                {'lng': 121.409192, 'lat': 31.173339, 'type': 1},
                {'lng': 121.436788, 'lat': 31.167901, 'type': 4},
                {'lng': 121.404737, 'lat': 31.161969, 'type': 4},
                {'lng': 121.389358, 'lat': 31.182855, 'type': 2}
            ];
            addMarker(points);

            function addMarker(points) {
                //循环建立标注点
                for (var i = 0, pointsLen = points.length; i < pointsLen; i++) {
                    var point = new BMap.Point(points[i].lng, points[i].lat); //将标注点转化成地图上的点
                    var myIcon = "";
                    if (points[i].type == 1) {
                        myIcon = new BMap.Icon(Thisvue.icon1, new BMap.Size(40, 45));
                    }
                    if (points[i].type == 2) {
                        myIcon = new BMap.Icon(Thisvue.icon2, new BMap.Size(40, 45));
                    }
                    if (points[i].type == 3) {
                        myIcon = new BMap.Icon(Thisvue.icon3, new BMap.Size(40, 45));
                    }
                    if (points[i].type == 4) {
                        myIcon = new BMap.Icon(Thisvue.icon4, new BMap.Size(40, 45));
                    }
                    var marker = new BMap.Marker(point, {icon: myIcon}); //将点转化成标注点
                    map.addOverlay(marker);  //将标注点添加到地图上
                    //添加监听事件
                    (function () {
                        var thePoint = points[i];
                        marker.addEventListener("onmouseover",
                            function () {
                                showInfo(this, thePoint);
                            });
                    })();
                }
            };

            function showInfo(thisMarker, point) {
                //获取点的信息
                var sContent = '<div style="width:691px;height:400px;font-size:12px;">'
                    + '<div  style="width:691px;height:266px;display:flex;">'
                    + '<div style="width:500px;height:266px;display:flex;">'
                    + '<div style="height:400px;width:158px;padding-top:7px">'
                    + '<h5 style="font-weight:bolder;color:#006400;margin-bottom:18px;font-size:17px;">工程基本信息</h5>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程名称</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑名称</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">工程地址</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑结构体系</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">开工日期</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">总投资</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造后年节能/吨标煤</a>'
                    + '</div>'
                    + '<div style="height:400px;width:158px;padding-top:42px">'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '能源改造' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '创新大楼' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '宜山路1008号' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '商业' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-8-22' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '155' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '60' + '</a>'
                    + '</div>'
                    + '<div style="height:400px;width:158px;padding-top:42px">'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑功能</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">建筑总面积(㎡)</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">占地面积(㎡)</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">竣工日期</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">投入使用日期</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">是否采用合同能源</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#1f871f">改造节能率%</a>'
                    + '</div>'
                    + '<div style="height:400px;width:158px;padding-top:42px">'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '商业' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '244' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '244' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-9-22' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '2017-9-22' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '是' + '</a>'
                    + '<a style="display:flex;flex-direction:column;height:30px;align-items:center;font-weight:bolder;line-height:30px;border:1px solid #666666;color:#777777">' + '10%' + '</a>'
                    + '</div>'
                    + '</div>'

                    + '<div style="width:230px;height:224px;margin-top:42px;">'
                    + '<img src="' + Thisvue.icon5 + '" style="width:100%;height:100%">'
                    + '</div>'

                    + '</div>'

                    + '</div>'

                var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
                thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow

            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
  #friends_distribution {
    height: 800px;
    width: 100%;
  }

  .map-div {
    width: calc(70% - 16px);
    float: left;
    height: 500px;
    position: relative;
    box-sizing: border-box;
  }

  .nav {
    width: calc(100% - 16px);
    display: flex;
    justify-content: space-between;
  }

  .nav-right {
    display: flex;
    justify-content: space-between;
  }

  .nav-left {
  }

  .nav-right .search {
    margin: 8px;
    display: flex;
    align-items: center;
    color: #fff;
  }

  .nav-right .search > input {
    border-radius: 6px;
    padding: 2px;
  }

  #hostmap {
    width: 100%;
    height: 100%;
    overflow: hidden;
    font-family: "微软雅黑";
  }

  .mine-border {
    padding: 8px;
    margin: 8px;
    border: 1px solid gray;
    box-shadow: 0 0 8px 0px grey;
    box-sizing: border-box;
  }

  .img1 {
    background: url(../../../../assets/1.png) no-repeat;
    background-size: 32px 30px
  }

  .img2 {
    background: url(../../../../assets/2.png) no-repeat;
    background-size: 32px 30px
  }

  .img3 {
    background: url(../../../../assets/3.png) no-repeat;
    background-size: 32px 30px
  }

  .img4 {
    background: url(../../../../assets/4.png) no-repeat;
    background-size: 32px 30px
  }

  .scholar-msg {
    float: left;
    width: calc(30% - 16px);
    height: 500px;
  }

  .satisfy {
    float: left;
    width: calc(33.3% - 16px);
  }
  .location {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
</style>
