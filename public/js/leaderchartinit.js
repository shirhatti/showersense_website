var leaderboard = c3.generate({
    bindto: '#leaderChart',
    data: {
        json:{},
        x:'x',
        type:'bar'
    },
    axis:{
        rotated:'true',
        x: {
            type: 'category'
        }, 
        y: {
        	label: 'Average gallons'
        }
    }
});