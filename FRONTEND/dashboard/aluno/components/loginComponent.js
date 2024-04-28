import { loginURL } from "../../variaveis.js";
import { mainContainer } from "../App.js";
import loginPage from "../views/login.js";
function setLogin(){
    let modal = document.createElement('section');
    let message = "Houve um erro de inicio de sessão, por favor tente novamente";
    modal.classList.add('modal')
    modal.classList.add('ativar');
    modal.innerHTML = loginPage(message);
    mainContainer.appendChild(modal);
    modal.querySelector("#closeModal").onclick = ()=>{
        location.href = loginURL;
    }
    
}
export default setLogin;