<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Acces-Control-Headers:Content-Type");


include "./class/class.php";
$sistema = new sistema;
$data = filter_input_array(INPUT_POST, FILTER_DEFAULT);
if ($sistema->chatMessage($data['reciver'], $data['sender'],$data['message']) == true) {
    echo json_encode(['response'=>'Mensagem enviada com sucesso!']);
}
