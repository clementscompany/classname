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
                    break;

        case "/matricula":
            $response['delete'] = $sistema->eliminarMatricula($dataInput['idDelete']);
                    break;

        case "/reconfirmar":
            $response['delete'] = $sistema->eliminarReconf($dataInput['idDelete']);
                    break;
            
        default:
                break;            
            
    }

    echo json_encode($response);


