function ReconfirmarModal(){
    return (`
    <div class="conteudomodal">
            <button class="fechar" id="fechar-reconfirmacao">X</button>
            <h1>Reconfirmação de Matrícula<i class="fa-solid fa-pen-to-square"></i></h1>
            <span style="font-size: 12px; margin: 4px 6px;">Envie-nos os seus documentos para
                reconfirmar a sua matricula!</span>
            <form class="formularioeditar"  id="formularioeditar" enctype="multipart/form-data">
                <div class="contem">
                    <label for="classe">Classe: </label>
                    <select name="classe" id="classe">
                       <option value="7ªClasse">7ªClasse</option>
                       <option value="8ªClasse">8ªClasse</option>
                       <option value="9ªClasse">9ªClasse</option>
                       <option value="10ªClasse">10ªClasse</option>
                       <option value="11ªClasse">11ªClasse</option>
                       <option value="12ªClasse">12ªClasse</option>
                       <option value="13ªClasse">13ªClasse</option>
                    </select>
                </div>
                <div class="contem1">
                    <label for="foto">Foto do Tipo Passe</label>
                    <div class="conteiner-input">
                        <input type="file" name="foto" id="foto">
                        <label for="foto"><i class="bi bi-image"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros-foto"></ul>
                    </div>
                </div>

                <div class="contem1">
                    <label for="bilhete">Cópia do BI</label>
                    <div class="conteiner-input">
                        <input type="file" name="bilhete" id="bilhete">
                        <label for="bilhete"><i class="fa-solid fa-file-pdf"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros-bilhete"></ul>
                    </div>
                </div>

                <div class="btn" id="Buttonform">
                    <button type="submit">Enviar</button>
                </div>
            </form>

            <div class="response" id="response"></div>
        </div>
    `);
}
export default ReconfirmarModal;
