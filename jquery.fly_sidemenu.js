/* ===========================================================
 * jquery-fly_sidemenu.js v1
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Recreate an iOS7 Airbnb Side Menu-like, but 
 * on the web using jQuery and CSS3
 *
 * https://github.com/peachananr/fly_sidemenu
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    btnContent: "=",
    position: "left",
    customSelector: "li",
    hideButton: false
	};
	

	
  
  $.fn.fly_sidemenu = function(options){
    var settings = $.extend({}, defaults, options),
        el = $(this),
        animationClass = "flyInLeft";  
    
    $("body").addClass("fsm-body")
    switch (settings.position) { 
      case 'left': 
        animationClass = "flyInLeft"
      break;
      case 'right': 
        animationClass = "flyInRight"
      break;
      case 'top': 
        animationClass = "flyInTop"
      break;
      case 'bottom': 
         animationClass = "flyInBottom"
       break;
    }
    el.addClass("fsm-list").hide().find(settings.customSelector).addClass("animate "+ animationClass +" fsm-item")
    $( "body").wrapInner( "<div class='fsm-container fsm-" + settings.position + "'></div>");
    $("<nav id='fsm-sidebar' class='fsm-sidebar fsm-" + settings.position + "'>" + $('<div>').append(el.clone()).html() + "</nav>").prependTo("body");
    $( "body").wrapInner( "<div class='fsm-wrapper fsm-" + settings.position + "'></div>");
    if (settings.hideButton == false ) $("<a class='fsm-button fsm-" + settings.position + "' href='#'>" + settings.btnContent + "</a>").prependTo("#fsm-sidebar");
    
    $.fn.toggleMenu = function () {
  	  if ( $(".fsm-wrapper").is( ".open" ) ) {
        $(".fsm-container").unbind("click")
        $(".fsm-wrapper").removeClass("open");
        $(".fsm-wrapper").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          if ( !$(".fsm-wrapper").is( ".open" ) ) $(".fsm-container").attr("style", "")
        });

        $(".fsm-wrapper").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          if ( !$(".fsm-wrapper").is( ".open" ) ) $(".fsm-sidebar .fsm-list").hide();
           if (settings.position == "top" && settings.position == "bottom") $(".fsm-wrapper .fsm-sidebar").width("99%").width("100%") 
        });

      } else {
        $(".fsm-container").css({
          "cursor": "pointer",
          "overflow": "visible",
          "max-height": $(window).height()
        }).bind("click", function(){
          $(this).unbind("click")
          $(".fsm-wrapper").removeClass("open");
          $(".fsm-wrapper").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            if ( !$(".fsm-wrapper").is( ".open" ) ) {
              $(".fsm-sidebar .fsm-list").hide()
              $(".fsm-container").attr("style", "")
            }
          });  
        })
        if (settings.position == "top" || settings.position == "bottom") {
          $(".fsm-wrapper").css({
            "-webkit-transform": "translate3d(0, " + ($(window).height() * -1) + "px, 0) !important",
            "-moz-transform": "translate3d(0, " + ($(window).height() * -1) + "px, 0) !important",
            "-o-transform": "translate3d(0, " + ($(window).height() * -1) + "px, 0) !important",
            "transform": "translate3d(0, " + ($(window).height() * -1) + "px, 0) !important"
          }).addClass("open");
        } else {
          $(".fsm-wrapper").addClass("open");
        }

        $(".fsm-wrapper").one("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
          if ( $(".fsm-wrapper").is( ".open" ) ) $(".fsm-sidebar .fsm-list").show();
        });
      }
  	}
    
    $(".fsm-button").click(function() {
      el.toggleMenu();
      return false;
    });
    
    
    
    
    
  }
}(window.jQuery);


(function() {

  var accordeonTabsItems = $('.accordeon-tabs__item');
  var accordeonTabsLinks = $('.accordeon-tabs__link');
  var accordeonTabsContent = $('.accordeon-tabs__content');
  var $window = $(window);
  
  //// Click Stuff
  accordeonTabsContent.hide();

  accordeonTabsLinks.click(function() {
    alert( 'assdfsd' );

    var clickedLink = $(this);
    var activeContent = accordeonTabsContent.eq(accordeonTabsLinks.index(clickedLink));
    if ($('html').hasClass('bp600')) {
      hideElements();
      clickedLink.addClass('isActive').parent(accordeonTabsItems).addClass('isActive');
      activeContent.addClass('isActive').show();
    $('.accordeon-tabs').css('min-height', activeContent.outerHeight());
    } else {
      clickedLink.toggleClass('isActive');
      clickedLink.parent(accordeonTabsItems).toggleClass('isActive');
      activeContent.toggle().toggleClass('isActive');
    }
  });
  
  //// Helper Functions
  function hideElements() {
    accordeonTabsItems.removeClass('isActive');
    accordeonTabsLinks.removeClass('isActive');
    accordeonTabsContent.removeClass('isActive').hide(); 
  }
  function showFirst() {
    accordeonTabsItems.first().addClass('isActive');
    accordeonTabsLinks.first().addClass('isActive');
    accordeonTabsContent.first().addClass('isActive').show();
  }

  //// Window Resize Stuff
  $(window).on('windowResized', function (event) {
    console.log(event.isDesktop);

    if (event.isDesktop) {
      $('html').addClass('bp600');
      var activeElements = $('.isActive');
      // on desktop we want to have a active tab
      if (activeElements.length == 0) {
        showFirst();
      // if we switch from mobile to dekstop and have 
      // more than one active tab, we set the first to
      //  active and hide the rest   
      } else if (activeElements.length > 1) {
        hideElements();
        showFirst();
      }
    } else {
      $('html').removeClass('bp600');
    }
  });


  $window.on('load resize', function() {
    var windowResized = $.Event('windowResized', {
      'isDesktop' : $window.outerWidth() > 600
    });
    $window.trigger(windowResized);
  });
  
  
  // $(document).ready (function () {
  //       // For handling Bottom Scroll.
  //       $("#sb1").scroll(function () {
  //       $("#sb2").scrollLeft($("#sb1").scrollLeft());
  //       });
        
  //       $("#sb2").scroll(function () {
  //       $("#sb1").scrollLeft($("#sb2").scrollLeft());
  //       });
        
  //       // For handling Top Scroll.
  //       $("#sb1").scroll(function () {
  //       $("#sb2").scrollTop($("#sb1").scrollTop());
  //       });
        
  //       $("#sb2").scroll(function () {
  //       $("#sb1").scrollTop($("#sb2").scrollTop());
  //       });
  //     });

  // AMBASSADORS
   //$(document).ready (function () {

      // For handling Top & Left Scroll.
        // $("#sb1").scroll(function () {
        //   $("#sb2").scrollLeft($("#sb1").scrollLeft());
        //   $("#sb2").scrollTop($("#sb1").scrollTop());
        // });
        
        // $("#sb2").scroll(function () {
        //   $("#sb1").scrollLeft($("#sb2").scrollLeft());
        //   $("#sb1").scrollTop($("#sb2").scrollTop());
        // });

      // For handling Top & Left Scroll.
      $("#sb3").scroll(function () {
        $("#sb4").scrollLeft($("#sb3").scrollLeft());
        $("#sb4").scrollTop($("#sb3").scrollTop());
      });
      
      $("#sb4").scroll(function () {
        $("#sb3").scrollLeft($("#sb4").scrollLeft());
        $("#sb3").scrollTop($("#sb4").scrollTop());
      });

      // For handling Top & Left Scroll.
      $("#sb5").scroll(function () {
        $("#sb6").scrollLeft($("#sb5").scrollLeft());
        $("#sb6").scrollTop($("#sb5").scrollTop());
      });
      
      $("#sb6").scroll(function () {
        $("#sb5").scrollLeft($("#sb6").scrollLeft());
        $("#sb5").scrollTop($("#sb6").scrollTop());
      });

      // For handling Top & Left Scroll.
      $("#sb7").scroll(function () {
        $("#sb8").scrollLeft($("#sb7").scrollLeft());
        $("#sb8").scrollTop($("#sb7").scrollTop());
      });
      
      $("#sb8").scroll(function () {
        $("#sb7").scrollLeft($("#sb8").scrollLeft());
        $("#sb7").scrollTop($("#sb8").scrollTop());
      });

      // For handling Top & Left Scroll.
      $("#sb9").scroll(function () {
        $("#sb10").scrollLeft($("#sb9").scrollLeft());
        $("#sb10").scrollTop($("#sb9").scrollTop());
      });
      
      $("#sb10").scroll(function () {
        $("#sb9").scrollLeft($("#sb10").scrollLeft());
        $("#sb9").scrollTop($("#sb10").scrollTop());
      });
    //});
  

}());
