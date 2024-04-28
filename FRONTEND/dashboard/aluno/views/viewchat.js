import { IMGendpoint } from "../../variaveis.js";

function viewChat(params){
    let containerUser = "";
    if (params !== null) {
        params.forEach(user => {
            if (user.imagem == null) {
                user.imagem = `<img src="../assets/icons/bootstrap-icons-1.11.2/person-circle.svg" alt="image">`;
            } else{
                user.imagem = `<img src="${IMGendpoint+user.imagem}" alt="image">`;
            }
            containerUser+= `
                <div class="user" reciverId="${ user.id }">${user.imagem} ${ user.nomeCompleto }</div>
            `;
        });
    }
    return(` 
    <div id="chatContainer" class="chatContainer">
    <div class="userList">
        <div class="listScroll">
            ${ containerUser }
        </div>
    </div>
    
    <div id="chat" class="chat"></div>

    <form id="messageForm" action="#" method="post">
        <div class="user  ReciverUser">Selecione um usuario!</div>
        <div class="responseMessage"></div>
        <textarea class="textAreaInput" placeholder="Escreva a sua mensagem..." name="message" rows="3"></textarea>
        <button type="submit" class="sendButton" id="">Send</button>
        <input type="hidden" name="reciver" id="reciverInput">
        <input type="hidden" name="sender" id="senderInput">
    </form>
    </div>
    <button id="backButton" style="position: absolute; top: 10px; left: 10px;">Back</button>
    `);

}



export default viewChat;

