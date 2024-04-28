function notificationPage(props){
    let inputs = "";
    props.forEach(aluno => {
        inputs += `
        <li>
            <input type="checkbox" name="id[${aluno.id}]"  class="idAluno">
            <span>${ aluno.nomeCompleto }</span>
        </li>
        `;
    });
    return(`
    <div class="ContainerNotifications">
    <div class="headerNotofications">
        <button id="closeNotificationsModal"><i class="bi bi-arrow-left"></i></button>
        <h2>Notificações</h2>
    </div>
    <div class="contentForm">
        <div id="responseText">
        </div>
        <label for="selectAll" class="boxInput">
            <input type="checkbox" class="selectAll" id="selectAll">
            Selecionar Todos
        </label>

        <form class="contantSelection" id="contantSelection">
        <ul>
            ${ inputs }
        </ul>

         <div>
            <textarea name="message" id="message" placeHolder="Mensagem..."cols="30" rows="10"></textarea>
            <br>
            <button class="sendBtn" id="sendMessage">Enviar</button> 
         </div>
        </form>
    </div>
    </div>
    `);
}
export default notificationPage;