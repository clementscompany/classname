/////// loginBtn
const loginBtn = document.querySelectorAll("#logsBtn > button");

loginBtn.forEach((button,index) =>{
    button.addEventListener("click", ()=>{
        switch(index){
            case 1:
                location.href = "./cadastro.html";
            break;
            
            case 0:
                location.href = "./login.html";
            break;

            default :
               alert("houve um erroo!");
               location.reload(true);
            break;       
        }
    })
})

