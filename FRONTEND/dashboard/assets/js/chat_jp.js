const baradepesquisa = document.querySelector(".usuarios .search input"),
    pesquisabtn = document.querySelector(".usuarios .search button"),
    listausuarios = document.querySelector(".usuarios .lista-de-usuarios");

pesquisabtn.onclick = () => {
    baradepesquisa.classList.toggle("active");
    baradepesquisa.focus();
    pesquisabtn.classList.toggle("active");
    baradepesquisa.value = "";
}
