const fadeSpeed = 1500;
let cc = 0;

const p = ["My grandpa, upon learning my dad's decision,", " took an overnight bus and surprised him at his dorm; ", "told him not to go.<br><br>", "The ticket sat voided in his drawer. ", "600 miles away, thousands of students and educators settled in encampments, ", "began a mass hunger strike."];
const paths = ["victory.jpg", "square.webp", "people-alone.jpg", "renda.jpg", "dance.jpg", "teacher.jpg", "regret.jpg"];

function randomNum(min, max) {
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

function tiananmen() {
    $(document).off('click', tiananmen);

    if (cc === p.length) {
        console.log("moving on");
        addPhotos();
    } else {
        let div = $("#story");
        let text = $('<span>').hide().html(p[cc++]);
        console.log(text);
        div.append(text);
        text.fadeIn(fadeSpeed);

        $(document).on("click", tiananmen);
    }
}

function addPhotos() {
    let div = $("#photos");
    div.css('visibility', 'visible');

    function fadeInImage(i) {
        if (i < paths.length) {
            const path = "photos/" + paths[i];
            console.log(path);
            const img = $('<img>').attr('src', path).on('load', function () {
                const left = this.height > this.width ? randomNum(100, 400) :
                    randomNum(0, 50);
                const top = randomNum(0, 50);
                const rotation = randomNum(-10, 10);
                $(this).addClass('tam').css({
                    'display': 'none',
                    'position': 'absolute',
                    'left': `${left}px`,
                    'top': `${top}px`,
                    'transform': `rotate(${rotation}deg)`,
                    'box-shadow': '5px 5px 3px 0px rgba(0,0,0,0.25)'
                });
                $("#photos").append(this);
                $(this).fadeIn(fadeSpeed, function () {
                    fadeInImage(i + 1);
                });
            });
        }
    }

    fadeInImage(0);
}

$(document).ready(function () {
    $("#begin").click(() => $("#begin, #dig").fadeOut(fadeSpeed, () => {
        $("#begin, #dig").remove();
        $("#story").css('visibility', 'visible').hide().fadeIn(fadeSpeed);
        $("#begin").off('click');
        $(document).on('click', tiananmen);
    }));
});
