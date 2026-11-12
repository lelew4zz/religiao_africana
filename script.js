


const botaoTema = document.getElementById("tema");

function atualizarTema() {
    const escuro = document.body.classList.contains("escuro");

    botaoTema.textContent = escuro
        ? "☀️ Modo claro"
        : "🌙 Modo escuro";

    botaoTema.setAttribute(
        "aria-label",
        escuro ? "Ativar modo claro" : "Ativar modo escuro"
    );
}

function alternarTema() {
    document.body.classList.toggle("escuro");

    const escuro = document.body.classList.contains("escuro");

    try {
        localStorage.setItem("tema", escuro ? "escuro" : "claro");
    } catch (erro) {
       
    }

    atualizarTema();
}


try {
    if (localStorage.getItem("tema") === "escuro") {
        document.body.classList.add("escuro");
    }
} catch (erro) {
    
}

atualizarTema();

botaoTema.addEventListener("click", alternarTema);




const botoesFiltro = document.querySelectorAll(".filtro");
const imagens = document.querySelectorAll(".imagem");

function mostrarImagens(categoria) {

    imagens.forEach(imagem => {

        const corresponde =
            categoria === "todas" ||
            imagem.classList.contains(categoria);

        imagem.hidden = !corresponde;

    });

    botoesFiltro.forEach(botao => {

        const selecionado =
            botao.dataset.categoria === categoria;

        botao.classList.toggle("ativo", selecionado);

        botao.setAttribute(
            "aria-pressed",
            selecionado ? "true" : "false"
        );

    });
}

botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        mostrarImagens(botao.dataset.categoria);

    });

});



const modal = document.getElementById("modal");
const imagemAmpliada = document.getElementById("imagem-ampliada");
const legendaModal = document.getElementById("legenda-modal");
const fecharModal = document.querySelector(".fechar-modal");

let botaoAnterior = null;

function abrirModal(botao) {

    const imagem = botao.querySelector("img");

    if (!imagem) return;

    botaoAnterior = botao;

    imagemAmpliada.src = imagem.src;
    imagemAmpliada.alt = imagem.alt;

    legendaModal.textContent =
        botao.closest(".imagem").querySelector("h3").textContent;

    modal.classList.add("aberto");
    modal.setAttribute("aria-hidden", "false");

    fecharModal.focus();

}

function fecharImagem() {

    modal.classList.remove("aberto");
    modal.setAttribute("aria-hidden", "true");

    imagemAmpliada.src = "";

    if (botaoAnterior) {
        botaoAnterior.focus();
    }

}

document.querySelectorAll(".abrir-imagem").forEach(botao => {

    botao.addEventListener("click", () => {

        abrirModal(botao);

    });

});

fecharModal.addEventListener("click", fecharImagem);


modal.addEventListener("click", evento => {

    if (evento.target === modal) {
        fecharImagem();
    }

});


document.addEventListener("keydown", evento => {

    if (evento.key === "Escape" && modal.classList.contains("aberto")) {
        fecharImagem();
    }

});




const secoes = document.querySelectorAll(".revelar");

const observador = new IntersectionObserver((entradas, observer) => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

            observer.unobserve(entrada.target);

        }

    });

}, {
    threshold: 0.12
});

secoes.forEach(secao => {

    observador.observe(secao);

});




const linksMenu = document.querySelectorAll("nav a");

const secoesMenu = document.querySelectorAll(
    "main section[id]"
);

const observadorMenu = new IntersectionObserver(entradas => {

    entradas.forEach(entrada => {

        if (entrada.isIntersecting) {

            linksMenu.forEach(link => {

                const corresponde =
                    link.getAttribute("href") ===
                    "#" + entrada.target.id;

                link.classList.toggle("ativo", corresponde);

            });

        }

    });

}, {
    rootMargin: "-20% 0px -65% 0px"
});

secoesMenu.forEach(secao => {

    observadorMenu.observe(secao);

});




const botaoTopo = document.getElementById("topo");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        botaoTopo.classList.add("visivel");

    } else {

        botaoTopo.classList.remove("visivel");

    }

}, {
    passive: true
});

botaoTopo.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
