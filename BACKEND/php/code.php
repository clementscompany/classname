<?php

header("Acces-Control-Allow-Origin: * ");
header("Acces-Control-Allow-Method: POST, PUT, GET,DELETE, OPNIONS");
header("Acces-Control-Allow-Headers: Content-Type ");


include_once "class/class.php";
$chave = addslashes($_POST['chaveAcesso']);
$userClass = new sistema;
$resposta = array();

if(!empty($chave)){

  if(!empty($_POST['termo'])){

    if($userClass->chaveAcesso($chave) == true){
      $resposta['sucess'] = "Chave confirmada com sucesso!";
    } else{
      $resposta['error'] = "Chave de acesso incorrecta";
    }

  } else{
    $resposta['error'] = "Você precisa concordar com os nossos termos!";
  }

} else{
  $resposta['error'] = "Coloque a sua chave de aceso!";
}

echo json_encode($resposta);


