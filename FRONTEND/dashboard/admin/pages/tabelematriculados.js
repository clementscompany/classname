import { IMGendpoint } from "../../variaveis.js";
import { DOCendpoint } from "../../variaveis.js";
function tabeleMatriculados(data) {
    let results = "";

 if (data) {
  data.forEach(reconf => {
    results += `
      <tr>
        <td>${reconf.id}</td>
        <td><img src="${IMGendpoint + reconf.imagem}" alt="Imagem"></td>
        <td><a href="${DOCendpoint + reconf.certificado}">Visualizar Certificado</a></td>
        <td><a href="${reconf.atestado_medico}">Visualizar Atestado Médico</a></td>
        <td>${reconf.copia_bilhete}</td>
        <td>${reconf.anoletivo}</td>
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
            <td>Sem Registros...</td>
        </tr>
    `
 }
  
  return (`
    <header>
      Alunos Matriculados
    </header>
    <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Foto Passe</th>
              <th>Certificado/Dec</th>
              <th>Atestado Medico</th>
              <th>Copia do BI</th>
              <th>Anoletivo</th>
              <th>Operações</th>
            </tr>
          </thead>
          <tbody>
            ${ results }
          </tbody>
    </table>
  `);
}

export default tabeleMatriculados;