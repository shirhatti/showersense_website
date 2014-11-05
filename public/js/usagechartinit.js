var usageChart = c3.generate({
    bindto: '#usageChart',
    data: {
        json:{},
        type:'line'
    },
    axis: {
        x: {
            label: 'Day'
        },
        y: {
            label: 'Gallons'
        }
    }
});