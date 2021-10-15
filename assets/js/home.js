var hamburgerMenu = document.querySelector(".hamburger__menu");
var hamburgerMenuButton = document.querySelector("#btnHamburger");
var upperBurger = document.querySelector(".upperBurger");
var lowerBurgerFirstHalf = document.querySelector(".lowerBurger__firstHalf");
var lowerBurgerSecondHalf = document.querySelector(".lowerBurger__secondHalf");
var lowerBurgerThirdHalf = document.querySelector(".lowerBurger__thirdHalf");
var homePageVideo = document.querySelector(".half-part_video");
var homePage = document.querySelector(".home_page");
var textWrapper = document.querySelector(".home_content_title");
var home_content_title = document.querySelector(".home_content_title");

var animationEasing = "cubicBezier(.5, .05, .1, .3)";
var italicised_string = `Great <span class="home_content_title--italic">idea</span> is yet to be`;
var loadingPage = document.querySelector(".loading-page");

// Customised Cursor
// cursor effects
// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");

const initCursor = () => {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", (e) => {
    clientX = e.clientX;
    clientY = e.clientY;
  });

  // transform the innerCursor to the current mouse position
  // use requestAnimationFrame() for smooth performance
  const render = () => {
    innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;;
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

initCursor();

const initHovers = () => {
  // find the center of the link element and set stuckX and stuckY
  // these are needed to set the position of the noisy circle
  const handleMouseEnter = (e) => {
    const navItem = e.currentTarget;
    const navItemBox = navItem.getBoundingClientRect();
    stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
    stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
    isStuck = true;
  };

  // reset isStuck on mouseLeave
  const handleMouseLeave = () => {
    isStuck = false;
  };

  // add event listeners to all items
  const linkItems = document.querySelectorAll("a");
  linkItems.forEach((item) => {
    item.addEventListener("mouseenter", handleMouseEnter);
    item.addEventListener("mouseleave", handleMouseLeave);
  });
};

initHovers();

// making the canvas
let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;

const initCanvas = () => {
  const canvas = document.querySelector(".cursor--canvas");
  const shapeBounds = {
    width: 75,
    height: 75,
  };
  paper.setup(canvas);
  const strokeColor = "rgba(221,221,221,0.5)";
  const strokeWidth = 1;
  const segments = 8;
  const radius = 15;

  // we'll need these later for the noisy circle
  const noiseScale = 150; // speed
  const noiseRange = 4; // range of distortion
  let isNoisy = false; // state

  // the base shape for the noisy circle
  const polygon = new paper.Path.RegularPolygon(
    new paper.Point(0, 0),
    segments,
    radius
  );
  polygon.strokeColor = strokeColor;
  polygon.strokeWidth = strokeWidth;
  polygon.smooth();
  group = new paper.Group([polygon]);
  group.applyMatrix = false;

  const noiseObjects = polygon.segments.map(() => new SimplexNoise());
  let bigCoordinates = [];

  // function for linear interpolation of values
  const lerp = (a, b, n) => {
    return (1 - n) * a + n * b;
  };

  // function to map a value from one range to another range
  const map = (value, in_min, in_max, out_min, out_max) => {
    return (
      ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  };

  // the draw loop of Paper.js
  // (60fps with requestAnimationFrame under the hood)
  paper.view.onFrame = (event) => {
    // using linear interpolation, the circle will move 0.2 (20%)
    // of the distance between its current position and the mouse
    // coordinates per Frame
    if (!isStuck) {
      // move circle around normally
      lastX = lerp(lastX, clientX, 0.2);
      lastY = lerp(lastY, clientY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    } else if (isStuck) {
      // fixed position on a nav item
      lastX = lerp(lastX, stuckX, 0.2);
      lastY = lerp(lastY, stuckY, 0.2);
      group.position = new paper.Point(lastX, lastY);
    }

    if (isStuck && polygon.bounds.width < shapeBounds.width) {
      // scale up the shape
      polygon.scale(1.08);
    } else if (!isStuck && polygon.bounds.width > 30) {
      // remove noise
      if (isNoisy) {
        polygon.segments.forEach((segment, i) => {
          segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
        });
        isNoisy = false;
        bigCoordinates = [];
      }
      // scale down the shape
      const scaleDown = 0.92;
      polygon.scale(scaleDown);
    }

    // while stuck and big, apply simplex noise
    if (isStuck && polygon.bounds.width >= shapeBounds.width) {
      isNoisy = true;
      // first get coordinates of large circle
      if (bigCoordinates.length === 0) {
        polygon.segments.forEach((segment, i) => {
          bigCoordinates[i] = [segment.point.x, segment.point.y];
        });
      }

      // loop over all points of the polygon
      polygon.segments.forEach((segment, i) => {
        // get new noise value
        // we divide event.count by noiseScale to get a very smooth value
        const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
        const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);

        // map the noise value to our defined range
        const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
        const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);

        // apply distortion to coordinates
        const newX = bigCoordinates[i][0] + distortionX;
        const newY = bigCoordinates[i][1] + distortionY;

        // set new (noisy) coodrindate of point
        segment.point.set(newX, newY);
      });
    }
    polygon.smooth();
  };
};

initCanvas();

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

textWrapper.innerHTML =
  '<span class="letter">G</span><span class="letter">r</span><span class="letter">e</span><span class="letter">a</span><span class="letter">t</span> <i><span class="letter">idea</span></i> <span class="letter">i</span><span class="letter">s</span> <span class="letter">y</span><span class="letter">e</span><span class="letter">t</span> <span class="letter">t</span><span class="letter">o</span> <span class="letter">b</span><span class="letter">e</span>';

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
  var homePageOpeningAnimation = anime.timeline({});
  homePageOpeningAnimation
    .add({
      targets: ".left_img, .right_img",
      duration: 2000,
      opacity: [0, 1],
      easing: "easeInExpo",
    })
    .add({
      targets: ".menu-logo",
      opacity: [0, 1],
      translateY: ["-100%", 0],
      delay: 1500,
      duration: 3000,
      easing: "easeOutExpo",
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
    duration: 2000,
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

window.onload = () => {
  // animation master controller
  homePageOpacityPromise().then(() => {
    textLetterAnimationPromise().then(() => {
      homePageVideo.play();
      setTimeout(() => {
        discoverVideoHidePromise().then(() => {
          homePageOpeningAnimationPromise().then(() => {
            home_content_title.innerHTML = "Great <i>idea</i> is yet to be";
            fontColorAnimationPromise().then(() => {
              homePageVideo.classList.add("half-part_video--hidden");
            });
          });
        });
      }, 4500);
    });
  });
};
