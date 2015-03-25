# callme
Модуль для заказа обратного звонка 
# Как использовать?
Добавляем код
```javascript
$(document).ready(function() {
	var data = { name: $('.name').val() }; // Переопределяет json, передаваемый для модуля отправки сообщений
	var call = new Callme(data);//Передаем data в конструктор, если необходимо переопределить json объект
	call.Start();//Запускает модуль
	call.openForm();//Открыть заготовленную форму
	call.closeForm();//Закрыть форму
	call.sendModuleURL = "sendmail/callback.php";//указывает путь к модулю отправки сообщений
});
```
Заготовлены 2 кнопки
```html
<div class="callme-phone">
	<div class="callme-circle">
	</div>
</div>

<div class="main-phone">
	<p class="head">Заказать звонок</p>
	<p class="phone">(863) 209-89-89</p>
	<p class="phone second">(863) 200-23-65</p>
	<p class="footer">оставьте заявку!</p>
	<img src="./images/phone.png" />
</div>
```
# Требования к модулю рассылки
Модуль должен вывести на экран json строку с массивом.
```php
	echo json_encode(array('msg' => 'Готово!')); //Вернуть msg, если отправка успешна
```
```php
	echo json_encode(array('error' => 'Упс!')); //Вернуть error, если отправка не состоялась
```