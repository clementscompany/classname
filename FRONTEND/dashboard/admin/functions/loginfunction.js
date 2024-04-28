import { dashboardURL } from "../../variaveis.js";
import { mainContainer } from "../App.js";
import login from "../pages/login.js";

function setLogin() {
  mainContainer.innerHTML = login();
  var loginForm = mainContainer.querySelector("#loginForm");
  var sendButton = mainContainer.querySelector("#sendButton");
  var errorText = mainContainer.querySelector("#errorText");

  sendButton.addEventListener("click", async (e) => {
    e.preventDefault(); 
    try {
      errorText.textContent = "Carregando...";
      errorText.style.color = "green"; 
      var formData = new FormData(loginForm); 
      formData.append("path", "/login");
      let sendData = await fetch(dashboardURL, {
        method: "POST",
        body: formData
      });

      if (sendData.ok) {
        let data = await sendData.json();
        console.log(data);
        if(data.error){
            errorText.textContent = data.error;
            errorText.style.color = "red";
        } else if(data.login.error){
            errorText.textContent = data.login.error;
            errorText.style.color = "red";
        } else{
            errorText.textContent = data.login.success;
            errorText.style.color = "green";

            sessionStorage.setItem("sessionAdmin", data.login.token);
            const interval = setInterval(()=>{
              reload();
            },2000);

            function reload() {
              clearInterval(interval);
              window.location.reload();
            }
        }
        
      } else {
        errorText.textContent = "Erro ao enviar os dados"; 
        errorText.style.color = "red"; 
      }
    } catch (error) {
      errorText.textContent = error;
      errorText.style.color = "red"; 
    }
  });
}

export default setLogin;
