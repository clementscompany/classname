import { DOCendpoint, IMGendpoint } from "../../variaveis.js";
function recinfirmation(data) {

  let results = "";
  if (data) {
    data.forEach(reconf => {
      results += `
        <tr>
          <td>${reconf.id}</td>
          <td>${reconf.nomeCompleto}</td>
          <td><img src="${IMGendpoint + reconf.imagem}" alt="Imagem"></td>
          <td><a href="${DOCendpoint + reconf.bi}">Visualizar Bilhete</a></td>
          <td>${reconf.anoletivo}</td>
          <td>${reconf.classe}</td>
          <td class="optionTabele">
            <button class="deleteButton" data-delete="${reconf.id}"><i class="bi bi-trash3"></i></button>
            <button class="editButton" data-edit="${reconf.id}"><i class="bi bi-pencil-square"></i></button>
            <button class="viewButton" data-view="${reconf.id}"><i class="bi bi-eye-fill"></i></button>
          </td>
        </tr>
      `;
    });
  } else{
    results = `
        <tr>
          <td class="optionTabele">
            Sem Registros...
          </td>
        </tr>
    `
  }
  return (`
    <header>
      Reconfirmacoes
    </header>
    <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Mome Completo</th>
              <th>Imagem</th>
              <th>Bilhete</th>
              <th>Ano Letivo</th>
              <th>Classe</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            ${ results }
          </tbody>
    </table>
  `);
}

export default recinfirmation;

