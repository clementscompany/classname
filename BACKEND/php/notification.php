<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, PUT, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require_once './class/class.php';

$isstema = new sistema;
$data = filter_input_array(INPUT_POST, FILTER_DEFAULT);
$message = [];
if (!empty($data['message'])) {
    if (!empty($data['id'])) {
        if (is_array($data['id'])) {
            foreach($data['id'] as $id => $aluno){
                if ($isstema->notifivarAluno($id, $data['message'])['sucess'] == true) {
                    $message['sucess'] = "Enviado com sucesso!";
                } else{
                    $message['error'] = "Erro ao enviar!";
                }
            }
        }
    } else{
        $message['error'] = "Seleccione o aluno desejado!";
    }

} else{
    $message['error'] = "Digite alguma mensagem!";
}
echo json_encode($message);