import { dashboardURL, updateURL } from "../../variaveis.js";
import { mainContainer, modalContainer } from "../App.js";
import EditForm from "../pages/editform.js";
import messageError from "../pages/messageerror.js";
async function editarData(id) {
  modalContainer.classList.add("modalContainer");
  mainContainer.appendChild(modalContainer);
  try {
    let getData = await fetch(dashboardURL,{
      method:"GET"
    });
    if (getData.ok) {
      let data = await getData.json();
      let sendForm = data.listasDashboard.inscritos;
      let edit = sendForm.find(element => element.id === id);
      if (edit) {
        modalContainer.innerHTML = EditForm(edit);
      }
    } else{
      modalContainer.innerHTML = messageError({message:`${"Erro: "+ getData.statusText}`, class:"error"});
    }
  } catch (error) {
    modalContainer.innerHTML = messageError({message:error, class:"error"});
  }

  let editForm = modalContainer.querySelector("#editForm");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();
  });
  let buttonsOption = modalContainer.querySelectorAll(
    "#buttonsOption > button"
  );
  buttonsOption.forEach((button, index) => {
    let confirmationCard = modalContainer.querySelector("#confirmationCard");
    
    button.addEventListener("click", async () => {
    confirmationCard.innerHTML = messageError({message:"Carregando....",class:"success"});
      switch (index) {
        case 0:
          closeModal();
          break;
        case 1:
          let formData = new FormData(editForm);
          try {
            let sendData = await fetch(updateURL, {
              method: "POST",
              body: formData,
            });
            if (sendData.ok) {
                let data = await sendData.json();
                if (data.error) {
                  confirmationCard.innerHTML = messageError({message:data.error, class:"success"});
                } else{
                  confirmationCard.innerHTML = messageError({message:data.success, class:"success"});
                }
                
            } else{
                confirmationCard.innerHTML = messageError({message:error, class:"error"});
            }
          } catch (error) {
            modalContainer.innerHTML = messageError({message:error, class:"error"});
          }
      }
    });
  });

  function closeModal() {
    modalContainer.innerHTML = "";
    modalContainer.classList.remove("modalContainer");
    mainContainer.removeChild(modalContainer);
  }
}
export default editarData;
