// check if it is a mobile screen
function checkIfItIsMobile() {
  if (window.matchMedia("(max-width: 767px)").matches || window.matchMedia("(max-width: 1024px)").matches) {
    return true;
  }
  return false;
}
const isAMobileDevice = checkIfItIsMobile();

var hamburgerMenu = document.querySelector(".hamburger__menu");
var hamburgerMenuButton = document.querySelector('#btnHamburger');
var upperBurger = document.querySelector(".upperBurger");
var lowerBurgerFirstHalf = document.querySelector(".lowerBurger__firstHalf");
var lowerBurgerSecondHalf = document.querySelector(".lowerBurger__secondHalf");
var lowerBurgerThirdHalf = document.querySelector(".lowerBurger__thirdHalf");
var homePageVideo = document.querySelector(".half-part_video");
var menuEmail = document.querySelector(".menu__email");
var homePage = document.querySelector(".home_page");
var textWrapper = document.querySelector(".home_content_title");
var home_content_title = document.querySelector(".home_content_title");

var animationEasing = "cubicBezier(.5, .05, .1, .3)";
var italicised_string = `<span class="letter" style="opacity: 1;">G</span><span class="letter" style="opacity: 1;">r</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span><span class="letter" style="opacity: 1;">t</span> <i><span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">d</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">a</span></i> <span class="letter" style="opacity: 1;">i</span><span class="letter" style="opacity: 1;">s</span> <span class="letter" style="opacity: 1;">y</span><span class="letter" style="opacity: 1;">e</span><span class="letter" style="opacity: 1;">t</span> <span class="letter" style="opacity: 1;">t</span><span class="letter" style="opacity: 1;">o</span> <span class="letter" style="opacity: 1;">b</span><span class="letter" style="opacity: 1;">e</span>`;

// handle click event on hamburger menu
hamburgerMenu.addEventListener("click", function () {
  hamburgerMenuButton.classList.toggle("menu__active");
  upperBurger.style.width = "26px";
  $(".menu").toggleClass("active");
  $(".menu__email").toggleClass("menu__hidden");
});

if (!isAMobileDevice) {
  // handle hover event on hamburger menu
  hamburgerMenu.addEventListener("mouseover", function () {
    if (hamburgerMenuButton.classList.contains("menu__active")) {
      upperBurger.style.width = "26px";
      lowerBurgerFirstHalf.style.width = "2px";
      lowerBurgerSecondHalf.style.width = "20px";
    } else {
      upperBurger.style.width = "20px";
      lowerBurgerFirstHalf.style.width = "2px";
      lowerBurgerSecondHalf.style.width = "20px";
    }
  });

  // handle mouseout event on hamburger menu
  hamburgerMenu.addEventListener("mouseout", function () {
    if (hamburgerMenuButton.classList.contains("menu__active")) {
      upperBurger.style.width = "26px";
      lowerBurgerFirstHalf.style.width = "20px";
      lowerBurgerSecondHalf.style.width = "2px";
    } else {
      upperBurger.style.width = "26px";
      lowerBurgerFirstHalf.style.width = "20px";
      lowerBurgerSecondHalf.style.width = "2px";
    }
  });
}

textWrapper.innerHTML = textWrapper.textContent.replace(
  /\S/g,
  "<span class='letter'>$&</span>"
);

async function homePageOpacityPromise() {
  var homePageOpacity = anime({
    targets: ".home_page",
    opacity: [0, 1],
    duration: 2000,
    easing: "easeInExpo",
    begin: function () {
      homePage.classList.remove("home_page--hidden");
    },
  });
  await Promise.resolve(homePageOpacity.finished);
}

async function textLetterAnimationPromise() {
  var textLetterAnimation = anime({
    targets: ".home_content_title .letter",
    opacity: [0, 1],
    easing: animationEasing,
    duration: 2250,
    delay: (el, i) => 150 * (i + 2),
  });
  await Promise.resolve(textLetterAnimation.finished);
}

async function homePageOpeningAnimationPromise() {
  //animation for line opener
  var homePageOpeningAnimation = anime.timeline({
    easing: "easeOutExpo",
  });
  homePageOpeningAnimation
    .add({
      targets: ".left_img, .right_img",
      duration: 3000,
      opacity: [0, 1],
    })
    .add({
      targets: ".menu-logo",
      opacity: [0, 1],
      translateY: ["-100%", 0],
      duration: 3000,
    });
  await Promise.resolve(homePageOpeningAnimation.finished);
}

async function discoverVideoHidePromise() {
  var discoverVideoHide = anime({
    targets: ".discover_video",
    opacity: [1, 0],
    duration: 3000,
    easing: "easeOutExpo",
  });
  await Promise.resolve(discoverVideoHide.finished);
}

async function fontColorAnimationPromise() {
  var fontColorAnimationTimeline = anime.timeline({
    easing: "easeOutExpo",
    duration: 10000,
  });
  fontColorAnimationTimeline.add({
    targets: ".home_content_title",
    color: "#DDD",
  });
  fontColorAnimationTimeline.add({
    targets: ".home_content_subtitle",
    color: "#DDD",
  });
  await Promise.resolve(fontColorAnimationTimeline.finished);
}

// animation master controller
homePageOpacityPromise().then(() => {
  textLetterAnimationPromise().then(() => {
    homePageVideo.play();
    setInterval(() => {
      const percentageCompletion = Math.round(
        (homePageVideo.currentTime / homePageVideo.duration) * 100
      );
      if (homePageVideo.paused && percentageCompletion != 100) {
        homePageVideo.play();
      }
      if (percentageCompletion === 38) {
        discoverVideoHidePromise().then(() => {
          homePageOpeningAnimationPromise().then(() => {
            fontColorAnimationPromise().then(() => {
              homePageVideo.classList.add("half-part_video--hidden");
            });
          });
          home_content_title.innerHTML = italicised_string;
        });
      }
    });
  });
});
