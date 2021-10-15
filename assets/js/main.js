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
