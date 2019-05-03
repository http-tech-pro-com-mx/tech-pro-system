let configChart = {
    chart: {
        type: 'column',
        height: null, 
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
        categories: ['Registros'],
        labels: {
            style: {
                color: '#000'
            }
        }
    },
    tooltip: {
        valueDecimals: 0
    },
    yAxis: {
        title: {
            text: 'Check in'
        },
        labels: {
            style: {
                color: '#000',
            }
        },
        allowDecimals: false
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 45,
        floating: true,
        backgroundColor: 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                color: '#000000',
                inside: false,
                format: '{point.y}'
            }
        },
        bar:{
            depth: 75
        }
    },
    series: []
};



export {
    configChart
}