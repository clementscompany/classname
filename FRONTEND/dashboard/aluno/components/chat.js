import { SourceEventURL, chatURL, dashboardURL, getMessageURL } from "../../variaveis.js";
import { mainContainer } from "../App.js";
import messagesCard from "../views/messages.js";
import viewChat from "../views/viewchat.js";
import { modal } from "./home.js";
import messageError from "./messageerror.js";

async function chatArea(params) {
    modal.classList.add('modal');
    modal.style.background = "#fff";
    modal.classList.add('ativar');
    mainContainer.appendChild(modal);
    modal.innerHTML = `<span class="loadingMessage">Carregando!</span>`;

    try {
        let getData = await fetch(dashboardURL,{
            method:"GET"
        })
        if (getData.ok) {
            let data = await getData.json();
            let users = data.listasDashboard.inscritos
            modal.innerHTML = viewChat(users);
            let userList =  modal.querySelectorAll(".user");
            let reciveInput = modal.querySelector("#reciverInput");
            let senderInput = modal.querySelector("#senderInput");
            let backButton = modal.querySelector("#backButton");
            backButton.addEventListener("click", ()=>{
                closeModal();
            })
            userList.forEach((dataUser)=>{
                dataUser.addEventListener("click", ()=>{
                    userList.forEach((element)=>{element.classList.remove('active')});
                    dataUser.classList.add('active');

                    let idRecived = dataUser.getAttribute("reciverId");
                    let ReciverUser = modal.querySelector(".ReciverUser");
                    //
                    sessionStorage.setItem("reciverId", idRecived);
                    reciveInput.value = idRecived;
                    senderInput.value = sessionStorage.getItem("sessionId");
                    //
                    let reciverData = users.filter((sendTo)=>{
                        return sendTo.id === idRecived;
                    });

                    if (reciverData.length > 0) {
                        [reciverData].forEach(data=>{
                            ReciverUser.innerHTML  = data[0].imagem +" "+ data[0].nomeCompleto
                        });
                    }
                    //
                    getMessagesData();
                    //
                })
            })//end 

            //preparndo envio dos dados 
            let messageForm = modal.querySelector("#messageForm");
            let responseMessage = modal.querySelector(".responseMessage");
            messageForm.addEventListener("submit", (e)=>{
                e.preventDefault();
            });
            messageForm.querySelector(".sendButton").addEventListener("click", async ()=>{
                let chat = modal.querySelector("#chat");
                let value = messageForm.querySelector(".textAreaInput").value
                let reciveInput = modal.querySelector("#reciverInput");
                let senderInput = modal.querySelector("#senderInput");
                responseMessage.innerHTML = messageError({
                    message:"Carregando...",
                    class:"loading"
                });
                if(value.trim() !== ""){
                    if (reciveInput.value !== "" && senderInput.value !== "") {
                        let formData = new FormData(messageForm);
                        let sendData = await fetch(chatURL,{ method:"POST", body:formData });
                        if (sendData.ok) {
                            let data = await sendData.json();
                            messageForm.querySelector(".textAreaInput").value = "";
                            if (data.response) {
                                responseMessage.innerHTML = messageError({
                                    message:data.response,
                                    class:"sucess"
                                });
                                chat.scrollBy({
                                    top:chat.scrollHeight,
                                    behavior:"smooth"
                                });//
                                getMessagesData();
                                 //
                            } else{
                                responseMessage.innerHTML = messageError({
                                    message:"Erro de envio de mensagem... tente novamente!",
                                    class:"error"
                                });
                            }
                        } else{
                            responseMessage.innerHTML = messageError({
                                message:sendData.statusText,
                                class:"error"
                            });
                        }
                    } else{
                        messageForm.querySelector(".responseMessage").innerHTML = messageError({
                            message:"Selecione o usuario que pretende enviar a mensagem...",
                            class:"loading"
                        });
                    }
                } else{
                    messageForm.querySelector(".responseMessage").innerHTML = messageError({
                        message:"O campo paramensagens esta vazio...",
                        class:"loading"
                    });
                }
            })/// 

            function getMessagesData() {
                const interval = setInterval(async () => {
                    try {
                        let chat = modal.querySelector("#chat");
                        var reciverId = sessionStorage.getItem("reciverId");
                        const senderId = sessionStorage.getItem("sessionId");
                        
                        let response = await fetch(getMessageURL,{
                            method:"POST",
                            headers:{
                                'Content-Type':'application/json'
                            },
                            body:JSON.stringify({
                                sender:senderId,
                                reciver:reciverId
                            })
                        });
                        if(response.ok){
                            let msg = await response.json();
                            
                            let messageData = msg.message.msgs;
                            let emptyMesage = msg.message.error;

                            if (messageData) {
                                chat.innerHTML = messagesCard(messageData);
                            } else if(emptyMesage){
                                chat.innerHTML = messagesCard(null);
                            }

                        } else{
                            chat.innerHTML = messageError({
                                message:response.statusText, 
                                class:"error"
                            });
                        }
            
                    } catch (error) {
                        console.error('Erro:', error);
                        chat.innerHTML = messageError({
                            message:error,
                            class:"error"
                        });
                    }
                }, 1000);
            }
            
            
        } else{
            modal.innerHTML = messageError({message:getData.statusText, class:"error"});
        }
    } catch (error) {
        modal.innerHTML = messageError({message:"Erro: "+error, class:"error"});
    }
   

    function closeModal() {
        modal.classList.remove('modal');
        modal.classList.remove('ativar');
        mainContainer.removeChild(modal);
        modal.innerHTML = "";
    }
 

}
export default chatArea;