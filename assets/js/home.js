// check if it is a mobile screen
function checkIfItIsMobile() {
  if (window.matchMedia("(max-width: 767px)").matches) {
    return true;
  }
  return false;
}
const isAMobileDevice = checkIfItIsMobile();

var hamburgerMenu = document.querySelector("#btnHamburger");
var upperBurger = document.querySelector(".upperBurger");
var lowerBurgerFirstHalf = document.querySelector(".lowerBurger__firstHalf");
var lowerBurgerSecondHalf = document.querySelector(".lowerBurger__secondHalf");
var lowerBurgerThirdHalf = document.querySelector(".lowerBurger__thirdHalf");

var menuEmail = document.querySelector(".menu__email");

// handle click event on hamburger menu
hamburgerMenu.addEventListener("click", function () {
  hamburgerMenu.classList.toggle("menu__active");
  upperBurger.style.width = "26px";
  lowerBurgerThirdHalf.classList.toggle("display-none");
  $(".menu").toggleClass("active");
  $(".menu__email").toggleClass("menu__hidden");
});

if (!isAMobileDevice) {
  // handle hover event on hamburger menu
  hamburgerMenu.addEventListener("mouseover", function () {
    if (hamburgerMenu.classList.contains("menu__active")) {
        lowerBurgerFirstHalf.style.width = "8px";
        lowerBurgerSecondHalf.style.width = "2px";
        lowerBurgerThirdHalf.style.width = "8px";
    } else {
        upperBurger.style.width = "20px";
        lowerBurgerFirstHalf.style.width = "2px";
        lowerBurgerSecondHalf.style.width = "20px";
      }
  });

  // handle mouseout event on hamburger menu
  hamburgerMenu.addEventListener("mouseout", function () {
    if (hamburgerMenu.classList.contains("menu__active")) {
        lowerBurgerThirdHalf.style.width = "0px";
        lowerBurgerFirstHalf.style.width = "20px";
        lowerBurgerSecondHalf.style.width = "2px";
    } else {
        upperBurger.style.width = "26px";
        lowerBurgerFirstHalf.style.width = "20px";
        lowerBurgerSecondHalf.style.width = "2px";
      }
  });
}

var animationEasing = "cubicBezier(.5, .05, .1, .3)";

// home page reference
var homePage = document.querySelector(".home_page");

var homePageOpacity = anime({
  targets: ".home_page",
  opacity: [0, 1],
  duration: 2000,
  easing: "easeInExpo",
  begin: function () {
    homePage.classList.remove("home_page--hidden");
  },
});

// text animation for home page title
var textWrapper = document.querySelector(".home_content_title");
textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

var textLetterAnimation = anime({
  targets: ".home_content_title .letter",
  opacity: [0, 1],
  easing: animationEasing,
  duration: 2250,
  delay: (el, i) => 150 * (i + 12),
});

//animation for line opener
var homePageOpeningAnimation = anime.timeline({
  easing: "easeOutExpo",
  duration: 1000,
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

// play video even when the page is not in focus
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var videoElement = document.querySelector(".half-part_video");

function handleVisibilityChange() {
  if (document[hidden] && videoElement.style.display != "none") {
    videoElement.play();
  }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log(
    "This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API."
  );
} else {
  // Handle page visibility change
  document.addEventListener(visibilityChange, handleVisibilityChange, false);
}

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

// control animations on page load
$(document).ready(() => {
  homePageOpeningAnimation.play();
  homePageOpacity.play();
  textLetterAnimation.play();
  discoverVideoHide.play();
  fontColorAnimationTimeline.play();
});
