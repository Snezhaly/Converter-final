<?php
error_reporting(E_ALL);
ini_set('display_startup_errors', 1);
ini_set('display_errors', '1');
define('FOLDER_ROOT', '../../');

move_uploaded_file($_FILES['result_file']['tmp_name'], FOLDER_ROOT.'files/result_file.xlsx');
move_uploaded_file($_FILES['initial_file']['tmp_name'], FOLDER_ROOT.'files/initial_file.xlsx');

include 'C:\OSPanel\domains\service.loc\templates\letters.php';
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
$array_result_data = $worksheet->toArray();

echo json_encode(['initial'	=> reletterd($array_initial_data[1], $array_letters), 'result'	=> reletterd($array_result_data[0], $array_letters)], JSON_UNESCAPED_UNICODE);
function reletterd($array, $array_letters)
{
	$array_result = [];
	foreach($array as $key => $value)
	{
		$array_result[$array_letters[$key]] = $value;
	}
	return $array_result;
}
?>