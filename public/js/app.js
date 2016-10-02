$(document).ready(function(){

  var postsSectionPosition;

	$('.help').tipTip();


	$('#about').velocity('transition.slideDownIn');

	$('#contact-box li').mouseenter(function(){
		$(this).velocity({marginTop : "-5"}, {duration: 100});
	})

	$('#contact-box li').mouseleave(function(){
		$(this).velocity({marginTop : "0"}, {duration: 100});
	})

	$('#post-container').velocity('transition.slideUpIn');

  postsSectionPosition = $('#posts-section').offset().top;

	$(window).scroll(function() {

			if($(window).width() > 960)
		    if($(window).scrollTop() > postsSectionPosition - 10) 
			    $('.posts-wrapper').addClass('fixed');
			   else 
			    $('.posts-wrapper').removeClass('fixed');
  });
});

