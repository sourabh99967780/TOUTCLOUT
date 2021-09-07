// detech if it is a mobile browser
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

var hamburgerMenu = document.querySelector('#btnHamburger');
var upperBurger = document.querySelector('.upperBurger');
var lowerBurgerFirstHalf = document.querySelector('.lowerBurger__firstHalf');
var lowerBurgerSecondHalf = document.querySelector('.lowerBurger__secondHalf');
var lowerBurgerThirdHalf = document.querySelector('.lowerBurger__thirdHalf');

hamburgerMenu.addEventListener('click', function () {
  hamburgerMenu.classList.toggle('menu__active');
  upperBurger.style.width = "26px";
  lowerBurgerThirdHalf.classList.toggle('display-none');
  $('.menu').toggleClass("active");
});

hamburgerMenu.addEventListener('mouseover', function () {
  if (!window.mobileCheck()) {
    if (hamburgerMenu.classList.contains('menu__active')) {
      lowerBurgerFirstHalf.style.width = "8px";
      lowerBurgerSecondHalf.style.width = "2px";
      lowerBurgerThirdHalf.style.width = "8px";
    } else {
      upperBurger.style.width = "20px";
      lowerBurgerFirstHalf.style.width = "2px";
      lowerBurgerSecondHalf.style.width = "20px";
    }
  }
})

hamburgerMenu.addEventListener('mouseout', function () {
  if (!window.mobileCheck()) {
    if (hamburgerMenu.classList.contains('menu__active')) {
      lowerBurgerThirdHalf.style.width = "0px";
      lowerBurgerFirstHalf.style.width = "20px";
      lowerBurgerSecondHalf.style.width = "2px";
    } else {
      upperBurger.style.width = "26px";
      lowerBurgerFirstHalf.style.width = "20px";
      lowerBurgerSecondHalf.style.width = "2px";
    }
  }
})

// home page reference
var homePage = document.querySelector(".home_page");

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
  begin: function () {
    homePage.classList.remove("home_page--hidden");
  },
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
  if (document[hidden] && videoElement.style.display != 'none') {
    videoElement.play();
  }
}

if (typeof document.addEventListener === "undefined" || hidden === undefined) {
  console.log("This demo requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.");
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
