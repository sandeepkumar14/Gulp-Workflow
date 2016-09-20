// preloader
$(document).ready(function(){
    $('.preloader').fadeOut(1000); // set duration in brackets    
});

$(function() {
    new WOW().init();
    $('.templatemo-nav').singlePageNav({
      offset: 0
    });

    /* Hide mobile menu after clicking on a link
    -----------------------------------------------*/
    $('.navbar-collapse a').click(function(){
        $(".navbar-collapse").collapse('hide');
    });

    $('#section_7').addClass('animated bounce');
});

jQuery(document).ready(function($) {
        // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 0;
    var delta = 5;
    var navbarHeight = $('header').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);

    function hasScrolled() {
        var st = $(this).scrollTop();
        
        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;
        
        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('header').removeClass('nav-down').addClass('nav-up');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('header').removeClass('nav-up').addClass('nav-down');
            }
        }
        
        lastScrollTop = st;
    }
});
var marqueeVars = { 
  screenSize: '', 
  width: 0, 
  mobileSize: 767, 
  autoPlay: true, 
  currentPanel: 1, 
  totalPanels: 0, 
  timePassed: 0, 
  timeToChange: 100, 
  duration: 1550, 
  inTransition: false, 
  panelContent: Array  
};

$(document).ready(function(){
  marqueeeGatherData();

});


function marqueeeGatherData() {
  $('.marquee_data .marquee_panel').each(function (index){
    marqueeVars.totalPanels = index + 1;
    var panel_image_l = $(this).attr('data-image')+'_l.jpg';
    var panel_image_s = $(this).attr('data-image')+'_s.jpg';
    var panel_caption = $(this).html();
    marqueeVars.panelContent[index] = '<div class="marquee_panel" data-image-s="'+panel_image_s+'" style="background-image:url('+panel_image_l+');"><div class="overlay"></div><div class="panel_caption">'+panel_caption+'</div></div>';
  });
  var marqueeTimer = setInterval(marqueeAdvance,100);
}

function marqueeAdvance(){
  var marqueeWidth = $('.marquee').width();
  var currentSize = marqueeVars.screenSize;
  var newSize;

if(marqueeWidth > marqueeVars.mobileSize){
  newSize = 'large';
}else{
  newSize = 'small';
}
marqueeVars.screenSize = newSize;

if( currentSize != newSize){
  if(marqueeVars.screenSize == 'large'){
    marqueeMultiPanel();
  }else{
    marqueeSinglePanel();
  }
}
if(marqueeVars.timePassed == marqueeVars.timeToChange){
    marqueeVars.timePassed = 0;

    if( marqueeVars.autoPlay == true ){

      if( marqueeVars.currentPanel == marqueeVars.totalPanels ){
        $('.marquee_nav div:nth-child(1)').trigger('click');
      }else{
        $('.marquee_nav div:nth-child('+(marqueeVars.currentPanel+1)+')').trigger('click');
      }

    }

}else{
    marqueeVars.timePassed += 1;
}
    
}// End of marqueeAdvance
 
function marqueeMultiPanel(){
    marqueeVars.timePassed = 0;
    marqueeVars.autoPlay = true;
    var newHTML = '<div class="marquee_stage_large"><div class="marquee_container_1"></div><div class="marquee_nav"></div><div class="btn_mar prev"></div><div class="btn_mar next"></div></div>';
    $('.marquee').html('').append(newHTML);

    for (i=0; i<marqueeVars.totalPanels; i++ ){
      $('.marquee_nav').append('<div></div>');
    } 

    $('.marquee').hover(function(){
    marqueeVars.autoPlay = false;
    }, function(){
    marqueeVars.autoPlay = true;
    marqueeVars.timePassed = Math.floor(marqueeVars.timeToChange / 2);
    });

    $('.marquee .btn_mar').on('click', function(){
      if( !marqueeVars.inTransition ){

        if( $(this).hasClass('prev')) {
          marqueeVars.currentPanel -= 1;
          if( marqueeVars.currentPanel < 1 ){
            marqueeVars.currentPanel = marqueeVars.totalPanels;
          }
        }else{
          marqueeVars.currentPanel += 1;
          if( marqueeVars.currentPanel > marqueeVars.totalPanels){
            marqueeVars.currentPanel = 1;
          }
        }

        $('.marquee_nav div:nth-child('+marqueeVars.currentPanel+')').trigger('click');
      }


    });



    $('.marquee_nav div').on('click',function(){
      if( !marqueeVars.inTransition ){

        marqueeVars.inTransition = true;

      var navClicked = $(this).index();
      marqueeVars.currentPanel = navClicked + 1;

      $('.marquee_nav div').removeClass('selected');
      $(this).addClass('selected');

      $('.marquee_stage_large').append('<div class="marquee_container_2" style="opacity:0;"></div>');
      $('.marquee_container_2').html(marqueeVars.panelContent[navClicked]).animate({opacity:1},marqueeVars.duration,function(){
        $('marquee_container_1').remove();
        $(this).addClass('marquee_container_1').removeClass('marquee_container_2');
        marqueeVars.inTransition = false;
      });
      }
 
    });

    $('.marquee_nav div:first').trigger('click'); 
} // end of marqueeMultiPanel
 
// Targetting small screens
function marqueeSinglePanel() {
  
  $('.marquee').html('').append('<div class="marquee_stage_small">'+marqueeVars.panelContent[0]+'</div>');
  
}

/* Typed JS Code*/
// $(function(){
//     $(".element2").typed({
//         // Waits 1000ms after typing "First"
//         strings: [
//             "I'm a Web Developer.^2000",
//             "Based in Warsaw, Poland.^2000",
//             "Available as Freelacer/B2B.^100000", 
//             "I love to create web.^2000", 
//             "What i can do?^2000",
//             "Responsive design^2000",
//             "Node JS, Angular JS^2000", 
//             "Work with GIT, Gulp, Grunt^2000",
//             "ReSTful API, MongoDB^2000",
//             "Object Oriented JS^2000",
//             "jQuery, SASS, LESS, CSS3,^2000",
//             "HTML5, EJS and Jade.^2000",
//             "Available to work as Freelacer/B2B."
//         ],
//         startDelay: 1500,
//         typeSpeed: 30,
//         backSpeed: 20,
//         loop: false,
//         showCursor: false,
//         cursorChar: "|"
//     });});

// Based in Warsaw, Poland. I have a passion for web design and love to create for web and mobile devices.

























jQuery(document).ready(function($){
  var duration = ( $('.no-csstransitions').length > 0 ) ? 0 : 300;
  //define a svgClippedSlider object
  function svgClippedSlider(element) {
    this.element = element;
    this.slidesGallery = this.element.find('.gallery').children('li');
    this.slidesCaption = this.element.find('.caption').children('li');
    this.slidesNumber = this.slidesGallery.length;
    this.selectedSlide = this.slidesGallery.filter('.selected').index();
    this.arrowNext = this.element.find('.navigation').find('.next');
    this.arrowPrev = this.element.find('.navigation').find('.prev');

    this.visibleSlidePath = this.element.data('selected');
    this.lateralSlidePath = this.element.data('lateral');

    this.bindEvents();
  }

  svgClippedSlider.prototype.bindEvents = function() {
    var self = this;
    //detect click on one of the slides
    this.slidesGallery.on('click', function(event){
      if( !$(this).hasClass('selected') ) {
        //determine new slide index and show it
        var newSlideIndex = ( $(this).hasClass('left') )
          ? self.showPrevSlide(self.selectedSlide - 1)
          : self.showNextSlide(self.selectedSlide + 1);
      }
    });
  }

  svgClippedSlider.prototype.showPrevSlide = function(index) {
    var self = this;
    this.selectedSlide = index;
    this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).removeClass('selected').addClass('right');
    this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('left').addClass('selected');

    //morph the svg cliph path to reveal a different region of the image
    Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
    Snap("#cd-morphing-path-"+(index+2)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

    if( index - 1 >= 0  ) this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('left-hide').addClass('left');
    if( index + 2 < this.slidesNumber ) this.slidesGallery.eq(index + 2).add(this.slidesCaption.eq(index + 2)).removeClass('right');
  
    ( index <= 0 ) && this.element.addClass('prev-hidden');
    this.element.removeClass('next-hidden');

    //animate prev arrow on click
    this.arrowPrev.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      self.arrowPrev.removeClass('active');
    });
  }

  svgClippedSlider.prototype.showNextSlide = function(index) {
    var self = this;
    this.selectedSlide = index;
    this.slidesGallery.eq(index - 1).add(this.slidesCaption.eq(index - 1)).removeClass('selected').addClass('left');
    this.slidesGallery.eq(index).add(this.slidesCaption.eq(index)).removeClass('right').addClass('selected');

    //morph the svg cliph path to reveal a different region of the image
    Snap("#cd-morphing-path-"+(index+1)).animate({'d': self.visibleSlidePath}, duration, mina.easeinout);
    Snap("#cd-morphing-path-"+(index)).animate({'d': self.lateralSlidePath}, duration, mina.easeinout);

    if( index - 2 >= 0  ) this.slidesGallery.eq(index - 2).add(this.slidesCaption.eq(index - 2)).removeClass('left').addClass('left-hide');
    if( index + 1 < this.slidesNumber ) this.slidesGallery.eq(index + 1).add(this.slidesCaption.eq(index + 1)).addClass('right');
    
    ( index + 1 >= this.slidesNumber ) && this.element.addClass('next-hidden');
    this.element.removeClass('prev-hidden');

    //animate next arrow on click
    this.arrowNext.addClass('active').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
      self.arrowNext.removeClass('active');
    });
  }

  $('.cd-svg-clipped-slider').each(function(){
    //create a svgClippedSlider object for each .cd-svg-clipped-slider
    new svgClippedSlider($(this));
  });
});

jQuery(document).ready(function($){
  // browser window scroll (in pixels) after which the "back to top" link is shown
  var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');

  //hide or show the "back to top" link
  $(window).scroll(function(){
    ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
    if( $(this).scrollTop() > offset_opacity ) { 
      $back_to_top.addClass('cd-fade-out');
    }
  });

  //smooth scroll to top
  $back_to_top.on('click', function(event){
    event.preventDefault();
    $('body,html').animate({
      scrollTop: 0 ,
      }, scroll_top_duration
    );
  });

});
//# sourceMappingURL=../maps/js/script.js.map
