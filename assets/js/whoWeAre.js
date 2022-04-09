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

  // add event listener to button
  const buttonElements = document.querySelectorAll('button');
  buttonElements.forEach((item) => {
    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);
    item.addEventListener('click', handleMouseLeave);
  })
};

const initCanvas = (strokeColor, cursorBackground) => {
  paper.clear();
  const canvas = document.querySelector(".cursor--canvas");
  const cursorSmall = document.querySelector('.cursor--small');

  // set cursor background
  cursorSmall.style.background = cursorBackground;

  const shapeBounds = {
    width: 75,
    height: 75,
  };
  paper.setup(canvas);
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

// Customised Cursor
// cursor effects
// set the starting position of the cursor outside of the screen
let clientX = -100;
let clientY = -100;
const innerCursor = document.querySelector(".cursor--small");
initCursor();
initHovers();

// making the canvas
let lastX = 0;
let lastY = 0;
let isStuck = false;
let showCursor = false;
let group, stuckX, stuckY, fillOuterCursor;
initCanvas("rgba(38,39,40,0.5)", '#262728');

// change cursor color on our story
const storyTop = document.querySelector('.story_top_transparent');
storyTop.addEventListener('mouseover', (event) => {
    initCanvas("rgba(221,221,221,0.5)", '#dddddd');
  })
storyTop.addEventListener('mouseout', (event) => {
  initCanvas("rgba(38,39,40,0.5)", '#262728');
})

// innovation element
var innovationElem = document.querySelector(".innovation__hoverblock");
innovationElem.addEventListener("mouseover", (event) => {
  var innovationPlayer = document.querySelector(".innovation__anim");
  innovationPlayer.play();
});
innovationElem.addEventListener("mouseout", (event) => {
  var innovationPlayer = document.querySelector(".innovation__anim");
  innovationPlayer.stop();
});

// simplicity element
var simplicityElem = document.querySelector(".simplicity__hoverblock");
simplicityElem.addEventListener("mouseover", (event) => {
  var simplicityPlayer = document.querySelector(".simplicity__anim");
  simplicityPlayer.play();
});
simplicityElem.addEventListener("mouseout", (event) => {
  var simplicityPlayer = document.querySelector(".simplicity__anim");
  simplicityPlayer.stop();
});

// integration element
var integrationElem = document.querySelector(".integration__hoverblock");
integrationElem.addEventListener("mouseover", (event) => {
  var integrationPlayer = document.querySelector(".integration__anim");
  integrationPlayer.play();
});
integrationElem.addEventListener("mouseout", (event) => {
  var integrationPlayer = document.querySelector(".integration__anim");
  integrationPlayer.stop();
});

// agility element
var agilityElem = document.querySelector(".agility__hoverblock");
agilityElem.addEventListener("mouseover", (event) => {
  var agilityPlayer = document.querySelector(".agility__anim");
  agilityPlayer.play();
});
agilityElem.addEventListener("mouseout", (event) => {
  var agilityPlayer = document.querySelector(".agility__anim");
  agilityPlayer.stop();
});

// integrity element
var integrityElem = document.querySelector(".integrity__hoverblock");
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
const isItAMobileDevice = checkIfItIsMobile();
let grid = [10, 10];
if (isItAMobileDevice) {
  grid = [5, 5];
}
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
