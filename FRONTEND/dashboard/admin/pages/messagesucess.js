function messageSucess(message){
    return (`
    <div class="caedDelete">
        <span>${ message }</span>
        <div class="buttonsOption" >
            <button class="confirmButton" id="confirmButton" style="background-color:green;padding:10px 44px;">ok</button>
        </div>
    </div>
    `);
}

export default messageSucess;