const forMdata = `
<form action="#" class="form1" id="chaveForm" method="POST">
    <header>
        <h2>Insira A sua Chave e Acesso</h2>
    </header>
    <div class="inputBox">
        <input type="text" name="chaveAcesso" placeholder="Insira a Sua Chave de Acesso!">
        <small class="textError"></small>
    </div>
    
    <button class="button" id="buttonSendCode">enviar</button>

    <div class="link">
        <span>Não tem Chave de acesso? <a href="./cadastro.html">Inscreva-se</a></span>
        <span>Você precisa concordar com os nossos <a href="#">termos</a> e <a href="#">Política de privacidade</a></span>
        <div class="aceito">
            <label for="check">Sim Aceito</label>
            <input type="checkbox" id="check" name="termo" value="aceito">
        </div>
    </div>
</form>
`;

const loginForm = `
<form action="#" class="form1" id="formDataLogin">
<header>
    <h2>Faça o seu Login</h2>
</header>
<div class="inputBox">
    <input type="text" placeholder="Bilhete BI" name="bilhete" id="bilheteInput">
    <small class="textError"></small>
</div>

<div class="inputBox">
    <input type="text" placeholder="Seu código pessoal" name="senha" id="passwordInput">
</div>

<button class="button" id="loginButton">enviar</button>

<div class="link">
    <span>Você precisa concordar com os nossos <a href="#">termos</a> e <a href="#">Política de privacidade</a></span>
</div>
</form>
`;
window.addEventListener("DOMContentLoaded", ()=>{

    home();

    var buttonSendCode;
    var reciverForms;
    var chaveForm;
    function home(){
        reciverForms =  document.querySelector(".reciverForms");
        reciverForms.innerHTML = forMdata;

        const textError = reciverForms.querySelector(".textError"); 

        buttonSendCode = reciverForms.querySelector("#buttonSendCode");
        chaveForm = reciverForms.querySelector("#chaveForm");
        chaveForm.addEventListener("submit", (e)=>{
            e.preventDefault();
        })
        buttonSendCode.addEventListener("click", ()=>{
            
            textError.innerHTML = "Aguarde...";
            textError.style = "color:orange";
            getRequest(chaveForm);

        });

        async function getRequest(data){
            let formDa = new FormData(data);
        
            let URLbase = "http://localhost/fernando/BACKEND";
            let dir = "/php/code.php";
            try {
            let sendData = await fetch(URLbase+dir,{
                method:"POST", 
                body:formDa
            })
            if(sendData.ok){
            
                let resposta = await sendData.json();
                if(resposta.error){
                    textError.innerHTML = resposta.error;
                    textError.style = "color:red";
                }
                if(resposta.sucess){
                    textError.innerHTML = resposta.sucess;
                    textError.style = "color:green";

                    const interval = setInterval(()=> { loginFormData(); }, 3000)

                    function loginFormData(){

                        clearInterval(interval);
                          
                        let level = document.querySelectorAll(".niveis >  span > i");
                        level.forEach((icon)=> icon.classList.remove('active'));
                        level[1].classList.add('active');
                        reciverForms.innerHTML = loginForm;

                        const formDataLogin = reciverForms.querySelector("#formDataLogin");
                        formDataLogin.onsubmit = (e)=>{
                          e.preventDefault();
                        }
                        
                        let loginButton = reciverForms.querySelector("#loginButton");

                        loginButton.addEventListener("click", ()=>{
                           let senha = reciverForms.querySelector("#passwordInput");
                           let bilhete = reciverForms.querySelector("#bilheteInput");
                           let textError = reciverForms.querySelector(".textError");
                           let dataSenha = senha.value;
                           let dataBilete = bilhete.value;

                           if(validarCampos(dataSenha,dataBilete) == true){
                            
                            enviarDados(dataSenha,dataBilete);

                           }
                           else{

                            textError.innerHTML = "Preencha todos os Campos!";
                            textError.style = "color:red";

                           }
                        })
                        
                        function validarCampos(bilete,senha){
                            return bilete && senha != null;
                        }
                        
                        
                    }

                }
            }
            else{
                console.log("Erro na solicitacao!");
            }
            } catch (error) {
            console.log("Erro"+ error);
            }
        
        }

    }


    async function enviarDados(senha,bilhete){
          
        let formData = new FormData();
        formData.append('bilhete',  bilhete);
        formData.append('senha', senha);

        let URLbase = "http://localhost/fernando/BACKEND";
        let URLpannel = "http://localhost/fernando/FRONTEND";
        let dir = "/php/login.php";
        reciverForms = document.querySelector(".reciverForms");
        let textError = reciverForms.querySelector(".textError");

        try{
            let sendData = await fetch(URLbase+dir,{
                method:"POST",
                body:formData
            })

            if(sendData.ok){
                let data = await sendData.json();
                if (data.sucess) {
                    textError.innerHTML = data.sucess;
                    textError.style = "color:green";
                    sessionStorage.setItem("sessionId", data.session);
                    location.href = URLpannel+"/dashboard/aluno";
                }
                else{
                    textError.innerHTML = data.error;
                    textError.style = "color:red";
                }
            }
            else{
                console.log("Erro Ao receber os Dadoa!");
            }
        }
        catch(error){
          console.log("Erro" + error);
        }
    }
})

