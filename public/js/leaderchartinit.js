var leaderboard = c3.generate({
    bindto: '#leaderChart',
    data: {
            json:{},
            type:'bar'
        },
    axis:{
        rotated:'true',
        x: {
        	label: 'Friends'
        }, 
        y: {
        	label: 'Average gallons'
        }
    }
});