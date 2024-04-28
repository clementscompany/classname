<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header('Connection: keep-alive');
require_once './class/class.php';

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $dataInput = filter_input_array(INPUT_POST);

    function controler($path, $data){
        $sistema = new sistema;
        $response = [];
        if (!empty($data['username']) && !empty($data['password'])) {
            switch ($path) {
                case '/login':
                    $response['login'] = $sistema->adminLogin($data['username'], $data['password']);
                    break;

                default:
                    # code...
                    break;
            }
        }
        else{
            $response['error'] = "Preencha todos os Campos!";
        }

        #pesquisar dados!
        if (!empty($data['dataSearch'])) {
            $response['resultsearch'] = $sistema->pesquisar($data['dataSearch']);
        }
        echo json_encode($response);
    }

    $caminho = $_POST['path'];
    controler($caminho, $dataInput);
}

if ($_SERVER['REQUEST_METHOD'] === "GET") {
    $senData = new sistema;

    $dataDash = [
        "listasDashboard"=>$senData->listDasboard()
    ];
    echo json_encode($dataDash);
}
?>
