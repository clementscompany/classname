function messagesCard(props){
    let Container = "";
    const id = sessionStorage.getItem("sessionId");

   if (props !== null) {
    props.forEach(element => {
        if (element.sender === id) {
            Container += `
            <div class="message receiver">
                <div class="messageText">${ element.message }</div>
            </div>
            `;
        } else{
        Container += `
        <div class="message sender">
            <div class="messageText">${ element.message }</div>
        </div>
        `
        }
    });
   } else{
    Container = `
        <div class="message receiver">
            <div class="messageText">Sem mensagens...</div>
        </div>
    `;
   }
        
    return(`
         ${ Container }
    `);
}
export default messagesCard;