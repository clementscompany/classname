let velList = document.querySelector(".velList")

velList.addEventListener("click", () => {
    let traslista = document.querySelectorAll(".lista>li");
    traslista.forEach(element => element.classList.toggle('ativado'));

    let velbtn = document.querySelector(".velList");
    velbtn.classList.toogle('active');
})