function aos_init() {
  AOS.init({
    duration: 1000,
    once: true,
  });
}
$(window).on("load", function () {
  aos_init();
});

$(function () {
  setNavigation();
})

// set footer menu color based on web url
function setNavigation() {
  var path = window.location.pathname;
  const menuName = path.split("/").pop();
  $('#footer .footer-top .footer-links a').each(function () {
    var href = $(this).attr('href');
    if (href === menuName) {
      $(this).addClass('active');
    }
  })
}

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
  $("body").toggleClass("no-scroll");
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

// check if it is the home page
const isItTheHomePage = !!document.querySelector(".home_page");
const isItContactUsPage = !!document.querySelector('.contact_us');

console.log("Is it contact us page", isItContactUsPage);
console.log("Is it home page", isItTheHomePage);

// highlight menu top when menu dropdown items are hovered
$('.menu-inner .dropdown .dropdown-item').mouseover(() => {
  if (isItContactUsPage) {
    document.querySelector('#what_we_do').style.color = '#262728';
  } else {
    document.querySelector('#what_we_do').style.color = '#eaad67';
  }
})

$('.menu-inner .dropdown .dropdown-item').mouseout(() => {
  if (isItTheHomePage || isItContactUsPage) {
    document.querySelector('#what_we_do').style.color = '#f7f7f7';
  } else {
    document.querySelector('#what_we_do').style.color = '#262728';
  }
})

// Also highlight what we do menu item based on route
function hightLightMenuItem() {
  var path = window.location.pathname;
  const menuName = path.split('/').pop();
  if (menuName === 'branding' || menuName === 'website_design' || menuName === 'digital') {
    document.querySelector('#what_we_do').style.color = '#eaad67';
    document.querySelector('.footer-what-we-do').style.color = '#eaad67';
  }
}

hightLightMenuItem();

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

// enquiry form open close trigger
$('.enquireForm__tab').click(() => {
  $('.enquireForm').toggleClass('enquireForm-open');
})
