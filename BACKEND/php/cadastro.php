<?php
header("Acces-Control-Allow-Origin: * ");
header("Acces-Control-Allow-Method: POST, PUT, GET,DELETE, OPNIONS");
header("Acces-Control-Allow-Headers: Content-Type ");

include_once './class/class.php';

///executar a funcao cadastrar 

    $nomeCompleto = $_POST['nomeCompleto'];
    $bilhete = $_POST['bilhete'];
    $telefone = $_POST['telefone'];
    $dataNascimento = $_POST['dataNascimento'];
    $senha = $_POST['senha'];
    $confirmarSenha = $_POST['conf'];
    $curso = $_POST['curso'];
    $classe = $_POST['classe'];
    $genero = $_POST['genero'];
    $chaveAcesso = "";

    $response = array();

    if($senha != $confirmarSenha){/// verificar se as senhas correspondem 
        $response['errorSenha'] = "As senhas não Correspondem!";
    }
    else{///verificar se existe mais algum campo vazio 
        if(!empty($curso) && !empty($classe) && !empty($genero)){
    
            $encSenha = password_hash($senha, PASSWORD_DEFAULT);
            $chaveEnc = rand(time(), 3000);
            $extend = "IMPJP";

            $chaveAcesso = $chaveEnc.$extend;
            
            $verifySisyem = new sistema;/// instanciar a classe 
            $cadastrarSstem = new sistema;
            if($verifySisyem->verificar($bilhete) == true){ //verificar se foi cadastrado com os mesmos dados 
    
                $response['error'] = "Já existe um aluno cadastrado com esses dados!";
    
            }
            else{
    
                if($cadastrarSstem->inscrever($nomeCompleto,$bilhete,$telefone,$dataNascimento,$encSenha,$curso,$classe,$genero,$chaveAcesso) == true){///se o cadastro foi bem sucedido!
    
                    $response['sucess'] = "Aluno cadastrado com sucesso!";
                    $response['nome'] = $nomeCompleto;
                    $response['curso'] = $curso;
                    $response['chave'] = $chaveAcesso;
                    $response['classe'] = $classe;
    
                }
                else{///erro ao realizar o cadastro
                    $response['error'] = "Erro ao realizar o cadastro!";
                }
     
            }
    
        }
        else{/// Resposta de validacao!
            $response['error'] = "Existem alguns campos não selecionados: Classe, Genero ou Curso!";
        }
    
    }

//   enviando os dados no formato JSON///////////////////////////////////
//   ////////
    echo json_encode($response);

