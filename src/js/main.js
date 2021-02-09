;(function(){

  "usestrict";

  let nav = $('.js-nav');
  let menu = $('.js-menu');
  let menuLink = $('.js-menu-link');
  let menuBtn = $('.js-btn-toggle-menu');
  let navTop;

  $(document).ready(function() {

    getNavTopSize();
    smoothScroll();
    setMenuStiky();
    hideMobileMenu();
    searchArticle();
    
    menuBtn.on('click', function() {
      menu.toggleClass('menu--show');
    });

    menuLink.on('click', function() {
      menu.removeClass('menu--show');
    }); 
  });

  $(window).on('scroll', function() {
    showActiveMenuItem();
    setMenuStiky()
  });

  $(window).on('resize', function(){
    getNavTopSize();

    if ( $(window).width() > 767 ) {
      menu.removeClass('menu--show');
    }
  });

  // ------ Functions ------

  function getNavTopSize() {
      navTop = ($(window).width() < 768) ? 15 : 30;
  }

  // Make the main menu sticky
  function setMenuStiky() {
    ($(this).scrollTop() > navTop)
      ? nav.addClass('nav--stiky')
      : nav.removeClass('nav--stiky');
  }

  // Show active menu item when scrolling
  function showActiveMenuItem() {
    let scrollTop = $(window).scrollTop();
    
    menuLink.each( function() {
      let link = $(this).attr("href");
      let target = $(link);
      $(this).blur();

      if ( ((target.offset().top <= scrollTop)
        && (target.offset().top + target.outerHeight() > scrollTop))) {
        menuLink.removeClass("menu__link--active");
        $(this).addClass("menu__link--active");
      } else {
        $(this).removeClass("menu__link--active");
      }
    });
  }

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
  function smoothScroll() {
    menuLink.on('click', function (event) {
      event.preventDefault();
      elementClick = $(this).attr("href")
      destination = $(elementClick).offset().top+1;
      
      $('html, body').animate({
        scrollTop: destination
      }, 600);
    });
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