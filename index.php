<?php
?>
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<!-- <link rel="shortcut icon" type="image/x-icon" href="../fines/images/**.ico"> -->
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="styles/konvertik.css">
</head>

	<header>
		<div class="header__container">
			<div class="header__top">
				<a class="header__title">Конвертик</a>
			</div>
			<div class="header__bottom">
				<p class="header__text">Привет! Конвертик - инструмент для конвертации. Здесь ты сможешь провести конвертацию своего Excel файла, следуй за шагами:)</p>
			</div>
		</div>
	</header>
	<body>
		<div class="container">
			<div class="div_centre">
				<div class="center__btn">
					<div class="action__btn">
						<div class="div_upload_initial_excel">Приложить исходный excel файл</div>
						<p class="discr__text">Здесь приложи файл, который нужно сконвертировать</p>
					</div>
					<div class="action__btn">
						<div class="div_upload_result_excel">Приложить итоговый excel файл</div>
						<p class="discr__text">Тут файл только со столбцами</p>
					</div>
					<div class="action__btn">
						<div class="div_proceed">Загрузить файлы</div>
						<p class="discr__text">А теперь жми сюда</p>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
<script src="scripts/js/konvertik_operate.js"></script>