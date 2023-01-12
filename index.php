<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title>Конвертик</title>
	<!-- <link rel="shortcut icon" type="image/x-icon" href="../fines/images/**.ico"> -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" rel="stylesheet"/>
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="styles/konvertik.css">
	<link rel="stylesheet" href="media.css">
</head>
	<header>
		<div class="header__container">
			<div class="header__top">
				<div id="breathing-button"><a href="#" class="header_title">Конвертик</a></div>
			</div>
			<div class="header__bottom">
				<p class="header__text">Привет! Конвертик - инструмент для конвертации. Здесь ты сможешь провести конвертацию своего Excel файла, следуй за шагами :)</p>
			</div>
		</div>
	</header>
	<body>
		<div class="container">
			<div class="div_centre">
				<div class="center__btn">
					<div class="action__btn">
						<label for="input_initial_excel" style="display: contents;">
						<div class="div_upload_initial_excel btn">Загрузить исходный excel файл</div>
						</label>
						<p id="desc1" class="discr__text">Загрузите файл с данными</p>
					</div>
					<div class="action__btn">
					<label for="input_result_excel" style="display: contents;">
						<div class="div_upload_result_excel btn">Загрузить итоговый excel файл</div>
						</label>
						<p id="desc2" class="discr__text">Загрузите файл со столбцами для конвертации</p>
					</div>
					<div class="action__btn">
						<div class="div_proceed btn">Конвертировать</div>
						<p id="desc3" class="discr__text">Выполните конвертацию</p>
					</div>
				</div>
			</div>
		</div>
		<input accept=".xls, .xlsx" name="input_initial_excel" id="input_initial_excel" class="input_initial_excel" type="file">
		<input accept=".xls, .xlsx" name="input_result_excel" id="input_result_excel" class="input_result_excel" type="file">
	</body>
</html>
<script src="scripts/js/konvertik_operate.js"></script>