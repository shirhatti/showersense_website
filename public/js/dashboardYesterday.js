$(document).ready(function() {
    $.getJSON('../api/summary/daily',{"pastDays":"2"})
    .done(function(data){
        console.log('hi');
        var distMap = {};
        var durMap = {};
        console.log(data);
        $.each( data[0].summary, function( index, value ){
            distMap[value.activity] = value.distance+1000;
            durMap[value.activity] = value.duration;
        });
        if (isNaN(distMap['walking'])) {
            var distWalk = 1000;
            var durWalk = 0;
        } else {
            var distWalk = distMap['walking'];
            var durWalk = durMap['walking']
        }
        console.log(distWalk);
        if (isNaN(distMap['cycling'])) {
            var distCycle = 1000;
            var durCycle = 0;
        } else {
            var distCycle = distMap['cycling'];
            var durCycle = durMap['cycling']
        }
        if (isNaN(distMap['running'])) {
            var distRun = 1000;
            var durRun =0;
        } else {
            var distRun = distMap['running'];
            var durRun = durMap['running'];
        }



        $("#distWalk").text( ((distWalk-1000)/1610).toFixed(2) + " mi");
        $("#distRun").text( ((distRun-1000)/1610).toFixed(2) + " mi");
        $("#distCycle").text( ((distCycle-1000)/1610).toFixed(2) + " mi");

        $("#durWalk").text( (durWalk/60).toFixed(0) + " mins " + (durWalk%60) + " s");
        $("#durRun").text( (durRun/60).toFixed(0) + " mins " + (durRun%60) + " s");
        $("#durCycle").text( (durCycle/60).toFixed(0) + " min " + (durCycle%60) + " s");

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