<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
require_once './class/class.php';

$senData = new sistema;

$dataDash = [
    "listasDashboard" => $senData->listDasboard()
];
echo "data: " . json_encode($dataDash) . "\n\n";
