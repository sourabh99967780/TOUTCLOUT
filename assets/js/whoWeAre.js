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

const staggerVisualizerEl = document.querySelector('.stagger-visualizer');
const fragment = document.createDocumentFragment();
const grid = [10, 10];
const col = grid[0];
const row = grid[1];
const numberOfElements = col * row;

for (let i = 0; i < numberOfElements; i++) {
  fragment.appendChild(document.createElement('div'));
}

staggerVisualizerEl.appendChild(fragment);

const staggersAnimation = anime.timeline({
  targets: '.stagger-visualizer div',
  easing: 'easeInOutSine',
  delay: anime.stagger(50),
  loop: true,
  autoplay: false
})
.add({
  translateX: [
    {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'x'}) },
    {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'x'}) }
  ],
  translateY: [
    {value: anime.stagger('-.1rem', {grid: grid, from: 'center', axis: 'y'}) },
    {value: anime.stagger('.1rem', {grid: grid, from: 'center', axis: 'y'}) }
  ],
  duration: 2000,
  scale: .5,
  delay: anime.stagger(100, {grid: grid, from: 'center'})
})
.add({
  translateX: () => anime.random(-10, 10),
  translateY: () => anime.random(-10, 10),
  delay: anime.stagger(8, {from: 'last'})
})
.add({
  translateX: anime.stagger('.25rem', {grid: grid, from: 'center', axis: 'x'}),
  translateY: anime.stagger('.25rem', {grid: grid, from: 'center', axis: 'y'}),
  rotate: 0,
  scaleX: 2.5,
  scaleY: .25,
  delay: anime.stagger(4, {from: 'center'})
})
.add({
  rotate: anime.stagger([90, 0], {grid: grid, from: 'center'}),
  delay: anime.stagger(50, {grid: grid, from: 'center'})
})
.add({
  translateX: 0,
  translateY: 0,
  scale: .5,
  scaleX: 1,
  rotate: 180,
  duration: 2000,
  delay: anime.stagger(100, {grid: grid, from: 'center'})
})
.add({
  scaleY: 1,
  scale: 1,
  delay: anime.stagger(20, {grid: grid, from: 'center'})
})

staggersAnimation.play();
