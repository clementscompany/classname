<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once "class/class.php";
$sistema = new sistema;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = []; 
    $inputs = filter_input_array(INPUT_POST, FILTER_DEFAULT);
    if ($inputs !== null && $inputs !== false) {
       
        $id = $inputs['id'];
        $nomeCompleto = $inputs['nomeCompleto'];
        $classe = $inputs['classe'];
        $bilhete = $inputs['bilhete'];
        $genero = $inputs['genero'];
        $telefone = $inputs['telefone'];
        $curso = $inputs['curso'];
        
        $response = $sistema->updateData(
            $id,
            $nomeCompleto,
            $classe,
            $bilhete,
            $genero,
            $telefone,
            $curso
        );
        
    } 

    echo json_encode($response);
} else {
    http_response_code(405);
    echo json_encode(array("message" => "Método não permitido."));
}

