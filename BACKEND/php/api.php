<?php

header("Access-Control-Allow-Origins: *");
header("Access-Control-Allow-Methods: POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
include_once './class/class.php';

#//////////////////////////////// controlando as rotas!
$dataInput = filter_input(INPUT_POST, FILTER_DEFAULT);
function controler($route,$id){
    $sistemeClass = new sistema;
    
    switch($route){
        case "/home":
           return homepage($sistemeClass, $id);

    }
}

function homepage($sistemeClass,$id){
  return $sistemeClass->painelAluno($id);
}

$idUser = $_POST['id'];
$routeUser = $_POST['route'];
$response = array();

if(controler($routeUser,$idUser)){
    $response['sucess'] = controler($routeUser,$idUser);
}
else{
    $response['Erro!'] = "404 NOT FOUND!";
}
echo json_encode($response);






