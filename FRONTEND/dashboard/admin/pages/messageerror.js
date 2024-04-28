function messageError(props) {
    
    return (`
    <div class="confirmationCard ${ props.class }">
        <p>${ props.message }</p>
    </div>
    `);
}
export default messageError;