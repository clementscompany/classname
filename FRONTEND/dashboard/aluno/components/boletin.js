import { mainContainer } from "../App.js";
import modalBoletin from "../views/modal/boletin.js";
import { modal } from "./home.js";
function boletin(){
        modal.classList.add('modal');
        modal.classList.add('ativar');
        mainContainer.appendChild(modal);
        modal.innerHTML = modalBoletin();
        modal.querySelector("#fecharmodalboletim").onclick = ()=>{ closeModal() };

        modal.querySelector("#download").onclick = ()=>{
            downloadTable();
        }

        function downloadTable() {
            window.print();
        }
        
        function closeModal() {
            modal.classList.remove('modal');
            modal.classList.remove('ativar');
            mainContainer.removeChild(modal);
            modal.innerHTML = "";
        }
}
export default boletin;
