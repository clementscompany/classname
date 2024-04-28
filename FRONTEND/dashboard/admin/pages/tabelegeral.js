function GeneralTabele(props) {
    let container = "";
    props.forEach(dado => {
        container += `
            <tr>
                <td>${dado.nomeCompleto}</td>
                <td>${dado.bilhete}</td>
                <td>${dado.telefone}</td>
                <td>${dado.dataNascimento}</td>
                <td>${dado.curso}</td>
                <td>${dado.classe}</td>
                <td>${dado.genero}</td>
                <td class="optionTabele" id="optionTabele">
                    <button data-delete="${dado.id }" id="deleteButton"><i class="bi bi-trash3"></i></button>
                    <button dataEdit="${ dado.id }" id="editButton"><i class="bi bi-pencil-square"></i></button>
                    <button dataView="${dado.id }" id="viewButton"><i class="bi bi-eye-fill"></i>
                </td>
            <tr>
        
        `;
    });

    return (`
        <button id="btnRefresh"><i class="bi bi-arrow-clockwise"></i></button>
        <table id="tabelaDados">
            <thead>
                <tr>
                    <th>Nome Completo</th>
                    <th>Bilhete</th>
                    <th>Telefone</th>
                    <th>Data de Nascimento</th>
                    <th>Curso</th>
                    <th>Classe</th>
                    <th>Gênero</th>
                    <th>Opções</th>
                </tr>
            </thead>
            <tbody>
                ${ container }
            </tbody>
        </table>
    `);
}

export default GeneralTabele;
