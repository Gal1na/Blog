;(function(){

  "usestrict";

  let nav = $('.js-nav');
  let menu = $('.js-menu');
  let menuLink = $('.js-menu-link');
  let menuBtn = $('.js-btn-toggle-menu');

  $(document).ready(function() {
    hideMobileMenu();
    searchArticle();
    
    menuBtn.on('click', function() {
      menu.toggleClass('menu--show');
    });

    menuLink.on('click', function(event) {
      event.preventDefault();
      if (menuBtn.is(':visible')) {
        menu.removeClass('menu--show');
      }
      smoothScroll($(this));
    });
  });

  $(window).on('resize', function(){

    if ( $(window).width() > 767 ) {
      menu.removeClass('menu--show');
    }
  });

  // ------ Functions ------

  // Hide menu in mobile version
  function hideMobileMenu() {
    let el = $('.js-btn-toggle-menu-item');    

    $(document).click(function (e) {
      if ( !menuBtn.is(e.target)  && !el.is(e.target)  && !menu.is(e.target) && menu.hasClass('menu--show') ) {
        menu.removeClass('menu--show');
      };
    });
  }  

  // Smooth scrolling
  function smoothScroll(link) {
    let targetId = link.attr('href');

    if (targetId[0] !== '#') {
      return window.location = targetId;
    }

    let destination = $(targetId).offset().top+1;

    $('html, body').animate({
      scrollTop: destination
    }, 600);
  }
  

  // Search article
  function searchArticle () {
    let articles = $('.article-preview');
    let filter = $('.custom-select__list');

    filter.on('change', function() {
      let value = filter.val();  

      articles.each(function() {
        let article = $(this);    
        let data = article.attr('data-category');

        if ((data !== value) && (value !== 'all')) {
          article.closest('.js-col').addClass('hidden');
        } else {
          article.closest('.js-col').removeClass('hidden');
        }
      })
    })
  }  
})();