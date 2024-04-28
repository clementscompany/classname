
function reclamar() {
  return `
    <div>
        <div class="conteudomodal">
            <button class="fechar" id="fecharmodalnotificar">X</button>
            <h1>Duvidas e Reclamações<i class="fa-solid fa-circle-question"></i></h1>
            <span style="font-size: 12px; margin: 4px 6px;">Olá, Envie-nos as suas duvidas e Reclamações afim de ajudar
                te! </span>
            <form class="formularioeditar" action="">
                <div class="class_de_assunto">
                    <textarea placeholder="Escreva uma mensagem..."></textarea>
                </div>
                <div class=" btn">
                    <button type="submit">Enviar</button>
                </div>
            </form>
        </div>
    </div>
    `;
}
export default reclamar;
