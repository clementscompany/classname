function requestErrorAluno(errorMessage){
    return (`
        <div class="modalContainer">
            <div class="cardContainer">
                <span>${ errorMessage }</span>
                <button id="closeModalButton">ok</button>
            </div>
        </div>
    `);
}
export default requestErrorAluno;
