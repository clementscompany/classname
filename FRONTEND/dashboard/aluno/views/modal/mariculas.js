function modalMatriculas() {
    return `
        <div class="conteudomodal">
            <button class="fechar" id="fechar">X</button>
            <h1>Matricular-se<i class="fa-solid fa-user-plus"></i></h1>
            <span style="font-size: 12px; margin: 4px 6px;">Envie-nos os seus documentos para efeitos de matrícula!</span>
            <form class="formularioeditar" id="formularioeditar" enctype="multipart/form-data">

                <div class="contem1">
                    <label>Foto do Tipo Passe</label>
                    <div class="conteiner-input">
                        <input type="file" name="foto" id="fileFoto">
                        <label for="fileFoto"><i class="bi bi-image"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros"></ul>
                    </div>
                </div>

                <div class="contem1">
                    <label>NIF</label>
                    <div class="conteiner-input">
                        <input type="file" name="nif" id="fileNIF">
                        <label for="fileNIF"><i class="fa-solid fa-file-pdf"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros"></ul>
                    </div>
                </div>

                <div class="contem1">
                    <label>Declaração/Certificado</label>
                    <div class="conteiner-input">
                        <input type="file" name="declaracao" id="fileDeclaracao">
                        <label for="fileDeclaracao"><i class="fa-solid fa-file-pdf"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros"></ul>
                    </div>
                </div>

                <div class="contem1">
                    <label>Atestado Médico</label>
                    <div class="conteiner-input">
                        <input type="file" name="atestado" id="fileAtestado">
                        <label for="fileAtestado"><i class="fa-solid fa-file-pdf"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros"></ul>
                    </div>
                </div>

                <div class="contem1">
                    <label>Cópia do BI</label>
                    <div class="conteiner-input">
                        <input type="file" name="bilhete" id="fileBI">
                        <label for="fileBI"><i class="fa-solid fa-file-pdf"></i>
                            &nbsp;
                            Carregar documento
                        </label>
                        <div class="num-de-ficheiros">
                            Nenhum ficheiro selecionado...
                        </div>
                        <ul id="lista-ficheiros"></ul>
                    </div>
                </div>


                <div class="btn">
                    <button type="submit" id="sendDocuments">Enviar</button>
                </div>
            </form>
            <div class="response" id="response"></div>
        </div>
    `;
}
export default modalMatriculas;
