(function ($, w) {
    var ESIObject = {
        version : "0.1",
        coreFn: {
            isNumber: function (text) {//判断是否是纯数字
                var pattern = /^[0-9]*$/;
                return pattern.test(text);
            },            
            isMobilePhoneNubmer: function (number) {//判断手机号
                var pattern = /^1(3|5|8)[0-9]{9}$/;
                return pattern.test(number);
            }
        },
        //highcharts相关函数库
        highChartsFn: {
            getStockchartOptions: function (par_danwei) {
                //stockchart参数对象
                var data_danwei = par_danwei || (24 * 3600 * 1000 * 30 * 3);//一季度的毫秒换算
                var stockOption = new Object();
                stockOption.chart = {
                    renderTo: "",
                    animation: true,
                    zoomType: "x"
                };
                stockOption.rangeSelector = {
                    buttons: [{
                        type: 'month',
                        count: 6,
                        text: '复位'
                    }, {
                        type: 'all',
                        text: '全部'
                    }],
                    selected: 0,//表示以上定义button的index,从0开始
                    inputEnabled: false,
                    buttonTheme: { // styles for the buttons
                        fill: 'none',
                        stroke: 'none',
                        'stroke-width': 0,
                        r: 8,
                        style: {
                            color: '#000',
                            fontWeight: 'bold'
                        },
                        states: {
                            hover: {
                                //fill: '#fff'
                            },
                            select: {
                                fill: '#fff',
                                style: {
                                    color: 'white'
                                }
                            }
                        }
                    },
                    enable: false
                };
                stockOption.title = {//图形中的标题
                    //text : data.title,
                    text: '',
                    verticalAlign: 'top',
                    align: 'left',
                    floating: true,
                    y: 20,
                    style: {
                        color: '#000',
                        font: 'bold 25px "Trebuchet MS", Verdana, sans-serif'
                    }
                };
                stockOption.credits = {//版权信息
                    enabled: false
                };
                stockOption.plotOptions = {//标注
                    column: {
                        dataLabels: {
                            groupPadding: 0,
                            enabled: true
                        }
                    },
                    area: {
                        pointRange: data_danwei
                    },
                    spline: {
                        dataLabels: {
                            enabled: true
                        }
                    },
                    line: {
                        dataLabels: {
                            enabled: true
                        }
                    },
                    pie: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                };
                stockOption.colors = [//主题颜色
                        '#ffcc00',
                        '#00cc00',
                        '#cc0000',
                        '#00ccff',
                        '#ff00cc',
                        '#0000cc',
                        '#00ffcc',
                        '#ccff00',
                        '#cc00ff'
                ];
                stockOption.legend = {//图例设置
                    verticalAlign: 'top',
                    align: 'right',
                    floating: true,
                    enabled: true,
                    x: -20,
                    y: -10,
                    width: 120,
                    itemStyle: {
                        font: '13px Trebuchet MS, Verdana, sans-serif',
                        color: 'black'

                    },
                    itemHoverStyle: {
                        color: '#039'
                    },
                    itemHiddenStyle: {
                        color: 'gray'
                    }
                };
                stockOption.tooltip = {//提示信息
                    headerFormat: '{point.key}<br/>',
                    valueDecimals: 3,
                    shared: true,
                    useHTML: true,
                    // 日期时间格式化
                    xDateFormat: '%Y-%m-%d %A',
                    enabled: false  //是否在图上显示标示
                };
                stockOption.xAxis = [{
                    tickPixelInterval: 1, //时间与时间之间的间隔。。。如果为1在线性图上会产生日期过多的bug
                    minTickInterval: data_danwei,
                    gridLineWidth: 1,
                    lineColor: '#000',
                    tickWidth: 1,//刻度线宽度
                    tickColor: '#000',//刻度线颜色
                    gapGridLineWidth: 0,
                    labels: {
                        formatter: function () {
                            var vDate = new Date(this.value);
                            return vDate.getFullYear() + "年";
                        },
                        align: 'center'
                    }
                }];//x轴
                stockOption.yAxis = [];//y轴
                stockOption.series = [];//数据列表
                return stockOption;
            }
        },
        plugins: {}
    };
    w.ESIObject = w.$esi = ESIObject;
})(jQuery, window);

