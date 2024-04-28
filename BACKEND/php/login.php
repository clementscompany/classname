<?php

header("Acces-Control-Allow-Origin:*");
header("Acces-Control-Allow-Method: POST, PUT, GET, DELETE, OPINIONS");
header("Acces-Control-Allow-Headers: Content-Type");

include './class/class.php';
$classUser = new sistema;

$senha = $_POST['senha'];
$bilhete = $_POST['bilhete'];

$response = array();

if(!empty($senha) && !empty($bilhete)){

    if($classUser->logar($bilhete,$senha)){

        $response['session'] = $classUser->logar($bilhete,$senha);
        $response['sucess'] = "Dados confirmados com sucesso!";
    }
    else {
        $response['error'] = "Senha ou Bilhete Inválido!";
    }

}
else{
    $response['error'] = "Existe Alguns Campos vazios!";
}

echo json_encode($response) . "\n\n";




