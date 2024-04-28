function messageError(params){
    
        let data = params.class
        let message = params.message

    return(`
    <div class="cardError ${ data }">
        <span>${ message }</span>
    </div>
    `);
}
export default messageError;