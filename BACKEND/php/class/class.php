<?php
session_start();
class sistema {

    /// Variaveis globais e privadas do sistema!


    ///conectar com o banco de dados!
    public function conectar(){
        $this->conn = mysqli_connect($this->dbHost,$this->dbUsername,$this->dbPassword,$this->dbName);

        if($this->conn == true){
            return $this->conn;
        }
        else{
            return false;
        }
    }

    public function verificar($bilhete){
        if($this->conectar() == true){
          $sql = mysqli_query($this->conn, "SELECT * FROM inscricao WHERE bilhete = '{$bilhete}' ");

          if(mysqli_num_rows($sql) > 0){
            return true;
          }
          else{
            return false;
          }
        }
    }

    ##Funcao para inserir os dados da incricao n banco de dados
    public function inscrever($nomeCompleto,$bilhete,$telefone,$dataNascimento,$senha,$curso,$classe,$genero,$chaveAcesso){
       if($this->conectar() == true){
          $sql = mysqli_query($this->conn, 
          "INSERT INTO 
          inscricao 
          (nomeCompleto,
          bilhete,
          telefone,
          dataNascimento,
          senha,
          curso,
          classe,
          genero,
          chaveAcesso) 
          
           VALUES 
          ('{$nomeCompleto}',
          '{$bilhete}',
          '{$telefone}',
          '{$dataNascimento}',
          '{$senha}',
          '{$curso}',
          '{$classe}',
          '{$genero}',
          '{$chaveAcesso}')");

          if($sql == true){
            return true;
          }
          else{
            return false;
          }

       }
       else{
        return false;
       }
    }

    # validar a chave de acesso!
    # esta funcao verifica a chave de acesso do aluno apos a inscricao antes do login 
    public function chaveAcesso($chave){
      if($this->conectar() == true){
         $sql = mysqli_query($this->conn,
        "SELECT * FROM inscricao WHERE chaveAcesso = '{$chave}'");

         if($sql){
          return (mysqli_num_rows($sql) > 0);
         }
      }
    }

    #fazer o login 
    # Depois da veriicacao com a cgave ele faz o login com o gilhete e a senha 
    public function logar($bilhete,$senha){
      if($this->conectar() == true){
        $newBilhete = mysqli_real_escape_string($this->conn, $bilhete);
        $newSenha = mysqli_real_escape_string($this->conn, $senha);

        $sql = "SELECT * FROM inscricao WHERE bilhete = '{$newBilhete}' ";

        $query = mysqli_query($this->conn,$sql);

        if(mysqli_num_rows($query) > 0){
          
          $result = mysqli_fetch_assoc($query);

          if(password_verify($newSenha, $result['senha'])){
            
            $_SESSION['idUser'] = $result['id'];
            $sessionId = $_SESSION['idUser'];

            $this->idUser = $sessionId;

            return $this->idUser;//////Retornar uma sessao id!
            ///feito isso ele recebe o seu id como token de sessao 
          }

          else {

            return false;

          }

        }
        else{
          return false;
        }

      }
    }///////------------

     //////////////?????Login ADMIN /////////////
    ///este e a funcao de Login para a parte ADM
   /// acesso por senha e nome de usuario...////
    public function adminLogin($username, $password){
      $response = [];
      if($this->conectar() == true){
          
          $stmt = $this->conn->prepare("SELECT * FROM admin WHERE username = ? AND senha = ?");
          $stmt->bind_param("ss", $username, $password);
          $stmt->execute();
          $result = $stmt->get_result();
  
          if($result->num_rows > 0){
              $data = $result->fetch_assoc();
              $response['success'] = "Confirmado com Sucesso!";
              $response['token'] = $data['session_id'];
          } else {
              $response['error'] = "Email ou senha incorretos!";
          }
          $stmt->close();
      } else {
          $response['error'] = "Erro na conexão!";
      }
      return $response;
  }
  
////////////////////-----------Listar dados! do Aluno atraves do id
# esta uncao apresenda os dados do aluno de acordo com o id da sessao ou id ornecido

    public function painelAluno($id){
      if($this->conectar()){
   
          $newId = mysqli_real_escape_string($this->conn, $id);
          $sql = mysqli_query($this->conn, "SELECT * FROM inscricao WHERE id = '{$newId}' ");

        if($sql){

          return mysqli_fetch_assoc($sql);

        }

        else{
          return "Dado nao encontrado!";
        }

       
    }
  }

  ##Listar dados do Dashboard 
  #Esta funcao apresenta todos os dados dos alunos cadastrados
  public function listDasboard(){
    if ($this->conectar()) {
      $response = [];
      $sql = mysqli_query($this->conn, "SELECT * FROM inscricao ORDER BY id DESC LIMIT 10 ");
      $sql2 = mysqli_query($this->conn, "SELECT * FROM inscricao ORDER BY id ASC");
      $sql3 = $this->conn->prepare("SELECT * FROM matriculas 
      INNER JOIN inscricao ON  inscricao.id = matriculas.id_aluno ");
      $sql4 = $this->conn->prepare("SELECT * FROM turmas ORDER BY id ASC");
      $sql6 = $this->conn->prepare("SELECT * FROM notifications");
      $sql5 = $this->conn->prepare("SELECT *, inscricao.bilhete AS bi FROM reconfirmar INNER JOIN inscricao ON inscricao.id = reconfirmar.idUser");
      
      $sql7 = $this->conn->prepare("SELECT * FROM messages  INNER JOIN 
      inscricao as user on user.id = messages.sender or user.id = messages.reciver");
      if ($sql7->execute()) {
        $messages = $sql7->get_result();
        if ($messages->num_rows > 0) {
          while ($messageUser = $messages->fetch_assoc()) {
            $response['messages'][] = $messageUser;
          } 
        }
        else{
          $response['messages'] = null;
        }
      }
      $sql6->execute();
      $notifications = $sql6->get_result();
      if ($notifications->num_rows > 0) {
        while ($dataNotifivations = $notifications->fetch_assoc()) {
          $response['notifications'][] = $dataNotifivations;
        }
      } 
      $sql5->execute();
      $reconfirmacoes = $sql5->get_result();
      if ($reconfirmacoes->num_rows > 0 ) {
         while ($dataReconf = $reconfirmacoes->fetch_assoc()) {
            $response['reconfirmacoes'][] = $dataReconf;
         }
      }

      $sql4->execute();
      $turmas = $sql4->get_result();
      if ($turmas->num_rows > 0) {
        while ($dadosTurmas =  $turmas->fetch_assoc()) {
          $response['turmas'][] = $dadosTurmas;
        }
      }

      $sql3->execute();
      $res = $sql3->get_result();
      if ($res->num_rows > 0) {
        while ($data = $res->fetch_assoc()) {
          $response['matriculados'][] = $data;
        }
      }

      if(mysqli_num_rows($sql) > 0){
        while($rows = mysqli_fetch_assoc($sql)){
          $response['incricoesRecentes'][] = $rows;
        }
      }
      
      else{
        $response['empty'] = "Sem registros!";
      }
      if (mysqli_num_rows($sql2) > 0) {
        while($dataAlunos = mysqli_fetch_assoc($sql2)){
          $response['inscritos'][] = $dataAlunos;
        }
      }

    }
    return $response;
  }

  ## pesquisar Registros
  public function pesquisar($pesquisa){
    $search = '%'.$pesquisa.'%';
    if ($this->conectar()) {
      $response = [];
      $sql = $this->conn->prepare("SELECT * FROM inscricao WHERE nomeCompleto LIKE ? OR id LIKE ? OR bilhete LIKE ?");
      $sql->bind_param("sss", $search, $search, $search);
      if ($sql->execute()) {
        $result = $sql->get_result();
        if ($result->num_rows > 0) {
          while ($data = $result->fetch_assoc()) {
            $response['dados'][] = $data;
          }
        } else{
          $response['error'] = "Nenhum registro encontrado!";
        }
      }
      return $response;
    }
  }

  ##enviar Mensagen 
  ## esta funcao serve para envio de mensagens caso hoouver um chat 
  public function sendMessage($incoming_id, $outgoing_id, $message) {
    if ($this->conectar()) {
        $response = [];
        $sql = $this->conn->prepare("INSERT INTO messages (incoming, outgoing, message) VALUES (?, ?, ?)");
        $sql->bind_param('sss', $incoming_id, $outgoing_id, $message);
        
        if ($sql->execute()) {
            $response['success'] = "mensagem enviada!";
        } else {
            $response['error'] = "Erro ao enviar a mensagem... tente novamente!";
        }

        $sql->close();
        $this->conn->close(); 

        return $response;
    }
}

#criando uma funcao para cadastrar as turmas
public function cadastrarTurmas($nome,$periodo_letivo,$grau_ensino,$ano,$data_criacao){
  if ($this->conectar()) {
    $response = [];
    $sql = $this->conn->prepare("SELECT * FROM turmas WHERE nome = ? AND ano = ? ");
    $sql->bind_param("ss", $nome,$ano);
    $sql->execute();
    $resultVerify = $sql->get_result();
    if ($resultVerify->num_rows > 0 ) {
      $response['error'] = "Estes dados já foram cadastrados!";
    } else{
     $sql2 = $this->conn->prepare("INSERT INTO turmas (nome,periodo_letivo,grau_ensino,ano,data_criacao) VALUES (?,?,?,?,?)");
     $sql2->bind_param("sssss", $nome,$periodo_letivo,$grau_ensino,$ano,$data_criacao);
     if($sql2->execute()){
      $response['sucess'] = "Turma adicionada com sucesso!";
     } else{
      $response['error'] = "Erro ao cadastrar a turma!";
     }
    }

    return $response;
  }
}

public function matricular(
  $id_aluno,
  $foto_passe,
  $certificado,
  $atestado_medico,
  $copia_bilhete,
  $ano_letivo){

  if($this->conectar()){
    $response = [];
    $sql = $this->conn->prepare("SELECT * FROM matriculas WHERE id_aluno = ?");
    $sql->bind_param("i", $id_aluno); 
    $sql->execute();
    $result = $sql->get_result();

    if($result->num_rows > 0){
      $response['error'] = "Estes dados já foram cadastrados!";
    } else{
      $sql = $this->conn->prepare("INSERT INTO matriculas (id_aluno, foto_passe, certificado, atestado_medico, copia_bilhete, anoletivo) VALUES (?, ?, ?, ?, ?, ?)");
      $sql->bind_param("isssss",
      $id_aluno,
      $foto_passe,
      $certificado, 
      $atestado_medico, 
      $copia_bilhete,
      $ano_letivo);

      if($sql->execute()) {
        
        $sql3 = $this->conn->prepare("UPDATE inscricao SET imagem = ? WHERE id = ? ");
        $sql3->bind_param("ss", $foto_passe, $id_aluno);
        if ($sql3->execute()) {
          $response['sucess'] = "Matrícula realizada com sucesso!";
        }
      } else {
        $response['error'] = "Ocorreu um erro ao realizar a matrícula.";
      }
    }
    return $response;
  } else {
    return ["error" => "Não foi possível conectar ao banco de dados."];
  }
}


public function reconfirmar(
  $idUser,
  $image,
  $bilhete,
  $classe,
  $ano
){
  if ($this->conectar()) {
    $response = [];
    $sql = $this->conn->prepare("SELECT * FROM reconfirmar WHERE idUser = ? AND anoletivo = ?");
    $sql->bind_param("ss", $idUser, $ano);
    $sql->execute();
    $result = $sql->get_result();

    if($result->num_rows > 0){ 
      $response['error'] = "Você já fez a reconfirmação da matrícula";
    } else {
      $sql2 = $this->conn->prepare("INSERT INTO reconfirmar (idUser, image, bilhete, anoletivo) 
      VALUES(?,?,?,?)");
      $sql2->bind_param("ssss",
      $idUser,
      $image,
      $bilhete,
      $ano
      );
      
      if ($sql2->execute()) {
        $sql3 = $this->conn->prepare("UPDATE inscricao SET imagem = ?, classe = ? WHERE inscricao.id = ? ");
        $sql3->bind_param("sss", $image,$classe, $idUser);
        if ($sql3->execute()) {
          $response['sucess'] = "Reconfirmação realizada com sucesso!";
        }
      } else{
        $response['error'] = "Houve um erro! Tente novamente...";
      }
    }

    return $response;
  }
}

public function eliminarAluno($id){

  if ($this->conectar()) {
    $response = [];
    $sql = $this->conn->prepare("DELETE from inscricao WHERE inscricao.id = ?");
    $sql->bind_param("s", $id);
    if ($sql->execute()) {
      $sql2 = $this->conn->prepare("DELETE from matriculas WHERE id_aluno = ?");
      $sql3 = $this->conn->prepare("DELETE from reconfirmar WHERE idUser = ?");
      $sql2->bind_param("s", $id);
      $sql3->bind_param("s", $id);
      $sql2->execute();
      $sql3->execute();

      $response['sucess'] = "Dados eliminados com sucesso!";
    } else{
      $response['error'] = "Erro ao eliminar os dados! tente novamente";
    }
    return $response;
  }

}
////Atualizar dados 
public function updateData(
  $id,
  $nomeCompleto,
  $classe,
  $bilhete,
  $genero,
  $telefone,
  $curso
){
  if($this->conectar()){
      $response =  array();
      $sql = $this->conn->prepare("UPDATE inscricao SET 
          nomeCompleto = ?,
          classe = ?,
          bilhete = ?,
          genero = ?,
          telefone = ?,
          curso = ?
          WHERE inscricao.id = ?");
      $sql->bind_param("ssssssi", $nomeCompleto, $classe, $bilhete, $genero, $telefone, $curso, $id);
      if ($sql->execute()) {
          $response['success'] = "Dados atualizados com sucesso!";
      } else{
          $response['error'] = "Erro ao atualizar os dados... tente novamente!";
      } 
      return $response;
  }
}

public function notifivarAluno($id, $message){
  if ($this->conectar()) {
    $response = [];
    try {
      $sql = $this->conn->prepare("INSERT INTO notifications(idAluno,message) VALUES (?,?)");
      $sql->bind_param("is", $id,$message);
      if ($sql->execute()) {
         $response['sucess'] =  true;
      } else{
        $response['error'] = true;
      }
      return $response;
    } catch (Exception $err) {
      return $err->getMessage();
    }
  }
}

public function chatMessage($incamming, $outgoing, $message){
  if ($this->conectar()) {
      $sql = $this->conn->prepare("INSERT INTO messages(sender,reciver,message) VALUES (?,?,?)");
      $sql->bind_param("iis", $incamming,$outgoing,$message);
      if ($sql->execute()) {
          return true;
      } else{
        return false;
      }
  }
}

public function getMessage($sender, $receiver) {
  if ($this->conectar()) {
    $response = [];
    $sql = $this->conn->prepare("SELECT * FROM messages WHERE (sender = ? AND reciver = ?)
    OR (reciver = ? and sender = ?) ORDER BY id ASC");
    $sql->bind_param('iiii', $sender,$receiver, $sender,$receiver);
    $sql->execute();
    $data = $sql->get_result();
    if ($data->num_rows > 0) {
      while ($messages = $data->fetch_assoc()) {
        $response['msgs'][] = $messages;
      }
    } else{
      $response['error'] = "Sem mensagens!";
    }
    return $response;
  }
}

}


