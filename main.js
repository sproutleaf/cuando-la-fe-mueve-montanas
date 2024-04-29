const fadeSpeed = 1500;
let cc = 0;

const p1 = ["My grandpa, upon learning my dad's decision, took an overnight bus and surprised him at his dorm; ", "asked him not to go.<br><br>", "The ticket sat voided in his drawer. ", "600 miles away, thousands of students and educators settled in encampments, ", "began a mass hunger strike."];

const p2 = ["He asked me if things are serious,", " if I showed up.", " I told him the students at NYU have been principled, ", "peaceful yet determined. And elsewhere—", "students are creative, ", "fearless, ", "unrelenting."];

const imageMap = {
    "regret.jpg": '"We only regret that we each have but one life to lose for our people"',
    "victory.jpg": '"Victory belongs to us forever!"',
    "people-alone.jpg": '"The people and the people alone are the motive of world history"',
    "renda.jpg": '"Teachers and workers at Renmin University join the petition"',
    "dance.jpg": "A young couple dancing amongst protesters at Tian'anmen Square",
    "teacher.jpg": 'From a teacher: "if you want to kill the students, kill me first"',
    "square.webp": 'Each flag represents a department from a university in Beijing'
};

function randomNum(min, max) {
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

function story(arr, id) {
    $(document).off('click', story);

    if (cc === arr.length) {
        cc = 0;
        addPhotos();
    } else {
        let div = $(`#${id}`);
        let text = $('<span>').hide().html(arr[cc++]);
        div.append(text);
        text.fadeIn(fadeSpeed);

        $(document).one("click", () => story(arr, id));
    }
}

function addPhotos() {
    $("#stack").css('visibility', 'visible');
    const paths = Object.keys(imageMap);

    function fadeInImage(i, paths) {
        if (i >= paths.length) return;

        const path = `photos/${paths[i]}`;
        const altText = imageMap[paths[i]];
        $('<img>', { src: path, alt: altText }).on('load', function () {
            const position = this.height > this.width ?
                { left: randomNum(100, 300), top: randomNum(0, 50) } :
                { left: randomNum(0, 50), top: randomNum(0, 50) };
            $(this).addClass('tam').css({
                display: 'none',
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                transform: `rotate(${randomNum(-10, 10)}deg)`,
                boxShadow: '3px 3px 2px 0px rgba(0,0,0,0.1)'
            }).appendTo('#photos').fadeIn(fadeSpeed, () => fadeInImage(i + 1, paths));
        });
    }

    fadeInImage(0, paths);
}

$(document).ready(function () {
    $("#begin").off("click").one("click", () => {
        $("#dig").fadeOut(fadeSpeed);
        $("#begin").fadeOut(fadeSpeed, () => {
            $("#begin, #dig").remove();
            $("#story").css('visibility', 'visible').hide().fadeIn(fadeSpeed);
            $("#begin").off('click');
            $(document).one('click', () => story(p1, 'story'));
        });
    });

    $(document).on('mouseenter mouseleave', '.tam', function (event) {
        let altText = event.type === 'mouseenter' ? $(this).attr('alt') : '';
        $('#caption').hide().text(altText).fadeIn(fadeSpeed / 2);
        let top = parseInt($(this).css('top'), 10);
        $(this).css('top', `${top + (event.type === 'mouseenter' ? -10 : 10)}px`);
    });

    $(document).on('click', '.tam', function () {
        $(this).fadeOut(fadeSpeed, function () {
            $(this).remove();
            if ($('.tam').length === 0) {
                $('#story').fadeOut(fadeSpeed);
                $('#stack').fadeOut(fadeSpeed, function () {
                    $(this).remove();
                    $("#now").css('visibility', 'visible').hide().fadeIn(fadeSpeed);
                    $(document).one('click', () => story(p2, 'now'));
                });
            }
        });
    });
});
