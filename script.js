const cards = document.querySelectorAll(".card")
const card_container = document.querySelector(".card-container")
const education_read_progress = document.querySelector(".education").querySelector(".read-progression")
const work_read_progress = document.querySelector(".work-experience").querySelector(".read-progression")
const it_read_progress = document.querySelector(".it-skills").querySelector(".read-progression")
const lang_read_progress = document.querySelector(".languages").querySelector(".read-progression")
const hobby_read_progress = document.querySelector(".hobbies").querySelector(".read-progression")
const timepiece_container = document.querySelector(".timepiece-container")
const work_card_body = document.querySelector(".work-experience").querySelector(".card-body")

let enable_detection_page1 = true;
let enable_detection_page2 = true;
let enable_detection_page3 = true;
let enable_detection_page4 = true;
let enable_detection_page5 = true;

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        entry.target.classList.toggle("show", entry.isIntersecting)
    })
}, {
    threshold: 0.55,
})

cards.forEach(card => {
    observer.observe(card)
})


//scrolling enable/disable
function disableScroll(page) {
    console.log("DisableScroll")
    // if any scroll is attempted, set this to the previous value
    card_container.onscroll = function() {
        card_container.scrollTo(0, window.innerHeight*page);
    };

    card_container.onwheel = function (){
        card_container.scrollTo(0, window.innerHeight*page);
    }
}

function enableScroll() {
    console.log("EnableScroll")
    card_container.onscroll = function() {};
    card_container.onwheel = function () {};
}

function enableScrollWithPass() {
    console.log("EnableScrollWithPass")
    card_container.onscroll = function() {};
    card_container.onwheel = function () {};
    timepiece_container.onscroll = function() {
        card_container.scrollTo(0, card_container.scrollTop + window.innerHeight/70)
        timepiece_container.scrollTo(0, timepiece_container.scrollTop);
    }
    timepiece_container.onwheel = function() {
        card_container.scrollTo(0, card_container.scrollTop + window.innerHeight/70)
        timepiece_container.scrollTo(0, timepiece_container.scrollTop);
    }
}

function giveScroll() {
    console.log("giveScroll")
    card_container.onscroll = function () {
        timepiece_container.scrollTo(0, timepiece_container.scrollTop + window.innerHeight/70)
        card_container.scrollTo(0, window.innerHeight*2);
        let completion = (timepiece_container.scrollTop/timepiece_container.scrollHeight) * 160;
        work_read_progress.style.width = `${completion}%`;
        work_read_progress.style.transition = 'none';
    }

    card_container.onwheel = function () {
        timepiece_container.scrollTo(0, timepiece_container.scrollTop + window.innerHeight/70)
        card_container.scrollTo(0, window.innerHeight*2);
        let completion = (timepiece_container.scrollTop/timepiece_container.scrollHeight-100) * 160;
        work_read_progress.style.width = `${completion}%`;
        work_read_progress.style.transition = 'none';
    }

    timepiece_container.onscroll = function() {
        let completion = (timepiece_container.scrollTop/timepiece_container.scrollHeight) * 160;
        work_read_progress.style.width = `${completion}%`;
        work_read_progress.style.transition = 'none';
    }
    timepiece_container.onwheel = function() {
        let completion = (timepiece_container.scrollTop/timepiece_container.scrollHeight) * 160;
        work_read_progress.style.width = `${completion}%`;
        work_read_progress.style.transition = 'none';
    }
}


card_container.addEventListener("scroll", () => {
    const scrolled = card_container.scrollTop/(window.innerHeight);

    if (scrolled >= 0.98 && scrolled < 1.2 && enable_detection_page1) {
        card_container.scrollTo(0, window.innerHeight);
        disableScroll(1);
        enable_detection_page1 = false;
        education_read_progress.classList.toggle("completed");
        setTimeout(enableScroll, 5000);
    }

    if (scrolled >= 1.98 && scrolled < 2.2 && enable_detection_page2) {
        card_container.scrollTo(0, window.innerHeight*2);
        disableScroll(2);
        setTimeout(giveScroll, 1000);
        enable_detection_page2 = false;
    }

    if (scrolled >= 2.98 && scrolled < 3.2 && enable_detection_page3) {
        card_container.scrollTo(0, window.innerHeight*3);
        disableScroll(3);
        enable_detection_page3 = false;
        it_read_progress.classList.toggle("completed");
        setTimeout(enableScroll, 5000);
    }

    if (scrolled >= 3.98 && scrolled < 4.2 && enable_detection_page4) {
        card_container.scrollTo(0, window.innerHeight*4);
        disableScroll(4);
        enable_detection_page4 = false;
        lang_read_progress.classList.toggle("completed");
        setTimeout(enableScroll, 5000);
    }

    if (scrolled >= 4.98 && scrolled < 5.2 && enable_detection_page5) {
        card_container.scrollTo(0, window.innerHeight*5);
        disableScroll(5);
        enable_detection_page5 = false;
        hobby_read_progress.classList.toggle("completed");
        setTimeout(enableScroll, 5000);
    }

})


//wheel scrolling speed
function changeWheelSpeed(container, speedY) {
    var scrollY = 0;

    var handleScrollReset = function() {
        scrollY = container.scrollTop;
    };
    var handleMouseWheel = function(e) {
        e.preventDefault();
        scrollY += speedY * e.deltaY
        if (scrollY < 0) {
            scrollY = 0;
        } else {
            var limitY = container.scrollHeight - container.clientHeight;
            if (scrollY > limitY) {
                scrollY = limitY;
            }
        }
        container.scrollTop = scrollY;
    };

    container.addEventListener('mouseup', handleScrollReset, false);
    container.addEventListener('mousedown', handleScrollReset, false);
    container.addEventListener('mousewheel', handleMouseWheel, false);

    var removed = false;

    return function() {
        if (removed) {
            return;
        }

        container.removeEventListener('mouseup', handleScrollReset, false);
        container.removeEventListener('mousedown', handleScrollReset, false);
        container.removeEventListener('mousewheel', handleMouseWheel, false);

        removed = true;
    };
}

changeWheelSpeed(card_container, 0.2);  // 0.5 * default_scroll_speed - 2 times slower
changeWheelSpeed(timepiece_container, 0.2);  // 0.5 * default_scroll_speed - 2 times slower

// work observer
const work_observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        setTimeout(enableScrollWithPass, 2000);
        work_read_progress.style.width = '100%';
        work_observer.unobserve(document.getElementById("last"));
    }
}, {
    threshold: 1,
})

work_observer.observe(document.getElementById("last"));

timepiece_container.addEventListener("scroll", () => {
    let completion = (timepiece_container.scrollTop/timepiece_container.scrollHeight-100) * 160;
    work_read_progress.style.width = `${completion}%`;
    work_read_progress.style.transition = 'none';
})


window.addEventListener('resize', function(event) {
    if (window.innerWidth < 700){
        work_card_body.style.marginLeft = '0';
    } else {
        work_card_body.style.marginLeft = '15%';
    }
}, true);

// last_card_observer
const contact_observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        console.log("trigger")
        timepiece_container.onscroll = function() {};
        timepiece_container.onwheel = function () {};
        card_container.onscroll = function() {};
        card_container.onwheel = function () {};
        contact_observer.unobserve(document.querySelector(".contact"));
    }
}, {
    threshold: 1,
})

contact_observer.observe(document.querySelector(".contact"));