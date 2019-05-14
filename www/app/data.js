let succeed = document.getElementById("success");
var param = {
    humidity: 0,
    temperature: 0,
    setHumid: function (data) {
        this.humidity = parseFloat(data);
    },
    setTemp: function (data) {
        this.temperature = parseFloat(data)
    },
    getHumid: function () {
        return this.humidity;
    },
    getTemp: function () {
        return this.temperature;
    }
}

function RealTimeData() {
    const socket = io.connect();
    socket.on('socketData', (data) => {
        console.log(data);
        succeed.innerHTML = "Serial port connected at : "+data.dataPort;
        param.setTemp(data.dataHasil[4]);
        param.setHumid(data.dataHasil[3]);
        gaugeTemp.value = data.dataHasil[4];
        gaugeHumid.value = data.dataHasil[3];
        $("#suhu").html(parseInt(data.dataHasil[4]));
        $("#humid").html(parseInt(data.dataHasil[3]));
    });
    succeed.innerHTML = "Serial port not found!";
}

var gaugeTemp = new LinearGauge({
    renderTo: 'gauge-temp',
    width: 400,
    height: 150,
    units: "°C",
    title: "Temperature",
    minValue: -50,
    maxValue: 50,
    majorTicks: [
        -50,
        -40,
        -30,
        -20,
        -10,
        0,
        10,
        20,
        30,
        40,
        50
    ],
    minorTicks: 5,
    strokeTicks: true,
    ticksWidth: 15,
    ticksWidthMinor: 7.5,
    highlights: [
        {
            "from": -50,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 50,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
    colorMajorTicks: "#ffe66a",
    colorMinorTicks: "#ffe66a",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    colorPlate: "#15151e",
    colorPlateEnd: "#327ac0",
    borderShadowWidth: 0,
    borders: false,
    borderRadius: 10,
    needleType: "arrow",
    needleWidth: 3,
    animationDuration: 1500,
    animationRule: "linear",
    colorNeedle: "#222",
    colorNeedleEnd: "",
    colorBarProgress: "#327ac0",
    colorBar: "#f5f5f5",
    barStroke: 0,
    barWidth: 8,
    barBeginCircle: false
}).draw();

var gaugeHumid = new RadialGauge({
    renderTo: 'gauge-humid',
    colorNumbers: 'red',
    width: 200,
    height: 300,
    units: "Humidity",
    colorPlate: "#15151e",
    colorUnits: "#eee",
    colorBorderOuter: "#333",
    colorBorderOuterEnd: "#111",
    colorBorderMiddle: "#222",
    colorBorderMiddleEnd: "#111",
    colorBorderInner: "#111",
    colorBorderInnerEnd: "#333",
    colorTitle: "#eee",
    colorUnits: "#ccc",
    colorNumbers: "#eee",
    minValue: -50,
    maxValue: 50,
    majorTicks: [
        -50,
        -40,
        -30,
        -20,
        -10,
        0,
        10,
        20,
        30,
        40,
        50
    ],
    minorTicks: 2,
    needleType: "arrow",
    needleWidth: 2,
    needleCircleSize: 7,
    strokeTicks: true,
    highlights: [
        {
            "from": -50,
            "to": 0,
            "color": "rgba(0,0, 255, .3)"
        },
        {
            "from": 0,
            "to": 50,
            "color": "rgba(255, 0, 0, .3)"
        }
    ],
}).draw();

$(function () {
    Highcharts.createElement('link',null, null, document.getElementsByTagName('head')[0]);

    Highcharts.theme = {
        colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'
        ],
        chart: {
            backgroundColor: {
                linearGradient: {
                    x1: 0,
                    y1: 0,
                    x2: 1,
                    y2: 1
                },
                stops: [
                    [0, '#2a2a2b'],
                    [1, '#3e3e40']
                ]
            },
            style: {
                fontFamily: '\'Unica One\', sans-serif'
            },
            plotBorderColor: '#606063'
        },
        title: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase',
                fontSize: '20px'
            }
        },
        subtitle: {
            style: {
                color: '#E0E0E3',
                textTransform: 'uppercase'
            }
        },
        xAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            title: {
                style: {
                    color: '#A0A0A3'

                }
            }
        },
        yAxis: {
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },
            lineColor: '#707073',
            minorGridLineColor: '#505053',
            tickColor: '#707073',
            tickWidth: 1,
            title: {
                style: {
                    color: '#A0A0A3'
                }
            }
        },
        tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            style: {
                color: '#F0F0F0'
            }
        },
        plotOptions: {
            series: {
                dataLabels: {
                    color: '#B0B0B3'
                },
                marker: {
                    lineColor: '#333'
                }
            },
            boxplot: {
                fillColor: '#505053'
            },
            candlestick: {
                lineColor: 'white'
            },
            errorbar: {
                color: 'white'
            }
        },
        legend: {
            itemStyle: {
                color: '#E0E0E3'
            },
            itemHoverStyle: {
                color: '#FFF'
            },
            itemHiddenStyle: {
                color: '#606063'
            }
        },
        credits: {
            style: {
                color: '#666'
            }
        },
        labels: {
            style: {
                color: '#707073'
            }
        },

        drilldown: {
            activeAxisLabelStyle: {
                color: '#F0F0F3'
            },
            activeDataLabelStyle: {
                color: '#F0F0F3'
            }
        },

        navigation: {
            buttonOptions: {
                symbolStroke: '#DDDDDD',
                theme: {
                    fill: '#505053'
                }
            }
        },

        // scroll charts
        rangeSelector: {
            buttonTheme: {
                fill: '#505053',
                stroke: '#000000',
                style: {
                    color: '#CCC'
                },
                states: {
                    hover: {
                        fill: '#707073',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    },
                    select: {
                        fill: '#000003',
                        stroke: '#000000',
                        style: {
                            color: 'white'
                        }
                    }
                }
            },
            inputBoxBorderColor: '#505053',
            inputStyle: {
                backgroundColor: '#333',
                color: 'silver'
            },
            labelStyle: {
                color: 'silver'
            }
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },

        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        },
        global: {
            useUTC: false
        },
        // special colors for some of the
        legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
        background2: '#505053',
        dataLabelsColor: '#B0B0B3',
        textColor: '#C0C0C0',
        contrastTextColor: '#F0F0F3',
        maskColor: 'rgba(255,255,255,0.3)'
    };
    // Apply the theme
    Highcharts.setOptions(Highcharts.theme);

    chartTemp = new Highcharts.Chart({
        chart: {
            renderTo: 'chartTemp',
            defaultSeriesType: 'spline',
            events: {
                load: function () {

                    var series = this.series[0],
                        shift = series.data.length > 10;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = param.getTemp();
                        series.addPoint([x, y], true, shift);
                    }, 1000);
                }
            }
        },
        title: {
            text: '<p class="display-3" style="letter-spacing: 3px; font-size:16px;">Temperature</p>'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            crosshair: true,
            maxZoom: 20 * 1000,
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            crosshair: true,
            title: {
                text: 'Celcius',
                margin: 5
            }
        },
        tooltip: {
            valueSuffix: '°',
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x: %H:%M:%S}<br>{point.y}'
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            type: 'area',
            name: 'Temperature',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: param.getTemp(),
                    });
                }
                return data;
            }())
        }]
    });

    chartHumid = new Highcharts.Chart({
        chart: {
            renderTo: 'chartHumid',
            defaultSeriesType: 'spline',
            events: {
                load: function () {

                    var series = this.series[0],
                        shift = series.data.length > 10;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = param.getHumid();
                        series.addPoint([x, y], true, shift);
                    }, 1000);
                }
            }
        },
        title: {
            text: '<p class="display-3" style="letter-spacing: 3px; font-size:16px;">Humidity</p>'
        },
        xAxis: {
            type: 'datetime',
            tickPixelInterval: 150,
            crosshair: true,
            maxZoom: 20 * 1000,
        },
        yAxis: {
            minPadding: 0.2,
            maxPadding: 0.2,
            crosshair: true,
            title: {
                text: 'RH',
                margin: 5
            }
        },
        tooltip: {
            valueSuffix: '%',
            headerFormat: '<b>{series.name}</b><br/>',
            pointFormat: '{point.x: %H:%M:%S}<br>{point.y}'
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },
        series: [{
            name: 'Humidity',
            color: '#CDDC39',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: param.getHumid()
                    });
                }
                return data;
            }())
        }]
    });
});