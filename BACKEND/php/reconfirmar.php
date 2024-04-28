<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require './validation.php';
require_once "./class/class.php";

$sistema = new sistema;

if ($_SERVER['REQUEST_METHOD'] === "POST") {
    if (isset($_POST['idUser']) && !empty($_POST['idUser'])) {
        $nomeImagem = $_FILES['foto']['name'];
        $nomeBilhete = $_FILES['bilhete']['name'];
        $response = [];

        if (!empty($nomeImagem) && !empty($nomeBilhete)) {
            $imagensPermitidas = ['png', 'jpg', 'jpeg'];
            $extensaoImagem = pathinfo($nomeImagem, PATHINFO_EXTENSION);
            if (!in_array($extensaoImagem, $imagensPermitidas)) {
                $response['error'] = "Tipo de imagem não permitido!";
            }

            $extensaoBilhete = pathinfo($nomeBilhete, PATHINFO_EXTENSION);
            if ($extensaoBilhete != "pdf") {
                $response['error'] = "O documento inserido deve ser do tipo PDF";
            }

            if (empty($response['error'])) {
                $rand = rand(time(), 10000);
                $novoNomeImg = $rand.$nomeImagem;
                $novoNomeBi = $rand.$nomeBilhete;
                $pathImage = $_FILES['foto']['tmp_name'];
                $pathBilhete = $_FILES['bilhete']['tmp_name'];

                $data = new DateTime();
                $ano = $data->format('Y');
                if (
                    move_uploaded_file($pathImage, './upload/img/'.$novoNomeImg.'') &&
                    move_uploaded_file($pathBilhete, './upload/docs/'.$novoNomeBi.'')
                ) {
                    $response['reconfirmar'] = $sistema->reconfirmar(
                        $_POST['idUser'],
                        $novoNomeImg,
                        $novoNomeBi,
                        $_POST['classe'],
                        $ano
                    );
                }
             
            }
        } else {
            $response['error'] = "Selecione os documentos";
        }

        echo json_encode($response);
    }
}
?>
