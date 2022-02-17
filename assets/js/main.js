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
  $('.enquireForm').toggleClass('form-open');
  const isFormOpen = $('.enquireForm').hasClass('form-open');
  if (isFormOpen) {
    $('.enquireForm__tab-icon').addClass('enquireForm__tab-icon-rotate');
  } else {
    setTimeout(() => {
      $('.enquireForm__tab-icon').removeClass('enquireForm__tab-icon-rotate');
    }, 1700);
  }
})

// handle the function of enquire Form
if (!isItContactUsPage) {
  const baseUrl = "http://3.145.21.71:81/api";
  Vue.use(window.vuelidate.default);
  const { required, minLength, maxLength, email } = window.validators;

  function isAPhoneNumber(phone) {
    const match =
      /^\+?\d{0,3}[\(\- ]?\d{3}\)?[\- ]?\d{3,4}[\- ]?\d{4}/.test(phone);
    return match;
  }

  var vueApp = new Vue({
    el: '#enquireForm__form',
    directives: { focus: focus },
    data() {
      return {
        name: "",
        message: "",
        email: "",
        phone: "",
        emailSending: false,
        submitStatus: "",
        isElementFocused: {
          name: false,
          email: false,
          phone: false,
          message: false
        },
        areAnyElementsHovered: false,
      }
    },

    validations: {
      name: {
        required,
        minLength: minLength(3),
      },
      message: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(10000),
      },
      email: {
        required,
        maxLength: maxLength(320),
        email,
      },
      phone: {
        required,
        isAPhoneNumber
      },
    },

    methods: {
      resetForm() {
        this.name = "",
        this.message = "";
        this.email = "";
        this.phone = "";
        this.emailSending = false;
        this.submitStatus = "";
        this.isElementFocused.name = false;
        this.isElementFocused.email = false;
        this.isElementFocused.phone = false;
        this.isElementFocused.message = false;
        this.areAnyElementsHovered = false;
      },

      async saveToDatabase() {
        const data = {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        };

        const response = await fetch(`${baseUrl}/db/insert-enquiry`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
      },

       async sendEmail() {
        const data = {
          name: this.name,
          email: this.email,
          message: this.message,
          phone: this.phone,
        };
        const response = await fetch(`${baseUrl}/email`, {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          mode: "cors", // no-cors, *cors, same-origin
          cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
          credentials: "same-origin", // include, *same-origin, omit
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
          body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
      },
       
      async submit() {
        this.$v.$touch();
        if (this.$v.$invalid || !this.$v.phone.isAPhoneNumber) {
          const invalidFields = Object.keys(this.$v.$params).filter(fieldName => this.$v[fieldName].$invalid);
          invalidFields.forEach(field => {
            this.isElementFocused['name'] = true;
            this.isElementFocused['message'] = true;
            this.isElementFocused['phone'] = true;
            this.isElementFocused['email'] = true;
            document.querySelector(`.${field}-error`).classList.remove('shake');
            setTimeout(() => {
              document.querySelector(`.${field}-error`).classList.add('shake');
            }, 100)
          })
          this.submitStatus = "ERROR";
        } else {
          // do your submit logic here
          this.emailSending = true;
          this.submitStatus = "PENDING";
          await this.saveToDatabase();
          await this.sendEmail();
          this.submitStatus = "OK";
          this.emailSending = false;
        }
      },
    },

    watch: {
      areAnyElementsHovered(newValue, oldValue) {
        document.querySelectorAll('.cursor').forEach(elem => {
          elem.classList.toggle('display-none', newValue);
        })
      }
    },
  })
}
