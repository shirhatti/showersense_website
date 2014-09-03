
    $(document).ready(function(){
        $('#start').click(function(){
            $('html, body').animate({
                scrollTop: $("#getStarted").offset().top
            }, 500);
        });
    });