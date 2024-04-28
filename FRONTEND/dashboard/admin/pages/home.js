function HomePage(params) {

    let recentes = "";
    params.listasDashboard.incricoesRecentes.forEach(dados => {
        recentes += `
        <tr>
            <td>${ dados.nomeCompleto }</td>
            <td>${ dados.curso }</td>
            <td>
              <button data-aluno="${ dados.id }" class="tabeleButton" id="verTudoButton">Ver mais</button>
            </td>
        </tr>
    `;
    });

    return(`
    <div class="container">
    <nav class="sidebar">
      <div class="sidebar-header">
        Dashboard
      </div>
      <ul class="menu" id="menuList">
        <li class="active"><i class="bi bi-house-fill"></i> Dashboard</li>
        <li><i class="bi bi-search"></i> Pesquisar</li>
        <li><i class="bi bi-graph-up-arrow"></i>Reconfirmações</li>
        <li><i class="bi bi-people-fill"></i> Alunos Matriculados</li>
        <li><i class="bi bi-bell-fill"></i> Notificações</li>
      </ul>
    </nav>
    <main class="content" id="contentMain">

        <div class="dashboard-info">
            <div class="card">
                <h3>Total de Alunos</h3>
                <p>500</p>
            </div>

            <div class="card">
                <h3>Total de Usuários</h3>
                <p>100</p>
            </div>

            <div class="card">
                <h3>Receita Mensal</h3>
                <p>R$ 10.000</p>
            </div>
        </div>

      <header>
        <button  class="tabeleButton" id="verDutoButton">
            Ver todos os registros
        </button>
      </header>
      <div class="table-container" id="container">
        <table>
          <thead>
            <tr>
              <th>Inscrições Recentes</th>
              <th>Curso</th>
              <th>Opções</th>
            </tr>
          </thead>
          <tbody>
            ${ recentes }
          </tbody>
        </table>
      </div>
    </main>
  </div>
    `);
}
export default HomePage;
