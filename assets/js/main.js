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
  $(".mobile_slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 767,
        settings: "unslick",
      },
    ],
  });

  $(window).on("resize", function () {
    $(".mobile_slider").slick("resize");
  });
});

$(function () {
  $(".mobile_slider_wd").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 575,
        settings: "unslick",
      },
    ],
  });

  $(window).on("resize", function () {
    $(".mobile_slider_wd").slick("resize");
  });
});

/*-----Smooth scrolling js----*/

// $(document).ready(function(){
//             // $fn.scrollSpeed(step, speed, easing);
//             jQuery.scrollSpeed(200, 800);
// });

// // Custom scrolling speed with jQuery
// // Source: github.com/ByNathan/jQuery.scrollSpeed
// // Version: 1.0.2

// (function($) {

//     jQuery.scrollSpeed = function(step, speed, easing) {

//         var $document = $(document),
//             $window = $(window),
//             $body = $('html, body'),
//             option = easing || 'default',
//             root = 0,
//             scroll = false,
//             scrollY,
//             scrollX,
//             view;

//         if (window.navigator.msPointerEnabled)

//             return false;

//         $window.on('mousewheel DOMMouseScroll', function(e) {

//             var deltaY = e.originalEvent.wheelDeltaY,
//                 detail = e.originalEvent.detail;
//                 scrollY = $document.height() > $window.height();
//                 scrollX = $document.width() > $window.width();
//                 scroll = true;

//             if (scrollY) {

//                 view = $window.height();

//                 if (deltaY < 0 || detail > 0)

//                     root = (root + view) >= $document.height() ? root : root += step;

//                 if (deltaY > 0 || detail < 0)

//                     root = root <= 0 ? 0 : root -= step;

//                 $body.stop().animate({

//                     scrollTop: root

//                 }, speed, option, function() {

//                     scroll = false;

//                 });
//             }

//             if (scrollX) {

//                 view = $window.width();

//                 if (deltaY < 0 || detail > 0)

//                     root = (root + view) >= $document.width() ? root : root += step;

//                 if (deltaY > 0 || detail < 0)

//                     root = root <= 0 ? 0 : root -= step;

//                 $body.stop().animate({

//                     scrollLeft: root

//                 }, speed, option, function() {

//                     scroll = false;

//                 });
//             }

//             return false;

//         }).on('scroll', function() {

//             if (scrollY && !scroll) root = $window.scrollTop();
//             if (scrollX && !scroll) root = $window.scrollLeft();

//         }).on('resize', function() {

//             if (scrollY && !scroll) view = $window.height();
//             if (scrollX && !scroll) view = $window.width();

//         });
//     };

//     jQuery.easing.default = function (x,t,b,c,d) {

//         return -c * ((t=t/d-1)*t*t*t - 1) + b;
//     };

// })(jQuery);
