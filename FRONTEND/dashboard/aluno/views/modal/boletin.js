function modalBoletin(props){
    return (`
    <div class="conteudomodal">
        <button class="fechar" id="fecharmodalboletim">X</button>
        <h1>Boletim de Notas do Aluno<i class="fa-solid fa-id-card"></i></h1>
        <span style="font-size: 14px; margin: 4px 6px;">Olá, Este é o resultado da sua Solicitação. Obrigado!
        </span>
        <div class="conteiner_boletim">
            <div class="header">
                <div class="div-logo">
                    <div class="img-school">
                        <img src="assects/Img/palmeira (3).png" alt="">
                    </div>
                    <div class="sigla">
                        <span>DIOSECE DE CABINDA</span>
                        <p>Instituto Politécnico João Paulo II</p>
                    </div>
                </div>
            </div>
            <div class="div-section-name">
                <h1>BOLETIM</h1>
            </div>
            <div class="div-section-dados">
                <div class="div-dados-one">
                    <span>Nome: <p></p></span>
                    <span>Nº: <p></p></span>
                    <span>Ano lectivo: <p></p></span>
                </div>
                <div class="div-dados-one">
                    <span>Curso: <p></p></span>
                    <span>Turma: <p></p></span>
                    <span>Periodo: <p></p></span>
                </div>
            </div>
            <div class="div-table">
                <table>
                    <thead>
                        <tr>
                            <th>Disciplinas do Curso</th>
                            <th>Notas</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>SEAC</td>
                            <td>17</td>
                        </tr>
                        <tr>
                            <td>TLP</td>
                            <td>16</td>
                        </tr>
                        <tr>
                            <td>Matemática</td>
                            <td>15</td>
                        </tr>
                        <tr>
                            <td>Educação Física</td>
                            <td>14</td>
                        </tr>
                    </tbody>
                </table>
                <hr>
                <hr>
                <span id="download"><i class="fa-solid fa-download"></i>Fazer download do Boletim</span>
            </div>
        </div>
    </div>
    `);
}
export  default modalBoletin;
