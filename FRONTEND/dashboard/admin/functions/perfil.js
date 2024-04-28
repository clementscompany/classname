import { dashboardURL } from "../../variaveis.js";
import { mainContainer, modalContainer } from "../App.js";
import profiloStudent from "../pages/profilestudent.js";
async function perfil(id){
    
    try {
        let getData = await fetch(dashboardURL,{
         method:"GET"
        });
        if (getData.ok) {
            let data = await getData.json();
            let user = data.listasDashboard.inscritos;
            user.forEach(userData => {
                if (userData.id == id) {
                    modalContainer.innerHTML = profiloStudent(userData);
                    modalContainer.classList.add('modalContainer');
                    mainContainer.appendChild(modalContainer);
                    modalContainer.querySelector("#closeProfilloModalButton").onclick = ()=>{
                        closeModal();
                    }
                }
            });

        }
    } catch (error) {
        console.log(error);
    }

    function  closeModal(params) {
        modalContainer.classList.remove('modalContainer');
        modalContainer.innerHTML = "";
        mainContainer.removeChild(modalContainer);
    }
}
export default perfil;