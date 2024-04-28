import { IMGendpoint, backendURL } from "../../variaveis.js";
function ViewHome(props) {

    let img = null;
    if (props.imagem != null) {
        img = `<img src="${IMGendpoint+props.imagem}">`;
    } else{
        img =  `<span>Nenhuma imagem registrada</span>`;
    }
    return (`
    <div class="body">
        <header>
            <div class="header">
                <div class="logo">
                    <span> IPJPII</span>
                </div>
                <div class="opcoes">

                    <span title="Recarregar" id="reloadPage">
                        <i class="bi bi-arrow-clockwise"></i>
                    </span>

                    <span title="Feed de notícias">
                        <!--a href="Feed_News.html"></a-->
                        <i class="fa-solid fa-house"></i>
                    </span>
                    

                    <span class="user" title="Notificações" id="notify2">
                        <i class="fa-solid fa-bell"></i>
                        <p class="notify2" >
                            0
                        </p>
                    </span>

                    <span title="Terminar sessão" id="logOutButton">
                        <i class="fa-solid fa-sign-out-alt"></i>
                    </span>

                    <span class="perfil01pgi" title="Definições">
                        <i class="fa-solid fa-gear"></i>
                        <div class="opcoes-of-perfil01pgi">

                            <span>
                                <!--a href="Página_Inicial.php"></a-->
                                <i class="fa-solid fa-person"></i>
                                Perfil
                            </span>


                            <span>
                                <!--a href="chat_login.html"></a-->
                                <i class="fa-brands fa-facebook-messenger"></i>
                                Chat
                            </span>
                            <span>
                                <i class="fa-solid fa-bell"></i>
                                Notificações
                            </span>
                            <span>
                                <i class="fa-solid fa-gear"></i>
                                Definições
                            </span>
                            <span>
                                <i class="fa-solid fa-moon"></i>
                                Modo Escuro
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        </header>

        <section>
            <div class="contex">
                <div class="dados">

                    <div class="subdados">

                        <div class="caixa-dados">
                            <div class="fotouser">
                                ${ img }
                            </div>
                            <span>
                                <h2 class="nauser">${ props.nomeCompleto }</h2>
                            </span>
                        </div>

                        <div class="dadoscoletados">
                            <ul class="dados_inscricao">
                                <li>
                                    <h4>Curso:</h4>
                                    <span name="classe" class="classe">${ props.curso }</span>
                                </li>
                                
                                <li>
                                    <h4>Classe:</h4>
                                    <span name="classe" class="classe">${ props.classe }</span>
                                </li>
                                
                                <li>
                                    <h4>Data de Nascimento:</h4>
                                    <span name="classe" class="classe">${ props.dataNascimento }</span>
                                </li>

                                <li>
                                    <h4>Género:</h4>
                                    <span name="classe" class="classe">${ props.genero }</span>
                                </li>

                                <li>
                                    <h4>Telefone:</h4>
                                    <span name="classe" class="classe">${ props.telefone }</span>
                                </li>

                                <li>
                                    <h4>Chave de acesso:</h4>
                                    <span name="classe" class="classe">${ props.chaveAcesso }</span>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <div class="servicos">

                        <h1>Serviços do WSGE para si...</h1>
                        <ul class="service">
                            <li id="getMatriculas">
                                <i class="fa-solid fa-user-plus"></i>Matrícula
                            </li>

                            <li id="boletinButton">
                                <i class="fa-solid fa-id-card"></i>Boletim de Notas
                            </li>

                            <li>
                                <i class="fa-solid fa-list-check"></i>Faltas Registradas
                                <a class="Brevemente" href="#">Brevemente</a>
                            </li>

                            <li>
                                <i class="fa-regular fa-calendar-days"></i> Calendário Escolar
                                <a class="Brevemente" href="#">Brevemente</a>
                            </li>

                            <li id="reconfirmarButton">
                                <i class="fa-solid fa-pen-to-square"></i>Reconfirmar Matrícula
                            </li>

                            <li id="chatButton">
                                <!--a href="Biblioteca.html"> </a-->
                                <i class="bi bi-chat-dots"></i>Chat 

                            </li>

                            <li>
                                <i class="fa-solid fa-credit-card"></i>Pagamento de Propinas
                                <a class="Brevemente" href="#">Brevemente</a>
                            </li>

                            <li id="reclamations">
                                <i class="fa-regular fa-circle-question"></i>Dúvidas e Reclamações
                            </li>
                        </ul>

                    </div>

                </div>

            </div>

        </section>
    </div>
    
    `);
}
export default ViewHome;

