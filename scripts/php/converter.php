<?php
error_reporting(E_ALL);
ini_set('display_startup_errors', 1);
ini_set('display_errors', '1');
define('FOLDER_ROOT', '../../');

// print_r($_POST);
// exit();
include '../../templates/letters.php';

$array_column_data = json_decode($_POST['file_data'], true);

require 'C:\OSPanel\vendor\autoload.php';//здесь нужно указать путь до библиотеки phpspreadsheet;
//устанавливается composer require phpoffice/phpspreadsheet
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
$reader = new \PhpOffice\PhpSpreadsheet\Reader\Xlsx();

$spreadsheet = $reader->load(FOLDER_ROOT.'files/initial_file.xlsx');
$worksheet = $spreadsheet->getActiveSheet();
$array_initial_data = $worksheet->toArray();

$spreadsheet = $reader->load(FOLDER_ROOT.'files/result_file.xlsx');
$worksheet = $spreadsheet->getActiveSheet();


for($i = 1; $i < count($array_initial_data); $i++)
{
	foreach ($array_column_data as $key => $value)
	{
		if(strlen($key) == 1)
		{
			$array_temp = explode(',', $value);
			$column = array_search($key, $array_letters);
			$array_column_initial_data = explode(',', $array_initial_data[$i][$column]);
			$array_column_initial_data = explode(' ', $array_column_initial_data[0]);
			foreach($array_column_initial_data as $column_number => $cell_value)
			{
				$worksheet->setCellValueExplicit
				(
					$array_temp[$column_number].($i + 1),
					$cell_value,
					\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING 
				);
			}
		}
		else
		{
			$array_temp = explode(',', $key);
			$array_temporary_cell_value = [];
			foreach ($array_temp as $column_letter)
			{
				$column_number = array_search($column_letter, $array_letters);
				array_push($array_temporary_cell_value, $array_initial_data[$i][$column_number]);
			}
			$worksheet->setCellValueExplicit
			(
				$value.($i + 1),
				implode(', ', $array_temporary_cell_value),
				\PhpOffice\PhpSpreadsheet\Cell\DataType::TYPE_STRING 
			);
		}
		unset($column, $array_column_initial_data, $array_temp, $array_temporary_cell_value);
	}
}

$writer = new \PhpOffice\PhpSpreadsheet\Writer\Xlsx($spreadsheet);
$file_record = FOLDER_ROOT.'files/result_file_new.xlsx';
$writer->save($file_record);
echo '/files/result_file_new.xlsx';
function search_index($array, $text)
{
	foreach ($array as $key => $value)
	{
		if($value == $text)
		{
			return $key;
		}
	}
}
?>