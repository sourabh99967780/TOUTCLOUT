function aos_init() {
  AOS.init({
    duration: 1000,
    once: true,
  });
}
$(window).on("load", function () {
  aos_init();
});

// check if it is a mobile screen
function checkIfItIsMobile() {
  if (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(max-width: 1024px)").matches
  ) {
    return true;
  }
  return false;
}
const isAMobileDevice = checkIfItIsMobile();

if (isAMobileDevice) {
  const innerCursor = document.querySelector(".cursor--small");
  const cursorCanvas = document.querySelector(".cursor--canvas");
  innerCursor.style.display = "none";
  cursorCanvas.style.display = "none";
}

// fetch the required web page elements
var hamburgerMenu = document.querySelector(".hamburger__menu");
var hamburgerMenuButton = document.querySelector("#btnHamburger");
var upperBurger = document.querySelector(".upperBurger");
var lowerBurgerFirstHalf = document.querySelector(".lowerBurger__firstHalf");
var lowerBurgerSecondHalf = document.querySelector(".lowerBurger__secondHalf");
var lowerBurgerThirdHalf = document.querySelector(".lowerBurger__thirdHalf");

// handle click event on hamburger menu
hamburgerMenu.addEventListener("click", function () {
  hamburgerMenuButton.classList.toggle("menu__active");
  upperBurger.style.width = "26px";
  $(".menu").toggleClass("active");
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

// sroll to top button
//Get the button
var mybutton = document.getElementById("backToTop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
