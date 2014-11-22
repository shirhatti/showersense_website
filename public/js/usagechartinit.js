var usageChart = c3.generate({
    bindto: '#usageChart',
    data: {
        json:{},
        x:'x',
        type:'line'
    },
    axis: {
        x: {
            label: 'Day',
            type: 'timeseries',
            tick:{
                format: function (x) {return ((x.getMonth()+1) + '/' + x.getDate()); }
            }
        },
        y: {
            label: 'Gallons'
        }
    }
});