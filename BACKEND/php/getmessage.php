<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include_once './class/class.php';
$sistema = new sistema;
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $data = file_get_contents("php://input");
    $decodedData = json_decode($data);
    
    $sender = $decodedData->sender;
    $reciver = $decodedData->reciver;

    $response = array();
    $response['message'] = $sistema->getMessage($sender,$reciver);
    echo json_encode($response);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método não permitido']);
    exit;
}

