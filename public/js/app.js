$(document).ready(function(){

	$('.help').tipTip();

	var postsSectionPosition = $('#posts-section').offset().top;

	$(window).scroll(function() {

			if($(window).width() > 960)
		    if($(window).scrollTop() > postsSectionPosition - 10) 
			    $('.posts').addClass('fixed');
			   else 
			    $('.posts').removeClass('fixed');
		    });
});

