let tentativas = 6;
let listaDinamica = [];
let listaLetraErrada = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let letrasErradas = document.getElementById("letrasErradas");

const palavras = [
    { nome: "IRLANDA", categoria: "PAISES" },
    { nome: "EQUADOR", categoria: "PAISES" },
    { nome: "CHILE", categoria: "PAISES" },
    { nome: "INDONESIA", categoria: "PAISES" },
    { nome: "MALDIVAS", categoria: "PAISES" },
    { nome: "INGLATERRA", categoria: "PAISES" },
    { nome: "GROELANDIA", categoria: "PAISES" },
    { nome: "UZBEQUISTAO", categoria: "PAISES" },
    { nome: "CREGUENHEM", categoria: "PAISES" },
    { nome: "BICICLETA", categoria: "TRANSPORTE" },
    { nome: "LANCHA", categoria: "TRANSPORTE" },
    { nome: "NAVIO", categoria: "TRANSPORTE" },
    { nome: "TELEFERICO", categoria: "TRANSPORTE" },
    { nome: "MOTOCICLETA", categoria: "TRANSPORTE" },
    { nome: "BARCO", categoria: "TRANSPORTE" },
    { nome: "AERONAVE", categoria: "TRANSPORTE" },
    { nome: "TREM", categoria: "TRANSPORTE" },
    { nome: "CAIAQUE", categoria: "TRANSPORTE" },
    { nome: "FUNICULAR", categoria: "TRANSPORTE" },
    { nome: "XICARA", categoria: "OBJETOS" },
    { nome: "MOEDA", categoria: "OBJETOS" },
    { nome: "ESPARADRAPO", categoria: "OBJETOS" },
    { nome: "SINO", categoria: "OBJETOS" },
    { nome: "CHUVEIRO", categoria: "OBJETOS" },
    { nome: "TAMBORETE", categoria: "OBJETOS" },
    { nome: "LAMPADA", categoria: "OBJETOS" },
    { nome: "BOCAL", categoria: "OBJETOS" },
    { nome: "CORTINA", categoria: "OBJETOS" },
    { nome: "LAPIS", categoria: "OBJETOS" },
    { nome: "MELANCIA", categoria: "ALIMENTOS" },
    { nome: "AMENDOIM", categoria: "ALIMENTOS" },
    { nome: "ESFIRRA", categoria: "ALIMENTOS" },
    { nome: "GOROROBA", categoria: "ALIMENTOS" },
    { nome: "JANTAR", categoria: "ALIMENTOS" },
    { nome: "SABOROSO", categoria: "ALIMENTOS" },
    { nome: "DESJEJUM", categoria: "ALIMENTOS" },
    { nome: "MASTIGAR", categoria: "ALIMENTOS" },
    { nome: "ENGOLIR", categoria: "ALIMENTOS" },
    { nome: "DOCERIA", categoria: "ALIMENTOS" },
    { nome: "DRAGAO", categoria: "ANIMAIS" },
    { nome: "GALINHA", categoria: "ANIMAIS" },
    { nome: "PAVAO", categoria: "ANIMAIS" },
    { nome: "CAMELO", categoria: "ANIMAIS" },
    { nome: "PERU", categoria: "ANIMAIS" },
    { nome: "ZEBRA", categoria: "ANIMAIS" },
    { nome: "DROMEDARIO", categoria: "ANIMAIS" },
    { nome: "CALANGO", categoria: "ANIMAIS" },
    { nome: "SAGUI", categoria: "ANIMAIS" },
    { nome: "LAGARTIXA", categoria: "ANIMAIS" },
    { nome: "HIPOPOTAMO", categoria: "ANIMAIS" }
];

function criarPalavraSecreta() {
    const indexPalavra = Math.floor(Math.random() * palavras.length);
    palavraSecretaSorteada = palavras[indexPalavra].nome;
    palavraSecretaCategoria = palavras[indexPalavra].categoria;
}

function montarPalavraNaTela() {
    const categoria = document.getElementById("categoria");
    categoria.innerHTML = "Dica: " + palavraSecretaCategoria;

    const palavraTela = document.getElementById("palavra-secreta");
    palavraTela.innerHTML = "";

    for (let i = 0; i < palavraSecretaSorteada.length; i++) {
        listaDinamica[i] = listaDinamica[i] || "&nbsp;";
        palavraTela.innerHTML += `<div class='letras'>${listaDinamica[i]}</div>`;
    }
}

function verificaLetraEscolhida(letra) {
    document.getElementById("tecla-" + letra).disabled = true;
    if (tentativas > 0) {
        mudarStyleLetra("tecla-" + letra);
        compararListas(letra);
        montarPalavraNaTela();
    }
}

function mudarStyleLetra(tecla) {
    document.getElementById(tecla).style.background = "#002afa";
    document.getElementById(tecla).style.color = "#ffffff";
}

function compararListas(letra) {
    if (palavraSecretaSorteada.indexOf(letra) === -1) {
        tentativas--;
        carregaImagemForca();
        document.getElementById("textoTentativas").innerHTML = `Tentativas Restantes: ${tentativas}`;
        listaLetraErrada.push(letra);
        letrasErradas.innerHTML = `Letras erradas: ${listaLetraErrada.join(", ")}`;

        if (tentativas === 0) {
            abreModal("Você perdeu!", `A palavra secreta era: ${palavraSecretaSorteada}`);
        }
    } else {
        for (let i = 0; i < palavraSecretaSorteada.length; i++) {
            if (palavraSecretaSorteada[i] === letra) {
                listaDinamica[i] = letra;
            }
        }
    }

    if (listaDinamica.join('') === palavraSecretaSorteada) {
        abreModal("Parabéns!", "Você ganhou!");
        tentativas = 0;
    }
}

function carregaImagemForca() {
    const imagens = [
        './img/forca06.png',
        './img/forca05.png',
        './img/forca04.png',
        './img/forca03.png',
        './img/forca02.png',
        './img/forca01.png',
        './img/forca.png'
    ];
    document.getElementById("imagem").style.background = `url('${imagens[tentativas]}')`;
}

function abreModal(titulo, mensagem) {
    document.getElementById("exampleModalLabel").innerText = titulo;
    document.getElementById("modalBody").innerHTML = mensagem;

    $("#myModal").modal({
        show: true
    });
}

document.getElementById("btnReiniciar").addEventListener("click", function () {
    location.reload();
});

document.getElementById("btnStart").addEventListener("click", function () {
    document.getElementById("teclado").style.visibility = "visible";
    criarPalavraSecreta();
    montarPalavraNaTela();
    carregaImagemForca();
});
