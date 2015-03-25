<?
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
$number = $_POST['number']; 
$name = $_POST['name'];

require_once($_SERVER["DOCUMENT_ROOT"] . "/bitrix/modules/main/include.php");
$arEventFields = array(
		"NUMBER" => $number,
		"NAME" => $name,
		"EMAIL" => $_POST['email'],
		"TIME" => $_POST['time'],
		"SUBJECT" => $_POST['subject']
);
if (CModule::IncludeModule("main") && strlen($number) > 0 && strlen($name) > 0):
    
    $socialURL = 
    $message['msg'] = 'http://vk.com/share.php?url=http%3A%2F%2Fit-delta.ru%2F';
    '
    <div class="callme-header"> 
	Ожидайте, мы скоро Вам перезвоним 
    </div>
    <div class="callme-header"> 
	Расскажите о нас своим друзьям! 
    </div> 
    <script type="text/javascript" src="http://vk.com/js/api/share.js?86" charset="windows-1251"></script>
    <a href="'.$socialURL.'" target="_blank" style="float: left" onclick="return VK.Share.click(0, this);">
	<img style="position: absolute; width: 40px; height: 40px" src="./images/vkontakte-logo.png" />
    </a>
    ';
	if (CEvent::Send("CALL_ME", "ls", $arEventFields)):
		echo json_encode($message);
		return;
	endif;
endif;
echo json_encode(array('erorr' => 'Что-то пошло не так. Попробуйте позднее'));
return;
?>