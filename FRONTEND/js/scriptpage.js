//Ao abrir o documento
window.addEventListener("DOMContentLoaded", () => {
  let busca = document.querySelector(".breves");
  busca.classList.add('aplicar');

  setInterval(() => {
    let fechar = document.querySelector(".breves");
    fechar.classList.remove('aplicar');
  }, 12000)
})
///menu 
function abrirMenu() {
  let rigth = document.querySelector(".rigth");
  rigth.classList.toggle('active');
}

let velList = document.querySelector(".velList");

velList.addEventListener("click", () => {
  let ListMov = document.querySelectorAll(".ListMov > li");
  ListMov.forEach(element => element.classList.toggle('active'));
  let velList = document.querySelector(".velList");
  velList.classList.toggle('active');

})

let velList2 = document.querySelector(".velList02");

velList2.addEventListener("click", () => {
  let ListMov2 = document.querySelectorAll(".ListMov2 > li");
  ListMov2.forEach(element => element.classList.toggle('active2'));
  let velList02 = document.querySelector(".velList02");
  velList02.classList.toggle('active2');

})

//listmov3--principal

let velbtn = document.querySelector(".velbtn");

velbtn.addEventListener("click", () => {
  let ListMov3 = document.querySelectorAll(".ListMov3 > li");
  ListMov3.forEach(element => element.classList.toggle('activo'));

  let velbtn = document.querySelector(".velbtn");
  velbtn.classList.toggle('activo');

})

//list mov3 secundario dos cursos

let velbt = [...document.querySelectorAll(".velbtn1")]

velbt.map((el, i) => {
  el.addEventListener("click", (evt) => {
    let listmov03 = document.querySelectorAll(".ListMov3>li>.c1");
    listmov03.forEach(evt => evt.classList.toggle('casoativo'));

    let velbtn = document.querySelector(".velbtn1");
    velbtn.classList.toggle('activo1');
  })
})

//fim list mov3

//listmov4--principal

let velbtn01 = document.querySelector(".velbtn01");

velbtn01.addEventListener("click", () => {
  let ListMov4 = document.querySelectorAll(".ListMov4 > li");
  ListMov4.forEach(element => element.classList.toggle('activo001'));

  let velbtn01 = document.querySelector(".velbtn01");
  velbtn.classList.toggle('activo001');

})

//listmov4 secundario

let velbt02 = [...document.querySelectorAll(".velbtn02")]

velbt02.map((el, i) => {
  el.addEventListener("click", (evt) => {
    let listmov4 = document.querySelectorAll(".ListMov4>li>.Mov4");
    listmov4.forEach(evt => evt.classList.toggle('casoativo02'));

    let velbtn02 = document.querySelector(".velbtn02");
    velbtn02.classList.toggle('activo02');
  })
})
// fim do nlist mov4


