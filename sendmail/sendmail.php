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
	if (CEvent::Send("CALL_ME", "ls", $arEventFields)):
		echo "ok";
		return;
	endif;
endif;
echo "not ok";
return;
?>