import controller from "./components/controler.js";
import HomePage from "./components/home.js";
import setLogin from "./components/loginComponent.js";
export const mainContainer = document.querySelector("#mainContainer");
window.addEventListener("DOMContentLoaded", ()=>{
   function loginVeriy(){
    let sessionId = sessionStorage.getItem("sessionId");
    if (sessionId != null) {
        HomePage();
    } else{
        setLogin();
    }
   }
   //Chamando as funcoes//
   loginVeriy();
})
window.addEventListener("hashchange", controller());