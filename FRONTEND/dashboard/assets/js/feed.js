//Ao abrir o documento
window.addEventListener("DOMContentLoaded", () => {
    let busca = document.querySelector(".breves");
    busca.classList.add('aplicar');

    setInterval(() => {
        let fechar = document.querySelector(".breves");
        fechar.classList.remove('aplicar');
    }, 14000)
})


let lista = document.querySelector('.cardI .lista_imagens');
let items = document.querySelectorAll('.cardI .lista_imagens .intem');
let circulosbts = document.querySelectorAll('.cardI .circlebuttons li');
let prev = document.getElementById('antes');
let next = document.getElementById('depois');

let active = 0;
let distancia = items.length - 1;

next.onclick = function () {
    if (active + 1 > distancia) {
        active = 0;
    } else {
        active = active + 1;
    }
    reloadSlide();
}

prev.onclick = function () {
    if (active - 1 < 0) {
        active = distancia;
    } else {
        active = active - 1;
    }
    reloadSlide();
}

let refreshslide = setInterval(() => {
    next.click()
}, 5000);

function reloadSlide() {
    let checkleft = items[active].offsetLeft;
    lista.style.left = -checkleft + 'px';

    let lastcirclebutton = document.querySelector('.cardI .circlebuttons li.activa');
    lastcirclebutton.classList.remove('activa');
    circulosbts[active].classList.add('activa');
    clearInterval(refreshslide);
    refreshslide = setInterval(() => {
        next.click()
    }, 5000)
}

circulosbts.forEach((li, key) => {
    li.addEventListener('click', function () {
        active = key;
        reloadSlide();
    })
})


let pegarperfil = document.querySelector('.perfil');
pegarperfil.addEventListener('click', () => {
    let opcoes = document.querySelector('.perfil .opcoes');
    opcoes.classList.toggle('opactive');

    let closeropcoes = setTimeout(() => {
        return opcoes.classList.remove('opactive')
    }, 5000)
})


