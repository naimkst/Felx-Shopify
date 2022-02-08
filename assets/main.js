(function($) {
  "use strict";
  /*-------------------------------------------
  preloader active
  --------------------------------------------- */
  jQuery(window).on('load',function() {
    jQuery('.preloader').fadeOut('slow');
  });

  /*-------------------------------------------
  Sticky Header
  --------------------------------------------- */
  $(window).on('scroll', function(){
    if( $(window).scrollTop()>80 ){
      $('#sticky').addClass('stick');
    } else {
      $('#sticky').removeClass('stick');
    }
  }); 
  
  jQuery(document).ready(function(){
    /*-------------------------------------------
    filter-box active
    --------------------------------------------- */
    jQuery('.finter-button').on('click',function() {
      jQuery('.filter-box').addClass('show');
    });
    jQuery('.close-filter').on('click',function() {
      jQuery('.filter-box').removeClass('show');
    });
    /*-------------------------------------------
    js scrollup
    --------------------------------------------- */
    $.scrollUp({
      scrollText: '<i class="fa fa-angle-up"></i>',
      easingType: 'linear',
      scrollSpeed: 300,
      animation: 'fade'
    }); 
    /*-------------------------------------------
    post-thumb-slide active
    --------------------------------------------- */
    $('.product-big-thumbail').slick({
      infinite: false,
      autoplay: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      fade: true,
      asNavFor: '.product-small-thumbail',
      dots: false,
      arrows: false,
    });
    $('.product-small-thumbail').slick({
      infinite: false,
      autoplay: false,
      slidesToShow: 4,
      slidesToScroll: 1,
      asNavFor: '.product-big-thumbail',
      dots: true,
      focusOnSelect: true,
      dots: false,
      arrows: false,
    });
    /*-------------------------------------------
    js price range
    --------------------------------------------- */
    $( function() {
      $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
          $( "#amount1" ).val( "€" + ui.values[ 0 ]  );
          $( "#amount2" ).val( "€" + ui.values[ 1 ] );
        }
      });
      $( "#amount1" ).val( "€" + $( "#slider-range" ).slider( "values", 0 ) );
      $( "#amount2" ).val( "€" + $( "#slider-range" ).slider( "values", 1 ) );
    } );
    /*-------------------------------------------
    js price range mobile
    --------------------------------------------- */
    $( function() {
      $( "#slider-range-m" ).slider({
        range: true,
        min: 0,
        max: 500,
        values: [ 75, 300 ],
        slide: function( event, ui ) {
          $( "#amount1-m" ).val( "€" + ui.values[ 0 ]  );
          $( "#amount2-m" ).val( "€" + ui.values[ 1 ] );
        }
      });
      $( "#amount1-m" ).val( "€" + $( "#slider-range-m" ).slider( "values", 0 ) );
      $( "#amount2-m" ).val( "€" + $( "#slider-range-m" ).slider( "values", 1 ) );
    } );
    /*-------------------------------------------
    js counterUp
    --------------------------------------------- */
    $('.counter').counterUp({
      delay: 10,
      time: 1000
    });

  });

})(jQuery);