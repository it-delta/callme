var interval;
var mainInterval;
function startInterval() {
	mainInterval = setInterval(function() {
		var rot = 15;
		var index = 0;
		interval = setInterval(function() {
			if(index < 7)
				rot *= -1;
		index++;
		jQuery(".callme-phone").css({
			"-webkit-transform": "rotate("+rot.toString()+"deg)",
			"-moz-transform": "rotate("+rot.toString()+"deg)",
			"-o-transform": "rotate("+rot.toString()+"deg)",
			"-ms-transform": "rotate("+rot.toString()+"deg)",
			"-webkit-transform":  "rotate("+rot.toString()+"deg)",
			"-webkit-transition-duration": "0.15s",
			"-moz-transition-duration": "0.15s",
			"-o-transition-duration": "0.15s",
			"transition-duration": "0.15s",
		});
		if(index == 6)
			rot = -1;
		else if(index == 7) {
			rot = 15;
			index = 0;
			clearInterval(interval);
		}
		}, 150);
	}, 5000);
}


$(document).ready(function(){
		var formIsOpen;
		var phoneOnFocus = false;
		$("div.callme-phone").mouseenter(function(){
			$(this).animate({
				opacity: 1
			}, 100);
			phoneOnFocus = true;
		});
		
		$("div.callme-phone").mouseleave(function(){
			$(this).animate({
				opacity: 0.8
			}, 100);
			phoneOnFocus = false;
		});
		
		
		//Анимация кнопки
		var scale = 1;
		var duration = 0;
		var isMaximazed = false;
		setInterval(function(){
			if(!isMaximazed)
				{
					$("div.callme-circle").css({
						"opacity": "0.4",
						"transition": "opacity 0.3s ease",
						"-webkit-transition": "opacity 0.3s ease",
						"-moz-transition": "opacity 0.3s ease",
						"-o-transition": "opacity 0.3s ease",
						"-ms-transform": "scale(1)", /* IE 9 */
				    	"-webkit-transform": "scale(1)", /* Chrome, Safari, Opera */
				    	"transform": "scale(1)",
					});
					isMaximazed = true;
				}
			else if(isMaximazed && !phoneOnFocus)
			{
				$("div.callme-circle").css({
					"opacity": "0",
					"-ms-transform": "scale(1.2)", /* IE 9 */
			    	"-webkit-transform": "scale(1.2)", /* Chrome, Safari, Opera */
			    	"transform": "scale(1.2)",
			    	"transition": "All 1s ease",
					"-webkit-transition": "All 1s ease",
					"-moz-transition": "All 1s ease",
					"-o-transition": "All 1s ease",
				});
				isMaximazed = false;
			}
		}, 800);
		
		//Вызов формы
		$(".main-phone").click(function(){
			if(formIsOpen)
				return false;
			$(".callme-form").fadeIn("slow");
			$(".callme-form-background").fadeIn("slow");
			formIsOpen = true;
		});
		$(".callme-phone").click(function(){
			if(formIsOpen)
				return false;
			$(".callme-form").fadeIn("slow");
			$(".callme-form-background").fadeIn("slow");
			formIsOpen = true;
		});
		
		//Закрыть форму
		$(".callme-close").click(function(){
			$(".callme-form-background").fadeOut("slow");
			$(".callme-form").fadeOut("slow", function() {
				$("#content1").fadeIn("fast");
				$("#content2").fadeOut("fast");
			});
			$(".callme-input").val("");
			formIsOpen = false;
			$("#content1 .callme-header").text("Оставьте свой телефон и мы перезвоним вам");
		});
		

		//отправка сообщения
		$("button.callme-send").click(function() {
			if(!$(".callme-input.number").val().match(/^[+]?\d+$/) || $(".callme-input.name").val().length == 0){
				$(".callme-input.number").keyup();
				$(".callme-input.name").keyup();
				return false;
			}	
			$.ajax({
				type: 'post',
				url: '/sendmail/sendmail.php',
				data: { "number": $(".callme-input.number").val(),  "name": $(".callme-input.name").val(), "email": $(".callme-input.email").val(), "time": $(".callme-input.time").val(), "subject": $(".callme-input.subject").val()},
				success: function(response) { 
					if(response == "ok") 
					{
						$("#content1").fadeOut("fast", function() {
							$("#content2").fadeIn("slow");
						});
					}
					else $("#content1 .callme-header").text("Что-то пошло не так. Попробуйте позднее");
				}
			}).fail(function() {
				$("#content1 .callme-header").text("Что-то пошло не так. Попробуйте позднее");
			});
		});
		
		

		
		$(".callme-input.number").keyup(function() {
			if(!$(this).val().match(/^[+]?\d+$/) || $(this).val().length < 7)
			{
				$(this).addClass("redBorder");
			}
			else if($(this).css("border-bottom-color", "#ff0000"))
			{
				$(this).removeClass("redBorder");
			}
		});
		
		
		$(".callme-input.name").keyup(function() {
			if($(".callme-input.name").val().length == 0)
			{
				$(this).addClass("redBorder");
			}
			else 
			{
				$(this).removeClass("redBorder");
			}
		});
		startInterval();
	});