function EditForm(data) {

  return `
    <form id="editForm" class="editForm">
        <div class="divInputLabel">
            <label for="id">ID:</label>
            <input type="text" id="id" name="id" value="${ data.id }" readonly>
        </div>
        <div class="divInputLabel">
            <label for="nomeCompleto">Nome Completo:</label>
            <input type="text" id="nomeCompleto" name="nomeCompleto" value="${ data.nomeCompleto }">
        </div>
        <div class="divInputLabel">
            <label for="classe">Classe:</label>
            <input type="text" id="classe" name="classe" value="${ data.classe }" >
        </div>
        <div class="divInputLabel">
            <label for="bilhete">Bilhete:</label>
            <input type="text" id="bilhete" name="bilhete" value="${ data.bilhete }">
        </div>
        <div class="divInputLabel">
            <label for="genero">Género:</label>
            <input type="text" id="genero" name="genero" value="${ data.genero }">
        </div>
        <div class="divInputLabel">
            <label for="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value="${ data.telefone }">
        </div>
        <div class="divInputLabel">
            <label for="curso">Curso:</label>
            <input type="text" id="curso" name="curso" value="${ data.curso }">
        </div>
  
        <div class="buttonsOption" id="buttonsOption">
            <button>Fechar</button>
            <button >Salvar</button>
        </div>
    
        <div id="confirmationCard">
        
        </div>
    </form>
    `;
}

export default EditForm;
