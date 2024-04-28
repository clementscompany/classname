import {
  APIendPoint,
  SourceEventURL,
  backendURL,
  dashboardURL,
} from "../../variaveis.js";
import { mainContainer } from "../App.js";
import HomePage from "../pages/home.js";
import messageError from "../pages/messageerror.js";
import recinfirmation from "../pages/reconfirmacoes.js";
import searsh from "../pages/searh.js";
import GeneralTabele from "../pages/tabelegeral.js";
import tabeleMatriculados from "../pages/tabelematriculados.js";
import resultadosPesquisa from "../pages/tabeleresults.js";
import deleteData from "./delete.js";
import editarData from "./editar.js";
import notificate from "./notifications.js";
import perfil from "./perfil.js";
async function home() {
  try {
    let getData = await fetch(dashboardURL, {
      method: "GET",
    });
    if (getData.ok) {
      let data = await getData.json();
      mainContainer.innerHTML = HomePage(data);
    } else {
      mainContainer.querySelector("#container").innerHTML =
        "Erro: " + getData.statusText;
      mainContainer.querySelector("#container").style.color = "red";
    }
  } catch (error) {
    mainContainer.innerHTML = "Erro: " + error;
    mainContainer.style.color = "red";
  }

  ///Navegacao//
  let menuList = mainContainer.querySelectorAll("#menuList > li");
  var contentMain = mainContainer.querySelector("#contentMain");
  var container = mainContainer.querySelector("#container");
  var verTudoButtondoButton = mainContainer.querySelectorAll("#verTudoButton");
  var verDutoButton = mainContainer.querySelector("#verDutoButton");


  verDutoButton.addEventListener("click", async () => {
    try {
      let getData = await fetch(dashboardURL, {
        method: "GET",
      });
      if (getData.ok) {
        let data = await getData.json();
        let listData = data.listasDashboard.inscritos;
        console.log(listData);  
        container.innerHTML = GeneralTabele(listData);
        
        let deleteButton = container.querySelectorAll("#deleteButton");
        let editButton = container.querySelectorAll("#editButton");
        let viewButton = container.querySelectorAll("#viewButton");
        let btnRefresh =  container.querySelector("#btnRefresh");
  
        btnRefresh.onclick = ()=>{
          home();
        }

        deleteButton.forEach((button) => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-delete");
            deleteData(id,"/aluno");
          })
        })
  
        editButton.forEach((button) => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("dataEdit");
            editarData(id);
          })
        })
  
        viewButton.forEach((button) => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("dataView");
            perfil(id);
          })
        })
      }
    } catch (error) {
      container.innerHTML = messageError({ message: error, class: "error" });
    }
  })
  

  verTudoButtondoButton.forEach((buttonUser) => {
    buttonUser.addEventListener("click", () => {
      let userGet = buttonUser.getAttribute("data-aluno");
      perfil(userGet);
    });
  });
  menuList.forEach((list, index) => {
    list.addEventListener("click", () => {
      switch (index) {
        case 0:
          menuList.forEach((item) => item.classList.remove("active"));
          list.classList.add("active");
          home();
          break;
        case 1:
          menuList.forEach((item) => item.classList.remove("active"));
          list.classList.add("active");
          pesquisar();
          break;
        case 2:
          menuList.forEach((item) => item.classList.remove("active"));
          list.classList.add("active");
          pageReconfirmation();
          break;
        case 3:
          menuList.forEach((item) => item.classList.remove("active"));
          list.classList.add("active");
          pageMAtriculados();
          break;
        case 4:
          menuList.forEach((item) => item.classList.remove("active"));
          list.classList.add("active");
          notificate();
          break;

        default:
          break;
      }
    });
  }); // end Menu List

  //pesquisar//
  function pesquisar() {
    contentMain.innerHTML = searsh();
    contentMain.querySelector("#searchButton").onclick = async () => {
      let resultSeatch = contentMain.querySelector("#resultSeatch");
      let value = contentMain.querySelector("#valueSearch").value;
      if (value.trim() != "") {
        try {
          resultSeatch.innerHTML = `<div><span>Carregando...</span></div>`;
          resultSeatch.style.color = "dodgerblue";
          let path = "/search";
          let formData = new FormData();
          formData.append("dataSearch", value);
          formData.append("path", path);
          let getData = await fetch(dashboardURL, {
            method: "POST",
            body: formData,
          });
          if (getData.ok) {
            let data = await getData.json();
            let result = data.resultsearch;
            if (result.error) {
              resultSeatch.innerHTML = `<div><span>Erro: ${result.error}</span></div>`;
              resultSeatch.style.color = "gray";
            } else {
              let cardContent = "";
              result.dados.forEach((element) => {
                cardContent += `
                            <div>
                                <ul id="dataREsultFound" data-get="${element.id}">
                                    <li><small><b>Nome :</b> ${element.nomeCompleto}</small></li>
                                    <li><small><b>Bilhete :</b>${element.bilhete}</small></li>
                                    <li><small><b>Telefone:</b> ${element.telefone}</small></li>
                                </ul>
                            </div>
                            `;
              });

              resultSeatch.innerHTML = cardContent;

              let dataREsultFound =
                resultSeatch.querySelectorAll("#dataREsultFound");
              dataREsultFound.forEach((list) => {
                list.addEventListener("click", () => {
                  let id = list.getAttribute("data-get");
                  listarResultados(id);
                });
              });
            }
          } else {
            resultSeatch.innerHTML = `<div><span>${getData.statusText}</span></div>`;
            resultSeatch.style.color = "red";
          }
        } catch (error) {
          resultSeatch.innerHTML = `<div><span>Erro: ${error}</span></div>`;
          resultSeatch.style.color = "red";
        }
      } else {
        resultSeatch.innerHTML = `<div><span>Digite alguma coisa para pesquisar...</span></div>`;
        resultSeatch.style.color = "gray";
      }
    };

    ////Listar Resultados por id
    async function listarResultados(id) {
      let getData = await fetch(dashboardURL, {
        method: "GET",
      });
      try {
        if (getData.ok) {
          let data = await getData.json();
          let result = data.listasDashboard.inscritos;
          result.forEach((idUser) => {
            if (idUser.id == id) {
              let send = { data: idUser };
              contentMain.innerHTML = resultadosPesquisa(send);
              let optionTabele = contentMain.querySelectorAll(
                "#optionTabele > button"
              );
              optionTabele.forEach((button, index) => {
                button.addEventListener("click", () => {
                  switch (index) {
                    case 0:
                      let id = button.getAttribute("data-delete");
                      let path = "/aluno";
                      deleteData(id, path);
                      break;

                    case 1:
                      let editID = button.getAttribute("dataEdit");
                      editarData(editID);
                      break;
                    case 2:
                      let verId = button.getAttribute("dataView");
                      perfil(verId);
                    default:
                      break;
                  }
                });
              });
            }
          });
        } else {
          contentMain.innerHTML = getData.statusText;
          contentMain.stylr.color = "red";
        }
      } catch (error) {
        contentMain.innerHTML = error;
        contentMain.stylr.color = "red";
      }
    }
  } ////PEsquisar

  //////ListarReconfirmacoes
  async function pageReconfirmation() {
    try {
      let getData = await fetch(dashboardURL, {
        method: "GET",
      });
      if (getData.ok) {
        let data = await getData.json();
        let reconfirmados = data.listasDashboard;
        contentMain.innerHTML = recinfirmation(reconfirmados.reconfirmacoes);

        let deleteButtons = contentMain.querySelectorAll(".deleteButton");
        let editButtons = contentMain.querySelectorAll(".editButton");
        let viewButtons = contentMain.querySelectorAll(".viewButton");

        deleteButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-delete");
            let path = "/aluno";
            deleteData(id, path);
          });
        });

        editButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-edit");
            editarData(id);
          });
        });

        viewButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-view");
            perfil(id);
          });
        });
      } else {
        contentMain.innerHTML = "Erro: " + getData.statusText;
        contentMain.style.color = "red";
      }
    } catch (error) {
      contentMain.innerHTML = "Erro: " + error;
    }
  }

  ////////////// Listar matriculados

  async function pageMAtriculados() {
    try {
      let getData = await fetch(dashboardURL, { method: "GET" });
      if (getData.ok) {
        let data = await getData.json();
        let matriculados = data.listasDashboard;
        console.log(matriculados.matriculados);
        contentMain.innerHTML = tabeleMatriculados(matriculados.matriculados);

        let deleteButtons = contentMain.querySelectorAll(".deleteButton");
        let editButtons = contentMain.querySelectorAll(".editButton");
        let viewButtons = contentMain.querySelectorAll(".viewButton");

        deleteButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-delete");
            let path = "/aluno";
            deleteData(id, path);
          });
        });

        editButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-edit");
            editarData(id);
          });
        });

        viewButtons.forEach(button => {
          button.addEventListener("click", () => {
            let id = button.getAttribute("data-view");
            perfil(id);
          });
        });
        
      } else {
        contentMain.innerHTML = "Erro: " + getData.statusText;
        contentMain.style.color = "red";
      }
    } catch (error) {
      contentMain.innerHTML = "Erro: " + error;
    }
  }

  // const event = new EventSource(SourceEventURL);
  // event.onmessage = function(event) {
  //     console.log(JSON.parse(event.data));
  // }
}
export default home;
