
  function aos_init() {
    AOS.init({
      duration: 1000,
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });


$(function() 
    {
    $('.mobile_slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
                mobileFirst: true,
                arrows: false,
                dots: true,
                adaptiveHeight: true,
                responsive: [
            {
                breakpoint: 767,
                settings: 'unslick'
            }
        ]
    });

    $(window).on('resize', function() {
        $('.mobile_slider').slick('resize');
    });
    });  

$(function() 
    {
    $('.mobile_slider_wd').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
                mobileFirst:true,
                arrows: false,
                dots: true,
                responsive: [
            {
                breakpoint: 575,
                settings: 'unslick'
            }
        ]
    });

    $(window).on('resize', function() {
        $('.mobile_slider_wd').slick('resize');
    });
    });

/*for inquiry form popup view*/
jQuery(".EnquiryMain").click(function(){
    jQuery(".EnquiryMain").toggleClass("open");
});
jQuery(".EnquiryForm").click(function(){
  jQuery(".EnquiryMain").toggleClass("open");
  
});
jQuery(".enq-close-button").click(function(){
  jQuery(".EnquiryMain").removeClass("open");
  
});
$(document).ready(function(){
jQuery(".select2-choice").removeAttr("href");
});

/*for inquiry form input view*/
$('.EnquiryMain input').focus(function(){
  $(this).parents('.form-group').addClass('focused');
});

$('.EnquiryMain input').blur(function(){
  var inputValue = $(this).val();
  if ( inputValue == "" ) {
    $(this).removeClass('filled');
    $(this).parents('.form-group').removeClass('focused');  
  } else {
    $(this).addClass('filled');
  }
})


// set the starting position of the cursor outside of the screen
var clientX = -300,
    clientY = -300,
// elements 
    outerCursor = document.querySelector(".cursor--outer"),
    innerCursor = document.querySelector(".cursor--inner"),
    link = document.querySelector(".link")

var initCursor = function() {
  // add listener to track the current mouse position
  document.addEventListener("mousemove", function(e) {
    clientX = e.clientX
    clientY = e.clientY
  });
  
  var render = function() {
    TweenMax.set(outerCursor, {
      x: clientX,
      y: clientY,
      delay: .08,
      ease: Power1.easeOut
    });
    
     TweenMax.set(innerCursor, {
      x: clientX,
      y: clientY
    });
    
    requestAnimationFrame(render);
  };
  
  requestAnimationFrame(render);
};

initCursor();

function growOnHover() {
link.addEventListener("mouseenter", function() {
    TweenMax.to(outerCursor, 1, {scale: 2})
});
link.addEventListener("mouseleave", function() {
    TweenMax.to(outerCursor, 1, {scale: 1})
});
}
growOnHover();