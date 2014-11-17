var usageChart = c3.generate({
    bindto: '#usageChart',
    data: {
        json:{},
        type:'line'
    },
    axis: {
        x: {
            label: 'Day'
            // ,
            // type: 'timeseries',
            // tick:{
            //     format: function (x) {return x.getDay(); }
            // }
        },
        y: {
            label: 'Gallons'
        }
    }
});