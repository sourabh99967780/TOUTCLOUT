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

// handle touch events on mobile and tablet
function mobileTouchHandler() {
  const flipperElements = document.querySelectorAll('.flipper');
  flipperElements.forEach(flipElement => {
    flipElement.addEventListener('touchstart', () => {
      const classAttached = flipElement.children[0].classList;
      const isFlipped = classAttached.contains('flip-transform');
      if (isFlipped) {
        flipElement.children[0].classList.remove('flip-transform');
      } else {
        flipElement.children[0].classList.add('flip-transform');
      }
    })
  })
}
document.addEventListener("DOMContentLoaded", mobileTouchHandler);

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
  $('.enquireForm').toggleClass('display-none');
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
  if (document.body.scrollTop > 120 || document.documentElement.scrollTop > 120) {
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

function openEnquireForm() {
  const enquireFormElement = document.querySelector('.enquireForm');
  enquireFormElement.style.transform = `translateY(0px)`;
}

function closeEnquireForm() {
  const enquireFormElement = document.querySelector('.enquireForm');
  const enquireFormTabElement = document.querySelector('.enquireForm__tab');

  const enquireFormTabHeight = enquireFormTabElement.offsetHeight;
  const enquireFormOffsetHeight = enquireFormElement.offsetHeight;
  enquireFormElement.style.transform = `translateY(${enquireFormOffsetHeight - enquireFormTabHeight}px)`;
}

// enquiry form open close trigger
let counter = 0;
$('.enquireForm__tab').click(() => {
  $('.enquireForm').toggleClass('form-open');
  if (counter === 0) {
    document.querySelector('.enquireForm__form').style.maxHeight = '530px';
  } else {
    document.querySelector('.enquireForm__form').style.maxHeight = 'unset';
  }
  const isFormOpen = $('.enquireForm').hasClass('form-open');
  if (isFormOpen) {
    openEnquireForm();
    $('.enquireForm__tab-icon').addClass('enquireForm__tab-icon-rotate');
  } else {
    closeEnquireForm();
    $('.enquireForm__tab-icon').removeClass('enquireForm__tab-icon-rotate');
  }
  counter += 1;
})

// handle the function of enquire Form
if (!isItContactUsPage && !isItTheHomePage) {
  const baseUrl = "http://toutclout.abadboot.com:3300/api";
  Vue.use(window.vuelidate.default);
  const { required, minLength, maxLength, email } = window.validators;

  function isAPhoneNumber(phone) {
    const match =
      /^\+?\d{0,3}[\(\- ]?\d{3}\)?[\- ]?\d{3,4}[\- ]?\d{4}/.test(phone);
    return match;
  }

  Vue.component('enquire-form', {
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

    template: `<div class="enquireForm__body">
                <!-- Success -->
                <div class="success_block" v-show="submitStatus === 'OK' && !emailSending">
                    <p class="typo__p">Thank you for reaching out to us! <br> We will get in
                        touch with
                        you shortly.</p>
                    <div class="query__btn" :disabled="submitStatus === 'PENDING' ? true : false" id="query-btn"
                        @click="resetForm">Have a new query ?</div>
                </div>
                <div v-show="!(submitStatus === 'OK' && !emailSending)">
                    <p>Please fill in the details below.</p>
                    <!-- Name -->
                    <div class="floating-label-group">
                        <input type="text" class="form-control enquireForm-input" id="enquiryForm__name" placeholder="Name"
                            ref="name" v-focus="isElementFocused['name']" @focus="isElementFocused['name'] = true"
                            v-model.trim="name" @mouseover="areAnyElementsHovered = true"
                            @mouseout="areAnyElementsHovered = false" required>
                        <label class="floating-label">Name</label>
                        <div class="floating-input-error" v-if="isElementFocused['name']">
                            <div class="error name-error" v-if="!$v.name.required">Please enter your name.</div>
                            <div class="error name-error" v-if="!$v.name.minLength">
                                Your name must have
                                at least {{$v.name.$params.minLength.min}} letters.</div>
                        </div>
                    </div>
                    <!-- Email -->
                    <div class="floating-label-group">
                        <input type="text" class="form-control enquireForm-input" id="enquiryForm__email"
                            placeholder="Email" ref="email" v-focus="isElementFocused['email']"
                            @focus="isElementFocused['email'] = true" v-model.trim="email"
                            @mouseover="areAnyElementsHovered = true" @mouseout="areAnyElementsHovered = false" required>
                        <label class="floating-label">Email</label>
                        <div class="floating-input-error" v-if="isElementFocused['email']">
                            <div class="error email-error" v-if="!$v.email.required">
                                Please provide your
                                email address.</div>
                            <div class="error email-error" v-if="!$v.email.maxLength">
                                Your email is of
                                {{$v.email.$params.maxLength.max}} letters. Too long to proceed.</div>
                            <div class="error email-error" v-if="!$v.email.email">
                                Please provide a valid e-mail address.</div>
                        </div>
                    </div>
                    <!-- Phone -->
                    <div class="floating-label-group">
                        <input type="text" class="form-control enquireForm-input" id="enquiryForm__phone"
                            placeholder="Phone" ref="phone" v-focus="isElementFocused['phone']"
                            @focus="isElementFocused['phone'] = true" v-model.trim="phone"
                            @mouseover="areAnyElementsHovered = true" @mouseout="areAnyElementsHovered = false" required>
                        <label class="floating-label">Phone</label>
                        <div class="floating-input-error" v-if="isElementFocused['phone']">
                            <div class="error phone-error" v-if="!$v.phone.required">Please provide your phone number.</div>
                            <div class="error phone-error" v-if="!this.$v.phone.isAPhoneNumber && this.phone !== ''">Please
                                provide a valid 10 digit phone number</div>
                        </div>
                    </div>
                    <!-- Message -->
                    <div class="floating-label-group">
                        <textarea rows="2" type="text" class="form-control enquireForm-input" id="enquiryForm__service"
                            placeholder="Message" ref="message" v-focus="isElementFocused['message']"
                            @focus="isElementFocused['message'] = true" v-model.trim="message"
                            @mouseover="areAnyElementsHovered = true" @mouseout="areAnyElementsHovered = false" required>
                            </textarea>
                        <label class="floating-label">Message</label>
                        <div class="floating-input-error" v-if="isElementFocused['message']">
                            <div class="error message-error" v-if="!$v.message.required">A message is
                                required to help you.</div>
                            <div class="error message-error" v-if="!$v.message.minLength">Your message
                                must have at least {{$v.message.$params.minLength.min}} letters.</div>
                        </div>
                    </div>
    
                    <!-- Submit -->
                    <button class="send-btn d-flex align-items-center enquireForm__submit"
                        :disabled="submitStatus === 'PENDING' ? true : false" @click.prevent="submit">
                        <div v-if="submitStatus === 'PENDING'" class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
                        <div v-else class="d-flex align-items-center">
                            <span>SUBMIT</span>
                        </div>
                    </button>
                </div>
            </div>`,

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
            this.isElementFocused[field] = true;
            setTimeout(() => {
              document.querySelector(`.${field}-error`).classList.remove('shake');
                setTimeout(() => {
                  document.querySelector(`.${field}-error`).classList.add('shake');
                }, 100)
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

  var vueApp = new Vue({
    el: '#enquireForm__form'
  })
}
