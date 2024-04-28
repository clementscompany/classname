
export const mainContainer = document.querySelector("#mainContainer");
export const modalContainer = document.createElement('section');
import home from "./functions/homefunctions.js";
import setLogin from "./functions/loginfunction.js";
import perfil from "./functions/perfil.js";
window.addEventListener("DOMContentLoaded", ()=>{
    let token =  sessionStorage.getItem("sessionAdmin");
    if(token != null){
        home();
    } else{
        setLogin();
    }
})