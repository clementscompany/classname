let pegarbotao = document.querySelector(".botao")

pegarbotao.addEventListener("click", () => {
    let pegarelemento = document.querySelectorAll(".C1");
    pegarelemento.forEach(Element => Element.classList.toggle('ativada'))
    let pegarnoavamenteobtn = document.querySelector(".botao");
    pegarnoavamenteobtn.classList.toggle('active')
});

let pegarbotao2 = document.querySelector(".botao2")

pegarbotao2.addEventListener("click", () => {
    let pegarelemento2 = document.querySelectorAll(".C2");
    pegarelemento2.forEach(Element => Element.classList.toggle('ativada2'))
    let pegarnoavamenteobtn = document.querySelector(".botao2");
    pegarnoavamenteobtn.classList.toggle('active2')
});

let pegarbotao3 = document.querySelector(".botao3")

pegarbotao3.addEventListener("click", () => {
    let pegarelemento3 = document.querySelectorAll(".C3");
    pegarelemento3.forEach(Element => Element.classList.toggle('ativada3'))
    let pegarnoavamenteobtn = document.querySelector(".botao3");
    pegarnoavamenteobtn.classList.toggle('active3')
});

