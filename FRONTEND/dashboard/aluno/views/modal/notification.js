function notification(message){
    return (`
        <div class="notificacoes">
            <a href="Notificacoes_recebidas.html">
                <div class="notify-conteiner">
                    <div class="conteiner-nof">
                        <div class="div-info-ntf">
                            <h4>Do:</h4>
                            <h5 style="font-size: 16px; font-weight:lighter;">Administrador</h5>
                        </div>
                        <div class="div-img-user">
                            <img src="../assets/img/dg8f5nf-c1168a8c-97b8-4c7e-aa21-ff71a3300ba6.jpg">
                        </div>
                    </div>
                    <div class="mensage" style="color: #222;">
                       ${message}
                    </div>
                </div>
            </a>

            <div class="closeNot" id="closeNot">
                fechar
            </div>
        </div>
    `);
}
export default notification;