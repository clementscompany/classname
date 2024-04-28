import { dashboardURL, notificationdURL } from "../../variaveis.js";
import { mainContainer, modalContainer } from "../App.js";
import messageError from "../pages/messageerror.js";
import notificationPage from "../pages/notification.js";

async function notificate(){
    modalContainer.classList.add('modalTabele');
    mainContainer.appendChild(modalContainer);
    
    try {
        let getData = await fetch(dashboardURL,{
            method:"GET"
        });
        if (getData.ok) {
            let data = await getData.json();
            let alunos = data.listasDashboard.inscritos
            modalContainer.innerHTML = notificationPage(alunos);
        } else{
            modalContainer.innerHTML = messageError({message:getData.statusText, class:"error"});
        }
    } catch (error) {
        modalContainer.innerHTML = messageError({message:error,class:"error"});
    }

    let selectAll = modalContainer.querySelector("#selectAll");
    let idAluno = modalContainer.querySelectorAll(".idAluno");
    let contantSelection = modalContainer.querySelector("#contantSelection");
    let sendMessage = modalContainer.querySelector("#sendMessage");
    let responseText = modalContainer.querySelector("#responseText");
    ///Selecionar todos inpts...
    selectAll.addEventListener("click",()=>{

        if (selectAll.checked == true) {
            idAluno.forEach((input)=>{input.checked = true})
        } else{
            idAluno.forEach((input)=>{input.checked = false})
        }
    });

    contantSelection.addEventListener("submit", (e)=>{
        e.preventDefault();
    })
    sendMessage.addEventListener("click", async ()=>{
        let formData = new FormData(contantSelection);
        responseText.innerHTML = messageError({message:"Carregando...", class:"success"});
        
        try {
            let sendData = await fetch(notificationdURL,{
                method:"POST",
                body:formData
            });
            if (sendData.ok) {
                let data = await sendData.json();
                if (data.sucess) {
                    responseText.innerHTML = messageError({message:data.sucess, class:"success"});
                } else{
                    responseText.innerHTML = messageError({message:data.error, class:"error"});
                }
            } else{
                responseText.innerHTML = messageError({message:sendData.statusText, class:"error"});
            }

        } catch (error) {
            responseText.innerHTML = messageError({message:error, class:"error"});
        }
    })

    modalContainer.querySelector("#closeNotificationsModal").onclick = ()=>{
        closeModal();
    }

    function  closeModal() {
        modalContainer.classList.remove('modalTabele');
        modalContainer.innerHTML = "";
        mainContainer.removeChild(modalContainer);
    }
}
export default notificate;