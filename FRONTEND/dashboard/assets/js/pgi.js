
//abrir notificações

let buscarntf = document.querySelector(".user");

buscarntf.onclick = () => {
    let buscarntfs = document.querySelector(".notificacoes");
    buscarntfs.classList.toggle("active");
}

//===========================Abrir definicoes
let pegarperfil = document.querySelector('.perfil01pgi');
pegarperfil.addEventListener('click', () => {
    let opcoes = document.querySelector('.perfil01pgi .opcoes-of-perfil01pgi');
    opcoes.classList.toggle('opactive');

    let closeropcoes = setTimeout(() => {
        return opcoes.classList.remove('opactive')
    }, 5000)
})

function abrir_de_foto_perfil() {
    const modal_de_ft_perfil = document.getElementById('modalfotoperfil');
    modal_de_ft_perfil.classList.add('ativar')

    modal_de_ft_perfil.addEventListener('click', (e) => {
        if (e.target.id == 'fecharmodalfotoperfil') {
            modal_de_ft_perfil.classList.remove('ativar')
        }
    });
};

function abrir() {
    const modal = document.getElementById('modal');
    modal.classList.add('ativar')

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar') {
            modal.classList.remove('ativar')
        }
    });
};

function abrir_de_reconfirmacao() {
    const modal_de_reconfirmacao = document.getElementById('modal-de-reconfirmacao');
    modal_de_reconfirmacao.classList.add('ativar')

    modal_de_reconfirmacao.addEventListener('click', (e) => {
        if (e.target.id == 'fechar-reconfirmacao') {
            modal_de_reconfirmacao.classList.remove('ativar')
        }
    });
};

function abrir_de_notificacoes() {
    const modal_de_notificacao = document.getElementById('modalnotificar');
    modal_de_notificacao.classList.add('ativar')

    modal_de_notificacao.addEventListener('click', (e) => {
        if (e.target.id == 'fecharmodalnotificar') {
            modal_de_notificacao.classList.remove('ativar')
        }
    });
};

function abrir_de_boletim() {
    const modal_de_boletim = document.getElementById('modalboletim');
    modal_de_boletim.classList.add('ativar')

    modal_de_boletim.addEventListener('click', (e) => {
        if (e.target.id == 'fecharmodalboletim') {
            modal_de_boletim.classList.remove('ativar')
        }
    });
};

let fileInput = document.querySelector("#file");
let fileList = document.querySelector("#lista-ficheiros");
let numFiles = document.querySelector(".num-de-ficheiros");

fileInput.onchange = () => {
    fileList.innerHTML = "";
    numFiles.textContent = `${fileInput.files.length}
    ficheiro selecionado`;

    for (i of fileInput.files) {
        let reader = new FileReader();
        let ListItem = document.createElement("li");
        let filename = i.name;
        let fileSize = (i.size / 1024).toFixed(1);
        ListItem.innerHTML = `<p>${filename}</p><p>${fileSize}Kb</p>`;
        if (fileSize >= 1024) {
            fileSize = (fileSize / 1024).toFixed(1);
            ListItem.innerHTML = `<p>${filename}</p><p>${fileSize}MB</p>`;
        }
        fileList.appendChild(ListItem);
    }
}

//==============================================================
