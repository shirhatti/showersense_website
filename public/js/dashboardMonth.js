$(document).ready(function() {
    $.getJSON('../api/summary/daily',{"pastDays":"30"})
    .done(function(data){

        
        var distWalk = 30000;
        var durWalk = 0;
        var distRun = 30000;
        var durRun = 0;
        var distCycle = 30000;
        var durCycle = 0;
        
        $.each( data, function(indexOut, valueOut){
            
            $.each(data[indexOut].summary, function( index, value ){

                if(value.activity=='walking'){
                    distWalk += value.distance;
                    durWalk += value.duration; 
                }else if(value.activity=='cycling'){
                    distCycle += value.distance;
                    durWalk += value.duration;
                }else if(value.activity=='running'){
                    distRun += value.distance;    
                    durRun += value.duration;
                }
            });

        });


        $("#distWalk").text( ((distWalk-30000)/1610).toFixed(2) + " mi");
        $("#distRun").text( ((distRun-30000)/1610).toFixed(2) + " mi");
        $("#distCycle").text( ((distCycle-30000)/1610).toFixed(2) + " mi");

        $("#durWalk").text( (durWalk/60).toFixed(0) + " mins " + (durWalk%60) + " s");
        $("#durRun").text( (durRun/60).toFixed(0) + " mins " + (durRun%60) + " s");
        $("#durCycle").text( (durCycle/60).toFixed(0) + " mins " + (durCycle%60) + " s");

        if(distWalk>distRun && distWalk>distCycle){
            pxWalk = 242;
            pxCycle = (distCycle*242)/distWalk;
            pxRun = (distRun*242)/distWalk;
        }else if(distRun>distWalk && distRun>distCycle){
            pxRun = 242;
            pxCycle = (distCycle*242)/distRun;
            pxWalk = (distWalk*242)/distRun;
        }else {
            pxCycle = 242;
            pxRun = (distRun*242)/distCycle;
            pxWalk = (distWalk*242)/distCycle;
        }
        $("#cycleCircle").css("width",pxRun).css("height",pxRun);
        $("#walkCircle").css("width",pxWalk).css("height",pxWalk);
        $("#runCircle").css("width",pxCycle).css("height",pxCycle);
    });
});


// [{
//     "date": "20130315",
//     "summary": [
//         {
//             "activity": "walking",
//             "group": "walking",
//             "duration": 2133,
//             "distance": 1847,
//             "steps": 2500,
//             "calories": 60
//         },
//         {
//             "activity": "running",
//             "group": "running",
//             "duration": 254,
//             "distance": 436,
//             "steps": 624,
//             "calories": 99
//         },
//         {
//             "activity": "cycling",
//             "group": "cycling",
//             "duration": 2688,
//             "distance": 4049,
//             "calories": 999
//         },
//         {
//             "activity": "transport",
//             "group": "transport",
//             "duration": 500,
//             "distance": 15000
//         },
//         {
//             "activity": "bus",
//             "group": "transport",
//             "duration": 600,
//             "distance": 10000
//         },
//         {
//             "activity": "underground",
//             "group": "transport",
//             "duration": 300,
//             "distance": 5000
//         },
//         {
//             "activity": "zumba",
//             "duration": 1200,
//             "calories": 500
//         }
//     ],
//     "caloriesIdle": 1785,
//     "lastUpdate": "20130317T121143Z"
// },
// {
//     "date": "20130316",
//     "summary": [
//         {
//             "activity": "walking",
//             "group": "walking",
//             "duration": 3333,
//             "distance": 2222,
//             "steps": 1999,
//             "calories": 120
//         },
//         {
//             "activity": "running",
//             "group": "running",
//             "duration": 123,
//             "distance": 345,
//             "steps": 456,
//             "calories": 60
//         }
//     ],
//     "caloriesIdle": 1785,
//     "lastUpdate": "20130317T121143Z"
// },
// {
//     "date": "20130317",
//     "summary": null,
//     "caloriesIdle": 1785
// }]

