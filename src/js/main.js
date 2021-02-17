;(function(){

  "usestrict";

  let nav = $('.js-nav');
  let menu = $('.js-menu');
  let menuLink = $('.js-menu-link');
  let menuBtn = $('.js-btn-toggle-menu');
  let like = $('.js-like');
  let commentField = $('#message');
  let submitButton = $('.js-form-comment-btn');
  let formComment = $('.js-form-comment');

  $(document).ready(function() {
    
    // Hide menu in mobile version
    $(document).on('click', function(e) {
      let el = $('.js-btn-toggle-menu-item');    
      if ( !menuBtn.is(e.target)  && !el.is(e.target)  && !menu.is(e.target) && menu.hasClass('menu--show') ) {
        menu.removeClass('menu--show');
      };    
    }); 
    
    $('.js-select-article').on('click', searchArticle());

    like.on('click', counterLikes);
    submitButton.on('click', validationFieldMessage);
    commentField.on('input', removeWarningMessageField);
    formComment.on('submit', addComment);
    
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

  // Counter Likes
  function counterLikes() {
    let numberLikes = $('.js-like-amount');

    if (like.hasClass('block-like__like--added')) {
      numberLikes.text(parseInt(numberLikes.text()) - 1);
    } else {
      numberLikes.text(parseInt(numberLikes.text()) + 1);
    }

    like.toggleClass('block-like__like--added');
  };

  //Message field validation
  function validationFieldMessage() {
    let value = commentField.val();
    if ((value.length < 8) || (value.length > 200)) {
      commentField.addClass('warning');
      submitButton.unbind('mouseenter mouseleave');
      submitButton.prop('disabled', true);      
    }
  }

  // Remove warning from message field
  function removeWarningMessageField() {
    let value = commentField.val();
    if ((value.length > 8)&&(value.length < 200)&&(commentField.hasClass('warning'))) {
      commentField.removeClass('warning');
      submitButton.prop('disabled', false);
    }
  }

  // Add comment to comment list
  function addComment(evt) {
    evt.preventDefault();

    let commentsList = $('.js-comments-list');
    
    let newComment = document.createElement('li');
    newComment.classList.add('comments-list__item');

    let userInfo = document.createElement('div');
    userInfo.classList.add('comments-list__user');

    let userPhoto = document.createElement('img');
    userPhoto.classList.add('comments-list__foto');

    let userName = document.createElement('span');
    userName.classList.add('comments-list__name');
    userName.textContent = document.querySelector('#name').value;
    document.querySelector('#name').value='';

    let newCommentText = document.createElement('p');
    newCommentText.classList.add('comments-list__field');
    newCommentText.textContent = document.querySelector('textarea').value;
    document.querySelector('textarea').value='';

    userInfo.append(userPhoto);
    userInfo.append(userName);
    newComment.append(userInfo);
    newComment.append(newCommentText);
    commentsList.append(newComment);
  }
})();