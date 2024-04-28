const container_books = document.querySelector(".container-books");
const carousell = document.querySelector(".carousel");
const btns = document.querySelectorAll(".container-books i");
const widthfirstcard = carousell.querySelector(".card").offsetWidth;
const carouselchildren = [...carousell.children];

let isdragging = false, startX, startScrolleft, timeoutId;

let cardanterior = Math.round(carousell.offsetWidth / widthfirstcard);

carouselchildren.slice(-cardanterior).reverse().forEach(card => {
    carousell.insertAdjacentHTML("afterbegin", card.outerHTML);
});


carouselchildren.slice(0, cardanterior).forEach(card => {
    carousell.insertAdjacentHTML("beforeend", card.outerHTML);
});


btns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousell.scrollLeft += btn.id === "esquerda" ? -widthfirstcard : widthfirstcard;
    })
});

const draggingstart = (e) => {
    isdragging = true;
    carousell.classList.add("dragging");
    // lembrar a posicao inicial onde parou o cursorno carosel
    startX = e.pageX;
    startScrolleft = carousell.scrollLeft;
}

const dragging = (e) => {
    if (!isdragging) return;
    //atualizando a posicao do cursor de acordo o caroussel
    carousell.scrollLeft = startScrolleft - (e.pageX - startX);
}

const draggingstop = () => {
    isdragging = false;
    carousell.classList.remove("dragging");
}

const autoplay = () => {
    timeoutId = setInterval(() =>
        carousell.scrollLeft += widthfirstcard, 2500);
}

autoplay();

const infiniteScroll = () => {
    if (carousell.scrollLeft === 0) {
        carousell.classList.add("sem-transicao");
        carousell.scrollLeft = carousell.scrollWidth - (2 * carousell.offsetWidth);
        carousell.classList.remove("sem-transicao");
    } else if (Math.ceil(carousell.scrollLeft) === carousell.scrollWidth - carousell.offsetWidth) {
        carousell.classList.add("sem-transicao");
        carousell.scrollLeft = carousell.offsetWidth;
        carousell.classList.remove("sem-transicao");
    }

    clearTimeout(timeoutId);
    if (!container_books.matches(":hover")) autoplay();
}

carousell.addEventListener("mousedown", draggingstart);
carousell.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", draggingstop);
carousell.addEventListener("scroll", infiniteScroll);
container_books.addEventListener("mouseenter", () => clearTimeout(timeoutId));
container_books.addEventListener("mouseleave", autoplay);