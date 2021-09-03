$(".menu-opener").click(function () {
  $(".menu-opener, .menu-opener-inner, .menu").toggleClass("active");
  if ($("body,html").hasClass("overhide")) {
    $("body,html").removeClass("overhide");
    $(".logo2").removeClass("over_show");
    $(".logo1").removeClass("over_hide");
  } else {
    $("body,html").addClass("overhide");
    $(".logo2").addClass("over_show");
    $(".logo1").addClass("over_hide");
  }
});

// innovation element
var innovationElem = document.querySelector(".innovation");
innovationElem.addEventListener("mouseover", (event) => {
  var innovationPlayer = document.querySelector(".innovation__anim");
  innovationPlayer.play();
});
innovationElem.addEventListener("mouseout", (event) => {
  var innovationPlayer = document.querySelector(".innovation__anim");
  innovationPlayer.stop();
});

// simplicity element
var simplicityElem = document.querySelector(".simplicity");
simplicityElem.addEventListener("mouseover", (event) => {
  var simplicityPlayer = document.querySelector(".simplicity__anim");
  simplicityPlayer.play();
});
var simplicityElem = document.querySelector(".simplicity");
simplicityElem.addEventListener("mouseout", (event) => {
  var simplicityPlayer = document.querySelector(".simplicity__anim");
  simplicityPlayer.stop();
});

// integration element
var integrationElem = document.querySelector(".integration");
integrationElem.addEventListener("mouseover", (event) => {
  var integrationPlayer = document.querySelector(".integration__anim");
  integrationPlayer.play();
});
integrationElem.addEventListener("mouseout", (event) => {
  var integrationPlayer = document.querySelector(".integration__anim");
  integrationPlayer.stop();
});

// agility element
var agilityElem = document.querySelector(".agility");
agilityElem.addEventListener("mouseover", (event) => {
  var agilityPlayer = document.querySelector(".agility__anim");
  agilityPlayer.play();
});
agilityElem.addEventListener("mouseout", (event) => {
  var agilityPlayer = document.querySelector(".agility__anim");
  agilityPlayer.stop();
});

// integrity element
var integrityElem = document.querySelector(".integrity");
integrityElem.addEventListener("mouseover", (event) => {
  var integrityPlayer = document.querySelector(".integrity__anim");
  integrityPlayer.play();
});
integrityElem.addEventListener("mouseout", (event) => {
  var integrityPlayer = document.querySelector(".integrity__anim");
  integrityPlayer.stop();
});
