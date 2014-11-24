var leaderboard = c3.generate({
    bindto: '#leaderChart',
    data: {
            columns: [],
            x:'x',
            type:'bar'
        },
    axis:{
        rotated:'true',
        x: { 
            type: 'category',
            label: 'Friends',
            tick: { 
                 values: [''],
                 format: 'Friends'

            }
        },
        y: { 
            labels:{
                format: function (v, id, i) { return "Default Format"; },
            },
            label: 'Average Gallons',
            tick: {format: d3.format('.2f')}
        }
    }
});