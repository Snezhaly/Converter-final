document.addEventListener('DOMContentLoaded', konvertik_page_ready);


function konvertik_page_ready()
{	document.getElementsByClassName('div_proceed')[0].addEventListener('click', upload_files);
	sessionStorage.setItem('data', '');
}

document.getElementById('input_initial_excel').addEventListener('change', function(){
	if( this.value ){
		document.getElementById("desc1").innerHTML = document.getElementsByClassName("input_initial_excel")[0].files[0].name + '<i id="delete_file_input1" class="fas fa-times delete"></i>';
	
		document.getElementById('delete_file_input1').addEventListener('click', function(){
			document.getElementById('input_initial_excel').value= null;
			document.getElementById("desc1").innerHTML = "Загрузите файл с данными";
		  });
		
	} else { // Если после выбранного тыкнули еще раз, но дальше cancel
	}
  });
  document.getElementById('input_result_excel').addEventListener('change', function(){
	if( this.value ){
		document.getElementById("desc2").innerHTML = document.getElementsByClassName("input_result_excel")[0].files[0].name + '<i id="delete_file_input2" class="fas fa-times delete"></i>';
	
		document.getElementById('delete_file_input2').addEventListener('click', function(){
			document.getElementById('input_result_excel').value= null;
			document.getElementById("desc2").innerHTML = "Загрузите файл со столбцами для конвертации";
		  });
		
	} else { // Если после выбранного тыкнули еще раз, но дальше cancel
	}
  });




function upload_files()
{
	sessionStorage.setItem('data', '');
	let datum = new FormData();
	if (document.getElementsByClassName('input_initial_excel')[0].files[0] == null || document.getElementsByClassName('input_result_excel')[0].files[0] == null) {
		document.getElementById("desc3").innerHTML = "У ВАС НЕ ВЫБРАНЫ НЕКОТОРЫЕ ИЗ ФАЙЛОВ!";
		document.getElementById("desc3").style.color='red';
		} else {
			

	datum.append('initial_file', document.getElementsByClassName('input_initial_excel')[0].files[0]);
	datum.append('result_file', document.getElementsByClassName('input_result_excel')[0].files[0]);
	let request = fetch(
		'../../scripts/php/file_proceed.php',
		{
			method: 'POST',
			headers:
			{
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: 	datum
		}).then((response) =>
			{
				response.text().then((text) =>
				{
					// console.log(text);
					// return;
					// document.getElementsByClassName('input_initial_excel')[0].remove();
					// document.getElementsByClassName('input_result_excel')[0].remove();
					document.getElementById('input_result_excel').value= null;			
					document.getElementById('input_initial_excel').value= null;
			document.getElementById("desc1").innerHTML = "Загрузите файл с данными";
			document.getElementById("desc2").innerHTML = "Загрузите файл со столбцами для конвертации";
			document.getElementById("desc3").innerHTML = "Конвертировать";

					layout_data(text);
				});
			});
		}		
	}

function layout_data(text)
{
	let server_data = JSON.parse(text);
	let initial_column_head = JSON.stringify(server_data.initial);
	let result_column_head = JSON.stringify(server_data.result);
	sessionStorage.setItem('initial', initial_column_head);
	sessionStorage.setItem('result', result_column_head);
	// return;
	// result_column_head.unshift('');
	let div_shadow = create_element('div', 'div_shadow');
	document.body.append(div_shadow);
	let div_data_proceed = create_element('div', 'div_data_proceed');
	div_shadow.append(div_data_proceed);
	div_data_proceed.innerHTML = '<div class="div_close"><span class="span_close">&times;</span></div>';
	initial_column_head = JSON.parse(initial_column_head);
	for(let key in initial_column_head)
	{
		let div_single_data_proceed = create_element('div', 'div_single_data_proceed');
		let div_data_proceed_value = create_element('div', 'div_data_proceed_value');
		div_data_proceed_value.textContent = initial_column_head[key];
		div_data_proceed_value.setAttribute('column_from', key);
		div_single_data_proceed.append(div_data_proceed_value);
		div_data_proceed.append(div_single_data_proceed);

		let div_inputs = create_element('div', 'div_inputs');
		div_single_data_proceed.append(div_inputs);

		let input_implode = create_element('input', 'input_implode');
		input_implode.type = 'checkbox';
		div_inputs.append(input_implode);

		let div_input_title = create_element('div', 'div_input_title');
		div_input_title.textContent = 'соединить';
		div_inputs.append(div_input_title);

		let input_explode = create_element('input', 'input_explode');
		input_explode.type = 'checkbox';
		div_inputs.append(input_explode);

		div_input_title = create_element('div', 'div_input_title');
		div_input_title.textContent = 'разделить';
		div_inputs.append(div_input_title);

		let div_heads_chosen = create_element('div', 'div_heads_chosen');
		div_heads_chosen.textContent = 'кликнуть для выбора столбцов';
		div_single_data_proceed.append(div_heads_chosen);

		div_heads_chosen.addEventListener('click', show_select(div_heads_chosen));
	}
	let button_send = create_element('button', 'button_send btn');
	button_send.textContent = 'Конвертировать';
	div_data_proceed.append(button_send);
	button_send.addEventListener('click', convert);
	document.getElementsByClassName('span_close')[0].addEventListener('click', remove_element('div_shadow', 0));
}
function convert()
{
	remove_element('a_link', 0)();
	let datum = new FormData();
	datum.append('file_data', sessionStorage.getItem('data'));
	let request = fetch(
		'../../scripts/php/converter.php',
		{
			method: 'POST',
			headers:
			{
				// 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
			},
			body: 	datum
		}).then((response) =>
			{
				response.text().then((text) =>
				{
					// console.log(text);
					// return;
					let a_link = create_element('a', 'a_link');
					a_link.href = text;
					document.body.append(a_link);
					a_link.click();
				});
			});
}

function check_div_inputs()
{
	let div_inputs = document.getElementsByClassName('div_inputs');
	for(let i = 0; i < div_inputs.length; i++)
	{
		if
		(
			!div_inputs[i].getElementsByClassName('input_implode')[0].checked&&
			!div_inputs[i].getElementsByClassName('input_explode')[0].checked
		)
		{
			div_inputs[i].style.backgroundColor = 'coral';
			setTimeout(()=>{div_inputs[i].style.backgroundColor = ''}, 1000);
			return false;
		}
	}
	return true;
}
function show_select(div_heads_chosen)
{
	return ()=>
	{
		let implode = div_heads_chosen.previousElementSibling.getElementsByClassName('input_implode')[0];
		let explode = div_heads_chosen.previousElementSibling.getElementsByClassName('input_explode')[0];
		if(!implode.checked&&!explode.checked)
		{
			div_heads_chosen.previousElementSibling.style.backgroundColor = 'coral';
			setTimeout(()=>{div_heads_chosen.previousElementSibling.style.backgroundColor = ''}, 1000);
			return;
		}
		else
		{
			let option_collection;
			let action;
			let title;
			let object_data;
			let column_from;
			if(sessionStorage.getItem('data') != '')
			{
				object_data = JSON.parse(sessionStorage.getItem('data'));
			}
			else
			{
				object_data = new Object;
			}
			
			if(implode.checked)
			{
				option_collection = JSON.parse(sessionStorage.getItem('initial'));
				action = 'implode';
				title = 'Соединить значения';
			}
			if(explode.checked)
			{
				option_collection = JSON.parse(sessionStorage.getItem('result'));
				action = 'explode';
				title = 'Разделить по колонкам';
				column_from = div_heads_chosen.parentNode.getElementsByClassName('div_data_proceed_value')[0].getAttribute('column_from');
				object_data[column_from] = new Object;
			}
			let div_shadow = create_element('div', 'div_shadow');
			document.body.append(div_shadow);
			let div_result_head = create_element('div', 'div_result_head');
			div_shadow.append(div_result_head);

			let div_result_head_title = create_element('div', 'div_result_head_title');
			div_result_head_title.textContent = title;
			div_result_head.append(div_result_head_title);

			let select_result_head = create_element('select', 'select_result_head');
			select_result_head.multiple = 'multiple';
			div_result_head.append(select_result_head);
			for(let key in option_collection)
			{
				let option = new Option(option_collection[key], key, false, false);
				select_result_head.append(option);
			}
			let button_choose_select = create_element('button', 'button_choose_select btn');
			button_choose_select.textContent = 'Выбрать';
			div_result_head.append(button_choose_select);
			button_choose_select.addEventListener('click', choose_selection(div_shadow, div_heads_chosen, action, object_data, column_from));
		}
	}
}
function choose_selection(div_shadow, div_heads_chosen, action, object_data, column_from)
{
	return ()=>
	{
		let select = document.getElementsByClassName('select_result_head')[0];
		let array_chosen = [];
		let array_columns_chosen = [];
		for(let i = 0; i < select.children.length; i++)
		{
			if(select.children[i].selected)
			{
				array_chosen.push(select.children[i].textContent);
				array_columns_chosen.push(select.children[i].value);
			}
		}
		if(array_chosen.length == 0)
		{
			return;
		}
		div_heads_chosen.textContent = array_chosen;

		if(action == 'implode')
		{
			div_shadow.getElementsByClassName('button_choose_select')[0].remove();
			div_shadow.getElementsByClassName('div_result_head_title')[0].textContent = 'Соединить значения в колонку';
			let div_result_head = div_shadow.getElementsByClassName('div_result_head')[0];

			let select_result_head = div_shadow.getElementsByClassName('select_result_head')[0];
			let array_chosen_temporary = [];
			for(let i = 0; i < select_result_head.options.length; i++)
			{
				if(select_result_head.options[i].selected)
				{
					array_chosen_temporary.push(select_result_head.options[i].value);
				}
			}
			select_result_head.multiple = false;
			select_result_head.innerHTML = '';
			select_result_head.style.height = '5%';
			let option_collection = JSON.parse(sessionStorage.getItem('result'));
			for(let key in option_collection)
			{
				let option = new Option(option_collection[key], key, false, false);
				select_result_head.append(option);
			}
			let button_choose_select_additional = create_element('button', 'button_choose_select_additional btn');
			button_choose_select_additional.textContent = 'Выбрать';
			div_result_head.append(button_choose_select_additional);
			button_choose_select_additional.addEventListener('click', choose_selection_additional(div_shadow, div_heads_chosen, array_chosen_temporary));
		}
		else
		{
			object_data[column_from] = array_columns_chosen.join(',');
			sessionStorage.setItem('data', JSON.stringify(object_data));
			div_shadow.remove();
		}
	}
}
function choose_selection_additional(div_shadow, div_heads_chosen, array_chosen_temporary)
{
	return ()=>
	{
		let select = div_shadow.getElementsByClassName('select_result_head')[0];
		div_heads_chosen.textContent += ' в колонку ' + select.options[select.selectedIndex].textContent;
		if(sessionStorage.getItem('data') != '')
		{
			object_data = JSON.parse(sessionStorage.getItem('data'));
		}
		else
		{
			object_data = new Object;
		}
		object_data[array_chosen_temporary.join(',')] = select.options[select.selectedIndex].value;
		sessionStorage.setItem('data', JSON.stringify(object_data));
		div_shadow.remove();
	}
}
function remove_element(class_name, number)
{
	return () =>
	{
		if(document.getElementsByClassName(class_name)[number])
		{
			document.getElementsByClassName(class_name)[number].remove();
		}
	}
}
function create_element(tag_name, class_name)
{
	let new_element = document.createElement(tag_name);
	if (class_name == "input_initial_excel") {
		new_element.accept=".xls, .xlsx";
	}
	if (class_name == "input_result_excel") {
		new_element.accept=".xls, .xlsx";
	}
	new_element.className = class_name;
	return new_element;
}