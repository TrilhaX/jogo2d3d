const canvas = document.querySelector("#jogo2D");
const ctx = canvas.getContext("2d");

const personagem = {
    x: 30,
    y: 130,
    altura: 20,
    largura: 20,
    velocidadeY: 0,
    pulando: false,
    gravidade: 0.8,
    forcaPulo: 12,
    chao: 0
};

personagem.chao = canvas.height - personagem.altura;

document.addEventListener("keydown", function(event) {
    if (event.code === "Space" && !personagem.pulando) {
        personagem.pulando = true;
        personagem.velocidadeY = -personagem.forcaPulo; 
    }
});

function desenharPersonagem() {
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura);
}

function atualizarPersonagem() {
    if (personagem.pulando == true) {
        personagem.velocidadeY += personagem.gravidade;
        personagem.y += personagem.velocidadeY;
        if (personagem.y >= personagem.chao) {
            personagem.y = personagem.chao;
            personagem.velocidadeY = 0;
            personagem.pulando = false;
        }
    }
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    desenharPersonagem();
    atualizarPersonagem();
    requestAnimationFrame(loop);
}

loop();