# callme
������ ��� ������ ��������� ������ 
# ��� ������������?
��������� ���
```javascript
$(document).ready(function() {
	var data = { name: $('.name').val() }; // �������������� json, ������������ ��� ������ �������� ���������
	var call = new Callme(data);//�������� data � �����������, ���� ���������� �������������� json ������
	call.Start();//��������� ������
	call.openForm();//������� ������������� �����
	call.closeForm();//������� �����
	call.sendModuleURL = "sendmail/callback.php";//��������� ���� � ������ �������� ���������
});
```
����������� 2 ������
```html
<div class="callme-phone">
	<div class="callme-circle">
	</div>
</div>

<div class="main-phone">
	<p class="head">�������� ������</p>
	<p class="phone">(863) 209-89-89</p>
	<p class="phone second">(863) 200-23-65</p>
	<p class="footer">�������� ������!</p>
	<img src="./images/phone.png" />
</div>
```
# ���������� � ������ ��������
������ ������ ������� �� ����� json ������ � ��������.
```php
	echo json_encode(array('msg' => '������!')); //������� msg, ���� �������� �������
```
```php
	echo json_encode(array('error' => '���!')); //������� error, ���� �������� �� ����������
```