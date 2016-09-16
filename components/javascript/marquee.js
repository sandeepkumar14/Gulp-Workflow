var marqueeVars = { 
  screenSize: '', 
  width: 0, 
  mobileSize:1767, 
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
    var newHTML = '<div class="marquee_stage_large"><div class="marquee_container_1"></div><div class="marquee_nav"></div><div class="btn prev"></div><div class="btn next"></div></div>';
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

    $('.marquee .btn').on('click', function(){
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
$(function(){
    $(".element").typed({
        // Waits 1000ms after typing "First"
        strings: [
            "I'm a Web Developer.^2000",
            "Based in Warsaw, Poland.^2000",
            "Available as Freelacer/B2B.^100000", 
            "I love to create web.^2000", 
            "What i can do?^2000",
            "Responsive design^2000",
            "Node JS, Angular JS^2000", 
            "Work with GIT, Gulp, Grunt^2000",
            "ReSTful API, MongoDB^2000",
            "Object Oriented JS^2000",
            "jQuery, SASS, LESS, CSS3,^2000",
            "HTML5, EJS and Jade.^2000",
            "Available to work as Freelacer/B2B."
        ],
        startDelay: 1500,
        typeSpeed: 30,
        backSpeed: 20,
        loop: false,
        showCursor: false,
        cursorChar: "|"
    });});

// Based in Warsaw, Poland. I have a passion for web design and love to create for web and mobile devices.























