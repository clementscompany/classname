///manipolacao do input copie
var code;
function copiarTexto(){
    code = document.querySelector("#code");
    code.select();
    code.setSelectionRange(0, 99999);
    document.execCommand("copy");
    location.href = "./login.html";
}

const form = document.querySelector("#form");
form.onsubmit = (event)=>{
    event.preventDefault();
}

function insvrever(){
    var inputs = document.querySelectorAll(".input > input");

    var algumCampoVazio = false;

    inputs.forEach((e) => {
        if (e.value.trim() === "") {
            algumCampoVazio = true;
        }
    });

    if (algumCampoVazio) {
        let responseText = document.querySelector(".responseText");
        responseText.innerHTML = `<span>Preencha todos os Campos!</span>`;
        responseText.style = "background-color:pink; color:red";
    }

    else{

        sendData(form);

    }
}
//////enviar os Dados

async function sendData(data){
    let formData = new FormData(data);

   let URLbase = "http://localhost/fernando/BACKEND";

    try{

        let dir = "/php/cadastro.php";
        let enviarDados  = await fetch(URLbase+dir,{
            method:"POST", 
            body:formData
        })

        if(enviarDados.ok){
            let resposta = await enviarDados.json();
            let responseText = document.querySelector(".responseText");
            let dataReciver = document.querySelector("#dataReciver");
            if(resposta.error){
                let responseText = document.querySelector(".responseText");
                responseText.innerHTML = `<span>${resposta.error}</span>`;
                responseText.style = "background-color:pink; color:red";
            } 
            if(resposta.sucess){
                responseText.innerHTML = `<span>${resposta.sucess}</span>`;
                responseText.style = "background-color: #19dd3380; color:green";
                dataReciver.innerHTML = `
                        <p><b>Nome: </b>${resposta.nome}</p>
                        <p><b>Curso:</b>${resposta.curso}</p>
                        <p><b>Classe:</b>${resposta.classe}</p>
                        <div>
                            <p><b>Copie a sua Chave de Acesso:</b></p>
                            <div class="inputCopie">
                                <input type="text" id="code" value="${resposta.chave}">
                                <button onclick="copiarTexto()"><i class="bi bi-clipboard"></i></button>
                            </div>
                        </div>`;
    
            }
          
        }
        else{
            console.log("erro na solicitacao!" + enviarDados.statusText);
        }
    }
    catch(error){
        console.log("Erro no servidor!" + error);
    }
}
