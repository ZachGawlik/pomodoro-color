$(function() {
    var WORK_PERIOD = 25 * 60;
    var BREAK_PERIOD = 5 * 60;
    var isBreak = false;
    var isPaused = false;
    var timer = WORK_PERIOD;
    var maxTime = WORK_PERIOD;
    var $time = $('#time');
    var $color = $('#color');

    function updateProgressbar() {
        $('#progressbar').width(100 * timer / maxTime + '%');
    }

    function humanizeTimer() {
        var seconds = timer % 60;
        var minutes = (timer - seconds) / 60;
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }
        return {minutes: minutes, seconds: seconds}
    }

    function updateDisplayTime(remaining) {
        $time.text(remaining.minutes + ' : ' + remaining.seconds);
    }

    function updateDisplayColor(remaining) {
        leadHex = isBreak ? '#BB' : '#00';
        hex = leadHex + remaining.minutes + remaining.seconds; 
        $color.text(hex);
        $('body').css('background-color', hex);
    }

    var prev = new Date();
    function updateTime() {
        var now = new Date();
        timer -= Math.round((now - prev) / 1000);
        remaining = humanizeTimer(timer)

        updateDisplayTime(remaining);
        updateDisplayColor(remaining);
        updateProgressbar();
        prev = new Date();
    }

    $('body').click(function() {
        isPaused = !isPaused;
        if (!isPaused) {
            prev = new Date();
        }
        $('.pause-text').toggle();
        $('.text').toggle();
    });

    var startTime = new Date();
    setInterval(function() {
        if (isPaused) return;
        if (timer <= 0) {
            isBreak = !isBreak;
            maxTime = isBreak ? BREAK_PERIOD : WORK_PERIOD;
            timer = maxTime;
            document.title = isBreak ? 'BREAK' : 'Pomodoro';
        }
        updateTime();
    }, 1000);
});
