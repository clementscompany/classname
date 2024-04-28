import { deleteURL } from "../../variaveis.js";
import { mainContainer, modalContainer } from "../App.js";
import deleteCard from "../pages/deletecard.js";
import messageSucess from "../pages/messagesucess.js";
function deleteData(id,path){
    modalContainer.classList.add('modalContainer');
    modalContainer.innerHTML = deleteCard();
    mainContainer.appendChild(modalContainer);

    let deleteButtons = modalContainer.querySelectorAll("#buttonsOption > button");
    deleteButtons.forEach((button,index)=>{
        button.addEventListener("click", ()=>{
            switch (index){
                case 0:
                    eliminar(id,path);
                break
                
                case 1:
                    closeModal();
                break;
                
                default:
                break;
            }
        })
    })


    function closeModal(){
        modalContainer.classList.remove('modalContainer');
        modalContainer.innerHTML = "";
        mainContainer.removeChild(modalContainer);
    }
    async function eliminar(idRef, reference){
        let formData = new FormData();
        formData.append("idDelete", idRef);
        formData.append("path", reference);

       try {
        let senData = await fetch(deleteURL,{
            method:"POST",
            cache:"no-cache",
            body:formData
        });
        if (senData.ok) {
            let data = await senData.json();
            if (data.error) {
                modalContainer.innerHTML = modalContainer.innerHTML = messageSucess(data.error);
                modalContainer.querySelector("#confirmButton").onclick = ()=>{
                    closeModal();
                }
            } else if(data.delete.error){
                modalContainer.innerHTML = modalContainer.innerHTML = messageSucess(data.delete.error);
                modalContainer.querySelector("#confirmButton").onclick = ()=>{
                    closeModal();
                }
            } else{
                modalContainer.innerHTML = modalContainer.innerHTML = messageSucess(data.delete.sucess);
                modalContainer.querySelector("#confirmButton").onclick = ()=>{
                    closeModal();
                }
            }
            
        } else{///else error MEssage
            modalContainer.innerHTML = messageSucess("Erro: " + error);
            modalContainer.querySelector("#confirmButton").onclick = ()=>{
                closeModal();
            }
            modalContainer.querySelector(".caedDelete")[0].style.color = "red";
        }
       } catch (error) {///Error Message
        modalContainer.innerHTML = messageSucess("Erro: " + error);
            modalContainer.querySelector("#confirmButton").onclick = ()=>{
                closeModal();
            }
            modalContainer.querySelector(".caedDelete")[0].style.color = "red";
       }

    }
}
export default deleteData;