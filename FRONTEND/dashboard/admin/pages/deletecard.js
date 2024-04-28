function deleteCard(){
    return(`
    <div class="caedDelete">
        <span>Tem certeza que deseja eliminar?</span>
        <div class="buttonsOption" id="buttonsOption">
        <button>Sim</button>
        <button>Não</button>
        </div>
    </div>
    `);
}
export  default deleteCard;