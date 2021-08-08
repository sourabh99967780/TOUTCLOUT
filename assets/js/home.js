$(".menu-opener").click(function () {
  $(".menu-opener, .menu-opener-inner, .menu").toggleClass("active");
});

// animation
// document on load
// define page element delays

//animation for line opener
var homePageOpeningAnimation = anime.timeline({
  easing: "easeOutExpo",
  duration: 1000,
});

// text animation for home page title
var textWrapper = document.querySelector(".home_content_title");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

var animationEasing = "cubicBezier(.5, .05, .1, .3)";

$(document).ready(() => {
  anime.timeline().add({
    targets: ".home_content_title .letter",
    opacity: [0, 1],
    easing: animationEasing,
    duration: 2250,
    delay: (el, i) => 150 * (i + 12),
  });
});

$(document).ready(() => {
  homePageOpeningAnimation
    .add({
      targets: ".home_content_lineopener",
      easing: "easeInOutSine",
      top: {
        value: ["50vh", "25vh"],
        duration: 1000,
        delay: 2000,
      },
      delay: 1000,
    })
    .add({
      targets: ".home_content_lineopener",
      opacity: [1, 0],
    })
    .add({
      targets: ".left_img",
      delay: 3500,
      opacity: [0, 1],
    })
    .add({
      targets: ".right_img",
      opacity: [0, 1],
    })
    .add({
      targets: ".menu-logo",
      opacity: [0, 1],
      translateY: ["-100%", 0],
    })
    .add({
      targets: ".home_page",
      // backgroundColor: ["rgb(0,0,0)", "rgb(72,76,80)"],
    });
});

$(document).ready(() => {
  var fontColorAnimationTimeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 1000,
  });

  fontColorAnimationTimeline.add({
    targets: ".home_content_title",
    color: "#DDD",
    delay: 6500,
  });
  fontColorAnimationTimeline.add({
    targets: ".home_content_subtitle",
    color: "#DDD",
  });

  anime({
    targets: ".home_page",
    opacity: [0, 1],
    duration: 1000,
    easing: animationEasing,
    delay: 3000,
  });

  anime({
    targets: ".discover_video",
    opacity: [1, 0],
    duration: 4000,
    delay: 3000,
    easing: animationEasing,
  });
});

// bring the video in the frame
var homePageVideo = document.querySelector(".half-part_video");
setTimeout(() => {
  homePageVideo.classList.remove("half-part_video--hidden");
}, 3000);

// remove the video after its work is done
setTimeout(() => {
  homePageVideo.classList.add("half-part_video--hidden");
}, 22000);

// convert the part idea to italics
var home_content_title = document.querySelector(".home_content_title");

var italicised_string = `<span class="letter" style="opacity: 1;">G</span><span class="letter" style="opacity: 1;">r</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span><span class="letter" style="opacity: 1;">t</span> <i><span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">d</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span></i> <span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">s</span> <span class="letter" style="opacity: 1;">y</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">t</span> <span class="letter" style="opacity: 1;">t</span><span class="letter" style="opacity: 1;">o</span> <span class="letter" style="opacity: 1;">b</span><span class="letter" style="opacity: 1;">e</span>`;

setTimeout(() => {
  home_content_title.innerHTML = italicised_string;
}, 6000);
