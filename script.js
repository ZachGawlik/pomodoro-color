$(function() {
    var WORK_PERIOD = 25 * 60;
    var BREAK_PERIOD = 5 * 60;
    var isBreak = false;
    var isPaused = false;
    var minutes, seconds, leadHex, hex;
    var timer = WORK_PERIOD;
    var maxTime = WORK_PERIOD;
    var $time = $('#time');
    var $color = $('#color');

    function updateProgressbar() {
        $('#progressbar').width(100 * timer / maxTime + '%');
    }

    function updateTime() {
        seconds = timer % 60;
        minutes = (timer - seconds) / 60;

        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        leadHex = isBreak ? '#BB' : '#00';
        hex = leadHex + minutes + seconds; 

        updateProgressbar();
        
        $color.text(hex);
        $time.text(minutes + ' : ' + seconds);
        $('body').css('background-color', hex);

        timer -= 1;
    }

    $('body').click(function() {
        isPaused = !isPaused;
        $('.pause-text').toggle();
        $('.text').toggle();
    });

    setInterval(function() {
        if (isPaused) return;
        if (!timer) {
            isBreak = !isBreak;
            maxTime = isBreak ? BREAK_PERIOD : WORK_PERIOD;
            timer = maxTime;
        }
        updateTime();
    }, 1000);
});
