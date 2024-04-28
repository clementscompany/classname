import
    { 
        APIendPoint, 
        SourceEventURL, 
        backendURL, 
        loginURL, 
        matriculaURL, 
        reconfirmaraURL 
    } 
    from "../../variaveis.js";

import { mainContainer } from "../App.js";
import requestErrorAluno from "../err/error.js";
import ViewHome from "../views/ViewHome.js";
import modalMatriculas from "../views/modal/mariculas.js";
import notification from "../views/modal/notification.js";
import reclamar from "../views/modal/reclamar.js";
import ReconfirmarModal from "../views/modal/reconfirmar.js";
import navigateRoot from "./Navigate.js";
import chatArea from "./chat.js";
import controller from "./controler.js";
import setLogin from "./loginComponent.js";
export var modal = document.createElement('section');
async function HomePage(){

    try {

        let id = sessionStorage.getItem("sessionId");
        let route = "/home";
        if (id != null || id != "") {
            let formData = new FormData();
            formData.append("id", id);
            formData.append("route", route);
            let getData = await fetch(backendURL+APIendPoint,{
                method:"POST",
                body:formData
            });
            if (getData.ok) {
                let data = await getData.json();
                mainContainer.innerHTML = ViewHome(data.sucess);
            } else{
                mainContainer.innerHTML = requestErrorAluno("Erro: " + getData.statusText);
                mainContainer.querySelector("#closeModalButton").onclick = () =>{ HomePage() };
            }
        } else{
            setLogin();
        }
        
    } catch (error) {
        requestErrorAluno("Erro:" + error);
    }


    // controller();
    // window.addEventListener("hashchange", controller());

    // funcoes da pagina
    let reclamations = mainContainer.querySelector("#reclamations");
    let notify2 = mainContainer.querySelector("#notify2");
    let getMatriculas = mainContainer.querySelector("#getMatriculas");
    let boletinButton = mainContainer.querySelector("#boletinButton");
    let reconfirmarButton = mainContainer.querySelector("#reconfirmarButton");
    let reloadPage = mainContainer.querySelector("#reloadPage");
    let logOutButton = mainContainer.querySelector("#logOutButton");
    let chatButton  = mainContainer.querySelector("#chatButton");

    /// terminae sessao
    logOutButton.onclick = ()=>{
        sessionStorage.removeItem("sessionId")
        location.href = loginURL;
    }

    reloadPage.onclick = ()=>{
        HomePage();
    }
    //boletin
    boletinButton.onclick =  ()=>{
        navigateRoot("/boletin"); 
    }
    chatButton.onclick = ()=>{
        // navigateRoot("/chat");
        chatArea();
    }

    //matriculas
    getMatriculas.onclick = ()=>{
        const sessionId = sessionStorage.getItem("sessionId");
        modal.classList.add('modal');
        modal.classList.add('ativar');
        mainContainer.appendChild(modal);
        modal.innerHTML = modalMatriculas();
        let formularioeditar = modal.querySelector("#formularioeditar");
        formularioeditar.onsubmit = (e)=>{ e.preventDefault() }
        let inputS = formularioeditar.querySelectorAll("input");
        inputS.forEach((input)=>{
            input.addEventListener("change", ()=>{
                let card = modal.querySelector("#response");
                let [document] = input.files
                if (document != null) {
                    card.classList.add('sucess') || card.classList.replace('error', 'sucess');
                    card.innerHTML = `<span>${ document.name } foi selecionada!</span>`;
                } else{
                    card.innerHTML = `Selecione os documentos </span>`;
                    card.classList.add('error') || card.classList.replace('sucess', 'error');
                }
            })
        })


        modal.querySelector("#sendDocuments").onclick = async ()=>{
            let response = modal.querySelector("#response");
            response.classList.add('sucess');
            response.innerHTML = `<span>Aguarde...</span>`;
            let formData = new FormData(formularioeditar);
            formData.append("idUser", sessionId);
            try {
                let sendData = await fetch(matriculaURL,{
                    method:"POST",
                    body:formData
                });
                if (sendData.ok) {
                    let data = await sendData.json();
                    if(data.error){
                        response.innerHTML = `<span>${ data.error }</span>`;
                        response.classList.replace('sucess', 'error') || response.classList.add('error');
                    } else if(data.matricula.error){
                        response.innerHTML = `<span>${ data.matricula.error }</span>`;
                        response.classList.replace('sucess', 'error') || response.classList.add('error');
                    } else{
                        response.innerHTML = `<span>${ data.matricula.sucess }</span>`;
                        response.classList.replace('eror', 'sucess') || response.classList.add('sucess');
                    }
                } else{
                    response.innerHTML = `<span>Erro: ${ sendData.statusText }</span>`;
                    response.classList.replace('sucess', 'error') || response.classList.add('error');
                }
            } catch (error) {
                response.innerHTML = `<span>Erro: ${ error }</span>`;
                response.classList.replace('sucess', 'error') || response.classList.add('error');
            }
        }

        modal.querySelector("#fechar").onclick = ()=>{ closeModal() };

    }

    function event(){
        const envntSource = new EventSource(SourceEventURL);
        envntSource.onmessage = (message)=>{
            let dataReceived = JSON.parse(message.data);
            let idUser = sessionStorage.getItem("sessionId");
            let notifications = dataReceived.listasDashboard.notifications.filter((element)=>{
                return element.idAluno == idUser;
            });
            let span = "";
            if (notifications.length > 0) {
                notifications.forEach(nify=>{
                    span += `<span class="cardNotify" >${nify.message}</span><br>`;
                })
            } else {
                span =`<span class="cardNotify">Nenhuma notificação encontrada para o usuário</span><br>`;
            }
               //notificacoes
            notify2.onclick = ()=>{
                modal.classList.add('modal');
                modal.classList.add('ativar');
                mainContainer.appendChild(modal);
                modal.innerHTML = notification(span);

                modal.querySelector("#closeNot").onclick = ()=>{
                    closeModal();
                }
            }
        }
    }  
    event(); 



    reclamations.onclick = ()=>{
        abrir_de_notificacoes();
    }
    function abrir_de_notificacoes() {
        mainContainer.appendChild(modal);
        modal.classList.add('ativar');
        modal.classList.add('modal');
        modal.innerHTML = reclamar();
        modal.addEventListener('click', (e) => {
            if (e.target.id == 'fecharmodalnotificar') {
                closeModal();
            }
        });

    }; ///end Notiicacoes 

    //reconfirmar
    reconfirmarButton.onclick = ()=>{
        reconfirmar();
    }
    function  reconfirmar() {
        modal.classList.add('modal');
        modal.classList.add('ativar');
        mainContainer.appendChild(modal);
        modal.innerHTML = ReconfirmarModal();
        modal.querySelector("#fechar-reconfirmacao").onclick = ()=>{
            closeModal();
        }

        var formularioeditar = modal.querySelector("#formularioeditar");
        formularioeditar.onsubmit = (e)=>{
            e.preventDefault();
        } 
   
        modal.querySelector("#Buttonform").onclick = async ()=>{
            let formData = new FormData(formularioeditar);
            let idUser = sessionStorage.getItem("sessionId");
            let response = modal.querySelector("#response");
            response.innerHTML = `<span>Aguarde..</span>`;
            response.classList.add('sucess') || response.classList.replace('error', 'sucess');
            formData.append("idUser", idUser);
            try {
                let sendData = await fetch(reconfirmaraURL,{
                    method:"POST",
                    body:formData
                }
                );
                if(sendData.ok){
                    let data = await sendData.json();
                    if(data.error){
                        response.innerHTML =  `<span>${ data.error }<span>`;
                        response.classList.add('error') || response.classList.replace('sucess', 'error');
                    } else if(data.reconfirmar.error){
                        response.innerHTML =`<span>${ data.reconfirmar.error }<span>`;
                        response.classList.add('error') || response.classList.replace('sucess', 'error');
                    } else{
                        response.classList.replace('error', 'sucess') || response.classList.add('sucess');
                        response.innerHTML = `<span>${ data.reconfirmar.sucess }</span>`;
                    }
                }  else{
                    response.innerHTML = `<span>${ data.statusText }<span>`;
                    response.classList.add('error') || response.classList.replace('sucess', 'error');
                }
            } catch (error) {
                response.innerHTML = `<span>${ error }<span>`;
                response.classList.add('error') || response.classList.replace('sucess', 'error');
            }
        }
    }


    //fechar o modal
    function closeModal() {
        modal.classList.remove('ativar');
        modal.classList.remove('modal');
        modal.innerHTML = "";
        mainContainer.removeChild(modal);
    }

}
export default HomePage;
