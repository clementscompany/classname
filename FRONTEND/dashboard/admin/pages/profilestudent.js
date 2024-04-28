import { IMGendpoint } from "../../variaveis.js";
function  profiloStudent(params) {
    let image = "";
    if (params.imagem == null) {
        image = 
        `<span>
        Este aluno não pussue uma foto deperfil isso geralmente acontece quando o aluno não fez a devida matrícula! 
        <span/>`
    } else{
        image = `<img src="${IMGendpoint+params.imagem}" alt="Foto do Aluno">`;
    }
    return (`

    <div class="navBarr">
        <button id="closeProfilloModalButton">
            <i class="bi bi-chevron-double-left"></i>
        </button>
    </div>

    <div class="student-profile">
        <div class="profile-header">
                ${ image }
            <h2>${ params.nomeCompleto }</h2>
        </div>
        <div class="profile-details">
            <div class="detail">
                <span class="label">Bilhete de Identidade:</span>
                <span class="value">${ params.bilhete }</span>
            </div>
            <div class="detail">
                <span class="label">Data de Nascimento:</span>
                <span class="value">${ params.dataNascimento }</span>
            </div>
            <div class="detail">
                <span class="label">Classe:</span>
                <span class="value">${ params.classe }</span>
            </div>
            <div class="detail">
                <span class="label">curso: </span>
                <span class="value">${ params.curso }</span>
            </div>
            <div class="detail">
                <span class="label">Genero:</span>
                <span class="value">${ params.genero }</span>
            </div>
            <div class="detail">
                <span class="label">Chave:</span>
                <span class="value">${ params.chaveAcesso }</span>
            </div>
            <div class="detail">
                <span class="label">Telefone:</span>
                <span class="value">${ params.telefone }</span>
            </div>
        
\
        </div>
    </div>

    `);
}
export default profiloStudent;
