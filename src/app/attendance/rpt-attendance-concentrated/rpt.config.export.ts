let configChart = {
    chart: {
        type: 'column',
        height: null
    },
    credits: {
        enabled: false
    },
    exporting: {
        enabled: true
    },
    title: {
        text: '',
        style: {
            color: '#000'
        }
    },
    subtitle: {
        text: '',
        style: {
            color: '#000'
        }
    },
    xAxis: {
        categories: [],
        labels: {
            style: {
                color: '#000'
            }
        }
    },
    yAxis: {
        max: undefined,
        allowDecimals: false,
        tickInterval: 1,
        title: {
            text: ' Registros '
        },
        labels: {
            style: {
                color: '#000000',
            },
            formatter: function () {
                return this.value + '';
            }
        }

    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: false,
                color: '#FFFFFF',
                inside: true,
                format: '{point.y}'
                // y: 10,
                // distance: -10
            },
            events: {
                legendItemClick: function () {
                    return false;
                }
            }
        },
        column: {
            stacking: 'normal'
        },
        line: {
            marker: {
                enabled: false
            }
        }
    },
    tooltip: {
        headerFormat: '<b>{point.x}</b><br/>',
        valueDecimals: 0
    },
    series: [],
};

export {
    configChart
}