function resultadosPesquisa(params){
    let userData = params.data;
    return (`
    <header>
      Resultados da pesquisa
    </header>
    <table>
          <thead>
            <tr>
              <th>id</th>
              <th>Nome completo</th>
              <th>Curso</th>
              <th>Classe</th>
              <th>Bilhete</th>
              <th>Telefone</th>
              <th>Gênero</th>
              <th>Opcções</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>${ userData.id }</td>
                <td>${ userData.nomeCompleto }</td>
                <td>${ userData.curso }</td>
                <td>${ userData.classe }</td>
                <td>${ userData.bilhete }</td>
                <td>${ userData.telefone }</td>
                <td>${ userData.genero }</td>
                <td class="optionTabele" id="optionTabele">
                    <button data-delete="${userData.id }"><i class="bi bi-trash3"></i></button>
                    <button dataEdit="${ userData.id }"><i class="bi bi-pencil-square"></i></button>
                    <button dataView="${userData.id }"><i class="bi bi-eye-fill"></i>
                </td>
            </tr>
          </tbody>
    </table>
    `);
}

export default resultadosPesquisa;