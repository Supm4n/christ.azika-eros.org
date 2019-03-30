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

	if($("#posts-section").length)
		postsSectionPosition = $('#posts-section').offset().top;

	$(window).scroll(function() {

			if($(window).width() > 960)
		    if($(window).scrollTop() > postsSectionPosition - 10) 
			    $('.posts-wrapper').addClass('fixed');
			   else 
			    $('.posts-wrapper').removeClass('fixed');
  });

	var particlesConfig = {
			  "particles": {
				    "number": {
						      "value": 200
						    },
						"size":{
								"value" : 2
						},
				    "shape": {
						      "type": "circle"
						},
						"color": {
						      "value": "#000000"
						    },
				     "line_linked": {
								  "color": "#000000",
				          "enable": true,
									"opacity" : 0.4
				       },
						 "move" :{
								  "speed" : 3,
									"bounce" : true
						 },
						"interactivity": {
								"detect_on":"window",
								"events": {
								      "onhover": {
											        "enable": true,
											        "mode": "grab"
											      },
								      "onclick": {
											        "enable": true,
											        "mode": "push"
											      },
								      "resize": true
								    },
						    "modes": {
								      "grab": {
											        "distance": 1000,
											        "line_linked": {
															          "opacity": 1
															        }
											      },
								      "push": {
											        "particles_nb": 5
											      },
								    }
						  },
						  "retina_detect": true
				}};

	if($("#particles-js").length)
		particlesJS("particles-js", particlesConfig);

	$("#christForm").on("submit", function(e){
			e.preventDefault();
			$("#email").prop('disabled', true);
			pushEmail($("#email").prop("value"));
	});

});


function pushEmail(email) {

		$.post({
						url: "https://bouger.us8.list-manage.com/subscribe/post-json?u=eae7f8d4e1c20125d910a2549&id=bd0d912089&c=?",
						data : $.param({EMAIL : email}),
						cache:false,
						dataType: 'json',
						contentType: 'application/json; charset=utf-8',
						error : function(data){
										$("#email").prop('disabled', false);

										$("#email").val("Error. Try again later !");	

										setTimeout(function(){ 
												$("#email").val(email); 
										}, 3000);
								},
						success : function(data) {

										if(data.result === "success") {
														console.log(data);

														$("#email").prop('disabled', false);

														$("#email").val("Registered ! See You soon.");	

														setTimeout(function(){ 
																$("#email").val(email); 
														}, 3000);
										}
										else {
														console.log(data);

														$("#email").prop('disabled', false);

														if(data.msg.search(('alreay subscribed') != -1) || (data.msg.search('many') != 1))
																$("#email").val("Already registered !");	
														else
																$("#email").val("Error. Try again later !");	

														setTimeout(function(){ 
																$("#email").val(email); 
														}, 3000);
										}
								}
						});


}
