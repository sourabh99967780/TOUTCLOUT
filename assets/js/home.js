$(".menu-opener").click(function () {
  $(".menu-opener, .menu-opener-inner, .menu").toggleClass("active");
  if ($("body,html").hasClass("overhide")) {
    $("body,html").removeClass("overhide");
  } else {
    $("body,html").addClass("overhide");
  }
});

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

var textLetterAnimation = anime({
  targets: ".home_content_title .letter",
  opacity: [0, 1],
  easing: animationEasing,
  duration: 2250,
  delay: (el, i) => 150 * (i + 12),
});

homePageOpeningAnimation
  .add({
    targets: ".left_img, .right_img",
    delay: 16000,
    duration: 3000,
    opacity: [0, 1],
  })
  .add({
    targets: ".menu-logo",
    opacity: [0, 1],
    translateY: ["-100%", 0],
    duration: 3000,
  });

var fontColorAnimationTimeline = anime.timeline({
  easing: "easeOutExpo",
  duration: 10000,
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

var homePageOpacity = anime({
  targets: ".home_page",
  opacity: [0, 1],
  duration: 2000,
  easing: "easeInExpo",
});

var discoverVideoHide = anime({
  targets: ".discover_video",
  opacity: [1, 0],
  duration: 3000,
  delay: 12000,
  easing: "easeOutExpo",
});

// bring the video in the frame
var homePageVideo = document.querySelector(".half-part_video");
setTimeout(() => {
  homePageVideo.play();
}, 7000);

// remove the video after its work is done
setTimeout(() => {
  homePageVideo.classList.add("half-part_video--hidden");
}, 22000);

// convert the part idea to italics
var home_content_title = document.querySelector(".home_content_title");

var italicised_string = `<span class="letter" style="opacity: 1;">G</span><span class="letter" style="opacity: 1;">r</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span><span class="letter" style="opacity: 1;">t</span> <i><span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">d</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span></i> <span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">s</span> <span class="letter" style="opacity: 1;">y</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">t</span> <span class="letter" style="opacity: 1;">t</span><span class="letter" style="opacity: 1;">o</span> <span class="letter" style="opacity: 1;">b</span><span class="letter" style="opacity: 1;">e</span>`;

setTimeout(() => {
  home_content_title.innerHTML = italicised_string;
}, 16000);

// setTimeout(() => {
//   var home_content_lineopener = document.querySelector('.home_content_lineopener');
//   home_content_lineopener.classList.remove('home_content_lineopener--squiggle');
//   home_content_lineopener.classList.add('home_content_lineopener--straight');
// }, 2500)

// control animations on page load
$(document).ready(() => {
  homePageOpeningAnimation.play();
  homePageOpacity.play();
  textLetterAnimation.play();
  discoverVideoHide.play();
  fontColorAnimationTimeline.play();
});
