<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require './validation.php';
require_once "./class/class.php";
$sistema = new sistema;
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['idUser']) && !empty($_POST['idUser'])) {
        $response = [];
        if (isset($_FILES['foto'])) {
        if (
            !empty($_FILES['foto']['name']) &&
            !empty($_FILES['nif']['name']) &&
            !empty($_FILES['declaracao']['name']) &&
            !empty($_FILES['atestado']['name']) &&
            !empty($_FILES['bilhete']['name']) 
            ) {
            $fotoDerosto = $_FILES['foto']['name'];
            $caminho = $_FILES['foto']['tmp_name'];
            $tipo = $_FILES['foto']['type'];
            $extensao = pathinfo($fotoDerosto, PATHINFO_EXTENSION);
            $permissoes = ['jpg','jpeg','png'];
            if(in_array($extensao, $permissoes)){

                $nif = $_FILES['nif']['name'];
                $declaracao = $_FILES['declaracao']['name'];
                $atestado = $_FILES['atestado']['name'];
                $bilhete = $_FILES['bilhete']['name'];

                $expensoes = array(
                    'expensaoNif' => pathinfo($nif, PATHINFO_EXTENSION),
                    'expensaoDec' => pathinfo($declaracao, PATHINFO_EXTENSION),
                    'expensaoAtes' => pathinfo($atestado, PATHINFO_EXTENSION),
                    'expensaoBi' => pathinfo($bilhete, PATHINFO_EXTENSION)
                );
                $docsPermission = "pdf";
                
                $validExtensions = true;
                foreach ($expensoes as $extensao) {
                    if ($extensao !== $docsPermission) {
                        $validExtensions = false;
                        break;
                    }
                }
                
                if ($validExtensions) {

                    $caminhoNif = $_FILES['nif']['tmp_name']; 
                    $caminhoDecl = $_FILES['declaracao']['tmp_name'];
                    $caminhoAtes = $_FILES['atestado']['tmp_name'];
                    $caminhoBilhete = $_FILES['bilhete']['tmp_name'];

                    $random = rand(time(), 10000);
                    $nomeFoto = $random.$fotoDerosto;
                    $nomeNif = $random.$nif;
                    $nomeDecl = $random.$declaracao;
                    $nomeAtes = $random.$atestado;
                    $nomeBilhete = $random.$bilhete;

                    $data = new DateTime();
                    $ano = $data->format('Y');
                    
                    move_uploaded_file($caminho, './upload/img/'.$nomeFoto.'');
                    move_uploaded_file($caminhoNif,'./upload/docs/'.$nomeNif.'');
                    move_uploaded_file($caminhoDecl,'./upload/docs/'.$nomeDecl.'');
                    move_uploaded_file($caminhoAtes,'./upload/docs/'.$nomeAtes.'');
                    move_uploaded_file($caminhoBilhete,'./upload/docs/'.$nomeBilhete.'');

                    $response['matricula'] = $sistema->matricular(
                        $_POST['idUser'],
                        $nomeFoto,
                        $nomeDecl,
                        $nomeAtes,
                        $nomeBilhete,
                        $ano
                    );

                } else {
                    $response['error'] = "Apenas documentos PDF";
                }
                         
            } else{
                $response['error'] = "Foto deve ser apenas do tipo PNG, JPG ou JPEG";
            }
        } else{
            $response['error'] = "Selecione Todos os documentos!";
        }
        }

    }

    echo json_encode($response);
    exit;
}


