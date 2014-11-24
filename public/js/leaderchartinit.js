var leaderboard = c3.generate({
    bindto: '#leaderChart',
    data: {
            columns: [],
            x:'x',
            type:'bar'
        },
    axis:{
        rotated:'false',
        x: { 
            type: 'category',
            label: 'Friends',
            tick: { 
                 values: [''],
                 format: 'Friends'

            }
        },
        y: { 
            label: 'Average Gallons',
            tick: {format: d3.format('.2f')}
        }
    }
});