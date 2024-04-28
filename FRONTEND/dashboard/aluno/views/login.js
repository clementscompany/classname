function loginPage(message){
    return `
        <div class="modalContainer">
            <div class="cardContainer">
                <span>${message}</span>
                <button id="closeModal">ok</button>
            </div>
        </div>
    `;
}
export default loginPage;