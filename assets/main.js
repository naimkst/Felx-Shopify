(function ($) {
  "use strict";
  /*-------------------------------------------
  preloader active
  --------------------------------------------- */
  jQuery(window).on('load', function () {
    jQuery('.preloader').fadeOut('slow');
  });

  /*-------------------------------------------
  Sticky Header
  --------------------------------------------- */
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 80) {
      $('#sticky').addClass('stick');
    } else {
      $('#sticky').removeClass('stick');
    }
  });

  jQuery(document).ready(function () {
    /*-------------------------------------------
    filter-box active
    --------------------------------------------- */
    jQuery('.finter-button').on('click', function () {
      jQuery('.filter-box').addClass('show');
    });
    jQuery('.close-filter').on('click', function () {
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

    $(document).ready(function () {
      var maxPrice = $('#max_price_amountss').attr("data-max");
      var curencySymbol = $('#curency_symble').attr("data-symbol");

      var curentMin = $('#amount1').attr("curent-minm");
      var curentMax = $('#amount2').attr("curent-maxm");

      console.log(parseInt(curentMin, curentMax));
      $(function () {

        $("#slider-range").slider({
          range: true,
          min: 0,
          max: parseInt(maxPrice),
          values: [
            curentMin ? parseInt(curentMin) : 0,
            curentMax ? parseInt(curentMax) : maxPrice
          ],
          slide: function (event, ui) {

            $("#amount1").val(curencySymbol + ui.values[0]);
            $("#amount2").val(curencySymbol + ui.values[1]);
          }

        });
        $("#amount1").val(curencySymbol + $("#slider-range").slider("values", 0));
        $("#amount2").val(curencySymbol + $("#slider-range").slider("values", 1));
      });
    });


    /*-------------------------------------------
    js price range mobile
    --------------------------------------------- */
    $(document).ready(function () {
      var maxPricem = $('#max_price_amountss-m').attr("data-max-m");
      var curencySymbolm = $('#curency_symble-m').attr("data-symbol-m");
      var curentMinm = $('#amount1-m').attr("curent-min-m");
      var curentMaxm = $('#amount2-m').attr("curent-max-m");
      $(function () {
        console.log(parseInt(maxPricem));
        $("#slider-range-m").slider({
          range: true,
          min: 0,
          max: parseInt(maxPricem),
          values: [
            curentMinm ? parseInt(curentMinm) : 0,
            curentMaxm ? parseInt(curentMaxm) : maxPricem
          ],
          slide: function (event, ui) {

            $("#amount1-m").val(curencySymbolm + ui.values[0]);
            $("#amount2-m").val(curencySymbolm + ui.values[1]);
          }

        });
        $("#amount1-m").val(curencySymbolm + $("#slider-range-m").slider("values", 0));
        $("#amount2-m").val(curencySymbolm + $("#slider-range-m").slider("values", 1));
      });
    });
    /*-------------------------------------------
    js counterUp
    --------------------------------------------- */
    $('.counter').counterUp({
      delay: 10,
      time: 1000
    });
    /*-------------------------------------------
    Product Quantity JS
    --------------------------------------------- */
    var productQty = $(".product");
    productQty.append('<button class="inc qty-btn">+</button>');
    productQty.append('<button class= "dec qty-btn">-</button>');
    $('.qty-btn').on('click', function (e) {
      e.preventDefault();
      var $button = $(this);
      var oldValue = $button.parent().find('input').val();
      if ($button.hasClass('inc')) {
        var newVal = parseFloat(oldValue) + 1;
      } else {
        if (oldValue > 1) {
          var newVal = parseFloat(oldValue) - 1;
        } else {
          newVal = 1;
        }
      }
      $button.parent().find('input').val(newVal);
      console.log(newVal);
      $('input#quantity').val(newVal);
    });

    //Add To Cart
    $('.skipChart').on('click', function (e) {
      var form = $('#addToCart');
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/cart/add',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
          var current_url = window.location.href;
          console.log(current_url);
          window.location.href = current_url;

        }
      });
    });

    //Update To Cart Data
    $('.updateSkipBtn').on('click', function (e) {
      var form = $('#cartUpdate');
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: '/cart',
        dataType: 'json',
        data: form.serialize(),
        success: function (data) {
          var current_url = window.location.href;
          console.log(data, current_url);
          document.location.href = current_url;
          $('div#offcanvasCart').toggleClass('show');
          // $('div#offcanvasCart').css({
          //   'visibility': 'visible'
          // });
        }
      });
    });


    //Remove Product
    $('.close-item').on('click', function (e) {
      var form = $('#cartUpdate');
      var User_id = $(this).attr('data-id');
      console.log(User_id);
      e.preventDefault()
      $.ajax({
        type: 'POST',
        url: "/cart/change",
        dataType: 'json',
        data: {
          "line": User_id,
          "quantity": 0
        },
        success: function (data) {
          var current_url = window.location.href;
          document.location.href = current_url;

        }
      });
    });

    //Ajax Search Result
    $(document).ready(function () {
      $("#search-box").keyup(function () {
        console.log('searching...')
        const search_result = $('ul.search-lists-loop');
        const query = document.querySelector('input').value;
        const searchSection = $('.search-list-items');
        var ajax_spiner = $('.search-loading');

        if (query != '') {
          $.ajax(
            {
              url: '/search/suggest.json?q=' + query + '&resources[type]=product',
              type: 'GET',
              dataType: 'json',
              beforeSend: function () {
                ajax_spiner.show();
              }
            }
          ).done(function (data) {
            if (data.resources.results.products != null) {
              searchSection.hide();
              $(search_result).empty();
              data.resources.results.products.forEach(function (product) {
                console.log(product)
                searchSection.show();

                var html = '<li>';
                html += '<a href="' + product.url + '" class="single-card-item">';
                html += '<div class="product-image">';
                html += '<img src="' + product['image'] + '" alt="item">';
                html += '</div>';
                html += '<div class="product-info">';
                html += '<h4 class="product-name">' + product.title + '</h4>';
                html += '<h4 class="price">' + product.price + '</h4>';
                html += '</div>';
                html += '</a>';
                html += '</li>';

                ajax_spiner.hide();
                $(search_result).append(html);
              });
            } else {
              searchSection.hide();
              $(search_result).empty();
              $(search_result).append("<li>No Data Found</li>");
            }
          });
        } else {
          searchSection.hide();
          $(search_result).empty();
          $(search_result).append("<li>No Data Found</li>");
        }
        $(search_result).empty();
      });
    });


    // Recomendation Product
    const handleIntersection = (entries, observer) => {
      if (!entries[0].isIntersecting) return;
  
      observer.unobserve(productRecommendationsSection);
  
      const url = productRecommendationsSection.dataset.url;
  
      fetch(url)
        .then(response => response.text())
        .then(text => {
          const html = document.createElement('div');
          html.innerHTML = text;
          const recommendations = html.querySelector('.product-recommendations');
  
          if (recommendations && recommendations.innerHTML.trim().length) {
            productRecommendationsSection.innerHTML = recommendations.innerHTML;
          }
        })
        .catch(e => {
          console.error(e);
        });
    };
    const productRecommendationsSection = document.querySelector('.product-recommendations');
    const observer = new IntersectionObserver(handleIntersection, {rootMargin: '0px 0px 200px 0px'});
    observer.observe(productRecommendationsSection);





    // End Here
  });
})(jQuery);