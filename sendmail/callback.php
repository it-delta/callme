<?php
$message['msg'] = 
'
<div class="callme-header"> 
    Ожидайте, мы скоро Вам перезвоним 
</div>
<div class="callme-header"> 
    Расскажите о нас своим друзьям! 
</div> 
<script type="text/javascript" src="http://vk.com/js/api/share.js?86" charset="windows-1251"></script>
<a href="http://vk.com/share.php?url=http%3A%2F%2Fit-delta.ru%2F" target="_blank" style="float: left" onclick="return VK.Share.click(0, this);">
    <img style="position: absolute; width: 40px; height: 40px" src="./images/vkontakte-logo.png" />
</a>
';
echo json_encode($message);
?>
