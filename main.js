const fadeSpeed = 1500;
let cc = 0;

const p1 = ["My grandpa, upon learning my dad's decision, took an overnight bus and surprised him at his dorm; ", "asked him not to go.<br><br>", "The ticket sat voided in his drawer. ", "600 miles away, thousands of students and educators settled in encampments, ", "began a month-long mass hunger strike."];

const p2 = ["He asked me if things are serious,", " if I showed up.<br>", " I said yes, and told him the protesters at NYU have been principled, ", "peaceful yet determined. And elsewhere—", "comrades are creative, ", "fearless, ", "unrelenting."];

const p3 = [" or even, outright censored... ", "they will always be worthwhile, ", "and reveberate through time, ", "geographies, ", "people. <br><br>", "To my student years.<br>", "To always showing up for our interconnected struggles.<br>", "To the people of Palestine, ", "and freedom fighters of the world."];

const imageMap = {
    "regret.jpg": '"We only regret that we each have but one life to lose for our people"',
    "victory.jpg": '"Victory belongs to us forever!"',
    "people-alone.jpg": '"The people and the people alone are the motive of world history"',
    "renda.jpg": '"Teachers and workers at Renmin University join the petition"',
    "hunger.jpeg": '"On Hunger Strike"',
    "teacher.jpg": 'From a teacher: "if you want to kill the students, kill me first"',
    "square.webp": 'Each flag represents a department from a university in Beijing'
};

const palestineMap = {
    "father.PNG": "Father supporting daughter at the USC encampment, with his father",
    "library.jpg": "The Refaat Alareer Memorial Library at Yale encampment",
    "cal.JPG": "At Cal Poly Humboldt, students completely barricaded the building from cops",
    "columbia.jpg": "Columbia faculty walkout in solidarity with students",
    "nyufaculty.jpg": "NYU faculty forming a chain to protect students at the encampment",
    "sprinkler.jpg": "15L water bottle on a sprinkler—universities turned on sprinklers to disrupt student protests",
    "mit.jpg": "every tent at MIT encampment is named after a city in Palestine",
    "second.jpg": "The second NYU encampment at 181 Mercer, after the first encampment was removed and wall constructed outside of Stern"
}

let scene = 0;
let settings = [
    { id: 'stack', photoId: 'photos', map: imageMap, cssClass: 'tam' },
    { id: 'album', photoId: 'photos2', map: palestineMap, cssClass: 'college' }
];

function randomNum(min, max) {
    let range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

function story(arr, id) {
    $(document).off('click', story);

    if (cc === arr.length) {
        cc = 0;
        if (scene < 2) addPhotos(...Object.values(settings[scene++]));
        else if (scene === 2) {
            window.open(`readings.html`, '_blank', `popup,location,status,scrollbars,resizable,alwaysRaised,width=1000,height=450,top=100,left=200`);
        }
    } else {
        let div = $(`#${id}`);
        let text = $('<span>').hide().html(arr[cc++]);
        div.append(text);
        text.fadeIn(fadeSpeed);

        $(document).one("click", () => story(arr, id));
    }
}

function addPhotos(id, photoId, map, cssClass) {
    $(`#${id}`).css('visibility', 'visible');
    const paths = Object.keys(map);

    function fadeInImage(i, paths) {
        if (i >= paths.length) return;

        const path = `photos/${paths[i]}`;
        const altText = map[paths[i]];
        $('<img>', { src: path, alt: altText }).on('load', function () {
            const position = this.height > this.width ?
                { left: randomNum(100, 300), top: randomNum(0, 50) } :
                { left: randomNum(0, 50), top: randomNum(0, 50) };
            $(this).addClass(cssClass).css({
                display: 'none',
                position: 'absolute',
                left: `${position.left}px`,
                top: `${position.top}px`,
                transform: `rotate(${randomNum(-10, 10)}deg)`,
                boxShadow: '3px 3px 2px 0px rgba(0,0,0,0.1)'
            }).appendTo(`#${photoId}`).fadeIn(fadeSpeed, () => fadeInImage(i + 1, paths));
        });
    }

    fadeInImage(0, paths);
}

$(document).ready(function () {
    alert("🍉 please enable pop up windows—best viewed in chrome 🍉");

    $.get('background.txt', function (data) {
        $('#background').html(data);
    }).fail(function (error) {
        console.error('Error loading the text file:', error);
    });

    $("#begin").off("click").one("click", () => {
        $("#dig").fadeOut(fadeSpeed);
        $("#begin").fadeOut(fadeSpeed, () => {
            $("#begin, #dig").remove();
            $("#story").css('visibility', 'visible').hide().fadeIn(fadeSpeed);
            $("#begin").off('click');
            $(document).one('click', () => story(p1, 'story'));
        });
    });

    $(document).on('mouseenter mouseleave', '.tam, .college', function (event) {
        let altText = event.type === 'mouseenter' ? $(this).attr('alt') : '';
        let id = $(this).hasClass('tam') ? '#caption' : '#caption2';
        $(id).hide().text(altText).fadeIn(fadeSpeed / 2);
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

    let player = new Vimeo.Player('vimeo', {
        // Hides the progress bar while the video is playing
        controls: false
    });
    player.on('loaded', function () {
        player.setCurrentTime(512);
    });

    $(document).on('click', '.college', function () {
        $(this).fadeOut(fadeSpeed, function () {
            $(this).remove();
            if ($('.college').length === 0) {
                $('#now').fadeOut(fadeSpeed);
                $('#album').fadeOut(fadeSpeed, function () {
                    $(this).remove();
                    $("#vimeo").css('visibility', 'visible').hide().fadeIn(fadeSpeed, () => player.play());
                    $("#background").css('visibility', 'visible').hide().fadeIn(fadeSpeed);
                    setTimeout(function () {
                        $("#shovel").css({
                            'visibility': 'visible',
                            'pointer-events': 'all'
                        }).hide().fadeIn(fadeSpeed);
                    }, 64000);
                });
            }
        });
    });

    $(document).on('click', '#shovel', function () {
        let divs = ['#shovel', '#vimeo', '#background'];
        for (const div of divs) {
            $(div).fadeOut(fadeSpeed, function () {
                $(this).remove();
            });
        }
        $('#conclusion').css('visibility', 'visible').hide().fadeIn(fadeSpeed);
        $('#olive').css('visibility', 'visible').hide().fadeIn(fadeSpeed);
        $(document).one('click', () => story(p3, 'conclusion'));
    });
});