<?php
    header("Acces-Control-Allow-ORigin: *");
    header("Acces-Control-Allow-Methods: POST, PUT, GET, DELETE, OPNIONS");
    header("Acces-Control-Allow-Headers: Content-Type");

    require_once "../php/class/class.php";
    $sistema =  new sistema;
    $dataInput = filter_input_array(INPUT_POST, FILTER_DEFAULT);

    $response = [];
    switch($dataInput['path']){
        case "/aluno":
            $response['delete'] = $sistema->eliminarAluno($dataInput['idDelete']);
    }

    echo json_encode($response);

?>
