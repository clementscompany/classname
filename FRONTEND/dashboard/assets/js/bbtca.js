let pegarperfil = document.querySelector('.perfil');
pegarperfil.addEventListener('click', () => {
    let opcoes = document.querySelector('.perfil .opcoes');
    opcoes.classList.toggle('opactive');

    let closeropcoes = setTimeout(() => {
        return opcoes.classList.remove('opactive')
    }, 10000)
})


let lista = document.querySelector(".div-list-conteiners");
let items = document.querySelector(".items-conteiner-livro");
let antes = document.querySelector("#antes");
let depois = document.querySelector("#depois");

let active = 0;
let distancia = items.length - 1;

depois.onclick = function () {
    if (active + 1 > distancia) {
        active = 0;
    } else {
        active = active + 1;
    }
    reloadSlide();
}

function reloadSlide() {
    let checkleft = lista[active].offsetLeft;
    lista.style.left = -checkleft + 'px';
}