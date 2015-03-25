/*
 * Конструктор объекта Callme
 * 
 * @constructor
 */
function Callme(ajaxData) {
    /** @private */this.interval = 0;
    /** @private */this.mainInterval = {};
    /** @private */this.formIsOpen = false;
    /** @private */this.phoneOnFocus = false;
    if(ajaxData !== undefined)
	this.ajaxData = function() { return ajaxData; };
}

/*
 * Запускает плагин
 *  
 * @returns {undefined}
 */
Callme.prototype.Start = function() {
    $("body").append('<div class="callme-form-background"></div><div class="callme-form"><div class="callme-close">&#215;</div><div class="callme-content" id="content1"><div class="callme-header"> Оставьте свой телефон и мы перезвоним вам </div><div class="callme-phone-input"> <input class="callme-input name" type="text" placeholder="Введите ваше имя*" value="" maxlength="18" ><input class="callme-input number" type="text" placeholder="Введите ваш телефон*" value="" maxlength="18" ><input class="callme-input email" type="text" placeholder="Введите ваш E-mail" value="" maxlength="18" ><input class="callme-input time" type="text" placeholder="Удобное время для звонка" value="" maxlength="18" ><input class="callme-input subject" type="text" placeholder="Интересующая тема" value="" maxlength="18" ><button class="callme-send">Жду звонка!</button></div></div><div class="callme-content" id="content2"></div></div>');
    this.Initialize();
    this.startAnimation();
};

//Ссылка для модуля
Callme.prototype.sendModuleURL = "/sendmail/sendmail.php";

/*
 * Запускает таймер для анимации
 * 
 * @return {undefined}
 */
Callme.prototype.startInterval = function() {
    var callme = this;
    this.mainInterval = setInterval(function() {
	var rot = 15;
	var index = 0;
	callme.interval = setInterval(function() {
	    if(index < 7)
		rot *= -1;
	index++;
	$(".callme-phone").css({
		"-webkit-transform": "rotate("+rot.toString()+"deg)",
		"-moz-transform": "rotate("+rot.toString()+"deg)",
		"-o-transform": "rotate("+rot.toString()+"deg)",
		"-ms-transform": "rotate("+rot.toString()+"deg)",
		"transform": "rotate("+rot.toString()+"deg)",
		"-webkit-transition-duration": "0.15s",
		"-moz-transition-duration": "0.15s",
		"-o-transition-duration": "0.15s",
		"transition-duration": "0.15s"
	});
	if(index === 6)
	    rot = -1;
	else if(index === 7) {
	    rot = 15;
	    index = 0;
	    clearInterval(this.interval);
	}
	}, 150);
    }, 5000);
};

/*
 * Запускает анимацию
 * 
 * @returns {undefined}
 */
Callme.prototype.startAnimation = function() {
    var isMaximazed = false;
    var callme = this;
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
	    "transform": "scale(1)"
	    });
	    isMaximazed = true;
	}
	else if(isMaximazed && callme.phoneOnFocus === false)
	{
	    $("div.callme-circle").css({
		    "opacity": "0",
		    "-ms-transform": "scale(1.2)", /* IE 9 */
	    "-webkit-transform": "scale(1.2)", /* Chrome, Safari, Opera */
	    "transform": "scale(1.2)",
	    "transition": "All 1s ease",
		    "-webkit-transition": "All 1s ease",
		    "-moz-transition": "All 1s ease",
		    "-o-transition": "All 1s ease"
	    });
	    isMaximazed = false;
	}
    }, 800);
};

/*
 * Отправляет сообщение
 * 
 * @param {string} url Строка, передающая расположение модуля sendmail.
 * @returns {undefined}
 */
Callme.prototype.sendMessage = function(url) {
    if(!$(".callme-input.number").val().match(/^[+]?\d+$/) || $(".callme-input.name").val().length === 0){
	$(".callme-input.number").keyup();
	$(".callme-input.name").keyup();
	return false;
    }	
    var callme = this;
    callme.ajaxPost(url, callme.ajaxData());
};

/*
 * Отправляет POST запрос
 * 
 * @param {object} data Объект с параметрами, отправляющимися на сервер
 * @returns {undefined}
 */
Callme.prototype.ajaxPost = function(url, data) {
    $.ajax({
	type: 'post',
	url: url,
	data: data,
	success: this.sendMessageSuccess
    }).fail(function() {
	    $("#content1 .callme-header").text("Что-то пошло не так. Попробуйте позднее");
    });
};

/*
 * Взовращает список параметров в виде объекта
 * 
 * @returns {object}
 */
Callme.prototype.ajaxData = function() {
    return { 
	number: $(".callme-input.number").val(),  
	name: $(".callme-input.name").val(), 
	email: $(".callme-input.email").val(), 
	time: $(".callme-input.time").val(), 
	subject: $(".callme-input.subject").val()
    };
};

/*
 * Вызывается при получении ответа
 * 
 * @param {string} response Ответ с сервера в виде строки
 * @returns {undefined}
 */
Callme.prototype.sendMessageSuccess = function(response) { 
    var obj = JSON.parse(response);
    if(obj !== null && obj.hasOwnProperty("msg")) 
    {
	$("#content2").html(obj.msg);
	$("#content1").fadeOut("fast", function() { $("#content2").fadeIn("slow"); });
    }
    else if(obj !== null && obj.hasOwnProperty("error"))
	$("#content1 .callme-header").text(obj.error);
    else 
	$("#content1 .callme-header").text("Что-то пошло не так. Попробуйте позднее");
};


/*
 * Инициализая обработчиков
 * 
 * @returns {undefined}
 */
Callme.prototype.Initialize = function() {
    var callme = this;
    $("div.callme-phone").mouseenter(function(){
	$(this).animate({opacity: 1}, 100);
	callme.phoneOnFocus = true;
    });

    $("div.callme-phone").mouseleave(function(){
	$(this).animate({
		opacity: 0.8
	}, 100);
	callme.phoneOnFocus = false;
    });
    
    //Вызов формы
    $(".main-phone").click(function(){
	callme.openForm();
    });
    $(".callme-phone").click(function(){
	callme.openForm();
    });

    //Закрыть форму
    $(".callme-close").click(function(){
	callme.closeForm();
    });


    //отправка сообщения
    $("button.callme-send").click(function() {
	callme.sendMessage(callme.sendModuleURL);
    });

    $(".callme-input.number").keyup(function() {
	if(!$(this).val().match(/^[+]?\d+$/) || $(this).val().length < 7)
	    $(this).addClass("redBorder");
	else if($(this).hasClass("redBorder"))
	    $(this).removeClass("redBorder");
    });


    $(".callme-input.name").keyup(function() {
	if($(".callme-input.name").val().length === 0)
	    $(this).addClass("redBorder");
	else 
	    $(this).removeClass("redBorder");
    });
};

Callme.prototype.openForm = function() {
    var callme = this;
    if(callme.formIsOpen)
	return false;
    $(".callme-form").fadeIn("slow");
    $(".callme-form-background").fadeIn("slow");
    callme.formIsOpen = true;
};
Callme.prototype.closeForm = function() {
    var callme = this;
    $(".callme-form-background").fadeOut("slow");
    $(".callme-form").fadeOut("slow", function() {
	$("#content1").fadeIn("fast");
	$("#content2").fadeOut("fast");
    });
    $(".callme-input").val("");
    callme.formIsOpen = false;
    $("#content1 .callme-header").text("Оставьте свой телефон и мы перезвоним вам");
};



